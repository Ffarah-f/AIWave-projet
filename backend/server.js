const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const geminiKey = process.env.GEMINI_API_KEY;
if (!geminiKey) {
    console.error(' GEMINI_API_KEY introuvable dans .env');
} else {
    console.log(` GEMINI_API_KEY chargée : ${geminiKey.substring(0, 4)}...`);
}

// Import des routes
const translateRoutes = require('./routes/translateRoutes');

const app = express();
const port = 3000;
const frontendPath = path.join(__dirname, '../frontend');

// Middleware de base
app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));

// Routes API
app.use('/api', translateRoutes);

// Serve frontend entry point
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Route de test
app.get('/test', (req, res) => res.json({
    message: "Serveur structuré OK !",
    version: "1.0.0",
    endpoints: {
        translate: "POST /api/translate",
        chat: "POST /api/chat"
    }
}));

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
    console.error('Erreur globale:', err);
    res.status(500).json({
        error: 'Erreur serveur interne',
        message: err.message
    });
});

// Route 404 - DOIT être la dernière route
app.use((req, res) => {
    res.status(404).json({
        error: 'Route non trouvée',
        message: `La route ${req.originalUrl} n'existe pas`
    });
});

app.listen(port, () => {
    console.log(`\n🚀 SERVEUR MODULAIRE : http://localhost:${port}`);
    console.log(`📡 Routes disponibles :`);
    console.log(`   • POST /api/translate`);
    console.log(`   • POST /api/chat`);
    console.log(`   • GET /test (pour tester)`);
    console.log(`\n Structure MVC implémentée avec succès !\n`);
});