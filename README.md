# AIWave-projet

### Description du projet

Le projet consiste à développer **LinguaSense**, une application web de traduction intelligente qui va au-delà des traducteurs classiques en proposant des traductions plus naturelles et adaptées au contexte.

L'idée centrale est de créer un outil simple à utiliser, accessible depuis un navigateur, mais suffisamment performant pour répondre à des besoins professionnels et grand public.

🎯 Ce que fait l'application

L'utilisateur peut :

* créer un compte ou se connecter
* saisir un texte
* choisir une langue source et une langue cible
* indiquer un contexte optionnel dans l'interface
* obtenir une traduction rapide via Gemini
* utiliser un assistant IA pour poser des questions liées à la traduction

Il peut ensuite :

* reprendre ou corriger manuellement la traduction selon ses besoins
* sauvegarder automatiquement ses traductions dans un historique personnel
* consulter et supprimer des éléments de son historique
* accéder à une page d'amélioration/premium

## Changements appliqués

Le README a été mis à jour pour refléter l'état actuel du projet :

* le backend est une application **Node.js / Express.js** qui sert aussi le frontend statique
* le frontend est construit avec **HTML, CSS et JavaScript modules**
* l'authentification utilise **Firebase Authentication**
* le backend vérifie les tokens avec **Firebase Admin SDK**
* les traductions et l'assistant IA utilisent **Gemini** via `@google/generative-ai`
* le champ `context` est maintenant envoyé au backend et utilisé dans le prompt Gemini
* les traductions sont sauvegardées dans **Firestore**
* les utilisateurs non abonnés sont limités à **15 traductions**
* la page `upgrade.html` sert de page premium / amélioration
* la configuration HTTPS présente dans `.env` n'active pas HTTPS directement, car `server.js` démarre actuellement un serveur HTTP sur le port `3000`

## 🚀 Installation et Configuration

### Prérequis

- Node.js 16 ou supérieur
- Un compte Google AI Studio pour obtenir une clé API Gemini
- Un projet Firebase configuré avec Authentication et Firestore
- Un compte de service Firebase pour le backend

### Étapes d'installation

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/username/AIWave-projet.git
   cd AIWave-projet
   ```

2. **Installer les dépendances du backend :**

   ```bash
   cd backend
   npm install
   ```

3. **Configuration des API :**

   a. **Clé API Gemini :**

   - Rendez-vous sur Google AI Studio
   - Créez une nouvelle clé API
   - Copiez la clé dans le fichier `backend/.env`

   b. **Configuration Firebase :**

   - Le frontend utilise la configuration Firebase présente dans `frontend/js/firebase.js`
   - Le backend utilise Firebase Admin pour vérifier les tokens et accéder à Firestore
   - Les identifiants Admin doivent être placés dans le fichier `backend/.env`

   c. **Fichier `.env` :**

   Dans `backend/.env`, ajoutez les variables nécessaires :

   ```env
   GEMINI_API_KEY=votre_vraie_cle_api_gemini
   GEMINI_MODEL=gemini-2.5-flash-lite

   FIREBASE_PROJECT_ID=votre_project_id
   FIREBASE_CLIENT_EMAIL=votre_client_email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

   Remarque : `FIREBASE_PRIVATE_KEY` doit garder les retours à la ligne sous forme de `\n`.

4. **Lancer l'application :**

   ```bash
   cd backend
   npm start
   ```

   Le serveur démarre sur :

   ```text
   http://localhost:3000
   ```

5. **Accéder à l'application :**

   - Ouvrez `http://localhost:3000` dans votre navigateur
   - Le backend sert le frontend et l'API depuis le même port

### Structure du projet

```text
AIWave-projet/
├── backend/                 # Serveur Express.js
│   ├── controllers/         # Logique métier des routes
│   ├── middleware/          # Vérification du token Firebase
│   ├── routes/              # Routes API
│   ├── services/            # Service Gemini AI
│   ├── package.json         # Scripts et dépendances backend
│   └── server.js            # Point d'entrée Express
├── frontend/                # Interface utilisateur
│   ├── assets/              # Images et logo
│   ├── css/                 # Styles
│   ├── js/                  # Scripts JavaScript et Firebase
│   ├── index.html           # Page principale de traduction
│   ├── login.html           # Connexion
│   ├── register.html        # Inscription
│   ├── history.html         # Historique
│   └── upgrade.html         # Page premium
└── README.md
```

