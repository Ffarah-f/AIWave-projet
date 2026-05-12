const aiService = require('../services/aiService');

class TranslateController {
    async translate(req, res) {
        try {
            const { text, language } = req.body;

            // Validation des données d'entrée
            if (!text || !language) {
                return res.status(400).json({
                    error: 'Paramètres manquants',
                    message: 'Les champs "text" et "language" sont requis'
                });
            }

            // Appel du service AI
            const translatedText = await aiService.translateText(text, language);

            res.json({
                success: true,
                originalText: text,
                translatedText: translatedText,
                language: language
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