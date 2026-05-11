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

# Report V1

## Utilisation de copilot 365 pour les prompts

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

### Réponses client 

Parfait 👍 Voici **les réponses du client à toutes les questions**, de manière **simple et directe** :

***

# 🎯 Objectifs et vision

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

# 👤 Cibles utilisateurs

**Qui sont les utilisateurs principaux ?**  
→ Professionnels (marketing, support…) + grand public

**Quels sont leurs besoins ?**  
→ Traduire rapidement avec un résultat naturel et compréhensible

**Avez-vous des personas ?**  
→ Non, pas encore définis

***

# ⚙️ Fonctionnalités

**Types de contenus ?**  
→ Texte court + documents + e-mails

**Import/export de fichiers ?**  
→ Oui  
Formats souhaités : PDF, Word, texte simple

**Personnalisation ?**  
→ Oui, idéalement :

*   ton (formel/informel)
*   domaine (marketing, technique…)

**Correction par l’utilisateur ?**  
→ Oui, possibilité de modifier la traduction

***

# 🌍 Langues

**Langues au lancement ?**  
→ Anglais, Français, Espagnol (priorité)

**Variantes régionales ?**  
→ Pas nécessaire pour le MVP

***

# 💻 Expérience utilisateur

**Compte obligatoire ?**  
→ Oui

**Historique ?**  
→ Oui, préferablemment

**Attentes design ?**  
→ Interface simple, moderne, intuitive

***

# 🧠 Intelligence et performance

**Apprentissage des corrections ?**  
→ Pas pour le MVP, mais intéressant plus tard

**Exigences performance ?**  
→ Traduction rapide (quelques secondes max)

***

# 🧱 Contraintes techniques

**Préférences techniques ?**  
→ Aucune

**Évolutivité ?**  
→ Oui, possibilité future :

*   API
*   intégrations
*   version mobile

***

# 🚀 Périmètre et priorités

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

### Brief client amélioré

Nous souhaitons créer une application web de traduction intelligente capable de produire des traductions plus naturelles que les outils classiques. L’objectif est de dépasser la simple traduction mot à mot en proposant des résultats adaptés au contexte et à l’usage réel.

L’application devra être accessible directement depuis un navigateur, sans installation, et offrir une expérience simple, rapide et intuitive. Elle s’adresse à la fois à des professionnels (marketing, communication, support) ainsi qu’au grand public.

Les utilisateurs devront pouvoir saisir du texte, choisir une langue source et une langue cible (dans un premier temps : français, anglais et espagnol), puis obtenir une traduction rapidement. L’outil devra s’appuyer sur un modèle d’intelligence artificielle externe (comme OpenAI ou DeepL) pour générer les traductions.

Une attention particulière sera portée à la prise en compte du contexte. Pour cela, l’utilisateur pourra définir des paramètres simples, comme le ton (formel ou informel), afin d’améliorer la qualité et la pertinence de la traduction.

L’utilisateur devra également pouvoir modifier manuellement le texte traduit.

L’application inclura un système de comptes utilisateurs avec inscription et connexion. Chaque utilisateur disposera d’un historique personnel de ses traductions, comprenant le texte source, le texte traduit, les langues utilisées et la date.

En revanche, cette première version ne comprendra pas certaines fonctionnalités avancées comme l’import de fichiers (PDF ou Word), la création d’un modèle d’IA personnalisé, l’apprentissage basé sur les corrections, une API publique, une application mobile ou des intégrations avec d’autres outils.

L’objectif de cette version est de valider le concept avec une solution fonctionnelle, simple et efficace, tout en laissant la possibilité d’ajouter des fonctionnalités plus avancées dans les versions futures.


### Périmètre et Hors-Périmètre

# ✅ Périmètre du projet 

Le projet consiste à développer une application web permettant :

*   La **saisie de texte** dans une interface simple
*   La **sélection de la langue source et cible** (anglais, français, espagnol)
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

# ❌ Hors périmètre du projet (simplification pour étudiants)

Pour garantir la faisabilité, les éléments suivants sont exclus :

*   Création ou entraînement d’un **modèle d’IA personnalisé**
*   Fine-tuning ou machine learning avancé
*   Mode hors ligne
*   Import de fichiers complexes (PDF, Word)
*   Personnalisation avancée (profils, préférences détaillées)
*   Apprentissage automatique basé sur les corrections
*   Gestion avancée du contexte (analyse linguistique complexe)
*   API publique
*   Application mobile
*   Intégrations tierces
*   Optimisation haute performance ou gros volumes

### Evaluations prévues

Plusieurs fonctionnalités pourront être ajoutées dans des versions ultérieures afin d’enrichir l’application :

*   Intégration de l’import/export de fichiers (PDF, Word, etc.)
*    Mise en place d’un apprentissage basé sur les corrections utilisateurs
*   Gestion plus fine du contexte linguistique (analyse plus avancée du texte)
*   Développement d’une API publique pour permettre l’intégration avec d’autres outils
*   Création d’une application mobile
*   Ajout de nouvelles langues et variantes régionales
*   Intégration avec des services externes (CMS, outils marketing, etc.)