### API Endpoints

- `POST /api/translate` - Traduction de texte avec Gemini, authentification requise
- `POST /api/chat` - Assistant IA lié à la traduction, authentification requise
- `GET /test` - Test du serveur

### Activer HTTPS sans changer le code

Le serveur Express actuel écoute en HTTP sur `http://localhost:3000`. Pour utiliser HTTPS sans modifier le code, il faut placer une couche HTTPS devant Node.js.

Options possibles :

* **Caddy** : recommandé pour un domaine réel, car il gère automatiquement les certificats HTTPS.
* **Nginx + Let's Encrypt** : solution classique en production.
* **Plateforme d'hébergement** : Render, Railway, Fly.io, Azure App Service, Google Cloud Run, etc. Ces plateformes fournissent souvent HTTPS automatiquement.
* **Tunnel temporaire** : `ngrok http 3000` ou Cloudflare Tunnel pour une démonstration locale.

Exemple avec Caddy :

```caddyfile
linguasense.example.com {
    reverse_proxy localhost:3000
}
```

Important : changer uniquement les variables HTTPS dans `.env` ne suffit pas, car `backend/server.js` démarre actuellement un serveur HTTP directement sur le port `3000`.

---

## 🤝 Contribution

Ce projet est réalisé dans le cadre d'un travail étudiant.  
Les contributeurs sont uniquement les membres de l'équipe projet.  
Merci de ne pas proposer de contributions externes pour le moment.

# Rapport V1

Utilisation de Copilot 365 pour les prompts.

### Brief Client

Nous souhaitons créer une application web capable de traduire automatiquement des textes en prenant en compte leur contexte afin d'obtenir des résultats plus naturels et adaptés à l'usage réel. L'objectif est d'aller au-delà d'une simple traduction mot à mot, en proposant une solution plus intelligente.

Les utilisateurs devront pouvoir saisir du texte, choisir une langue cible et obtenir une traduction rapidement. L'application devra être simple d'utilisation et accessible depuis un navigateur, sans nécessité d'installation.

Les choix techniques actuels sont HTML, CSS, JavaScript, Node.js, Firebase et Gemini.

### Questions proposées par l'IA

Voici une liste de questions pertinentes à poser au client pour mieux comprendre et cadrer le projet :

**Objectifs et vision**

* Quel est l'objectif principal de l'application ?
* Quel problème précis souhaitez-vous résoudre par rapport aux traducteurs existants ?
* Qu'entendez-vous exactement par traduction contextuelle ?

**Cibles utilisateurs**

* Qui sont les utilisateurs principaux ?
* Quels sont leurs besoins spécifiques ?
* Avez-vous des personas ou des cas d'usage types ?

**Fonctionnalités**

* Quels types de contenus doivent être pris en charge ?
* Faut-il gérer l'import/export de fichiers ?
* Souhaitez-vous une personnalisation du ton ou du contexte ?
* L'utilisateur doit-il pouvoir corriger ou améliorer la traduction ?

**Langues**

* Quelles langues doivent être disponibles au lancement ?
* Souhaitez-vous gérer des dialectes ou variantes régionales ?

**Expérience utilisateur**

* L'application nécessite-t-elle un compte utilisateur ?
* Faut-il garder un historique des traductions ?
* Y a-t-il des attentes spécifiques en design ou ergonomie ?

**Intelligence et performance**

* Le système doit-il apprendre des corrections des utilisateurs ?
* Y a-t-il des exigences de rapidité ?

**Contraintes techniques**

* Avez-vous des préférences technologiques ?
* L'application doit-elle être évolutive ?

**Périmètre et priorités**

* Quelles fonctionnalités sont indispensables pour une première version ?
* Quelles fonctionnalités peuvent être ajoutées plus tard ?

# Réponses client

### 🎯 Objectifs et vision

**Quel est l'objectif principal de l'application ?**  
→ Usage professionnel et grand public.

**Quel problème souhaitez-vous résoudre ?**  
→ Les traducteurs actuels produisent parfois des traductions trop littérales et pas assez naturelles.

**Que signifie traduction contextuelle ?**  
→ Adapter la traduction selon :

* le sens global du texte
* le ton
* le contexte d'utilisation

***

### 👤 Cibles utilisateurs

**Qui sont les utilisateurs principaux ?**  
→ Professionnels, étudiants et grand public.

