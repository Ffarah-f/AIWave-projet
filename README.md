# AIWave-projet

### Description du projet

Le projet consiste à développer **LinguaSense**, une application web de traduction intelligente. Elle permet à un utilisateur connecté de traduire un texte avec l'API Gemini, en choisissant une langue source, une langue cible et un contexte optionnel.

L'application repose sur un frontend HTML/CSS/JavaScript, un backend Node.js/Express, Firebase Authentication, Firestore et Google Gemini.

Ce que fait l'application :

* créer un compte ou se connecter avec Firebase Authentication
* saisir un texte à traduire
* choisir une langue source ou laisser la détection automatique
* choisir une langue cible
* ajouter un contexte optionnel pour guider la traduction
* obtenir une traduction générée par Gemini
* poser des questions à un assistant IA limité aux sujets de traduction, langue, grammaire et localisation

L'utilisateur peut aussi :

* consulter automatiquement ses traductions dans un historique personnel
* supprimer des éléments de son historique
* voir son compteur de traductions gratuites
* accéder à une page d'amélioration/premium lorsque la limite gratuite est atteinte

## Installation et Configuration

### Prérequis
- Node.js
- Un compte Google AI Studio pour obtenir une clé API Gemini
- Un projet Firebase avec Authentication et Firestore
- Des identifiants Firebase Admin pour le backend

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
   - Créez une clé API
   - Copiez la clé dans le fichier `.env` du backend

   b. **Configuration Firebase :**
   - Le frontend utilise la configuration Firebase présente dans `frontend/js/firebase.js`
   - Le backend utilise Firebase Admin pour vérifier les tokens d'authentification
   - Les identifiants Admin doivent être placés dans `backend/.env`

   c. **Fichier .env :**
   Dans `backend/.env`, ajoutez les variables nécessaires :
   ```env
   GEMINI_API_KEY=votre_cle_api_gemini
   GEMINI_MODEL=gemini-2.5-flash-lite

   FIREBASE_PROJECT_ID=votre_project_id
   FIREBASE_CLIENT_EMAIL=votre_client_email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

   PORT=3000
   CORS_ORIGINS=http://localhost:3000,https://localhost:3000,https://localhost:3443
   LOCAL_HTTPS=false
   HTTP_REDIRECT_PORT=0
   ```

4. **Lancer l'application :**
   ```bash
   # Depuis le dossier backend
   npm start
   ```

   Le serveur démarre par défaut sur `http://localhost:3000`.

5. **Accéder à l'application :**
   - Ouvrez `http://localhost:3000` dans votre navigateur
   - Le backend sert le frontend et les routes API depuis le même port

   ### PS: Il y a des fichiers qui ne seront pas clonés via GitHub

Les fichiers exclus du dépôt sont notamment :

* `backend/.env`
* `backend/node_modules/`
* les certificats locaux dans `backend/certs/`
* les fichiers de clés Firebase Admin

### Structure du projet
```
AIWave-projet/
├── backend/                 # Serveur Express.js
│   ├── controllers/         # Logique métier des routes de traduction et de chat
│   ├── middleware/          # Vérification du token Firebase
│   ├── routes/              # Déclaration des routes API
│   ├── services/            # Service Gemini AI
│   ├── package.json         # Scripts et dépendances backend
│   └── server.js            # Point d'entrée Express
├── frontend/                # Interface utilisateur
│   ├── assets/              # Logo
│   ├── css/                 # Styles de l'application
│   ├── js/                  # Scripts JavaScript et Firebase
│   ├── index.html           # Page principale de traduction
│   ├── login.html           # Connexion
│   ├── register.html        # Inscription
│   ├── history.html         # Historique
│   └── upgrade.html         # Page premium
├── .gitattributes
├── .gitignore
└── README.md
```

### API Endpoints
- `POST /api/translate` - Traduction de texte avec Gemini, authentification requise
- `POST /api/chat` - Assistant IA lié à la traduction, authentification requise
- `GET /test` - Test du serveur et liste des routes principales

---

