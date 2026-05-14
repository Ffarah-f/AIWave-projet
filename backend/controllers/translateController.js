const aiService = require('../services/aiService');
const admin = require('firebase-admin');

class TranslateController {
    async translate(req, res) {
        try {
            const { text, language, context } = req.body;
            const userId = req.user.uid;

            // Validation des données d'entrée
            if (!text || !language) {
                return res.status(400).json({
                    error: 'Paramètres manquants',
                    message: 'Les champs "text" et "language" sont requis'
                });
            }

            // Check user subscription status and translation count
            const db = admin.firestore();
            const userDoc = await db.collection('users').doc(userId).get();
            const isSubscribed = userDoc.exists && userDoc.data().isSubscribed === true;

            let translationCount = 0;
            let remainingTranslations = 15;

            if (!isSubscribed) {
                const translationsSnapshot = await db
                    .collection('users')
                    .doc(userId)
                    .collection('translations')
                    .count()
                    .get();
                
                translationCount = translationsSnapshot.data().count;
                remainingTranslations = Math.max(0, 15 - translationCount);

                // Limit non-subscribed users to 15 translations
                if (translationCount >= 15) {
                    return res.status(403).json({
                        error: 'Limite atteinte',
                        message: 'Vous avez atteint la limite de 15 traductions gratuites.',
                        limitReached: true,
                        translationCount: translationCount,
                        remainingTranslations: 0
                    });
                }
            }

            // Appel du service AI
            const translatedText = await aiService.translateText(text, language, context);

            res.json({
                success: true,
                originalText: text,
                translatedText: translatedText,
                language: language,
                context: context || '',
                isSubscribed: isSubscribed,
                translationCount: translationCount + 1,
                remainingTranslations: remainingTranslations - 1
            });

        } catch (error) {
            console.error('Erreur dans translateController:', error);
            res.status(500).json({
                error: 'Erreur de traduction',
                message: error.message
            });
        }
    }

    async chat(req, res) {
        try {
            const { message } = req.body;

            // Validation des données d'entrée
            if (!message) {
                return res.status(400).json({
                    error: 'Paramètre manquant',
                    message: 'Le champ "message" est requis'
                });
            }

            // Appel du service AI
            const answer = await aiService.chatWithAI(message);

            res.json({
                success: true,
                message: message,
                answer: answer
            });

        } catch (error) {
            console.error('Erreur dans chatController:', error);
            res.status(500).json({
                error: 'Erreur de chat',
                message: error.message
            });
        }
    }
}

module.exports = new TranslateController();
