# LinguaSense

LinguaSense is a web translation app built for the AIWave project. It uses a Node.js/Express backend, Firebase Authentication, Firestore, and Google Gemini to translate text and provide an AI chat assistant.

## Current Features

- User registration and login with Firebase Auth
- Protected translation API using Firebase ID tokens
- AI translation through Google Gemini
- Source and target language selectors
- Supported target/source languages:
  - Arabic
  - Chinese
  - Dutch
  - English
  - French
  - German
  - Italian
  - Japanese
  - Korean
  - Portuguese
  - Russian
  - Spanish
  - Turkish
- AI assistant chat on the main page
- Translation history saved in Firestore
- Free-user translation counter and limit handling
- Upgrade page for premium plan presentation
- Static frontend served by the backend

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| AI | Google Gemini API |
| Auth | Firebase Authentication |
| Database | Firebase Firestore |
| Configuration | `.env` |

## Project Structure

```text
AIWave-projet/
|-- backend/
|   |-- controllers/
|   |   `-- translateController.js
|   |-- middleware/
|   |   `-- Authmiddleware.js
|   |-- routes/
|   |   `-- translateRoutes.js
|   |-- services/
|   |   `-- aiService.js
|   |-- package.json
|   `-- server.js
|-- frontend/
|   |-- assets/
|   |   `-- Logo.png
|   |-- css/
|   |   `-- style.css
|   |-- js/
|   |   |-- auth.js
|   |   |-- firebase.js
|   |   |-- history.js
|   |   `-- translate.js
|   |-- history.html
|   |-- index.html
|   |-- login.html
|   |-- register.html
|   `-- upgrade.html
`-- README.md
```

## Setup

### Prerequisites

- Node.js 16 or newer
- A Google AI Studio API key for Gemini
- A Firebase project with Authentication and Firestore enabled
- Firebase Admin service account values for backend token verification

### Install Dependencies

```bash
cd backend
npm install
```

### Environment Variables

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_admin_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

`GEMINI_MODEL` is optional. If it is missing or unsupported, the service tries fallback Gemini models.

The frontend Firebase client config is currently stored in `frontend/js/firebase.js`.

## Run The App

From the backend folder:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

The Express server serves both the API and the static frontend.

## API Endpoints

### `POST /api/translate`

Translates text with Gemini. Requires a Firebase bearer token.

Request body:

```json
{
  "text": "Hello world",
  "language": "es"
}
```

Response example:

```json
{
  "success": true,
  "originalText": "Hello world",
  "translatedText": "Hola mundo",
  "language": "es",
  "isSubscribed": false,
  "translationCount": 1,
  "remainingTranslations": 14
}
```

### `POST /api/chat`

Sends a message to the AI assistant. Requires a Firebase bearer token.

Request body:

```json
{
  "message": "Explain when to use usted in Spanish."
}
```

Response example:

```json
{
  "success": true,
  "message": "Explain when to use usted in Spanish.",
  "answer": "..."
}
```

### `GET /test`

Simple server health check.

## How It Works

1. The user signs in through Firebase Authentication.
2. The frontend gets a Firebase ID token.
3. Translation and chat requests are sent to the backend with `Authorization: Bearer <token>`.
4. `Authmiddleware.js` verifies the token with Firebase Admin.
5. `translateController.js` handles request validation, free-user limits, and API responses.
6. `aiService.js` builds the Gemini prompt and returns the AI result.
7. The frontend displays the result and saves translations to Firestore history.

## Current Limitations

- File import/export is not implemented.
- Manual editing of saved translations is not implemented.
- The context textarea exists in the UI, but it is not currently sent to the backend translation prompt.
- Subscription/payment processing is not implemented; the upgrade page is currently presentation-only.
- The free translation limit is enforced for non-subscribed users based on Firestore history count.

## Useful Commands

```bash
cd backend
npm start
npm run dev
```

Syntax checks used during development:

```bash
node --check backend/services/aiService.js
node --check frontend/js/translate.js
```

## Contribution

This is a student project. Contributions are currently limited to the project team.
