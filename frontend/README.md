# Frontend

This directory contains the frontend application for the project. The frontend is built with **React**, **TypeScript**, and **Tailwind CSS**, and communicates with the backend Flask API to handle authentication, data retrieval, and user interactions.

## Tech Stack

- React
- TypeScript
- React Router
- Axios
- Tailwind CSS
- CSS (for global and custom styles when needed)

## Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

## Setup

### 1. Install Dependencies

From the frontend directory, install all required packages:

```bash
npm install
```

### 2. Tailwind CSS Setup

Tailwind CSS is used for utility-first styling across the application.

If Tailwind is not already installed, initialize it with:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js` to include your source files:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add Tailwind’s base styles to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind utility classes can now be used throughout the project.

### 3. Environment Configuration

Create a `.env` file in the root of the frontend directory and define the backend API URL.

If using **Vite**:

```env
VITE_BACKEND_API_URL=http://localhost:5000
```

> This value should point to the running backend server.

⚠️ **Important:** Frontend environment variables are publicly accessible and bundled at build time. Do **not** store secrets or private keys in this file.

## Running the Frontend

Start the development server with:

```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal (commonly `http://localhost:5173`).

## Project Structure

```
src/
├── components/     # Reusable UI components (styled with Tailwind)
├── context/        # Global state and authentication context
├── pages/          # Page-level components and routes
├── types/          # Shared TypeScript types and interfaces
├── App.tsx         # Application routes and layout
├── main.tsx        # Application entry point
├── index.css       # Global styles and Tailwind directives
```

## Styling Notes

- Tailwind CSS is the primary styling solution.
- Utility classes are used directly in JSX for rapid UI development.
- Global styles and overrides (if needed) live in `index.css`.
- Component-specific styling should prefer Tailwind over custom CSS unless necessary.

## Backend Integration

The frontend communicates with the backend using Axios. The API base URL is configured globally at application startup using the environment variable defined in `.env`.

Authentication and user state are managed through a custom context provider.

## Notes

- Ensure the backend server is running before starting the frontend.
- Sample user credentials (if using sample database data) are documented in the database setup instructions.
- This frontend assumes the backend is configured to allow CORS and credentials if authentication cookies are used.