## Contribution

Ce projet est réalisé dans le cadre d'un travail étudiant.  
Les contributeurs sont uniquement les membres de l'équipe projet.  
Merci de ne pas proposer de contributions externes pour le moment.


# Rapport V1

Utilisation de Copilot 365 pour les prompts.

### Brief Client

Nous souhaitons créer une application web capable de traduire automatiquement des textes en prenant en compte leur contexte afin d'obtenir des résultats plus naturels que des traductions mot à mot.

Les utilisateurs doivent pouvoir saisir un texte, choisir une langue source, choisir une langue cible, ajouter un contexte optionnel et obtenir rapidement une traduction. L'application doit rester simple d'utilisation, accessible depuis un navigateur et adaptée à un MVP réalisé sur une courte durée.

Les choix techniques du projet sont :

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* Firebase Authentication
* Firebase Firestore
* Firebase Admin
* Google Gemini

### Questions proposées par l'IA

Voici une liste de questions pertinentes à poser au client pour mieux comprendre et cadrer le projet :

**Objectifs et vision**

* Quel est l'objectif principal de l'application ?
* Quel problème précis souhaitez-vous résoudre par rapport aux traducteurs existants ?
* Qu'entendez-vous par "traduction contextuelle" ?

**Cibles utilisateurs**

* Qui sont les utilisateurs principaux ?
* Quels sont leurs besoins fréquents ?
* Avez-vous des personas ou des cas d'usage types ?

**Fonctionnalités**

* Quels types de contenus doivent être pris en charge ?
* Faut-il gérer l'import/export de fichiers ?
* Souhaitez-vous une personnalisation par contexte, ton ou domaine ?
* L'utilisateur doit-il pouvoir corriger ou améliorer la traduction ?

**Langues**

* Quelles langues doivent être disponibles au lancement ?
* Souhaitez-vous gérer des variantes régionales ?

**Expérience utilisateur**

* L'application nécessite-t-elle un compte utilisateur ?
* Faut-il garder un historique des traductions ?
* Y a-t-il des attentes particulières en termes de design ?

**Intelligence et performance**

* Le système doit-il apprendre des corrections des utilisateurs ?
* Y a-t-il des exigences de rapidité ou de volume ?

**Contraintes techniques**

* Avez-vous des préférences technologiques ?
* L'application doit-elle être évolutive ?

**Périmètre et priorités**

* Quelles fonctionnalités sont indispensables pour une première version ?
* Quelles fonctionnalités peuvent être ajoutées plus tard ?
* Avez-vous des contraintes de délai ou de budget ?

Ces questions permettent de clarifier le besoin et de définir un périmètre réaliste pour la V1.

# Réponses client

### Objectifs et vision

**Quel est l'objectif principal de l'application ?**  
→ Usage professionnel et grand public.

**Quel problème souhaitez-vous résoudre ?**  
→ Les traducteurs actuels peuvent produire des résultats trop littéraux. Le projet vise des traductions plus naturelles.

**Que signifie "traduction contextuelle" ?**  
→ Adapter la traduction selon :

* le sens global du texte
* le ton attendu
* le contexte d'utilisation indiqué par l'utilisateur

***

### Cibles utilisateurs

**Qui sont les utilisateurs principaux ?**  
→ Professionnels, étudiants et grand public.

**Quels sont leurs besoins ?**  
→ Traduire rapidement avec un résultat clair, naturel et compréhensible.

**Avez-vous des personas ?**  
→ Non, pas encore définis.

***

### Fonctionnalités

**Types de contenus ?**  
→ Texte saisi directement dans l'interface.

**Import/export de fichiers ?**  
→ Non pour la V1. Cette fonctionnalité peut être envisagée plus tard.

**Personnalisation ?**  
→ Oui, la V1 contient un champ `Contexte` transmis au backend et utilisé dans le prompt Gemini.

**Correction par l'utilisateur ?**  
→ L'utilisateur peut reprendre manuellement le résultat affiché, mais l'édition avancée ou l'apprentissage à partir des corrections ne sont pas intégrés.