**Quels sont leurs besoins ?**  
→ Traduire rapidement avec un résultat naturel et compréhensible.

***

### ⚙️ Fonctionnalités

**Types de contenus ?**  
→ Texte court, messages, documents courts et e-mails.

**Import/export de fichiers ?**  
→ Non pour la V1.

**Personnalisation ?**  
→ Oui, via un champ contexte dans l'interface.

**Correction par l'utilisateur ?**  
→ Oui, l'utilisateur peut reprendre manuellement le résultat affiché.

***

### 🌍 Langues

**Langues au lancement ?**  
→ Arabe, allemand, anglais, espagnol, français, italien, japonais, coréen, néerlandais, portugais, russe, turc et chinois.

**Variantes régionales ?**  
→ Pas nécessaire pour le MVP.

***

### 💻 Expérience utilisateur

**Compte obligatoire ?**  
→ Oui.

**Historique ?**  
→ Oui, les traductions sont enregistrées dans Firestore.

**Attentes design ?**  
→ Interface simple, moderne et intuitive.

***

### 🧠 Intelligence et performance

**Apprentissage des corrections ?**  
→ Pas pour le MVP.

**Exigences performance ?**  
→ Traduction rapide, idéalement en quelques secondes.

***

### 🧱 Contraintes techniques

**Préférences techniques ?**  
→ La version actuelle utilise HTML/CSS/JavaScript, Node.js, Firebase et Gemini.

**Évolutivité ?**  
→ Oui, avec des possibilités futures comme une API publique, des intégrations ou une version mobile.

***

### 🚀 Périmètre et priorités

**Fonctionnalités MVP ?**

* Saisie de texte
* Traduction avec IA
* Choix de langue
* Authentification
* Historique
* Résultat rapide
* Assistant IA lié à la traduction

**Fonctionnalités plus tard ?**

* Personnalisation avancée
* Import/export de fichiers
* Apprentissage basé sur les corrections
* Paiement réel
* Intégrations externes

## Brief client amélioré

Nous souhaitons créer une application web de traduction intelligente capable de produire des traductions plus naturelles et adaptées au contexte que les outils classiques.

L'objectif est de dépasser la simple traduction mot à mot en proposant une solution pertinente, utilisable aussi bien par des professionnels que par le grand public.

L'application devra être accessible directement depuis un navigateur, sans installation, avec une interface simple, moderne et intuitive.

Les utilisateurs devront pouvoir :

* créer un compte et se connecter
* saisir un texte
* choisir une langue source et une langue cible
* indiquer un contexte dans l'interface
* obtenir une traduction rapide générée via Gemini
* poser une question à un assistant IA spécialisé dans la traduction
* consulter et supprimer leur historique

La personnalisation du contexte est une fonctionnalité importante de la V1. Dans le code actuel, le champ contexte est transmis au backend et intégré au prompt envoyé à Gemini.

L'application inclut :

* un système de comptes utilisateurs
* un historique personnel des traductions
* une suppression possible des éléments de l'historique
* un contrôle d'accès par token Firebase
* une limite de 15 traductions pour les utilisateurs non abonnés
* une page `upgrade.html` présentant l'offre premium

Ne sont pas inclus dans cette version :

* import de fichiers
* paiement réel en ligne
* apprentissage automatique
* API publique
* application mobile
* intégrations externes

## Périmètre et Hors-Périmètre

### ✅ Périmètre du projet

Le projet consiste à développer une application web permettant :

* la saisie de texte
* la sélection de la langue source et cible
* la traduction via Gemini
* la prise en compte du contexte dans le prompt de traduction
* l'affichage rapide de la traduction
* une interface moderne, claire et intuitive
* un accès via navigateur
* l'historique des traductions
* le système de comptes utilisateurs
* le contrôle d'accès par token Firebase
* une page de présentation des offres premium
* un assistant IA limité aux questions liées à la traduction

L'intelligence repose sur :

* l'utilisation du modèle Gemini
* la construction des prompts
* la gestion des réponses par le backend

***

### ❌ Hors périmètre du projet

Pour garantir la faisabilité, les éléments suivants sont exclus :

* création ou entraînement d'un modèle d'IA personnalisé
* fine-tuning ou machine learning avancé
* mode hors ligne
* import de fichiers complexes
* paiement réel en ligne
* apprentissage automatique basé sur les corrections
* API publique
* application mobile
* intégrations tierces
* optimisation pour gros volumes

