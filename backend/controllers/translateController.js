const aiService = require('../services/aiService');
const admin = require('firebase-admin');

const MAX_FREE_TRANSLATIONS = 15;
const MAX_TEXT_LENGTH = 5000;
const MAX_CONTEXT_LENGTH = 1000;
const MAX_CHAT_LENGTH = 2000;
const SUPPORTED_LANGUAGES = new Set([
    'ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pt', 'ru', 'tr', 'zh',
]);

function readString(value, fieldName, maxLength) {
    if (typeof value !== 'string') {
        const error = new Error(`Le champ "${fieldName}" doit etre une chaine de caracteres.`);
        error.status = 400;
        throw error;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        const error = new Error(`Le champ "${fieldName}" est requis.`);
        error.status = 400;
        throw error;
    }

    if (trimmed.length > maxLength) {
        const error = new Error(`Le champ "${fieldName}" depasse ${maxLength} caracteres.`);
        error.status = 413;
        throw error;
    }

    return trimmed;
}

function readOptionalString(value, fieldName, maxLength) {
    if (value === undefined || value === null || value === '') {
        return '';
    }
    return readString(value, fieldName, maxLength);
}

function badRequest(message) {
    const error = new Error(message);
    error.status = 400;
    return error;
}

function currentMonthKey() {
    return new Date().toISOString().slice(0, 7);
}

function isSubscribedUser(user) {
    return user.subscribed === true || user.isSubscribed === true;
}

class TranslateController {
    async reserveTranslationQuota(userId, userEmail, isSubscribed) {
        if (isSubscribed) {
            return {
                isSubscribed,
                translationCount: null,
                remainingTranslations: null,
            };
        }

        const db = admin.firestore();
        const userRef = db.collection('users').doc(userId);
        const month = currentMonthKey();

        return await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            const userData = userDoc.exists ? userDoc.data() : {};
            const usage = userData.translationUsage || {};
            const currentCount = usage.month === month && Number.isInteger(usage.count)
                ? usage.count
                : 0;

            if (currentCount >= MAX_FREE_TRANSLATIONS) {
                const error = new Error('Vous avez atteint la limite de traductions gratuites.');
                error.status = 403;
                error.limitReached = true;
                error.translationCount = currentCount;
                throw error;
            }

            const nextCount = currentCount + 1;
            transaction.set(userRef, {
                uid: userId,
                email: userEmail || null,
                translationUsage: {
                    month,
                    count: nextCount,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                },
            }, { merge: true });

            return {
                isSubscribed,
                translationCount: nextCount,
                remainingTranslations: Math.max(0, MAX_FREE_TRANSLATIONS - nextCount),
            };
        });
    }

    async translate(req, res) {
        try {
            const body = req.body || {};
            const text = readString(body.text, 'text', MAX_TEXT_LENGTH);
            const language = readString(body.language, 'language', 10).toLowerCase();
            const sourceLanguage = readOptionalString(body.sourceLanguage || body.source, 'sourceLanguage', 10).toLowerCase() || 'auto';
            const context = readOptionalString(body.context, 'context', MAX_CONTEXT_LENGTH);
            const userId = req.user.uid;
            const isSubscribed = isSubscribedUser(req.user);

            if (!SUPPORTED_LANGUAGES.has(language)) {
                throw badRequest('Langue cible non prise en charge.');
            }
            if (sourceLanguage !== 'auto' && !SUPPORTED_LANGUAGES.has(sourceLanguage)) {
                throw badRequest('Langue source non prise en charge.');
            }

            const quota = await this.reserveTranslationQuota(userId, req.user.email, isSubscribed);
            const translatedText = await aiService.translateText(text, language, context);

            await admin.firestore()
                .collection('users')
                .doc(userId)
                .collection('translations')
                .add({
                    originalText: text,
                    translatedText,
                    sourceLanguage,
                    targetLanguage: language,
                    context,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                });

            return res.json({
                success: true,
                originalText: text,
                translatedText,
                language,
                context,
                isSubscribed: quota.isSubscribed,
                translationCount: quota.translationCount,
                remainingTranslations: quota.remainingTranslations,
            });
        } catch (error) {
            if (error.limitReached) {
                return res.status(403).json({
                    error: 'Limite atteinte',
                    message: 'Vous avez atteint la limite de 15 traductions gratuites.',
                    limitReached: true,
                    translationCount: error.translationCount,
                    remainingTranslations: 0,
                });
            }

            const status = error.status || 500;
            console.error('Erreur dans translateController:', error.message);
            return res.status(status).json({
                error: status >= 500 ? 'Erreur de traduction' : 'Requete invalide',
                message: status >= 500 ? 'La traduction est temporairement indisponible.' : error.message,
            });
        }
    }

    async chat(req, res) {
        try {
            const body = req.body || {};
            const message = readString(body.message, 'message', MAX_CHAT_LENGTH);
            const answer = await aiService.chatWithAI(message);

            return res.json({
                success: true,
                message,
                answer,
            });
        } catch (error) {
            const status = error.status || 500;
            console.error('Erreur dans chatController:', error.message);
            return res.status(status).json({
                error: status >= 500 ? 'Erreur de chat' : 'Requete invalide',
                message: status >= 500 ? "L'assistant IA est temporairement indisponible. Verifiez le quota ou la facturation Gemini." : error.message,
            });
        }
    }
}

module.exports = new TranslateController();
