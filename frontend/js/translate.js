import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
    serverTimestamp,
    getDoc,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const translateBtn = document.getElementById("translateBtn");
const textInput = document.getElementById("text-input");
const targetLang = document.getElementById("target-lang");
const sourceLang = document.getElementById("source-lang");
const contextInput = document.getElementById("context");
const outputDiv = document.getElementById("translationOutput");
const counterDiv = document.getElementById("translationCounter");
const counterValue = document.getElementById("counterValue");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chatMessages");
const chatBtn = document.getElementById("chatBtn");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    currentUser = user;
    initializeCounter();
});

async function initializeCounter() {
    try {
        if (!counterDiv || !counterValue) {
            return;
        }

        const userDocRef = doc(db, "users", currentUser.uid);
        let userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                uid: currentUser.uid,
                email: currentUser.email,
                isSubscribed: false,
                createdAt: serverTimestamp()
            });
            userDoc = await getDoc(userDocRef);
        }

        const userData = userDoc.data();
        if (userData && !userData.isSubscribed) {
            const usage = userData.translationUsage || {};
            const count = Number.isInteger(usage.count) ? usage.count : 0;
            counterValue.textContent = `${count}/15`;
            counterDiv.style.display = "block";
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation du compteur:", error);
    }
}

function setOutputMessage(message, className = "") {
    outputDiv.replaceChildren();
    const paragraph = document.createElement("p");
    if (className) {
        paragraph.className = className;
    }
    paragraph.textContent = message;
    outputDiv.appendChild(paragraph);
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

translateBtn.addEventListener("click", async () => {
    const text = textInput.value.trim();
    const language = targetLang.value;
    const source = sourceLang.value;
    const context = contextInput.value.trim();

    if (!text) {
        setOutputMessage("Veuillez saisir un texte a traduire.", "error-text");
        return;
    }
    if (!language) {
        setOutputMessage("Veuillez choisir une langue cible.", "error-text");
        return;
    }
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = "Traduction en cours...";
    setOutputMessage("Traduction en cours...", "placeholder-text");

    try {
        const token = await currentUser.getIdToken();
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ text, language, sourceLanguage: source, context })
        });

        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }

        if (response.status === 403) {
            const data = await response.json();
            if (data.limitReached) {
                window.location.href = "upgrade.html";
                return;
            }
        }

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || `Erreur serveur : ${response.status}`);
        }

        const data = await response.json();
        setOutputMessage(data.translatedText || "");

        if (data.translationCount !== null && data.translationCount !== undefined && counterValue) {
            counterValue.textContent = `${data.translationCount}/15`;
        }
    } catch (error) {
        console.error("Erreur de traduction:", error);
        setOutputMessage(`Erreur : ${error.message}`, "error-text");
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
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || `Erreur serveur : ${response.status}`);
        }

        const data = await response.json();
        loadingMessage.textContent = data.answer || "Aucune reponse recue.";
    } catch (error) {
        console.error("Erreur de chat:", error);
        loadingMessage.textContent = `Erreur : ${error.message}`;
        loadingMessage.classList.add("chat-message-error");
    } finally {
        chatBtn.disabled = false;
        chatBtn.textContent = "Envoyer";
        chatInput.focus();
    }
});
