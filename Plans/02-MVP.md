# Phase 1: Minimum Viable Product (MVP) for the DIY Hobbyist

This phase will focus on creating a usable tool for the largest and most straightforward user group: the DIY Hobbyist. The goal is to deliver a functional, client-side application that provides core value quickly.

## Core Technologies

- **Frontend:** Next.js with React and TypeScript. We will use a 2D graphics library like `react-konva` or `two.js` to implement the harness design canvas.
- **Styling:** Standard CSS with Prettier for formatting.
- **Backend & Database:** For the MVP, we will focus on a pure client-side application. The backend (FastAPI) and database (PostgreSQL) outlined in the project's technology stack will be integrated in later phases when cloud storage and collaboration features are introduced.

## Architecture

The MVP will be a single-page application (SPA) running entirely in the user's browser.

- **Component-Based Structure:** The UI will be built using React components.
- **Canvas Logic:** The main canvas component will manage the state of the harness design, including components, wires, and their positions.
- **State Management:** We will use React's built-in state management (useState, useReducer) for simplicity in the MVP.
- **Local Storage:** Design data will be saved to and loaded from the browser's `localStorage` or IndexedDB, allowing users to persist their work between sessions on the same machine.

## Fulfilled Requirements

This MVP will address the following key requirements, primarily satisfying the needs of the DIY Hobbyist, Educator, and Student personas:

### Functional Requirements
- **REQ-FUNC-CAN-001 (Visual Component Placement):** Users will be able to drag and drop components onto the canvas.
- **REQ-FUNC-CAN-002 (Wire and Connection Drawing):** Users will be able to draw wires between component pins.
- **REQ-FUNC-LIB-001 (Pre-populated Component Library):** A basic library of common components will be available.
- **REQ-FUNC-BOM-001 (Automatic Bill of Materials Generation):** A simple version of this will be implemented, allowing export to CSV.

### Product Requirements
- **REQ-PROD-DIY-001 (Safe and Reliable Harness Creation):** Providing the basic tools to create a functional design.
- **REQ-PROD-DIY-002 (Budget-Friendly Design):** The BOM export will help users estimate costs.
- **REQ-PROD-DIY-003 (Learning and Accomplishment Support):** The core design experience supports this goal.
- **REQ-PROD-DIY-004 (Simplicity and Intuitive Use):** The UI will be designed for ease of use.
- **REQ-PROD-EDU-001 (Accessible Learning Tools):** The free, browser-based MVP serves as an accessible tool.
- **REQ-PROD-EDU-002 (Core Concept Illustration):** The visual canvas is a primary tool for illustrating electrical concepts.
- **REQ-PROD-EDU-003 (Engaging Project Creation):** The core toolset enables the creation of educational projects.
- **REQ-PROD-ES-002 (Theoretical Knowledge Application):** Provides a practical tool for applying classroom theory.

### Non-Functional Requirements
- **REQ-NON-USA-001 (Intuitive User Interface):** This will be a primary focus of the MVP design.
- **REQ-NON-PER-001 (Responsive Canvas):** The canvas must be smooth and responsive for a good user experience.
- **REQ-NON-PER-002 (Fast Application Loading):** The application must load quickly to be accessible and not deter users.

## Testing Strategy

To ensure a high-quality and robust MVP, we will implement a two-tiered testing strategy that includes both unit and product-level (end-to-end) tests.

### 1. Unit Tests

We will use **Jest** and **React Testing Library** to test individual components and logic in isolation.

-   **Component Rendering:** Verify that all React components render correctly with different props.
-   **State Management:** Test all state-altering logic (e.g., adding/moving components, drawing wires) to ensure the application state remains consistent and predictable.
-   **Utility Functions:** Write tests for pure functions, especially the **BOM Generation** logic, to confirm that given a specific design state, the CSV output is accurate.

### 2. Product Level Tests (End-to-End)

We will use a browser automation tool like **Cypress** or **Playwright** to test key user workflows from start to finish.

-   **Core Design Workflow:**
    1.  Load the application.
    2.  Drag multiple components onto the canvas.
    3.  Draw wires to connect them.
    4.  Assert that the visual representation is correct.
-   **Save/Load Functionality:**
    1.  Create a design.
    2.  Save the design to local storage.
    3.  Reload the page.
    4.  Load the design from local storage.
    5.  Assert that the design is fully restored.
-   **BOM Export Workflow:**
    1.  Create a known design.
    2.  Trigger the BOM export.
    3.  Assert that a file is downloaded and that its contents are correct.

This comprehensive testing approach will validate both the internal logic and the overall user experience, providing a strong foundation for future development.
