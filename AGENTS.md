# WireForge Agent Guide (AGENTS.md)

This document provides guidance for AI agents and human developers working on the WireForge project.

## Project Overview

WireForge is an open-source project to create a free and user-friendly tool for designing automotive wiring harnesses. It aims to provide an alternative to expensive commercial software, making wiring harness design accessible to everyone.

## Technology Stack

*   **Frontend:** Next.js with React and TypeScript.
*   **Styling:** Tailwind CSS.
*   **Backend:** FastAPI (Python).
*   **Database:** PostgreSQL.

## Development Conventions

*   **Code Style:** We will use Prettier for automated code formatting.
*   **Styling:** The UI will be built using Tailwind CSS.
*   **Component Library:** A custom, reusable component library will be developed using React components. Storybook will be used for development, documentation, and testing of these components.
*   **File Naming:** Use kebab-case for file names (e.g., `main-component.tsx`).
*   **Component Structure:** Organize code into logical components, each in its own directory.

## User-Driven Development

This project is driven by user stories and detailed requirements.

1.  **User Stories:** The original user stories are archived in `Documentation/Requirements_Old/source/UserStories`.
2.  **Requirements:** The new, active requirements for the project rewrite are being developed in the `Documentation/Requirements/` directory.
3.  **Development:** The software is developed based on the new requirements outlined in `Documentation/Requirements/`.

## Getting Started

**Always read the `README.md` file first** for the latest project status and setup instructions.

## Documentation and Requirements

*   The new architecture is defined in `Documentation/Development/01-Architecture-Overview.md`.
*   The new, active requirements are located in `Documentation/Requirements/`.
*   The old requirements and user stories are archived in `Documentation/Requirements_Old/`.

## Agent Instructions

*   **Understand the Goal:** Before making changes, understand the goal of the task and how it fits into the overall project.
*   **Follow Conventions:** Adhere to the development conventions outlined in this document and in the new architecture.
*   **Start Small:** Break down large tasks into smaller, manageable steps.
*   **Test Your Changes:** Ensure that your changes do not break existing functionality.

## Typical Agent Workflow

When performing development tasks, follow this general workflow:

1.  **Analyze:** Use `read_file`, `search_file_content`, and `glob` to understand the codebase, existing patterns, and conventions relevant to the task.
2.  **Plan:** Formulate a clear plan of action. If it's a significant change, consider outlining it to the user.
3.  **Implement Changes:** Use `write_file` and `replace` to modify code or create new files.
4.  **Run Linting & Tests:** After making code changes, always run the project's linting and testing scripts (e.g., `npm run lint`, `npm test`) to ensure code quality and verify functionality.
5.  **Manage Server (if applicable):** Use the appropriate scripts defined in the project's `package.json` to start, stop, and manage the development server.
6.  **Verify Manually:** If the task involves UI changes, instruct the user to manually verify the changes in the browser.
