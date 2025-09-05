# Development Plan

This document outlines the development plan for WireForge, aligned with the new architecture and active requirements.

## Phase 1: Project Setup & Core UI Shell

*   **Goal:** Establish the foundational structure for the frontend and backend applications.
*   **Tasks:**
    1.  **Backend:** Set up the initial FastAPI application.
    2.  **Backend:** Define the initial database schema in SQLAlchemy for `users`, `projects`, and `harnesses` as per the architecture.
    3.  **Frontend:** Initialize the Next.js application (already done).
    4.  **Frontend:** Implement the main application layout (`Layout.tsx`) including placeholders for the component library, canvas, and properties panel.
    5.  **Tooling:** Ensure Storybook is configured for component development.

## Phase 2: Canvas & Basic Interaction

*   **Goal:** Implement the core canvas and component manipulation features, as defined in `FR-01` and `FR-02`.
*   **Tasks:**
    1.  **Frontend (Canvas):** Integrate `react-konva` into the `HarnessCanvas.tsx` component.
    2.  **Frontend (Canvas):** Implement basic canvas features: grid, panning, and zooming (`REQ-FR-01.1`, `REQ-FR-01.2`, `REQ-FR-01.4`).
    3.  **Frontend (Component Library):** Create a basic `ComponentLibrary.tsx` that displays a static list of sample components.
    4.  **Frontend (Interaction):** Implement drag-and-drop from the component library to the canvas (`REQ-FR-02.1`).
    5.  **Frontend (Interaction):** Allow moving components on the canvas (`REQ-FR-02.2`).
    6.  **Frontend (State):** Use Zustand (`useSelectionStore.ts`) to manage the state of selected components.
    7.  **Frontend (Properties Panel):** The `PropertiesPanel.tsx` should display basic information about the selected component (`REQ-FR-02.3`).
    8.  **Frontend (Interaction):** Implement component deletion (`REQ-FR-02.4`).

## Phase 3: Wiring

*   **Goal:** Enable users to connect components with wires, as defined in `FR-03`.
*   **Tasks:**
    1.  **Frontend (Wiring):** Implement the logic to draw wires between component connection points (`REQ-FR-03.1`, `REQ-FR-03.2`).
    2.  **Frontend (State):** Add wire data to the Zustand store.
    3.  **Frontend (Properties Panel):** Display properties for selected wires (`REQ-FR-03.4`).
    4.  **Frontend (Interaction):** Implement wire deletion (`REQ-FR-03.5`).

## Phase 4: Backend Integration & Persistence

*   **Goal:** Connect the frontend to the backend to save and load designs.
*   **Tasks:**
    1.  **Backend (API):** Create API endpoints to save and load harness design data (likely as JSON).
    2.  **Frontend (API):** Create services to communicate with the backend API.
    3.  **Frontend (Persistence):** Implement "Save" and "Load" functionality that sends the canvas state to the backend and loads it back.
    4.  **Backend (Database):** Ensure the `harnesses` table correctly stores the design data.