***

### Langues

**Langues au lancement ?**  
→ Arabe, allemand, anglais, espagnol, français, italien, japonais, coréen, néerlandais, portugais, russe, turc et chinois.

**Variantes régionales ?**  
→ Non pour le MVP.

***

### Expérience utilisateur

**Compte obligatoire ?**  
→ Oui. Les pages de traduction et d'historique redirigent vers la connexion si l'utilisateur n'est pas authentifié.

**Historique ?**  
→ Oui. Les traductions sont enregistrées dans Firestore sous l'utilisateur connecté.

**Attentes design ?**  
→ Interface simple, moderne, responsive et intuitive.

***

### Intelligence et performance

**Apprentissage des corrections ?**  
→ Non pour le MVP.

**Exigences performance ?**  
→ Traduction rapide, dans la limite de disponibilité de l'API Gemini.

***

### Contraintes techniques

**Préférences techniques ?**  
→ La version actuelle utilise HTML/CSS/JavaScript, Node.js, Express, Firebase et Gemini.

**Évolutivité ?**  
→ Oui, avec des possibilités futures : paiement réel, API publique, import/export de fichiers, mobile et intégrations.

***

### Périmètre et priorités

**Fonctionnalités MVP ?**  
→

* Saisie de texte
* Traduction avec IA
* Choix de langue source et cible
* Champ de contexte
* Authentification
* Historique
* Assistant IA
* Limite gratuite de 15 traductions
* Page premium descriptive

**Fonctionnalités plus tard ?**  
→

* Import/export de fichiers
* Paiement réel
* Personnalisation avancée
* Apprentissage basé sur les corrections
* API publique
* Application mobile
* Intégrations externes

**Contraintes délai/budget ?**  
→ MVP réalisé sur une durée courte.

## Brief client amélioré

Nous souhaitons créer une application web de traduction intelligente capable de produire des traductions plus naturelles et adaptées au contexte que les outils classiques.

L'objectif est de dépasser la simple traduction mot à mot en proposant une solution utilisable par des professionnels, des étudiants et le grand public.

L'application est accessible depuis un navigateur, sans installation côté utilisateur. Elle propose une interface claire permettant de :

* créer un compte et se connecter
* saisir un texte
* choisir une langue source ou utiliser le mode automatique
* choisir une langue cible
* indiquer un contexte optionnel
* obtenir une traduction générée via Gemini
* poser une question à un assistant IA spécialisé dans la traduction

Le champ de contexte est présent dans l'interface et envoyé au backend. Le service IA l'utilise dans son prompt pour guider le ton, le registre et le sens de la traduction.

L'application inclut :

* un système de comptes utilisateurs avec Firebase Authentication
* une vérification des tokens côté backend avec Firebase Admin
* un historique personnel des traductions :
    * texte source
    * texte traduit
    * langue source
    * langue cible
    * contexte
    * date
* une suppression possible des éléments de l'historique

Un modèle gratuit/premium simple est représenté par :

* un champ `isSubscribed` ou `subscribed` dans les données utilisateur
* une limite de 15 traductions gratuites par mois pour les utilisateurs non abonnés
* une page `upgrade.html` présentant les offres

Le fonctionnement intelligent repose sur :

* l'utilisation du modèle Gemini
* la construction de prompts contrôlés
* la validation des langues et des tailles de texte côté backend

Ne sont pas inclus dans cette version :

* import de fichiers
* paiement réel en ligne
* apprentissage automatique
* personnalisation avancée
* API publique
* application mobile
* intégrations externes

L'objectif est de valider :

* la pertinence de la traduction via IA
* l'usage réel de l'application
* le principe d'un accès gratuit limité avec une page premium


## Périmètre et Hors-Périmètre

### Périmètre du projet

Le projet consiste à développer une application web permettant :

