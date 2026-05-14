import { auth, db } from "./firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDoc,
    doc,
    getDocs,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const translateBtn  = document.getElementById("translateBtn");
const textInput     = document.getElementById("text-input");
const targetLang    = document.getElementById("target-lang");
const sourceLang    = document.getElementById("source-lang");
const contextInput  = document.getElementById("context");
const outputDiv     = document.getElementById("translationOutput");
const counterDiv    = document.getElementById("translationCounter");
const counterValue  = document.getElementById("counterValue");
const chatForm      = document.getElementById("chatForm");
const chatInput     = document.getElementById("chat-input");
const chatMessages  = document.getElementById("chatMessages");
const chatBtn       = document.getElementById("chatBtn");

console.log("🔧 DOM Elements loaded:");
console.log("  counterDiv:", counterDiv);
console.log("  counterValue:", counterValue);
console.log("  translateBtn:", translateBtn);

// ─── Auth guard ──────────────────────────────────────────────────────────────
let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        currentUser = user;
        initializeCounter();
    }
});

// ─── Initialize counter for free users ───────────────────────────────────────
async function initializeCounter() {
    try {
        if (!counterDiv || !counterValue) {
            console.error("❌ Counter elements not found in DOM");
            return;
        }

        console.log("🔍 Initializing counter for user:", currentUser.uid);

        // Get user document to check subscription status
        const userDocRef = doc(db, 'users', currentUser.uid);
        let userDoc = await getDoc(userDocRef);

        console.log("📄 User document exists:", userDoc.exists());

        // If user document doesn't exist, create it (for old users)
        if (!userDoc.exists()) {
            console.log("📝 Creating user document for existing user");
            await setDoc(userDocRef, {
                uid: currentUser.uid,
                email: currentUser.email,
                isSubscribed: false,
                createdAt: serverTimestamp()
            });
            userDoc = await getDoc(userDocRef);
        }

        const userData = userDoc.data();
        console.log("📄 User document data:", userData);

        if (userData && !userData.isSubscribed) {
            console.log("✅ User is NOT subscribed, showing counter");

            // Count translations for non-subscribed users
            const translationsRef = collection(db, 'users', currentUser.uid, 'translations');
            const translationsSnapshot = await getDocs(translationsRef);

            const count = translationsSnapshot.size;
            console.log("📊 Translation count:", count);

            if (counterValue && counterDiv) {
                counterValue.textContent = `${count}/15`;
                counterDiv.style.display = 'block';
                console.log("✅ Counter displayed:", counterValue.textContent);
            }
        } else {
            console.log("ℹ️ User is subscribed or not ready");
        }
    } catch (error) {
        console.error("❌ Erreur lors de l'initialisation du compteur:", error);
    }
}

function addChatMessage(message, sender) {
    const placeholder = chatMessages.querySelector(".chat-placeholder");
    if (placeholder) {
        placeholder.remove();
    }

    const messageElement = document.createElement("div");
    messageElement.className = `chat-message chat-message-${sender}`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ─── Translate button ────────────────────────────────────────────────────────
translateBtn.addEventListener("click", async () => {
    const text     = textInput.value.trim();
    const language = targetLang.value;
    const source   = sourceLang.value;
    const context  = contextInput.value.trim();

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
            body: JSON.stringify({ text, language, context })
        });

        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }

        // Check if translation limit reached (403 - Forbidden)
        if (response.status === 403) {
            const data = await response.json();
            if (data.limitReached) {
                window.location.href = "upgrade.html";
                return;
            }
        }

        if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);

        const data = await response.json();
        const translatedText = data.translatedText;

        outputDiv.innerHTML = `<p>${translatedText}</p>`;

        // Update counter if response includes count info
        if (data.remainingTranslations !== undefined) {
            const currentCount = data.translationCount;
            counterValue.textContent = `${currentCount}/15`;
        }

        // Save to Firestore
        await addDoc(collection(db, "users", currentUser.uid, "translations"), {
            originalText:   text,
            translatedText: translatedText,
            sourceLanguage: source,
            targetLanguage: language,
            context:        context,
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

chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    addChatMessage(message, "user");
    chatInput.value = "";
    chatBtn.disabled = true;
    chatBtn.textContent = "Envoi...";
    addChatMessage("L'assistant reflechit...", "assistant");

    const loadingMessage = chatMessages.lastElementChild;

    try {
        const token = await currentUser.getIdToken();

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ message })
        });

        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);

        const data = await response.json();
        loadingMessage.textContent = data.answer || "Aucune reponse recue.";
    } catch (error) {
        console.error("Erreur de chat :", error);
        loadingMessage.textContent = `Erreur : ${error.message}`;
        loadingMessage.classList.add("chat-message-error");
    } finally {
        chatBtn.disabled = false;
        chatBtn.textContent = "Envoyer";
        chatInput.focus();
    }
});
