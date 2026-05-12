import { auth, db } from "./firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const translateBtn  = document.getElementById("translateBtn");
const textInput     = document.getElementById("text-input");
const targetLang    = document.getElementById("target-lang");
const sourceLang    = document.getElementById("source-lang");
const outputDiv     = document.getElementById("translationOutput");

// ─── Auth guard ──────────────────────────────────────────────────────────────
let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        currentUser = user;
    }
});

// ─── Translate button ────────────────────────────────────────────────────────
translateBtn.addEventListener("click", async () => {
    const text     = textInput.value.trim();
    const language = targetLang.value;
    const source   = sourceLang.value;

    if (!text) {
        outputDiv.innerHTML = "<p style='color:#e53e3e;'>Veuillez saisir un texte à traduire.</p>";
        return;
    }
    if (!language) {
        outputDiv.innerHTML = "<p style='color:#e53e3e;'>Veuillez choisir une langue cible.</p>";
        return;
    }
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = "Traduction en cours...";
    outputDiv.innerHTML = "<p class='placeholder-text'>Traduction en cours...</p>";

    try {
        // Get a fresh token — Firebase refreshes it automatically when near expiry
        const token = await currentUser.getIdToken();

        const response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": `Bearer ${token}`   // ← sent to backend for verification
            },
            body: JSON.stringify({ text, language })
        });

        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);

        const data = await response.json();
        const translatedText = data.translatedText;

        outputDiv.innerHTML = `<p>${translatedText}</p>`;

        // Save to Firestore
        await addDoc(collection(db, "users", currentUser.uid, "translations"), {
            originalText:   text,
            translatedText: translatedText,
            sourceLanguage: source,
            targetLanguage: language,
            timestamp:      serverTimestamp()
        });

    } catch (error) {
        console.error("Erreur de traduction :", error);
        outputDiv.innerHTML = `<p style='color:#e53e3e;'>Erreur : ${error.message}</p>`;
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = "Traduire";
    }
});