* La saisie de texte dans une interface simple
* La sélection de la langue source et de la langue cible
* La traduction via Gemini
* La prise en compte du contexte transmis par l'utilisateur
* L'affichage rapide de la traduction
* Un assistant IA pour les questions liées à la traduction
* Une interface moderne, claire et responsive
* Un accès via navigateur
* Un historique des traductions dans Firestore
* Un système de comptes utilisateurs
* Le contrôle d'accès par token Firebase
* Une limite de 15 traductions gratuites par mois
* Une page de présentation des offres premium

L'intelligence repose sur :

* l'utilisation d'un modèle IA externe
* la façon dont le prompt est construit
* le contexte fourni par l'utilisateur

***

### Hors périmètre du projet 

Pour garantir la faisabilité, les éléments suivants sont exclus :

* Création ou entraînement d'un modèle d'IA personnalisé
* Fine-tuning ou machine learning avancé
* Mode hors ligne
* Import de fichiers PDF, Word ou autres formats
* Paiement réel en ligne
* Apprentissage automatique basé sur les corrections
* Gestion avancée du contexte par analyse linguistique complexe
* API publique
* Application mobile
* Intégrations tierces
* Optimisation pour gros volumes

## Évolutions prévues

Plusieurs fonctionnalités pourront être ajoutées dans des versions ultérieures :

* Import/export de fichiers
* Paiement réel pour les abonnements
* Personnalisation avancée par domaine métier, ton ou profil
* Apprentissage basé sur les corrections utilisateurs
* Amélioration de l'expérience d'édition du texte traduit
* API publique
* Application mobile
* Ajout de langues et variantes régionales
* Intégration avec des services externes

--------------------------------------------------------------------------------------------------------------------------------------------

# V1 - Application de traduction intelligente

## Objectif

Développer une application web permettant de produire des traductions plus naturelles et adaptées au contexte que les outils classiques.

Cette première version vise à livrer un MVP fonctionnel permettant de valider :

* la traduction assistée par IA
* l'usage réel de l'application
* l'authentification utilisateur
* l'historique des traductions
* le principe d'une limite gratuite et d'une page premium

***

## Fonctionnalités principales

L'application permet :

* La saisie de texte
* La sélection de la langue source
* La sélection de la langue cible
* L'ajout d'un contexte optionnel
* La traduction via Gemini
* L'affichage de la traduction dans la page principale
* L'enregistrement automatique de la traduction dans Firestore
* L'utilisation d'un assistant IA depuis la page principale

Le backend valide :

* les champs requis
* la taille maximale du texte à traduire
* la taille maximale du contexte
* la langue cible
* la langue source si elle n'est pas en mode automatique

***

## Gestion utilisateur

* Inscription et connexion avec Firebase Authentication
* Enregistrement du nom, de l'e-mail, de la date de création et du statut `isSubscribed` dans Firestore
* Déconnexion depuis la navigation
* Redirection vers `login.html` si l'utilisateur n'est pas connecté
* Vérification du token Firebase côté backend avec Firebase Admin
* Accès à un historique personnel des traductions

### Historique :

* texte source
* texte traduit
* langue source
* langue cible
* contexte
* date
* suppression possible d'une traduction enregistrée

***

## Modèle économique

* Accès avec un modèle gratuit/premium simplifié
* Utilisateurs non abonnés limités à 15 traductions gratuites par mois
* Suivi de l'usage dans `translationUsage`
* Statut premium lu depuis `isSubscribed` ou `subscribed`
* Redirection vers `upgrade.html` lorsque la limite gratuite est atteinte
* Pas de paiement réel intégré dans la V1

***

## Expérience utilisateur

* Application 100% web
* Interface simple, moderne et responsive
* Navigation entre :
    * traduction
    * connexion
    * inscription
    * historique
    * amélioration/premium
* Messages d'erreur côté authentification, traduction, chat et historique
* Compteur visible pour les utilisateurs non abonnés

***

## Fonctionnement

* Le frontend récupère le token Firebase de l'utilisateur connecté
* Le frontend envoie les requêtes au backend avec l'en-tête `Authorization: Bearer <token>`
* Le backend vérifie le token avec Firebase Admin
* Le backend contrôle le quota gratuit avec une transaction Firestore
* Le backend construit un prompt contenant le texte, la langue cible et le contexte
* Gemini génère la traduction
* Le backend enregistre la traduction dans Firestore
* Le frontend affiche le résultat

