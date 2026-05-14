const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIService {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY manquante dans le fichier .env');
        }

        // Use v1beta — required for Gemini 2.x models
        this.genAI = new GoogleGenerativeAI(apiKey, { apiVersion: 'v1beta' });

        this.modelCandidates = [
            process.env.GEMINI_MODEL,
            'gemini-2.0-flash',
            'gemini-2.0-flash-lite',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
        ].filter(Boolean);

        this.currentModelIndex = 0;
        this.modelName = this.modelCandidates[this.currentModelIndex];
        // Fixed: getGenerativeModel only takes one argument (model config)
        this.model = this.genAI.getGenerativeModel({ model: this.modelName });
        console.log(` AI Service initialized with model: ${this.modelName}`);
    }

    _isModelError(error) {
        const message = error?.message?.toLowerCase() || '';
        return (
            message.includes('404') ||
            message.includes('not found') ||
            (message.includes('model') && message.includes('not supported'))
        );
    }

    _switchModel() {
        if (this.currentModelIndex + 1 >= this.modelCandidates.length) {
            return false;
        }
        this.currentModelIndex += 1;
        this.modelName = this.modelCandidates[this.currentModelIndex];
        // Fixed: same here — no second argument
        this.model = this.genAI.getGenerativeModel({ model: this.modelName });
        console.log(` Changement de modèle Gemini vers: ${this.modelName}`);
        return true;
    }

    _normalizeLanguage(language) {
        const languages = {
            ar: 'Arabic',
            de: 'German',
            en: 'English',
            es: 'Spanish',
            fr: 'French',
            it: 'Italian',
            ja: 'Japanese',
            ko: 'Korean',
            nl: 'Dutch',
            pt: 'Portuguese',
            ru: 'Russian',
            tr: 'Turkish',
            zh: 'Chinese',
        };

        const normalizedLanguage = String(language || '').trim();
        return languages[normalizedLanguage.toLowerCase()] || normalizedLanguage;
    }

    async _runPrompt(prompt) {
        let lastError = null;

        while (true) {
            try {
                console.log(`📡 Appel Gemini avec modèle ${this.modelName}`);
                const result = await this.model.generateContent(prompt);
                const response = await result.response;
                return response.text();
            } catch (error) {
                console.error(`❌ Erreur Gemini (${this.modelName}):`, error.message);
                lastError = error;
                if (this._isModelError(error) && this._switchModel()) {
                    continue;
                }
                break;
            }
        }

        throw lastError;
    }

    async translateText(text, language) {
        try {
            const targetLanguage = this._normalizeLanguage(language);
            const prompt = `You are an expert translator.
Translate the text below into ${targetLanguage}.
Return only the translated text, with no explanation.
If the context is ambiguous, use the most common/basic translation.

Text:
${text}`;
            return await this._runPrompt(prompt);
        } catch (error) {
            console.error('Erreur lors de la traduction:', error.message);
            return `[DEMO] Traduction en ${language}: "${text}" - Clé Gemini ou modèle non configuré correctement`;
        }
    }

    async chatWithAI(message) {
        try {
            const prompt = `You are LinguaSense's translation assistant.
Your scope is strictly limited to translation-related help, including:
- translating text
- explaining words, expressions, idioms, grammar, tone, register, or cultural context
- improving or comparing translations
- helping choose a source/target language or wording style

If the user's message is not related to translation, language, writing, grammar, or localization, politely refuse and briefly say you can only help with translation-related questions.

Answer in the same language as the user's message. If the user asks for a specific response language, use that language.
Keep the answer concise and useful.

User message:
${message}`;
            return await this._runPrompt(prompt);
        } catch (error) {
            console.error('Erreur lors du chat:', error.message);
            return `The translation assistant is currently unavailable. Please check the Gemini API key or model configuration.`;
        }
    }
}

module.exports = new AIService();
