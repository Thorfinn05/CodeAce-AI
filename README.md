# CodeAce - AI-Powered Learning & Development Environment

CodeAce is a modern, responsive web platform where users can write, test, and improve code, receive instant feedback and learning suggestions from an AI mentor, and track their coding progress over time.

## Getting Started

This is a Next.js project bootstrapped with `create-next-app`, enhanced with Firebase integration and Genkit for AI features.

First, ensure you have Node.js and npm installed.

Then, set up your environment variables:
1. Create a `.env` file in the root of the project.
2. Add your Firebase configuration and Gemini API key:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   GEMINI_API_KEY=your_gemini_api_key
   ```

Install dependencies:
```bash
npm install
```

Run the development server for Next.js:
```bash
npm run dev
```

Run the Genkit development server (in a separate terminal):
```bash
npm run genkit:dev
```
Or for watching changes:
```bash
npm run genkit:watch
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the CodeAce application.
The Genkit developer UI will be available at [http://localhost:4000](http://localhost:4000).

## Key Features

-   **Authentication**: Secure sign-up and login with Email/Password and Google (via Firebase Auth).
-   **Interactive Coding Practice**: Solve problems in an embedded code editor.
-   **AI-Powered Feedback**: Get instant analysis on your code for logic, style, and efficiency.
-   **Code Review Coach**: Submit code snippets for comprehensive AI review.
-   **Learning Roadmap**: Visualize and track your progress across various coding topics.
-   **Snippet Library**: Save, manage, and tag your code snippets.
-   **Leaderboard**: Compete with other users and track your rank.
-   **Personalized Dashboard**: Get an overview of your stats, recent activity, and suggested challenges.
-   **Profile Management**: Customize your profile and track achievements.

## Tech Stack

-   **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui, Lucide Icons
-   **Backend**: Firebase (Auth, Firestore)
-   **AI**: Genkit (with Google Gemini)
-   **Styling**: Tailwind CSS, PostCSS
-   **Deployment**: Firebase Hosting (for Next.js app)

## Project Structure

-   `src/app`: Next.js App Router pages.
-   `src/components`: Reusable UI components.
-   `src/lib`: Utility functions, Firebase configuration.
-   `src/hooks`: Custom React hooks (e.g., `useAuth`).
-   `src/ai`: Genkit flows and AI-related logic.
-   `src/types`: TypeScript type definitions.
