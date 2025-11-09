# 🧠 AI Note Taking App

A **modern, full-stack note-taking platform** powered by **Google Gemini AI** — built with **Next.js App Router**, **Drizzle ORM**, and **BetterAuth**.
This app lets users **create, edit, and organize notes**, while leveraging **AI to summarize, improve writing, and generate tags** — all with a sleek, minimal UI powered by **Shadcn UI**.

---

## ✨ Key Features

### 📝 Rich Text Note Editing

* Beautiful and intuitive editor built using **Minimal Tiptap (Shadcn integration)**.
* Supports fully formatted rich text stored as HTML for AI processing.

### 🧠 AI-Powered Enhancements

* **Generate Summary:** Automatically condenses your note into a meaningful summary.
* **Improve Content:** Enhances tone, grammar, and structure using Gemini AI.
* **Generate Tags:** Suggests relevant tags intelligently based on content.

### 🔐 Authentication

* Powered by **BetterAuth** with session-based security.
* Supports both sign-in and sign-up with email and password.

### 📦 Modern Data Layer

* **PostgreSQL + Drizzle ORM** for strong type-safety and clean migrations.
* Uses **React Query** for real-time data synchronization and optimistic UI updates.

### ⚡ Smooth UX

* Optimistic updates for instant feel.
* Shadcn UI components for consistent design language.
* Smart loading states (skeletons, toasts, and spinners).

### 📱 Fully Responsive

* Clean mobile-first layout with adaptive sidebars and floating action buttons (FABs).

---

## 🛠️ Tech Stack

