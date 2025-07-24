# Phase 2: Advanced Design & Documentation (Detailed Plan)

This phase builds upon the MVP foundation to add features required by professional shops, engineers, and serious hobbyists. The focus is on enabling more complex designs, providing robust documentation, and allowing for greater user customization.

## Core Technology Selections

To achieve our goals, we will integrate the following technologies:

- **State Management: Zustand**
  - **Reasoning:** As application complexity grows, managing state with only React hooks becomes cumbersome. Zustand provides a simple, unopinionated, and scalable solution. Its minimal boilerplate and hook-based API integrate seamlessly into a React environment, making it easier to manage complex state like canvas interactions and library data without the overhead of Redux.

- **PDF Generation: `@react-pdf/renderer`**
  - **Reasoning:** For professional documentation, we need high-quality, customizable PDF exports. `@react-pdf/renderer` allows us to define PDF documents declaratively using React components. This approach is a natural fit for our stack and makes it simple to create complex layouts for diagrams and Bills of Materials (BOMs) that include user-defined branding.

## Detailed Implementation Plan & Architecture

We will approach development in four distinct milestones.

### Milestone 1: Data Model Evolution
The first step is to extend our core data structures to support the new features. This will likely involve modifying types in `frontend/utils/types.ts` or a similar location.

- **Wire Properties:** Add `serviceLoop` (e.g., `{ length: number }`) and `twist` (e.g., `{ type: 'concentric', pitch: number }`) properties.
- **Component & Wire Properties:** Add a flexible `customProperties: Record<string, string | number>` field to allow users to add arbitrary data (e.g., Supplier, Part Number, Material).

### Milestone 2: Advanced Canvas Features & Global Settings
Next, we will implement the UI and logic for the new design features on the harness canvas.

- **UI/UX - Global Settings:**
  - A new "Harness Settings" panel will be added to the UI, likely in a sidebar.
  - This panel will allow users to set a global default service loop length and default concentric twisting properties for the entire harness.
- **UI/UX - Toolbar for Overrides:**
  - A toolbar on the canvas will provide tools to override the global settings for specific wires or groups of wires.
- **Logic:**
  - The application will first check for local overrides on a wire or component.
  - If no local override is present, it will fall back to the global harness settings.
  - Wire length calculations will factor in both global settings and local overrides.

### Milestone 3: Custom Component Library
This milestone focuses on giving users the ability to create and manage their own component libraries.

- **UI/UX:**
  - A new, dedicated page accessible from the main navigation, titled "My Library".
  - This page will display a grid or list of the user's custom-created components.
  - A "Create New Component" form/modal will allow users to define a component's name, category, and add custom properties.
- **Data Management:**
  - A new utility module (e.g., `frontend/utils/customLibraryManager.ts`) will handle all CRUD (Create, Read, Update, Delete) operations.
  - For this phase, all custom library data will be stored in the browser's local storage under a dedicated key (e.g., `wireforge-custom-library`).

### Milestone 4: Professional Documentation & Export
The final milestone is to deliver professional-grade documentation export features.

- **BOM Customization UI:**
  - An "Export Options" modal will be presented before any BOM or design export.
  - This modal will allow users to toggle which columns appear in the BOM (including any custom properties they've added).
  - It will include a field for users to upload a company logo, which will be saved in local storage and embedded in the PDF.
- **PDF Export with `@react-pdf/renderer`:**
  - A new React component (e.g., `frontend/components/Export/BomPdfDocument.tsx`) will define the PDF structure.
  - The exported PDF will feature:
    1.  The user's uploaded logo in the header.
    2.  A snapshot of the harness diagram from the canvas.
    3.  A detailed, customized BOM table.

## Fulfilled Requirements

This phase will address the following key requirements:

### Functional Requirements
- **REQ-FUNC-CAN-003 (Advanced Harness Features):** Support for service loops and concentric twisting.
- **REQ-FUNC-LIB-002 (Custom Component Creation):** Users will be able to create and save their own components.
- **REQ-FUNC-BOM-002 (Customizable BOM Templates):** Users will be able to customize BOM content and appearance.

### Product Requirements
- **REQ-PROD-CS-001, REQ-PROD-CS-002, REQ-PROD-CS-003, REQ-PROD-CS-004** (Clubsport Shop)
- **REQ-PROD-CRS-001, REQ-PROD-CRS-002, REQ-PROD-CRS-004** (Custom Restoration Shop)
- **REQ-PROD-MS-001, REQ-PROD-MS-002, REQ-PROD-MS-004, REQ-PROD-MS-005** (Motorsport Shop)
- **REQ-PROD-ES-001, REQ-PROD-ES-004** (Engineering Student)

## Refined Testing Strategy

### 1. Unit Tests (Jest)
- **Zustand Store:** Test all new state management actions and selectors related to advanced features.
- **Calculation Logic:** Create specific tests for `calculateWireLength` to ensure it correctly accounts for service loops.
- **`customLibraryManager.ts`:** Test all CRUD operations, ensuring they correctly manipulate local storage.
- **`BomPdfDocument.tsx`:** Write snapshot tests to ensure the PDF's structure remains consistent and correctly renders props like logos and custom columns.

### 2. Product Level Tests (Cypress)
- **`advanced-design-workflow.cy.ts`:**
  1.  **Create:** Start a new design.
  2.  **Custom Component:** Navigate to the library, create a custom connector, and save it.
  3.  **Design:** Return to the canvas and add the custom connector to the design.
  4.  **Advanced Features:** Add a wire with a service loop. Select a group of wires and apply concentric twisting. Add a custom property to a component.
  5.  **Export:** Trigger the PDF export, upload a logo, and customize the BOM to include the new custom property.
  6.  **Verify:** Verify that a PDF is downloaded. (Automated content verification of PDFs is complex, but we can check for file existence and name).
- **`custom-component-workflow.cy.ts`:**
  1.  **Create:** Create multiple custom components.
  2.  **Edit:** Edit the properties of one component.
  3.  **Delete:** Delete another component.
  4.  **Persist:** Reload the application and verify that the changes to the custom library have persisted in local storage.