Le service IA utilise `GEMINI_MODEL` si la variable existe, puis tente des modèles de secours :

* `gemini-2.5-flash-lite`
* `gemini-2.5-flash`
* `gemini-2.0-flash-lite`
* `gemini-2.0-flash`

***

## Contraintes

* Durée de réalisation courte
* Dépendance à Internet
* Dépendance à Firebase et Gemini
* Authentification obligatoire pour utiliser les routes API
* Paiement réel non intégré
* Import/export de fichiers non intégré
* Limite de taille côté backend :
    * texte : 5000 caractères
    * contexte : 1000 caractères
    * message de chat : 2000 caractères

***

## Hors périmètre (V1)

* Modèle d'IA personnalisé
* Fine-tuning / machine learning avancé
* Import de fichiers
* Paiement réel en ligne
* Apprentissage automatique
* Personnalisation avancée
* API publique
* Application mobile
* Intégrations externes
* Optimisation pour gros volumes

***

## Évolutions futures

* Import/export de fichiers
* Paiement réel pour les abonnements
* Personnalisation avancée par domaine, profil ou ton
* Apprentissage basé sur les corrections
* Édition plus complète du texte traduit
* API publique
* Application mobile
* Ajout de langues et variantes régionales
* Intégrations externes

***

## Conclusion

LinguaSense est une application web de traduction intelligente avec :

* traduction via Gemini
* contexte optionnel
* comptes utilisateurs
* historique personnel
* assistant IA
* limite gratuite de 15 traductions par mois
* page premium descriptive

Objectif : valider rapidement un produit simple, utile et différenciant.

--------------------------------------------------------------------------------------------------------------------------------------------
# Cible

## Utilisateurs principaux

* **Professionnels**
    * marketing
    * communication
    * support client  
        Besoin : traductions rapides, naturelles et adaptées au contexte

* **Grand public**
    * étudiants
    * utilisateurs occasionnels  
        Besoin : outil simple, accessible et efficace

***

## Besoins clés

* Traduire rapidement
* Obtenir un résultat naturel
* Ajouter un contexte ou préciser le ton attendu
* Conserver ses traductions
* Supprimer les traductions inutiles
* Utiliser un assistant IA pour comprendre ou améliorer une formulation

***

# Parcours utilisateur

## Étapes principales

1. Arrivée sur le site
2. Inscription ou connexion
3. Accès à l'interface principale
4. Saisie du texte
5. Choix :
    * langue source
    * langue cible
    * contexte optionnel
6. Clic sur **"Traduire"**
7. Vérification du token côté backend
8. Contrôle de la limite gratuite
9. Traduction via Gemini
10. Affichage du résultat
11. Sauvegarde automatique dans l'historique
12. Consultation de l'historique
13. Suppression possible d'une traduction
14. Redirection vers la page premium si la limite gratuite est atteinte

***

## Résumé simple

Connexion → Traduction → Résultat → Historique → Premium si nécessaire

--------------------------------------------------------------------------------------------------------------------------------------------

# Architecture du projet

## Vision globale

Architecture simple en 3 parties :

**Frontend → Backend → Gemini + Firebase**

    Utilisateur
       ↓
    Frontend (HTML, CSS, JavaScript)
       ↓
    Backend (Node.js / Express)
       ↓        ↓
    Gemini     Firebase
    API IA     Auth + Firestore

***

# 1. Frontend

## Technologies

* HTML
* CSS
* JavaScript
* Firebase Web SDK
* Google Fonts

## Rôle

* Interface utilisateur
* Inscription, connexion et déconnexion
* Redirection des utilisateurs non connectés
* Envoi des requêtes au backend avec token Firebase
* Affichage des traductions
* Affichage du compteur de traductions gratuites
* Affichage du chat assistant
* Lecture et suppression de l'historique dans Firestore