| Category           | Technology                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | [Next.js 14 (App Router)](https://nextjs.org/), [React 18](https://react.dev/), [Shadcn/UI](https://ui.shadcn.com/) |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/)                                                                            |
| **Editor**         | [Minimal Tiptap (Shadcn Editor)](https://www.shadcn.io/registry/minimal-tiptap.json)                                |
| **Database**       | [PostgreSQL](https://www.postgresql.org/)                                                                           |
| **ORM**            | [Drizzle ORM](https://orm.drizzle.team/)                                                                            |
| **Authentication** | [BetterAuth](https://www.better-auth.com/)                                                                          |
| **AI**             | [Google Gemini API](https://ai.google.dev/)                                                                         |
| **Validation**     | [Zod](https://zod.dev/)                                                                                             |
| **Data Fetching**  | [React Query](https://tanstack.com/query)                                                                           |
| **Deployment**     | [Coolify](https://coolify.io/) with Nixpacks + Drizzle migrations                                                   |

---

## 🧩 Project Architecture

The app follows a **Server Actions–first** and **API-light** architecture for simplicity, scalability, and performance.

### 🧱 Core Structure

```bash

app/

 ├── layout            # Root layout

 ├── page              # Landing layout

 ├── auth/             # Sign-in & Sign-up routes

 ├── dashboard/        # Auth-protected user dashboard

 ├── api/              # API endpoints for notes

components/

 ├── dashboard/        # Floating Action Button, New Note Dialog, Note Form

 ├── layout/           # Footer, Navbar

 ├── notes/            # NoteCard, EditNoteDialog, AI Actions, Search Bar, Tags Editor

 ├── sections/         # Features, Hero, Testimonial, Waitlist sections

 ├── ui/               # Shadcn UI components

lib/

 ├── api/              # API abstractions (e.g., notes.ts)

 ├── better-auth/      # BetterAuth configuration

 ├── db/               # Drizzle config & schema

 ├── geminiai/         # AI integration (Gemini)

 └── validations/      # Zod schemas for validation

contexts/

 ├── authProvider.tsx  # Global BetterAuth context

 ├── queryClientProvider.tsx # React Query provider

 └── themeProvider.tsx # Theme context

hooks/                 # Custom React hooks (e.g., use-mobile, useAuth)

services/              # API service definitions

types/                 # TypeScript type definitions

utils/                 # Utility functions

```

---

### 🤖 Gemini AI Integration

Located in `lib/geminiai/analyze-note.ts`, the **`analyzeNote()`** server action handles all AI operations:

1. Receives a **note ID** and **AI task** (`summarize`, `improve`, `tags`).
2. Fetches the note from the database (content in HTML).
3. Crafts a **system + user prompt** dynamically.
4. Calls **Gemini 2.5 Flash** via:

   ```ts
   const result = await geminiAIClient.models.generateContent({
     model: "gemini-2.5-flash",
     contents: [
       {
         role: "user",
         parts: [
           {
             text: `${systemPrompt}\n\n${userPrompt}`,
           },
         ],
       },
     ],
   });
   ```

5. Returns AI output (`summary`, `improved HTML`, or `tags`).

AI is triggered client-side via `ai-actions-dropdown.tsx`, which uses:

```ts
const { mutate } = useMutation({
  mutationFn: () => analyzeNote({ id, action: "summarize" }),
});
```

---

## 🧠 Data Flow

### Notes CRUD

| Action | Path                         | Handler                              |
| ------ | ---------------------------- | ------------------------------------ |
| Create | `/api/notes` (POST)          | Inserts note with user FK            |
| Read   | `/api/notes` (GET)           | Fetches notes per authenticated user |
| Update | `/api/notes/:id` (PATCH/PUT) | Updates note content, summary, tags  |
| Delete | `/api/notes/:id` (DELETE)    | Removes user-owned note              |

### AI Actions

| Action            | Description                          |
| ----------------- | ------------------------------------ |
| **Summarize**     | Condenses note text via Gemini       |
| **Improve**       | Refines content in HTML (for Tiptap) |
| **Generate Tags** | Produces context-aware topic tags    |

---

## 🚀 Getting Started

### 🧩 Prerequisites

* Node.js ≥ 18
* npm or pnpm
* PostgreSQL
* A valid [Google Gemini API Key](https://ai.google.dev/)

---

### ⚙️ Installation

#### 1️⃣ Clone & Install

```bash
git clone https://github.com/vikramsamak/ai-note-taking-app.git
cd ai-note-taking-app
npm install
```

#### 2️⃣ Environment Variables

Create `.env` in the root:

```env
# Publicly accessible API base URL for the frontend
NEXT_PUBLIC_API_BASE_URL=base-url

# Database connection string
DATABASE_URL=database-url

# Secret for BetterAuth to sign session cookies
BETTER_AUTH_SECRET=secret

# Base URL for BetterAuth callbacks
BETTER_AUTH_URL=base-url

# Google Gemini API Key for AI functionalities
GEMINI_API_KEY=api-key
```

#### 3️⃣ Run Drizzle Migrations

```bash
npx drizzle-kit push
# or in production:
npx drizzle-kit migrate
```

#### 4️⃣ Start Development Server

```bash
npm run dev
```

Visit ➡️ [http://localhost:3000](http://localhost:3000)

---

## 🧪 Development Utilities

| Command                  | Description                       |
| ------------------------ | --------------------------------- |
| `npm run dev`            | Start Next.js in development mode |
| `npm run build`          | Build production bundle           |
| `npm run start`          | Start the production server       |
| `npm run drizzle:studio` | Open Drizzle Studio               |
| `npm run migrate`        | Run pending migrations            |
| `npm run lint`           | Lint all files                    |

---

## 🧰 Deployment (Coolify)

This project uses **Coolify + Nixpacks** for auto builds and migrations.

### Recommended Setup

```json
"scripts": {
  "prestart": "npx drizzle-kit migrate",
  "start": "next start"
}
```

Coolify runs `npm start`, which automatically runs the `prestart` migration first ✅

---

## 📘 License

This project is open-source and available under the **MIT License**.

---

## 🧭 Summary

✅ **Next.js + Server Actions** → Clean architecture
✅ **BetterAuth** → Secure authentication
✅ **Gemini AI** → Smart note enhancement
✅ **Drizzle ORM** → Type-safe DB
✅ **React Query + Shadcn UI** → Beautiful, reactive UX

---

Would you like me to include a **short “Contributing” section** and **deployment checklist** (for Coolify and local `.env` validation)? It would make this README truly production-ready for publishing on GitHub.
