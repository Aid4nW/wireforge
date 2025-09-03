# Old Development Plan

This document summarizes the previous, phased development plan for WireForge. This plan has been archived in favor of a new development strategy.

## Original Phased Approach

The project was previously broken down into the following phases:

### Phase 1: Minimum Viable Product (MVP)

*   **Focus:** A client-side only application for the DIY Hobbyist persona.
*   **Core Features:**
    *   Visual component placement on a canvas.
    *   Drawing wires between components.
    *   Automatic Bill of Materials (BOM) generation.
    *   Saving and loading designs to/from browser local storage.
*   **Technology:** Next.js, React, `react-konva` for the canvas.
*   **Sub-phases:**
    *   **1A: UX Improvements:** Initial refactor to adopt `react-konva`.
    *   **1B: Dockerization:** Dockerize the frontend application.
    *   **1C: Dockerize Everything:** Extend Docker setup to include documentation builds and testing.
    *   **1D: UI Overhaul:** Implement global styling, dark mode, and a complete layout overhaul.

### Phase 2: Advanced Design & Documentation

*   **Focus:** Adding features for professional users (engineers, shops).
*   **Core Features:**
    *   Advanced wire properties (e.g., service loops, concentric twisting).
    *   User-created custom component libraries.
    *   Professional PDF documentation export with custom branding.
*   **Technology:** Zustand for state management, `@react-pdf/renderer` for PDF generation.

### Phase 3: Data Exchange & Validation

*   **Focus:** Interoperability and design quality.
*   **Core Features:**
    *   Import and export of industry-standard formats (e.g., KBL).
    *   Automated design rule checking (DRC) and validation engine.

### Phase 4: Core Cloud Infrastructure

*   **Focus:** Transitioning to a full-stack application.
*   **Core Features:**
    *   FastAPI backend and PostgreSQL database.
    *   User authentication (accounts, login/logout).
    *   Cloud storage for user designs.

### Phase 5: Collaboration & Advanced Cloud

*   **Focus:** Multi-user features.
*   **Core Features:**
    *   Sharing designs with other users.
    *   Access control and permissions.
    *   Version history for designs.

### Phase 6: Public API

*   **Focus:** Extensibility.
*   **Core Features:**
    *   Exposing a versioned, stable, public API for third-party integrations.

### Phase 7: Plugin System

*   **Focus:** Community contributions.
*   **Core Features:**
    *   A plugin architecture for both frontend and backend to allow the community to add new functionality (e.g., new export formats, custom validation rules).

### Phase 8: Self-Hosting & Open Data

*   **Focus:** Openness and user empowerment.
*   **Core Features:**
    *   Ensuring primary data formats are open and documented.
    *   Providing comprehensive guides for self-hosting the entire application stack.
