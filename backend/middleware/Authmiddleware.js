const admin = require('firebase-admin');

const requiredFirebaseConfig = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
];

const missingFirebaseConfig = requiredFirebaseConfig.filter((key) => !process.env[key]);
if (missingFirebaseConfig.length > 0) {
    throw new Error(`Configuration Firebase manquante: ${missingFirebaseConfig.join(', ')}`);
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    });
}

async function verifyToken(req, res, next) {
    const authHeader = req.get('authorization') || '';
    const match = authHeader.match(/^Bearer\s+(.+)$/i);

    if (!match) {
        return res.status(401).json({
            error: 'Non autorise',
            message: "Token d'authentification manquant.",
        });
    }

    try {
        const decoded = await admin.auth().verifyIdToken(match[1], true);
        req.user = decoded;
        return next();
    } catch (error) {
        console.error('Erreur de verification du token:', error.message);
        return res.status(401).json({
            error: 'Non autorise',
            message: 'Token invalide ou expire.',
        });
    }
}

module.exports = verifyToken;
