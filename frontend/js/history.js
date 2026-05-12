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

// ─── Auth guard + load history ───────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    await loadHistory(user.uid);
});

// ─── Load and render translations from Firestore ─────────────────────────────
async function loadHistory(uid) {
    historyList.innerHTML = "<p>Chargement...</p>";

    try {
        const q = query(
            collection(db, "users", uid, "translations"),
            orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            historyList.innerHTML = "<p>Aucune traduction sauvegardée pour l'instant.</p>";
            return;
        }

        historyList.innerHTML = "";

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const item = createHistoryItem(docSnap.id, data, uid);
            historyList.appendChild(item);
        });

    } catch (error) {
        console.error("Erreur lors du chargement de l'historique :", error);
        historyList.innerHTML = "<p style='color:#e53e3e;'>Impossible de charger l'historique.</p>";
    }
}

// ─── Build a history item element ────────────────────────────────────────────
function createHistoryItem(docId, data, uid) {
    const sourceLang = data.sourceLanguage || "?";
    const targetLang = data.targetLanguage || "?";

    // Format the timestamp if it exists
    let dateStr = "";
    if (data.timestamp?.toDate) {
        dateStr = data.timestamp.toDate().toLocaleDateString("fr-FR", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    }

    const item = document.createElement("div");
    item.className = "history-item";
    item.dataset.id = docId;

    item.innerHTML = `
        <div class="history-header">
            <div class="lang-display">${sourceLang} → ${targetLang}</div>
            <div class="history-meta">
                <span class="history-date">${dateStr}</span>
                <button class="btn-delete" data-id="${docId}" title="Supprimer">✕</button>
            </div>
        </div>
        <div class="history-body">
            <p class="translated-text">
                "${data.originalText}" → "${data.translatedText}"
            </p>
        </div>
    `;

    // Delete button
    item.querySelector(".btn-delete").addEventListener("click", async () => {
        await deleteTranslation(uid, docId, item);
    });

    return item;
}

// ─── Delete a translation ─────────────────────────────────────────────────────
async function deleteTranslation(uid, docId, itemEl) {
    try {
        await deleteDoc(doc(db, "users", uid, "translations", docId));
        itemEl.remove();

        // Show empty state if no items left
        if (historyList.children.length === 0) {
            historyList.innerHTML = "<p>Aucune traduction sauvegardée pour l'instant.</p>";
        }
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
}