# ButtonCounter

A full-stack web application developed as a team project using SvelteKit, TypeScript, and Turso.

## Overview

ButtonCounter is a simple counter web app built with SvelteKit and TypeScript, using Turso (libSQL) as the database. The click count is persisted to the database so it survives page reloads and is shared across users.

## Tech Stack

- **Framework:** SvelteKit
- **Language:** TypeScript
- **Database:** Turso (libSQL)
- **Database Client:** `@libsql/client`
- **Package Manager:** npm

## Requirements

Before setting up the project, make sure you have:

- Node.js
- npm
- Git
- A Turso account or access to the team's Turso database

## Setup

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/CyLeap/ButtonCounter.git
cd ButtonCounter
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Configure environment variables

Create a `.env` file in the project root:

\`\`\`env
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token
\`\`\`

> **Note:** Never commit your `.env` file. Make sure it's listed in `.gitignore`.

### 4. Start the development server

\`\`\`bash
npm run dev
\`\`\`

Or start the server and open it in the browser automatically:

\`\`\`bash
npm run dev -- --open
\`\`\`

The app will be available at `http://localhost:5173` by default.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run check`   | Run type-checking (svelte-check)     |
