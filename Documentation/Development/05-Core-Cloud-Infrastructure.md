# Phase 4: Core Cloud Infrastructure

This phase marks a significant evolution of the project, transforming it from a client-side tool into a full-fledged web application with a backend, database, and user accounts. This enables cloud storage and basic synchronization.

## Core Technologies

- **Backend:** We will now build out the **FastAPI** backend with Python.
- **Database:** **PostgreSQL** will be integrated for persistent data storage.
- **Authentication:** We will use a library like **OAuth2 with JWT tokens** for secure user authentication.
- **Frontend-Backend Communication:** We will use RESTful API calls to connect the Next.js frontend to the FastAPI backend.

## Architecture

- **Client-Server Model:** The application will shift from a pure client-side model to a client-server architecture.
- **API Endpoints:** A comprehensive set of API endpoints will be created to handle:
    - User registration and login.
    - CRUD (Create, Read, Update, Delete) operations for user projects/designs.
- **Database Schema:** A robust database schema will be designed to store user accounts, projects, and their relationships.
- **Data Migration:** A strategy will be needed to allow users to migrate their locally saved designs to the new cloud-based system.

## Fulfilled Requirements

This phase will address the following key requirements:

### Non-Functional Requirements
- **REQ-NON-SEC-001 (Secure User Authentication):** Implementation of a secure login system.
- **REQ-NON-SEC-002 (Data Privacy):** Ensuring users can only access their own data unless explicitly shared.

### Product Requirements
- **REQ-PROD-OSA-003 (Open Source Advocate):** This requirement begins to be fulfilled in this phase with the open-source backend, and will be fully addressed in Phase 8 with self-hosting capabilities.

## Testing Strategy

### 1. Unit Tests
- **Backend API Endpoints:** Each API endpoint will be thoroughly tested to ensure it handles valid and invalid requests correctly (e.g., correct data, missing data, unauthorized access).
- **Authentication Logic:** Test the user registration, login, and token generation/validation logic.
- **Database Interactions:** Test the functions that interact with the database to ensure data is stored and retrieved correctly.

### 2. Product Level Tests (End-to-End)
- **User Registration and Login Flow:** Create a test that signs up a new user, logs them in, and logs them out.
- **Cloud Save/Load Workflow:** Write a test to create a design, save it to the cloud, log out, log back in, and ensure the design can be loaded successfully.