## Évolutions prévues

Plusieurs fonctionnalités pourront être ajoutées dans des versions ultérieures :

* import/export de fichiers
* édition complète de la traduction dans l'interface
* personnalisation avancée par domaine métier, profil ou ton
* apprentissage basé sur les corrections utilisateurs
* vrai système de paiement
* API publique
* application mobile
* ajout de langues et variantes régionales
* intégrations avec des services externes

--------------------------------------------------------------------------------------------------------------------------------------------

# 🧾 V1 – Application de traduction intelligente

## 🎯 Objectif

Développer une application web permettant de produire des traductions plus naturelles et adaptées au contexte que les outils classiques.

Cette première version vise à livrer un MVP fonctionnel, simple et efficace, afin de valider :

* la pertinence de la traduction assistée par IA
* l'usage réel de l'application
* le principe du modèle gratuit/premium

***

## ⚙️ Fonctionnalités principales

L'application permet :

* la saisie de texte
* la sélection de la langue source et cible
* la traduction via Gemini
* la présence d'un champ contexte dans l'interface
* l'utilisation du contexte dans le prompt envoyé au modèle
* l'affichage rapide de la traduction
* un assistant IA accessible depuis la page principale

***

## 👤 Gestion utilisateur

* inscription et connexion avec Firebase Authentication
* déconnexion
* vérification du token côté backend avec Firebase Admin
* accès à un historique des traductions

### Historique :

* texte source
* texte traduit
* langue source
* langue cible
* contexte
* date
* suppression possible d'une traduction enregistrée

***

## 💳 Modèle économique

* accès à l'application avec un modèle gratuit/premium
* système simple pour la V1
* gestion par champ `isSubscribed` dans Firestore
* limite actuelle de 15 traductions pour les utilisateurs non abonnés
* redirection vers `upgrade.html` lorsque la limite est atteinte

***

## 💻 Expérience utilisateur

* application web accessible depuis un navigateur
* interface simple, moderne et intuitive
* utilisation rapide et fluide
* pages principales :
  * traduction
  * connexion
  * inscription
  * historique
  * amélioration/premium

***

## 🧠 Fonctionnement

* utilisation d'un modèle d'IA externe : Gemini
* sélection du modèle via `GEMINI_MODEL`
* modèles de secours prévus dans `aiService.js`
* construction d'un prompt qui tient compte du texte, de la langue cible et du contexte
* assistant IA limité aux demandes liées à la traduction, la langue, la grammaire, le ton et la localisation

***

## ⚠️ Contraintes

* dépendance à Internet
* dépendance à Firebase et Gemini
* authentification obligatoire
* paiement réel non intégré dans la V1
* HTTPS non activé directement dans le code actuel

***

## 🚧 Hors périmètre (V1)

* modèle d'IA personnalisé
* fine-tuning ou machine learning avancé
* import de fichiers
* paiement réel en ligne
* apprentissage automatique
* API publique
* application mobile
* intégrations externes
* optimisation pour gros volumes

***

## 🚀 Évolutions futures

* import/export de fichiers
* édition avancée des traductions
* personnalisation par domaine métier ou ton
* apprentissage basé sur les corrections
* paiement réel pour les abonnements
* API publique
* application mobile
* ajout de langues et variantes
* intégrations externes

***

## ✅ Conclusion

LinguaSense est une application web de traduction intelligente avec IA Gemini, comptes utilisateurs, historique et page premium.

Objectif : valider rapidement un produit simple, utile et différenciant.

--------------------------------------------------------------------------------------------------------------------------------------------

# 👤 🎯 Cible

## 🎯 Utilisateurs principaux

* **Professionnels**
  * marketing
  * communication
  * support client
  * besoin : traductions rapides, naturelles et adaptées au ton

* **Grand public**
  * étudiants
  * utilisateurs occasionnels
  * besoin : outil simple et efficace

***

## ✅ Besoins clés

* traduire rapidement
* obtenir un résultat naturel
* adapter le contexte ou le ton
* conserver ses traductions
* disposer d'un assistant IA pour clarifier une traduction

***

# 🧭 Parcours utilisateur

## 🔹 Étapes principales

