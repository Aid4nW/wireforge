# WireForge

## Project Overview

WireForge is an open-source project to create a free and user-friendly tool for designing automotive wiring harnesses. It aims to provide an alternative to expensive commercial software, making wiring harness design accessible to everyone.

## Business Model

The core WireForge software is free to use. Users can import and export their wiring harness models. For users who want cloud storage and synchronization across devices, a "Pro" subscription will be available for a nominal monthly fee.

The project is open-source, so users can also choose to host their own instance of WireForge for free.

## Technology Stack

The project is a web-based application built with the following technologies:

*   **Frontend:** Next.js with React and TypeScript.
*   **Styling:** Tailwind CSS.
*   **Backend:** FastAPI (Python).
*   **Database:** PostgreSQL.

## Project Status: Ground-Up Rebuild

This project is currently undergoing a complete rebuild to establish a more robust architecture and a modern, intuitive user interface. The previous codebase has been removed.

Development will proceed based on the new architecture and requirements documents.

## Getting Started

The frontend application has not been initialized yet. To set up the new Next.js application, follow these steps:

1.  **Navigate to the (currently empty) `frontend` directory:**
    ```bash
    mkdir frontend
    cd frontend
    ```
2.  **Initialize the Next.js application:**
    ```bash
    npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
    ```
    *(Note: The command above will need to be run in an interactive terminal to answer the prompts.)*

3.  **Once initialized, run the development server:**
    ```bash
    npm run dev
    ```

## Documentation

All project documentation, including architecture and requirements, is located in the `/Documentation` directory.

*   **Architecture:** `Documentation/Development/01-Architecture-Overview.md`
*   **Requirements:** `Documentation/Requirements/`
*   **Archived Documents:** `Documentation/Requirements_Old/` and `Documentation/Development/Old_Plan.md`
