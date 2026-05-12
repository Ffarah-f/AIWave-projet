import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATbYvWCz5lgpdscbbyYNjJlY3LhEiHR30",
  authDomain: "linguasense-726ba.firebaseapp.com",
  projectId: "linguasense-726ba",
  storageBucket: "linguasense-726ba.firebasestorage.app",
  messagingSenderId: "371814805702",
  appId: "1:371814805702:web:92e1ed52c9cb5ed1a027c7",
  measurementId: "G-Z4511GNKD0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);