1. Arrivée sur le site
2. Inscription ou connexion
3. Accès à l'interface principale
4. Saisie du texte
5. Choix de la langue source, de la langue cible et du contexte optionnel
6. Clic sur **Traduire**
7. Affichage du résultat
8. Sauvegarde automatique dans l'historique
9. Consultation de l'historique
10. Suppression possible d'une traduction
11. Accès à la page premium si la limite gratuite est atteinte

***

## ✅ Résumé simple

**Connexion → Traduction → Résultat → Historique → Premium si nécessaire**

--------------------------------------------------------------------------------------------------------------------------------------------

# 🏗️ Architecture du projet

## 🔷 Vision globale

Architecture simple en 3 parties :

**Frontend → Backend → API IA + Base de données**

```text
Utilisateur
   ↓
Frontend (HTML, CSS, JavaScript)
   ↓
Backend (Node.js / Express)
   ↓        ↓
Gemini     Firebase
API IA     Auth + Firestore
```

***

# 💻 1. Frontend

## 🔧 Technologies

* HTML
* CSS
* JavaScript modules
* Firebase Web SDK

## ✅ Rôle

* interface utilisateur
* inscription, connexion et déconnexion
* interaction avec l'utilisateur
* envoi des requêtes au backend avec token Firebase
* affichage des traductions
* sauvegarde et lecture de l'historique dans Firestore

## 💡 Explication des choix

* **HTML/CSS/JS** : simple, rapide et adapté au MVP
* **Firebase Web SDK** : facilite l'authentification côté client et l'accès à Firestore

***

# ⚙️ 2. Backend

## 🔧 Technologies

* Node.js
* Express.js
* JavaScript
* Firebase Admin
* Fichier `.env`

## ✅ Rôle

* servir le frontend
* gérer les routes API
* vérifier l'authentification avec les tokens Firebase
* contrôler la limite gratuite de traductions
* lire le statut d'abonnement dans Firestore
* construire le prompt IA
* appeler l'API Gemini
* renvoyer la traduction ou la réponse IA au frontend

## 💡 Explication des choix

* **Node.js / Express.js** : rapide à mettre en place et cohérent avec le JavaScript frontend
* **Firebase Admin** : vérifie les utilisateurs côté serveur
* **.env** : stocke les clés API et identifiants sensibles

***

# 🧠 3. API IA (externe)

## 🔧 Technologies

* Gemini
* Package `@google/generative-ai`

## ✅ Rôle

* générer la traduction
* répondre aux questions de l'assistant IA
* prendre en compte le contexte fourni par l'utilisateur

## 💡 Explication des choix

* pas besoin de créer une IA personnalisée
* gain de temps important
* possibilité de changer de modèle avec `GEMINI_MODEL`

***

# 🗄️ 4. Base de données

## 🔧 Technologie

* Firebase Firestore
* Firebase Authentication

## ✅ Rôle

* stocker les utilisateurs
* stocker le statut d'abonnement
* stocker les traductions
* gérer l'historique personnel
* gérer les comptes via Firebase Authentication

## 💡 Explication des choix

* **Firestore** : simple à utiliser et adapté à un MVP
* **Firebase Authentication** : gestion rapide des comptes et tokens vérifiables par le backend

***

# ☁️ 5. Gestion du projet

## 🔧 Technologie

* GitHub

## ✅ Rôle

* stockage du code
* versioning
* collaboration

## 💡 Explication des choix

* standard du développement
* simple et efficace

***

# 🔄 Workflow technique

1. L'utilisateur saisit un texte dans le frontend
2. Le frontend vérifie que l'utilisateur est connecté
3. Le frontend récupère le token Firebase
4. Le frontend envoie la requête au backend
5. Le backend vérifie le token Firebase
6. Le backend contrôle la limite gratuite
7. Le backend construit le prompt avec le texte, la langue cible et le contexte
8. Le backend appelle Gemini
9. Gemini renvoie la traduction ou la réponse IA
10. Le backend renvoie la réponse au frontend
11. Le frontend affiche le résultat
12. Le frontend enregistre la traduction dans Firestore
13. L'utilisateur peut consulter ou supprimer l'élément depuis l'historique

***

# ✅ Résumé des technologies

| Partie | Technologie |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| API IA | Gemini |
| Package IA | `@google/generative-ai` |
| Base de données | Firebase Firestore |
| Authentification | Firebase Authentication / Firebase Admin |
| Sécurité | `.env`, tokens Firebase |
| Versioning | GitHub |

--------------------------------------------------------------------------------------------------------------------------------------------
