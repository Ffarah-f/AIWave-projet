const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const https = require('https');
const path = require('path');
require('dotenv').config();

if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY introuvable dans .env');
}

const translateRoutes = require('./routes/translateRoutes');

const app = express();
const port = Number(process.env.PORT || 3000);
const httpRedirectPort = Number(process.env.HTTP_REDIRECT_PORT || 0);
const frontendPath = path.join(__dirname, '../frontend');
const useLocalHttps = process.env.LOCAL_HTTPS === 'true';
const protocol = useLocalHttps ? 'https' : 'http';
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,https://localhost:3000,https://localhost:3443')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

function loadHttpsOptions() {
    const pfxPath = process.env.HTTPS_PFX_PATH || 'certs/local-dev.pfx';
    const resolvedPfxPath = path.resolve(__dirname, pfxPath);

    return {
        pfx: fs.readFileSync(resolvedPfxPath),
        passphrase: process.env.HTTPS_PFX_PASSPHRASE,
    };
}

app.disable('x-powered-by');
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    hsts: false,
}));
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origine CORS non autorisee'));
    },
}));
app.use(express.json({ limit: '32kb' }));
app.use(express.static(frontendPath));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Trop de requetes',
        message: 'Veuillez patienter avant de reessayer.',
    },
});

app.use('/api', apiLimiter, translateRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/test', (req, res) => res.json({
    message: 'Serveur structure OK !',
    version: '1.0.0',
    endpoints: {
        translate: 'POST /api/translate',
        chat: 'POST /api/chat',
    },
}));

app.use((err, req, res, next) => {
    console.error('Erreur globale:', err);
    res.status(500).json({
        error: 'Erreur serveur interne',
        message: 'Une erreur interne est survenue.',
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Route non trouvee',
        message: "La route demandee n'existe pas.",
    });
});

const server = useLocalHttps
    ? https.createServer(loadHttpsOptions(), app)
    : app;

server.listen(port, () => {
    console.log(`Serveur LinguaSense: ${protocol}://localhost:${port}`);
    console.log('Routes disponibles: POST /api/translate, POST /api/chat, GET /test');
});

if (useLocalHttps && httpRedirectPort && httpRedirectPort !== port) {
    express()
        .use((req, res) => {
            const hostWithoutPort = (req.headers.host || `localhost:${httpRedirectPort}`).split(':')[0];
            res.redirect(301, `https://${hostWithoutPort}:${port}${req.originalUrl}`);
        })
        .listen(httpRedirectPort, () => {
            console.log(`Redirection HTTP: http://localhost:${httpRedirectPort} -> https://localhost:${port}`);
        });
}
