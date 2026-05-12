import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ─── Auth state: update navbar on every page ────────────────────────────────
onAuthStateChanged(auth, (user) => {
    const navLogin = document.getElementById("navLogin");
    const navRegister = document.getElementById("navRegister");
    const navLoginIcon = document.getElementById("navLoginIcon");

    if (user) {
        // User is logged in — swap login/register links for a logout button
        if (navLogin) {
            navLogin.textContent = "Déconnexion";
            navLogin.href = "#";
            navLogin.addEventListener("click", (e) => {
                e.preventDefault();
                logout();
            });
        }
        if (navLoginIcon) {
            navLoginIcon.href = "#";
            navLoginIcon.addEventListener("click", (e) => {
                e.preventDefault();
                logout();
            });
        }
        if (navRegister) navRegister.style.display = "none";
    }
});

// ─── Register (used in register.html) ───────────────────────────────────────
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name     = document.getElementById("name").value.trim();
        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const btn      = document.getElementById("registerSubmit");

        btn.disabled = true;
        btn.textContent = "Inscription en cours...";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Save the display name on the Firebase profile
            await updateProfile(userCredential.user, { displayName: name });
            // Redirect to the translator after successful registration
            window.location.href = "index.html";
        } catch (error) {
            btn.disabled = false;
            btn.textContent = "S'inscrire";
            showError(error.code);
        }
    });
}

// ─── Login (used in login.html) ─────────────────────────────────────────────
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const btn      = document.getElementById("loginSubmit");

        btn.disabled = true;
        btn.textContent = "Connexion en cours...";

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "index.html";
        } catch (error) {
            btn.disabled = false;
            btn.textContent = "Se connecter";
            showError(error.code);
        }
    });
}

// ─── Logout ──────────────────────────────────────────────────────────────────
async function logout() {
    await signOut(auth);
    window.location.href = "login.html";
}

// ─── Redirect logged-in users away from login/register pages ────────────────
const isAuthPage = !!document.getElementById("loginPage") || !!document.getElementById("registerPage");
if (isAuthPage) {
    onAuthStateChanged(auth, (user) => {
        if (user) window.location.href = "index.html";
    });
}

// ─── Error messages in French ────────────────────────────────────────────────
function showError(code) {
    const messages = {
        "auth/email-already-in-use":   "Cette adresse e-mail est déjà utilisée.",
        "auth/invalid-email":          "Adresse e-mail invalide.",
        "auth/weak-password":          "Le mot de passe doit contenir au moins 6 caractères.",
        "auth/user-not-found":         "Aucun compte trouvé avec cet e-mail.",
        "auth/wrong-password":         "Mot de passe incorrect.",
        "auth/invalid-credential":     "E-mail ou mot de passe incorrect.",
        "auth/too-many-requests":      "Trop de tentatives. Réessayez plus tard.",
    };

    const message = messages[code] || "Une erreur est survenue. Veuillez réessayer.";

    // Remove any existing error message
    const existing = document.getElementById("authError");
    if (existing) existing.remove();

    const errorEl = document.createElement("p");
    errorEl.id = "authError";
    errorEl.style.cssText = "color: #e53e3e; margin-top: 0.75rem; font-size: 0.9rem;";
    errorEl.textContent = message;

    const form = document.getElementById("loginForm") || document.getElementById("registerForm");
    form.appendChild(errorEl);
}