const admin = require("firebase-admin");

// Initialize Firebase Admin SDK once (safe to call multiple times — Admin SDK handles it)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId:    process.env.FIREBASE_PROJECT_ID,
            clientEmail:  process.env.FIREBASE_CLIENT_EMAIL,
            // The private key comes from .env as a single-line string with \n escapes
            privateKey:   process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // Expect: "Authorization: Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Non autorisé",
            message: "Token d'authentification manquant."
        });
    }

    const token = authHeader.split("Bearer ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        // Attach the decoded user info to the request so controllers can use it
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Erreur de vérification du token :", error.message);
        return res.status(401).json({
            error: "Non autorisé",
            message: "Token invalide ou expiré."
        });
    }
}

module.exports = verifyToken;