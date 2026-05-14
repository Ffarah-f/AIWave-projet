import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const historyList = document.getElementById("historyList");

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    await loadHistory(user.uid);
});

function showListMessage(message, className = "") {
    historyList.replaceChildren();
    const paragraph = document.createElement("p");
    if (className) {
        paragraph.className = className;
    }
    paragraph.textContent = message;
    historyList.appendChild(paragraph);
}

async function loadHistory(uid) {
    showListMessage("Chargement...");

    try {
        const q = query(
            collection(db, "users", uid, "translations"),
            orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            showListMessage("Aucune traduction sauvegardee pour l'instant.");
            return;
        }

        historyList.replaceChildren();
        snapshot.forEach((docSnap) => {
            const item = createHistoryItem(docSnap.id, docSnap.data(), uid);
            historyList.appendChild(item);
        });
    } catch (error) {
        console.error("Erreur lors du chargement de l'historique:", error);
        showListMessage("Impossible de charger l'historique.", "error-text");
    }
}

function createHistoryItem(docId, data, uid) {
    const sourceLang = data.sourceLanguage || "?";
    const targetLang = data.targetLanguage || "?";

    let dateStr = "";
    if (data.timestamp?.toDate) {
        dateStr = data.timestamp.toDate().toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    const item = document.createElement("div");
    item.className = "history-item";
    item.dataset.id = docId;

    const header = document.createElement("div");
    header.className = "history-header";

    const langDisplay = document.createElement("div");
    langDisplay.className = "lang-display";
    langDisplay.textContent = `${sourceLang} -> ${targetLang}`;

    const meta = document.createElement("div");
    meta.className = "history-meta";

    const date = document.createElement("span");
    date.className = "history-date";
    date.textContent = dateStr;

    const button = document.createElement("button");
    button.className = "btn-delete";
    button.dataset.id = docId;
    button.title = "Supprimer";
    button.type = "button";
    button.textContent = "x";
    button.addEventListener("click", async () => {
        await deleteTranslation(uid, docId, item);
    });

    meta.append(date, button);
    header.append(langDisplay, meta);

    const body = document.createElement("div");
    body.className = "history-body";

    const translatedText = document.createElement("p");
    translatedText.className = "translated-text";
    translatedText.textContent = `"${data.originalText || ""}" -> "${data.translatedText || ""}"`;

    body.appendChild(translatedText);
    item.append(header, body);

    return item;
}

async function deleteTranslation(uid, docId, itemEl) {
    try {
        await deleteDoc(doc(db, "users", uid, "translations", docId));
        itemEl.remove();

        if (historyList.children.length === 0) {
            showListMessage("Aucune traduction sauvegardee pour l'instant.");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
    }
}
