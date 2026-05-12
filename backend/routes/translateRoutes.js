const express = require("express");
const router = express.Router();
const translateController = require("../controllers/translateController");
const verifyToken = require("../middleware/authMiddleware");

// verifyToken runs before the controller on both routes
// If the token is missing or invalid, it returns 401 and the controller never runs
router.post("/translate", verifyToken, translateController.translate.bind(translateController));
router.post("/chat",      verifyToken, translateController.chat.bind(translateController));

module.exports = router;