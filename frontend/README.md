# Frontend

This directory contains the frontend application for the project. The frontend is built with **React** and **TypeScript** and communicates with the backend Flask API to handle authentication, data retrieval, and user interactions.

## Tech Stack

- React
- TypeScript
- React Router
- Axios
- CSS

## Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

## Setup

### 1. Install Dependencies

From the frontend directory, install all required packages:

```bash
npm install
```

### 2. Environment Configuration

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
├── components/     # Reusable UI components
├── context/        # Global state and authentication context
├── pages/          # Page-level components and routes
├── types/          # Shared TypeScript types and interfaces
├── App.tsx         # Application routes and layout
├── main.tsx        # Application entry point
├── index.css       # Global styles
```

## Backend Integration

The frontend communicates with the backend using Axios. The API base URL is configured globally at application startup using the environment variable defined in `.env`.

Authentication and user state are managed through a custom context provider.

## Notes

- Ensure the backend server is running before starting the frontend.
- Sample user credentials (if using sample database data) are documented in the database setup instructions.
- This frontend assumes the backend is configured to allow CORS and credentials if authentication cookies are used.
