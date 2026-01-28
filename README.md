# Project Overview

This repository contains a full-stack web application built with a **React + TypeScript frontend**, a **Flask-based backend API**, and a **MySQL database**. The project is structured to keep each layer modular, maintainable, and independently configurable.

## Project Structure

```
/
├── frontend/        # React + TypeScript frontend
├── backend/         # Flask backend API
├── database/        # SQL setup and sample data
└── README.md        # Project overview (this file)
```

Each major component has its own dedicated README with detailed setup and usage instructions.

## Architecture Overview

The application follows a standard three-tier architecture consisting of a frontend client, backend API, and relational database. Communication between layers is handled via HTTP requests, with environment-based configuration used throughout the project.

### Architecture Diagram

```
+----------------+
|     User       |
|   (Browser)    |
+--------+-------+
         |
         | HTTP
         v
+----------------+
|  React Frontend|
|  (TypeScript)  |
+--------+-------+
         |
         | REST API (Axios)
         v
+----------------+
|  Flask Backend |
|     API        |
+--------+-------+
         |
         | SQL Queries
         v
+----------------+
|   MySQL DB     |
+----------------+
```

### Component Responsibilities

- **Frontend**
  - Renders the user interface and handles client-side routing
  - Manages authentication state and protected routes
  - Communicates with the backend via REST API calls

- **Backend**
  - Exposes REST API endpoints
  - Handles authentication and authorization
  - Processes business logic and validates requests
  - Interacts with the MySQL database

- **Database**
  - Stores persistent application data
  - Manages user accounts and application records

## Documentation Index

Refer to the following READMEs for component-specific setup and usage instructions:

- **Frontend:** `frontend/README.md`
- **Backend:** `backend/README.md`
- **Database:** `database/README.md`

## High-Level Setup Flow

To run the project locally, follow the steps below in order:

1. **Set up the database**
   - Create and start a MySQL server
   - Run `setup.sql`
   - (Optional) Run `sample.sql` for test data
     📄 See `database/README.md`

2. **Set up and run the backend**
   - Create a Python virtual environment
   - Install backend dependencies
   - Configure environment variables
   - Start the Flask API
     📄 See `backend/README.md`

3. **Set up and run the frontend**
   - Install Node.js dependencies
   - Configure frontend environment variables
   - Start the development server
     📄 See `frontend/README.md`

## Technology Stack

### Frontend

- React
- TypeScript
- React Router
- Axios
- CSS

### Backend

- Python
- Flask

### Database

- MySQL

## Notes

- Environment variables are used throughout the project for configuration.
- Frontend environment variables are public and must not contain secrets.
- Sample credentials provided in the database documentation are intended for development and testing only.
