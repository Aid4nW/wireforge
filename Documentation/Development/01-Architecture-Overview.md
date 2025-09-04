# 10. Architecture Overview

This document outlines the proposed architecture for the WireForge application rewrite.

## 1. Overall System Architecture

The application will follow a classic client-server architecture:

*   **Frontend:** A Next.js (React) single-page application (SPA) that runs in the user's browser.
*   **Backend:** A FastAPI (Python) application that provides a RESTful API for the frontend.
*   **Database:** A PostgreSQL database for persistent data storage.

```
[Client (Browser)] <--> [Backend (FastAPI)] <--> [Database (PostgreSQL)]
```

## 2. Frontend Architecture

The frontend will be responsible for the user interface and all client-side logic.

*   **Framework:** Next.js with React. This provides a modern, performant, and scalable foundation.
*   **State Management:** Zustand will be used for global state management. It's simple, lightweight, and avoids boilerplate.
*   **Component Library:** We will build a custom, reusable component library using React components. Storybook will be used to develop, document, and test these components in isolation, ensuring UI consistency.
*   **Styling:** Tailwind CSS will be used for styling. This utility-first CSS framework will allow us to rapidly build a modern, responsive, and customizable UI.
*   **Harness Design Canvas:** A 2D canvas will be the core of the design interface. We will use a library like `react-konva` to render and manipulate shapes on an HTML5 canvas, providing a smooth and interactive user experience.

## 3. Backend Architecture

The backend will handle business logic, data persistence, and API endpoints.

*   **Framework:** FastAPI. This modern Python framework is fast, easy to use, and comes with automatic API documentation.
*   **Database ORM:** SQLAlchemy will be used as the Object-Relational Mapper to interact with the PostgreSQL database. This provides a robust and flexible way to manage data.
*   **API:** A RESTful API will be exposed for the frontend. The API will be documented using the OpenAPI standard (provided automatically by FastAPI).

## 4. Database Schema

The database will store all user and design data. Here is a high-level overview of the main tables:

*   **users:** Stores user account information (id, username, email, password hash).
*   **projects:** Represents a user's saved design project (id, user_id, name, description).
*   **harnesses:** The core harness design associated with a project (id, project_id, design_data). The `design_data` will likely be a JSONB field containing the serialized state of the canvas (nodes, wires, components).
*   **components:** A library of standard and user-defined components (id, user_id, name, type, properties). `user_id` will be null for standard components.

This architecture aims to create a solid foundation for a scalable, maintainable, and user-friendly application.
