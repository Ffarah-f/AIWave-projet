# AIWave-projet

### Description du projet

Le projet consiste à développer une application web de traduction intelligente qui va au-delà des traducteurs classiques en proposant des traductions plus naturelles et adaptées au contexte.

L’idée centrale est de créer un outil simple à utiliser, accessible à tous, mais suffisamment performant pour répondre à des besoins professionnels.

🎯 Ce que fait l’application

L’utilisateur peut :

*   saisir un texte
*   choisir une langue source et une langue cible
*   indiquer un ton (formel ou informel)
*   obtenir une traduction rapide et contextualisée

Il peut ensuite :

*   modifier manuellement la traduction
*   sauvegarder automatiquement ses traductions dans un historique personnel

# Avant de commencer l'explication du projet 

## 🚀 Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/username/AIWave-projet.git
   cd AIWave-projet

2. Installer les dépendances :
    ```bash
    npm install

3.  Dans un fichier .env , dans le dossier du projet cloner, ajouter la clé API après "="
    ```code
    OPENAI_API_KEY=ta_cle_api

4. Lancer l'application:
    ```bash
    npm start

---

# Raport V1

Utilisation de copilot 365 pour les prompts

### Brief Client 

Nous souhaitons créer une application web capable de traduire automatiquement des textes en prenant en compte leur contexte afin d’obtenir des résultats plus naturels et adaptés à l’usage réel. L’objectif est d’aller au-delà d’une simple traduction mot à mot, en proposant une solution plus “intelligente”.

Les utilisateurs devront pouvoir saisir du texte ou en importer depuis différents formats, puis choisir une langue cible pour obtenir une traduction rapidement. Il serait intéressant que l’outil puisse s’adapter à différents types de contenus, mais cela reste à préciser.

L’application devra être simple d’utilisation et accessible depuis un navigateur, sans nécessité d’installation. Nous n’avons pas encore décidé des langues à supporter en priorité, ni du niveau de personnalisation souhaité.

À terme, nous aimerions que l’outil puisse s’intégrer dans d’autres environnements ou proposer des fonctionnalités avancées, mais pour l’instant nous souhaitons surtout valider une première version fonctionnelle. Aucune contrainte technique spécifique n’a été définie pour le moment.

### Questions proposées par l'IA

Voici une liste de questions pertinentes à poser au client pour mieux comprendre et cadrer le projet :

**Objectifs et vision**

*   Quel est l’objectif principal de l’application (usage professionnel, éducatif, personnel…) ?
*   Quel problème précis souhaitez-vous résoudre par rapport aux traducteurs existants ?
*   Qu’entendez-vous exactement par “traduction contextuelle” dans votre besoin ?

**Cibles utilisateurs**

*   Qui sont les utilisateurs principaux (étudiants, entreprises, traducteurs, grand public…) ?
*   Quels sont leurs besoins spécifiques et leurs usages fréquents ?
*   Avez-vous des personas ou des cas d’usage types ?

**Fonctionnalités**

*   Quels types de contenus doivent être pris en charge (phrases courtes, documents, e-mails, etc.) ?
*   Faut-il gérer l’import/export de fichiers ? Si oui, quels formats ?
*   Souhaitez-vous une possibilité de personnalisation (ton, registre, domaine métier) ?
*   L’utilisateur doit-il pouvoir corriger ou améliorer la traduction ?

**Langues**

*   Quelles langues doivent être disponibles au lancement ?
*   Souhaitez-vous gérer des dialectes ou variantes régionales ?

**Expérience utilisateur**

*   L’application nécessite-t-elle un compte utilisateur ou doit-elle être accessible librement ?
*   Faut-il garder un historique des traductions ?
*   Y a-t-il des attentes spécifiques en termes de design ou d’ergonomie ?

**Intelligence et performance**

*   Le système doit-il apprendre des corrections des utilisateurs ?
*   Y a-t-il des exigences en termes de rapidité ou de volume de traitement ?

**Contraintes techniques**

*   Avez-vous des préférences technologiques (framework, langage, hébergement…) ?
*   L’application doit-elle être évolutive (API, intégrations futures, mobile…) ?

**Périmètre et priorités**

*   Quelles fonctionnalités sont indispensables pour une première version (MVP) ?
*   Quelles sont celles qui peuvent être ajoutées plus tard ?
*   Avez-vous des contraintes de délai ou de budget ?

Ces questions permettront de lever les ambiguïtés du brief initial et de définir un cadre clair pour la suite du projet.

# Réponses client 

### 🎯 Objectifs et vision

**Quel est l’objectif principal de l’application ?**  
→ Usage **professionnel et grand public**

**Quel problème souhaitez-vous résoudre ?**  
→ Les traducteurs actuels font des traductions trop littérales, pas assez naturelles.

**Que signifie “traduction contextuelle” ?**  
→ Adapter la traduction selon :

*   le sens global du texte
*   le ton (formel/informel)
*   le contexte d’utilisation

***

### 👤 Cibles utilisateurs

**Qui sont les utilisateurs principaux ?**  
→ Professionnels (marketing, support…) + grand public

**Quels sont leurs besoins ?**  
→ Traduire rapidement avec un résultat naturel et compréhensible

**Avez-vous des personas ?**  
→ Non, pas encore définis

***

### ⚙️ Fonctionnalités

**Types de contenus ?**  
→ Texte court + documents + e-mails

**Import/export de fichiers ?**  
→ Non 
Formats souhaités : PDF, Word, texte simple

**Personnalisation ?**  
→ Oui, idéalement :

*   ton (formel/informel)
*   domaine (marketing, technique…)

**Correction par l’utilisateur ?**  
→ Oui, possibilité de modifier la traduction

***

### 🌍 Langues

**Langues au lancement ?**  
→ Anglais, Français, Espagnol (priorité) 

**Variantes régionales ?**  
→ Pas nécessaire pour le MVP

***

### 💻 Expérience utilisateur

**Compte obligatoire ?**  
→ Oui

**Historique ?**  
→ Oui, préferablemment

**Attentes design ?**  
→ Interface simple, moderne, intuitive

***

### 🧠 Intelligence et performance

**Apprentissage des corrections ?**  
→ Pas pour le MVP, mais intéressant plus tard

**Exigences performance ?**  
→ Traduction rapide (quelques secondes max)

***

### 🧱 Contraintes techniques

**Préférences techniques ?**  
→ Aucune

**Évolutivité ?**  
→ Oui, possibilité future :

*   API
*   intégrations
*   version mobile

***

### 🚀 Périmètre et priorités

**Fonctionnalités MVP ?**  
→

*   Saisie de texte
*   Traduction contextuelle
*   Choix de langue
*   Résultat rapide

**Fonctionnalités plus tard ?**  
→

*   Personnalisation avancée
*   Historique
*   apprentissage

**Contraintes délai/budget ?**  
→ Non précisées pour le moment

## Brief client amélioré

Nous souhaitons créer une application web de traduction intelligente capable de produire des traductions plus naturelles et adaptées au contexte que les outils classiques.

L’objectif est de dépasser la simple traduction mot à mot en proposant une solution plus pertinente, utilisable aussi bien par des professionnels que par le grand public.

L’application devra être accessible directement depuis un navigateur, sans installation, avec une interface simple, moderne et intuitive.
Les utilisateurs devront pouvoir :

*   saisir un texte
*   choisir une langue source et une langue cible 
*   choisir un ton de traduction (formel ou informel)
*   obtenir une traduction rapide générée via une API d’intelligence artificielle

👉 La personnalisation du ton est une fonctionnalité clé de la V1 et doit améliorer la qualité et la pertinence des traductions.
L’utilisateur pourra modifier manuellement la traduction pour l’adapter à ses besoins.

L’application inclura :

*   un système de comptes utilisateurs (inscription / connexion)
*   un historique personnel des traductions :
    *   texte source
    *   texte traduit
    *   langues
    *   date

Un système d’abonnement sera mis en place pour accéder au service. Il permettra de couvrir les coûts liés à l’utilisation de l’API et pourra inclure des limitations d’usage. Dans cette version, il restera simple.

Le fonctionnement intelligent repose sur :

*   l’utilisation d’un modèle d’IA externe
*   la construction des prompts, incluant le ton choisi par l’utilisateur

Le projet est contraint par une durée de réalisation de 1 semaine, impliquant un MVP fonctionnel.

Ne sont pas inclus dans cette version :

*   import de fichiers
*   apprentissage automatique
*   personnalisation avancée (au-delà du ton)
*   API publique
*   application mobile
*   intégrations externes

L’objectif est de valider :

*   la pertinence de la traduction contextualisée via le ton
*   l’usage réel de l’application
*   le modèle d’abonnement


## Périmètre et Hors-Périmètre

### ✅ Périmètre du projet 

Le projet consiste à développer une application web permettant :

*   La **saisie de texte** dans une interface simple
*   La **sélection de la langue source et cible** 
*   La **traduction via un modèle d’IA** (appel API type OpenAI, DeepL, etc.)
*   La **prise en compte du contexte via des instructions envoyées au modèle** (ex : ton formel/informel, contexte simple)
*   L’**affichage rapide de la traduction**
*   La **modification manuelle du texte traduit**
*   Une **interface moderne, claire et intuitive**
*   Un accès via navigateur (application en ligne nécessitant Internet)
*   Historique des traductions
*   Système de comptes utilisateurs


👉 L’“intelligence” repose sur :

*   l’utilisation du modèle IA
*   la façon dont on construit la requête (prompt) pour améliorer la traduction

***

### ❌ Hors périmètre du projet (simplification pour étudiants)

Pour garantir la faisabilité, les éléments suivants sont exclus :

*   Création ou entraînement d’un **modèle d’IA personnalisé**
*   Fine-tuning ou machine learning avancé
*   Mode hors ligne
*   Import de fichiers complexes (PDF, Word)
*   Apprentissage automatique basé sur les corrections
*   Gestion avancée du contexte (analyse linguistique complexe)
*   API publique
*   Application mobile
*   Intégrations tierces
*   Optimisation haute performance ou gros volumes

## Evaluations prévues

Plusieurs fonctionnalités pourront être ajoutées dans des versions ultérieures afin d’enrichir l’application :

*   Intégration de l’import/export de fichiers (PDF, Word, etc.)
*    Mise en place d’un apprentissage basé sur les corrections utilisateurs
*   Gestion plus fine du contexte linguistique (analyse plus avancée du texte)
*   Personnalisation avancée (photo de profiile etc)
*   Développement d’une API publique pour permettre l’intégration avec d’autres outils
*   Création d’une application mobile
*   Ajout de nouvelles langues et variantes régionales
*   Intégration avec des services externes (CMS, outils marketing, etc.)

--------------------------------------------------------------------------------------------------------------------------------------------

# 🧾 V1 – Application de traduction intelligente

## 🎯 Objectif

Développer une application web permettant de produire des **traductions plus naturelles et adaptées au contexte** que les outils classiques.

Cette première version (V1) vise à livrer un **MVP fonctionnel en 1 semaine**, simple, rapide et efficace, afin de valider :

*   la pertinence de la traduction contextualisée (via le ton)
*   l’usage réel de l’application
*   le modèle d’abonnement

***

## ⚙️ Fonctionnalités principales

L’application permet :

*   La **saisie de texte**
*   La **sélection de la langue source et cible**
*   La **traduction via une API d’intelligence artificielle externe**
*   La **personnalisation du ton** :
    *   formel
    *   informel

👉 Cette personnalisation est une **fonctionnalité clé de la V1**

*   L’**affichage rapide de la traduction**
*   La **modification manuelle du texte traduit**

***

## 👤 Gestion utilisateur

*   Inscription et connexion
*   Déconnexion
*   Accès à un **historique des traductions**

### Historique :

*   texte source
*   texte traduit
*   langues utilisées
*   date

***

## 💳 Modèle économique

*   Accès à l’application via un **abonnement**
*   Système simple (V1)
*   Possibles limitations :
    *   nombre de traductions
    *   volume de texte

👉 Objectif : couvrir les coûts liés à l’API

***

## 💻 Expérience utilisateur

*   Application **100% web (navigateur)**
*   Interface **simple, moderne et intuitive**
*   Utilisation rapide et fluide

***

## 🧠 Fonctionnement

*   Utilisation d’un **modèle d’IA externe** (OpenAI, DeepL, etc.)
*   L’intelligence repose sur :
    *   le modèle choisi
    *   la construction des prompts

👉 Le **ton choisi par l’utilisateur** est intégré au prompt

***

## ⚠️ Contraintes

*   ⏱️ Durée : **1 semaine (MVP)**
*   💻 Choix de l’API non défini
*   💰 Coût lié à l’utilisation de l’API
*   🌐 Dépendance à Internet
*   🔐 Authentification simple (niveau basique)

***

## 🚧 Hors périmètre (V1)

*   Modèle d’IA personnalisé
*   Fine-tuning / machine learning avancé
*   Import de fichiers (PDF, Word…)
*   Apprentissage automatique
*   Personnalisation avancée (au-delà du ton)
*   API publique
*   Application mobile
*   Intégrations externes
*   Optimisation pour gros volumes

***

## 🚀 Évolutions futures

*   Import/export de fichiers
*   Personnalisation avancée (domaine métier, profils…)
*   Apprentissage basé sur les corrections
*   API publique
*   Application mobile
*   Ajout de langues et variantes
*   Intégrations externes (CMS, outils…)

***

## ✅ Conclusion

👉 Une application web de traduction intelligente  
👉 Avec personnalisation du ton, comptes utilisateurs, historique et abonnement  
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
*   Adapter le **ton (formel / informel)**
*   Conserver ses traductions

***

# 🧭 Parcours utilisateur

## 🔹 Étapes principales

1.  Arrivée sur le site
2.  Inscription ou connexion
3.  Accès à l’interface principale
4.  Saisie du texte
5.  Choix :
    *   langues
    *   ton
6.  Clique sur **“Traduire”**
7.  Affichage du résultat
8.  Modification possible
9.  Sauvegarde automatique dans l’historique
10. Consultation de l’historique
11. Gestion de l’abonnement

***

## ✅ Résumé simple

👉 **Connexion → Traduction → Résultat → Historique**

--------------------------------------------------------------------------------------------------------------------------------------------

# 🏗️ Architecture du projet

## 🔷 Vision globale

👉 Architecture simple en 3 parties :

**Frontend → Backend → API IA + Base de données**

    Utilisateur
       ↓
    Frontend (HTML, CSS, JS)
       ↓
    Backend (Node.js)
       ↓        ↓
    API IA     Firestore DB
    (OpenAI…)   (historique + users)

***

# 💻 1. Frontend

## 🔧 Technologies

*   Figma (maquettes)
*   HTML
*   CSS
*   JavaScript

## ✅ Rôle

*   Interface utilisateur
*   Interaction avec l’utilisateur
*   Envoi des requêtes au backend
*   Affichage des traductions

## 💡 Explication des choix

*   **HTML/CSS/JS** :
    *   Simple et rapide pour un MVP
    *   Aucune complexité inutile
*   **Figma** :
    *   Permet de concevoir une UI claire avant dev
*   ✅ Parfait pour une V1 en 1 semaine

***

# ⚙️ 2. Backend

## 🔧 Technologies

*   Node.js
*   JavaScript
*   Fichier `.env`

## ✅ Rôle

*   Gérer les requêtes du frontend
*   Gérer l’authentification (login/signup)
*   Gérer l’abonnement
*   Construire le **prompt IA** (avec le ton)
*   Appeler l’API de traduction
*   Sauvegarder les données

## 💡 Explication des choix

*   **Node.js** :
    *   Rapide à mettre en place
    *   Même langage que frontend (JS)
    *   Idéal pour projets courts (MVP)
*   **.env** :
    *   Stocker les clés API de façon sécurisée
    *   Éviter de les exposer sur GitHub

***

# 🧠 3. API IA (externe)

## 🔧 Technologies

*   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Un modéle de OpenRouter

## ✅ Rôle

*   Générer la traduction
*   Prendre en compte le contexte (ton)

## 💡 Explication des choix

*   Pas besoin de créer une IA
*   Gain de temps énorme
*   Qualité déjà optimisée


***

# 🗄️ 4. Base de données

## 🔧 Technologie

*   Firebase Firestore

## ✅ Rôle

*   Stocker :
    *   utilisateurs
    *   traductions
    *   historique

## 💡 Explication des choix

*   **Firestore** :
    *   Simple à utiliser
    *   Pas besoin de gérer un serveur SQL
    *   Temps réel
    *   Parfait pour MVP

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

1.  L’utilisateur saisit un texte (frontend)
2.  Le frontend envoie la requête au backend
3.  Le backend :
    *   vérifie l’utilisateur
    *   construit le prompt (avec ton)
    *   appelle l’API IA
4.  L’API renvoie la traduction
5.  Le backend :
    *   enregistre dans Firestore
    *   renvoie la réponse
6.  Le frontend affiche le résultat

***

# ✅ Résumé des technologies

| Partie          | Technologie           |
| --------------- | --------------------- |
| Frontend        | HTML, CSS, JavaScript |
| Design          | Figma                 |
| Backend         | Node.js (JavaScript)  |
| API IA          | OpenAI / DeepL        |
| Base de données | Firebase Firestore    |
| Sécurité        | .env                  |
| Versioning      | GitHub                |

--------------------------------------------------------------------------------------------------------------------------------------------

