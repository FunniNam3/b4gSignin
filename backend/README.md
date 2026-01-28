# Backend Setup Guide

This document outlines the steps required to set up and run the backend service.

## Prerequisites

- Python 3.x installed on your system
- `pip` available in your environment

## Backend Setup

### 1. Create a Virtual Environment

Create and activate a Python virtual environment in the project directory:

```bash
python -m venv venv
```

Activate the virtual environment:

- **Windows**

  ```bash
  venv\Scripts\activate
  ```

- **macOS / Linux**

  ```bash
  source venv/bin/activate
  ```

### 2. Install Dependencies

Install all required Python packages using the provided `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add the following configuration values:

```env
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
BACKEND_KEY=
```

Ensure all values are filled in with the appropriate credentials and secrets before running the application.

## Running the Backend

1. Activate the virtual environment (if it is not already active).
2. Start the backend server by running:

```bash
python flask-api.py
```

The backend should now be up and running.
