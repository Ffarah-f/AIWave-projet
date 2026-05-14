# AIWave-projet

### Description du projet

Le projet consiste à développer **LinguaSense**, une application web de traduction intelligente qui va au-delà des traducteurs classiques en proposant des traductions plus naturelles et adaptées au contexte.

L'idée centrale est de créer un outil simple à utiliser, accessible à tous, mais suffisamment performant pour répondre à des besoins professionnels.

🎯 Ce que fait l'application

L'utilisateur peut :

*   créer un compte ou se connecter
*   saisir un texte
*   choisir une langue source et une langue cible
*   indiquer un contexte dans l'interface
*   obtenir une traduction rapide via Gemini
*   utiliser un assistant IA pour poser des questions liées à la traduction

Il peut ensuite :

*   reprendre ou corriger manuellement la traduction selon ses besoins
*   sauvegarder automatiquement ses traductions dans un historique personnel
*   consulter et supprimer des éléments de son historique
*   accéder à une page d'amélioration/premium

## 🚀 Installation et Configuration

### Prérequis
- Node.js (version 16 ou supérieure)
- Un compte Google AI Studio pour la clé API Gemini
- Un projet Firebase configuré avec Authentication et Firestore

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
   - Rendez-vous sur [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Créez une nouvelle clé API
   - Copiez la clé

   b. **Configuration Firebase :**
   - Le frontend utilise la configuration Firebase présente dans `frontend/js/firebase.js`
   - Le backend utilise Firebase Admin pour vérifier les tokens et accéder à Firestore
   - Les identifiants Admin doivent être placés dans le fichier `backend/.env`

   c. **Fichier .env :**
   Dans `backend/.env`, ajoutez les variables nécessaires :
   ```env
   GEMINI_API_KEY=votre_vraie_cle_api_gemini
   GEMINI_MODEL=gemini-2.0-flash

   FIREBASE_PROJECT_ID=votre_project_id
   FIREBASE_CLIENT_EMAIL=votre_client_email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

4. **Lancer l'application :**
   ```bash
   # Depuis le dossier backend
   npm start
   ```

   Le serveur démarre sur `http://localhost:3000`

5. **Accéder à l'application :**
   - Ouvrez `http://localhost:3000` dans votre navigateur
   - Le backend sert le frontend et l'API depuis le même port

### Structure du projet
```
AIWave-projet/
├── backend/                 # Serveur Express.js
│   ├── controllers/         # Logique métier
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
- `POST /api/translate` - Traduction de texte avec Gemini (authentification requise)
- `POST /api/chat` - Assistant IA lié au projet (authentification requise)
- `GET /test` - Test du serveur

---

## 🤝 Contribution

Ce projet est réalisé dans le cadre d'un travail étudiant.  
Les contributeurs sont uniquement les membres de l'équipe projet (camarades de classe).  
Merci de ne pas proposer de contributions externes pour le moment.


# Rapport V1

Utilisation de Copilot 365 pour les prompts.

### Brief Client

Nous souhaitons créer une application web capable de traduire automatiquement des textes en prenant en compte leur contexte afin d'obtenir des résultats plus naturels et adaptés à l'usage réel. L'objectif est d'aller au-delà d'une simple traduction mot à mot, en proposant une solution plus "intelligente".

Les utilisateurs devront pouvoir saisir du texte, choisir une langue cible et obtenir une traduction rapidement. Il serait intéressant que l'outil puisse s'adapter à différents types de contenus, mais cela reste à préciser.

L'application devra être simple d'utilisation et accessible depuis un navigateur, sans nécessité d'installation. Les langues prioritaires pour la V1 sont les langues déjà proposées dans l'interface.

À terme, nous aimerions que l'outil puisse s'intégrer dans d'autres environnements ou proposer des fonctionnalités avancées, mais pour l'instant nous souhaitons surtout valider une première version fonctionnelle. Les choix techniques actuels sont HTML/CSS/JavaScript, Node.js, Firebase et Gemini.

### Questions proposées par l'IA

Voici une liste de questions pertinentes à poser au client pour mieux comprendre et cadrer le projet :

**Objectifs et vision**

*   Quel est l'objectif principal de l'application (usage professionnel, éducatif, personnel...) ?
*   Quel problème précis souhaitez-vous résoudre par rapport aux traducteurs existants ?
*   Qu'entendez-vous exactement par "traduction contextuelle" dans votre besoin ?

**Cibles utilisateurs**

*   Qui sont les utilisateurs principaux (étudiants, entreprises, traducteurs, grand public...) ?
*   Quels sont leurs besoins spécifiques et leurs usages fréquents ?
*   Avez-vous des personas ou des cas d'usage types ?

**Fonctionnalités**

*   Quels types de contenus doivent être pris en charge (phrases courtes, documents, e-mails, etc.) ?
*   Faut-il gérer l'import/export de fichiers ? Si oui, quels formats ?
*   Souhaitez-vous une possibilité de personnalisation (ton, registre, domaine métier) ?
*   L'utilisateur doit-il pouvoir corriger ou améliorer la traduction ?

**Langues**

*   Quelles langues doivent être disponibles au lancement ?
*   Souhaitez-vous gérer des dialectes ou variantes régionales ?

**Expérience utilisateur**

*   L'application nécessite-t-elle un compte utilisateur ou doit-elle être accessible librement ?
*   Faut-il garder un historique des traductions ?
*   Y a-t-il des attentes spécifiques en termes de design ou d'ergonomie ?

**Intelligence et performance**

*   Le système doit-il apprendre des corrections des utilisateurs ?
*   Y a-t-il des exigences en termes de rapidité ou de volume de traitement ?

**Contraintes techniques**

*   Avez-vous des préférences technologiques (framework, langage, hébergement...) ?
*   L'application doit-elle être évolutive (API, intégrations futures, mobile...) ?

**Périmètre et priorités**

*   Quelles fonctionnalités sont indispensables pour une première version (MVP) ?
*   Quelles sont celles qui peuvent être ajoutées plus tard ?
*   Avez-vous des contraintes de délai ou de budget ?

Ces questions permettent de lever les ambiguïtés du brief initial et de définir un cadre clair pour la suite du projet.

# Réponses client

### 🎯 Objectifs et vision

**Quel est l'objectif principal de l'application ?**  
→ Usage **professionnel et grand public**

**Quel problème souhaitez-vous résoudre ?**  
→ Les traducteurs actuels font des traductions trop littérales, pas assez naturelles.

**Que signifie "traduction contextuelle" ?**  
→ Adapter la traduction selon :

*   le sens global du texte
*   le ton
*   le contexte d'utilisation

***

### 👤 Cibles utilisateurs

**Qui sont les utilisateurs principaux ?**  
→ Professionnels (marketing, support...) + grand public

**Quels sont leurs besoins ?**  
→ Traduire rapidement avec un résultat naturel et compréhensible

**Avez-vous des personas ?**  
→ Non, pas encore définis

***

### ⚙️ Fonctionnalités

**Types de contenus ?**  
→ Texte court, documents et e-mails

**Import/export de fichiers ?**  
→ Non pour la V1.  
Formats souhaités plus tard : PDF, Word, texte simple.

**Personnalisation ?**  
→ Oui, idéalement permettre aux utilisateurs de choisir un contexte ou un ton.

**Correction par l'utilisateur ?**  
→ Oui, c'est un besoin prévu. Dans l'état actuel, l'utilisateur peut reprendre le résultat affiché, mais l'édition intégrée de la traduction n'est pas encore une fonctionnalité complète.

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
→ Oui, de préférence.

**Attentes design ?**  
→ Interface simple, moderne et intuitive.

***

### 🧠 Intelligence et performance

**Apprentissage des corrections ?**  
→ Pas pour le MVP, mais intéressant plus tard.

**Exigences performance ?**  
→ Traduction rapide, en quelques secondes si possible.

***

### 🧱 Contraintes techniques

**Préférences techniques ?**  
→ Aucune au départ. La version actuelle utilise HTML/CSS/JavaScript, Node.js, Firebase et Gemini.

**Évolutivité ?**  
→ Oui, possibilités futures :

*   API
*   intégrations
*   version mobile

***

### 🚀 Périmètre et priorités

**Fonctionnalités MVP ?**  
→

*   Saisie de texte
*   Traduction avec IA
*   Choix de langue
*   Authentification
*   Historique
*   Résultat rapide

**Fonctionnalités plus tard ?**  
→

*   Personnalisation avancée
*   Import/export de fichiers
*   Apprentissage basé sur les corrections
*   Intégrations externes

**Contraintes délai/budget ?**  
→ Non précisées pour le moment.

## Brief client amélioré

Nous souhaitons créer une application web de traduction intelligente capable de produire des traductions plus naturelles et adaptées au contexte que les outils classiques.

L'objectif est de dépasser la simple traduction mot à mot en proposant une solution plus pertinente, utilisable aussi bien par des professionnels que par le grand public.

L'application devra être accessible directement depuis un navigateur, sans installation, avec une interface simple, moderne et intuitive.
Les utilisateurs devront pouvoir :

*   créer un compte et se connecter
*   saisir un texte
*   choisir une langue source et une langue cible
*   indiquer un contexte dans l'interface
*   obtenir une traduction rapide générée via une API d'intelligence artificielle
*   poser une question à un assistant IA

👉 La personnalisation du contexte est une fonctionnalité importante de la V1. Dans l'interface actuelle, un champ de contexte existe. L'objectif est de l'utiliser pour améliorer la qualité et la pertinence des traductions.
L'utilisateur pourra reprendre ou corriger la traduction pour l'adapter à ses besoins. L'édition intégrée dans l'interface reste une amélioration à finaliser.

L'application inclut :

*   un système de comptes utilisateurs (inscription / connexion)
*   un historique personnel des traductions :
    *   texte source
    *   texte traduit
    *   langues
    *   date
*   une suppression possible des éléments de l'historique

Un système d'abonnement simple est prévu pour accéder au service. Dans la version actuelle, il est représenté par :

*   un champ `isSubscribed` dans Firestore
*   une limite de 15 traductions gratuites pour les utilisateurs non abonnés
*   une page `upgrade.html` présentant les offres

Le fonctionnement intelligent repose sur :

*   l'utilisation d'un modèle d'IA externe : Gemini
*   la construction des prompts envoyés au modèle

Le projet est contraint par une durée de réalisation de 1 semaine, impliquant un MVP fonctionnel.

Ne sont pas inclus dans cette version :

*   import de fichiers
*   paiement réel en ligne
*   apprentissage automatique
*   personnalisation avancée
*   API publique
*   application mobile
*   intégrations externes

L'objectif est de valider :

*   la pertinence de la traduction via IA
*   l'usage réel de l'application
*   le principe d'un modèle d'abonnement


## Périmètre et Hors-Périmètre

### ✅ Périmètre du projet

Le projet consiste à développer une application web permettant :

*   La **saisie de texte** dans une interface simple
*   La **sélection de la langue source et cible**
*   La **traduction via un modèle d'IA** (Gemini)
*   La **prise en compte future du contexte via des instructions envoyées au modèle**
*   L'**affichage rapide de la traduction**
*   La **correction manuelle du texte traduit** comme besoin fonctionnel à finaliser dans l'interface
*   Une **interface moderne, claire et intuitive**
*   Un accès via navigateur (application en ligne nécessitant Internet)
*   L'historique des traductions
*   Le système de comptes utilisateurs
*   Le contrôle d'accès par token Firebase
*   Une page de présentation des offres premium


👉 L'"intelligence" repose sur :

*   l'utilisation du modèle IA
*   la façon dont on construit la requête (prompt) pour améliorer la traduction

***

### ❌ Hors périmètre du projet (simplification pour étudiants)

Pour garantir la faisabilité, les éléments suivants sont exclus :

*   Création ou entraînement d'un **modèle d'IA personnalisé**
*   Fine-tuning ou machine learning avancé
*   Mode hors ligne
*   Import de fichiers complexes (PDF, Word)
*   Paiement réel en ligne
*   Apprentissage automatique basé sur les corrections
*   Gestion avancée du contexte (analyse linguistique complexe)
*   API publique
*   Application mobile
*   Intégrations tierces
*   Optimisation haute performance ou gros volumes

## Évolutions prévues

Plusieurs fonctionnalités pourront être ajoutées dans des versions ultérieures afin d'enrichir l'application :

*   Intégration de l'import/export de fichiers (PDF, Word, etc.)
*   Mise en place d'un apprentissage basé sur les corrections utilisateurs
*   Gestion plus fine du contexte linguistique (analyse plus avancée du texte)
*   Personnalisation avancée (profil, domaine métier, ton, préférences)
*   Intégration du champ contexte dans le prompt de traduction
*   Ajout d'un vrai système de paiement
*   Développement d'une API publique pour permettre l'intégration avec d'autres outils
*   Création d'une application mobile
*   Ajout de nouvelles langues et variantes régionales
*   Intégration avec des services externes (CMS, outils marketing, etc.)

--------------------------------------------------------------------------------------------------------------------------------------------

# 🧾 V1 – Application de traduction intelligente

## 🎯 Objectif

Développer une application web permettant de produire des **traductions plus naturelles et adaptées au contexte** que les outils classiques.

Cette première version (V1) vise à livrer un **MVP fonctionnel en 1 semaine**, simple, rapide et efficace, afin de valider :

*   la pertinence de la traduction assistée par IA
*   l'usage réel de l'application
*   le principe du modèle d'abonnement

***

## ⚙️ Fonctionnalités principales

L'application permet :

*   La **saisie de texte**
*   La **sélection de la langue source et cible**
*   La **traduction via une API d'intelligence artificielle externe**
*   La **présence d'un champ contexte dans l'interface**

👉 Cette personnalisation est une **fonctionnalité clé prévue pour la V1**. Dans le code actuel, la traduction envoyée au backend utilise surtout le texte et la langue cible.

*   L'**affichage rapide de la traduction**
*   La **correction manuelle du texte traduit** comme besoin fonctionnel à finaliser
*   Un **assistant IA** accessible depuis la page principale

***

## 👤 Gestion utilisateur

*   Inscription et connexion avec Firebase Authentication
*   Déconnexion
*   Vérification du token côté backend avec Firebase Admin
*   Accès à un **historique des traductions**

### Historique :

*   texte source
*   texte traduit
*   langue source
*   langue cible
*   date
*   suppression possible d'une traduction enregistrée

***

## 💳 Modèle économique

*   Accès à l'application avec un modèle gratuit/premium
*   Système simple pour la V1
*   Gestion par champ `isSubscribed` dans Firestore
*   Limite actuelle :
    *   15 traductions gratuites pour les utilisateurs non abonnés
    *   redirection vers `upgrade.html` lorsque la limite est atteinte

***

## 💻 Expérience utilisateur

*   Application **100% web (navigateur)**
*   Interface **simple, moderne et intuitive**
*   Utilisation rapide et fluide
*   Pages principales :
    *   traduction
    *   connexion
    *   inscription
    *   historique
    *   amélioration/premium

***

## 🧠 Fonctionnement

*   Utilisation d'un **modèle d'IA externe** : Gemini
*   L'intelligence repose sur :
    *   le modèle choisi
    *   la construction des prompts
    *   la gestion des réponses par le backend

👉 Le backend sélectionne Gemini via `GEMINI_MODEL` si la variable existe, puis utilise des modèles de secours si nécessaire.

***

## ⚠️ Contraintes

*   ⏱️ Durée : **1 semaine (MVP)**
*   💻 Choix de l'API limité
*   🌐 Dépendance à Internet
*   🔐 Authentification simple
*   Paiement réel non intégré dans la V1

***

## 🚧 Hors périmètre (V1)

*   Modèle d'IA personnalisé
*   Fine-tuning / machine learning avancé
*   Import de fichiers (PDF, Word...)
*   Paiement réel en ligne
*   Apprentissage automatique
*   Personnalisation avancée
*   API publique
*   Application mobile
*   Intégrations externes
*   Optimisation pour gros volumes

***

## 🚀 Évolutions futures

*   Import/export de fichiers
*   Utilisation complète du champ contexte dans les prompts
*   Personnalisation avancée (domaine métier, profils, ton...)
*   Apprentissage basé sur les corrections
*   Paiement réel pour les abonnements
*   API publique
*   Application mobile
*   Ajout de langues et variantes
*   Intégrations externes (CMS, outils...)

***

## ✅ Conclusion

👉 Une application web de traduction intelligente  
👉 Avec IA Gemini, comptes utilisateurs, historique et page premium  
👉 Réalisée en 1 semaine (MVP)

👉 Objectif : **valider rapidement un produit utile, simple et différenciant**

--------------------------------------------------------------------------------------------------------------------------------------------
# 👤 🎯 Cible

## 🎯 Utilisateurs principaux

*   **Professionnels**
    *   marketing
    *   communication
    *   support client  
        👉 Besoin : traductions rapides, naturelles et adaptées au ton

*   **Grand public**
    *   étudiants
    *   utilisateurs occasionnels  
        👉 Besoin : outil simple et efficace

***

## ✅ Besoins clés

*   Traduire rapidement
*   Obtenir un résultat **naturel (pas mot à mot)**
*   Adapter le **contexte ou le ton**
*   Conserver ses traductions
*   Disposer d'un assistant IA pour clarifier une traduction

***

# 🧭 Parcours utilisateur

## 🔹 Étapes principales

1.  Arrivée sur le site
2.  Inscription ou connexion
3.  Accès à l'interface principale
4.  Saisie du texte
5.  Choix :
    *   langue source
    *   langue cible
    *   contexte optionnel
6.  Clique sur **"Traduire"**
7.  Affichage du résultat
8.  Correction possible par reprise manuelle du résultat
9.  Sauvegarde automatique dans l'historique
10. Consultation de l'historique
11. Suppression possible d'une traduction
12. Accès à la page premium si la limite gratuite est atteinte

***

## ✅ Résumé simple

👉 **Connexion → Traduction → Résultat → Historique → Premium si nécessaire**

--------------------------------------------------------------------------------------------------------------------------------------------

# 🏗️ Architecture du projet

## 🔷 Vision globale

👉 Architecture simple en 3 parties :

**Frontend → Backend → API IA + Base de données**

    Utilisateur
       ↓
    Frontend (HTML, CSS, JS)
       ↓
    Backend (Node.js / Express)
       ↓        ↓
    Gemini     Firebase
    API IA     (Auth + Firestore)

***

# 💻 1. Frontend

## 🔧 Technologies

*   Figma (maquettes)
*   HTML
*   CSS
*   JavaScript
*   Firebase Web SDK

## ✅ Rôle

*   Interface utilisateur
*   Inscription, connexion et déconnexion
*   Interaction avec l'utilisateur
*   Envoi des requêtes au backend avec token Firebase
*   Affichage des traductions
*   Sauvegarde et lecture de l'historique dans Firestore

## 💡 Explication des choix

*   **HTML/CSS/JS** :
    *   Simple et rapide pour un MVP
    *   Aucune complexité inutile
*   **Firebase Web SDK** :
    *   Facilite l'authentification côté client
    *   Permet d'accéder à Firestore
*   **Figma** :
    *   Permet de concevoir une UI claire avant dev
*   ✅ Parfait pour une V1 en 1 semaine

***

# ⚙️ 2. Backend

## 🔧 Technologies

*   Node.js
*   Express.js
*   JavaScript
*   Firebase Admin
*   Fichier `.env`

## ✅ Rôle

*   Servir le frontend
*   Gérer les requêtes API
*   Vérifier l'authentification avec les tokens Firebase
*   Contrôler la limite gratuite de traductions
*   Lire le statut d'abonnement dans Firestore
*   Construire le **prompt IA**
*   Appeler l'API Gemini
*   Renvoyer la traduction au frontend

## 💡 Explication des choix

*   **Node.js / Express.js** :
    *   Rapide à mettre en place
    *   Même langage que le frontend (JS)
    *   Idéal pour projets courts (MVP)
*   **Firebase Admin** :
    *   Vérifie les utilisateurs côté serveur
    *   Protège les routes API
*   **.env** :
    *   Stocker les clés API de façon sécurisée
    *   Éviter de les exposer sur GitHub

***

# 🧠 3. API IA (externe)

## 🔧 Technologies

*   Gemini
*   Package `@google/generative-ai`

## ✅ Rôle

*   Générer la traduction
*   Répondre aux questions de l'assistant IA
*   Permettre une amélioration future de la prise en compte du contexte

## 💡 Explication des choix

*   Pas besoin de créer une IA
*   Gain de temps important
*   Qualité déjà optimisée
*   Possibilité de changer de modèle avec `GEMINI_MODEL`


***

# 🗄️ 4. Base de données

## 🔧 Technologie

*   Firebase Firestore
*   Firebase Authentication

## ✅ Rôle

*   Stocker :
    *   utilisateurs
    *   statut d'abonnement
    *   traductions
    *   historique
*   Gérer les comptes via Firebase Authentication

## 💡 Explication des choix

*   **Firestore** :
    *   Simple à utiliser
    *   Pas besoin de gérer un serveur SQL
    *   Adapté à un MVP
*   **Firebase Authentication** :
    *   Gestion rapide des comptes
    *   Tokens vérifiables par le backend

***

# ☁️ 5. Gestion du projet

## 🔧 Technologie

*   GitHub

## ✅ Rôle

*   Stockage du code
*   Versioning
*   Collaboration

## 💡 Explication des choix

*   Standard du développement
*   Simple et efficace

***

# 🔄 Workflow technique

1.  L'utilisateur saisit un texte (frontend)
2.  Le frontend vérifie que l'utilisateur est connecté
3.  Le frontend récupère le token Firebase
4.  Le frontend envoie la requête au backend
5.  Le backend :
    *   vérifie le token Firebase
    *   contrôle la limite gratuite
    *   construit le prompt
    *   appelle Gemini
6.  Gemini renvoie la traduction
7.  Le backend renvoie la réponse au frontend
8.  Le frontend affiche le résultat
9.  Le frontend enregistre la traduction dans Firestore
10. L'utilisateur peut consulter ou supprimer l'élément depuis l'historique

***

# ✅ Résumé des technologies

| Partie          | Technologie                         |
| --------------- | ----------------------------------- |
| Frontend        | HTML, CSS, JavaScript               |
| Design          | Figma                               |
| Backend         | Node.js, Express.js                 |
| API IA          | Gemini                              |
| Base de données | Firebase Firestore                  |
| Authentification| Firebase Authentication/Admin       |
| Sécurité        | `.env`, tokens Firebase             |
| Versioning      | GitHub                              |

--------------------------------------------------------------------------------------------------------------------------------------------