## Explication des choix

* **HTML/CSS/JavaScript** :
    * Simple et rapide pour un MVP
    * Pas de framework nécessaire
* **Firebase Web SDK** :
    * Facilite l'authentification côté client
    * Permet d'accéder à Firestore
* **CSS responsive** :
    * Adapté à une interface web simple et moderne

***

# 2. Backend

## Technologies

* Node.js
* Express.js
* JavaScript CommonJS
* Firebase Admin
* `@google/generative-ai`
* `dotenv`
* `cors`
* `helmet`
* `express-rate-limit`

## Rôle

* Servir le frontend statique
* Gérer les routes API
* Vérifier l'authentification avec les tokens Firebase
* Contrôler la limite gratuite de traductions
* Lire le statut d'abonnement dans Firestore
* Construire les prompts IA
* Appeler l'API Gemini
* Enregistrer les traductions dans Firestore
* Renvoyer les réponses au frontend

## Explication des choix

* **Node.js / Express.js** :
    * Rapide à mettre en place
    * Même langage que le frontend
    * Adapté à un MVP
* **Firebase Admin** :
    * Vérifie les utilisateurs côté serveur
    * Protège les routes API
* **.env** :
    * Stocke les clés API et secrets
    * Évite d'exposer les informations sensibles sur GitHub
* **Helmet, CORS et rate limit** :
    * Ajoutent des protections de base côté serveur

***

# 3. API IA (externe)

## Technologies

* Gemini
* Package `@google/generative-ai`

## Rôle

* Générer les traductions
* Répondre aux questions de l'assistant IA
* Utiliser le contexte pour mieux choisir le ton, le registre et les formulations

## Explication des choix

* Pas besoin d'entraîner une IA
* Gain de temps important pour un MVP
* Possibilité de changer de modèle via `GEMINI_MODEL`
* Modèles de secours prévus en cas d'indisponibilité ou de quota


***

# 4. Base de données

## Technologie

* Firebase Firestore
* Firebase Authentication

## Rôle

* Gérer les comptes avec Firebase Authentication
* Stocker les documents utilisateurs dans `users`
* Stocker le statut d'abonnement
* Stocker l'usage mensuel dans `translationUsage`
* Stocker les traductions dans `users/{uid}/translations`

## Explication des choix

* **Firestore** :
    * Simple à utiliser
    * Adapté à un MVP
    * Permet un historique par utilisateur
* **Firebase Authentication** :
    * Gestion rapide des comptes
    * Tokens vérifiables par le backend

***

# 5. Gestion du projet

## Technologie

* GitHub
* Git

## Rôle

* Stockage du code
* Versioning
* Collaboration

## Explication des choix

* Standard du développement
* Simple pour suivre les changements
* Compatible avec un travail en équipe

***

# Workflow technique

1. L'utilisateur saisit un texte dans le frontend
2. Le frontend vérifie que l'utilisateur est connecté
3. Le frontend récupère le token Firebase
4. Le frontend envoie la requête au backend
5. Le backend :
    * vérifie le token Firebase
    * valide les champs reçus
    * contrôle la limite gratuite
    * construit le prompt Gemini
    * appelle Gemini
    * enregistre la traduction dans Firestore
6. Gemini renvoie la traduction
7. Le backend renvoie la réponse au frontend
8. Le frontend affiche le résultat
9. L'utilisateur peut consulter ou supprimer l'élément depuis l'historique

***

# Résumé des technologies

| Partie           | Technologie                                      |
| ---------------- | ------------------------------------------------ |
| Frontend         | HTML, CSS, JavaScript                            |
| Backend          | Node.js, Express.js                              |
| API IA           | Gemini                                           |
| Base de données  | Firebase Firestore                               |
| Authentification | Firebase Authentication + Firebase Admin         |
| Sécurité         | `.env`, tokens Firebase, Helmet, CORS, rate limit|
| Versioning       | Git, GitHub                                      |

--------------------------------------------------------------------------------------------------------------------------------------------
