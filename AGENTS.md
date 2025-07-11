# WireForge Agent Guide (AGENTS.md)

This document provides guidance for AI agents and human developers working on the WireForge project.

## Project Overview

WireForge is an open-source project to create a free and user-friendly tool for designing automotive wiring harnesses. It aims to provide an alternative to expensive commercial software, making wiring harness design accessible to everyone.

## Business Model

The core WireForge software is free to use. Users can import and export their wiring harness models. For users who want cloud storage and synchronization across devices, a "Pro" subscription will be available for a nominal monthly fee.

The project is open-source, so users can also choose to host their own instance of WireForge for free.

## Technology Stack

The project will be a web-based application built with the following technologies:

*   **Frontend:** We will use a Next.js with React framework to create a Progressive Web App (PWA).
*   **Backend:** A FastAPI backend will provide the API for the frontend.
*   **Database:** A PostgreSQL database will be used for data storage.

## Development Conventions

*   **Code Style:** Follow standard best practices for HTML, CSS, and JavaScript. Use Prettier for code formatting.
*   **File Naming:** Use kebab-case for file names (e.g., `main-component.js`).
*   **Component Structure:** Organize code into logical components, each in its own directory.

## User-Driven Development

This project is driven by user stories. The development process is as follows:

1.  **User Stories:** We capture user needs in the form of user stories. Each story is a standalone markdown file in the `Documentation/UserStories` directory. The format for user stories is: "As a [USER ROLE], I want [GOAL OR OBJECTIVE], so that [REASON OR BENEFIT]".
2.  **Requirements:** User stories are then translated into detailed requirements, which are documented in the `Documentation/Requirements` directory.
3.  **Development:** The software is then developed based on these requirements.

## Getting Started

1.  **Clone the repository:** `git clone https://github.com/your-username/wireforge.git`
2.  **Open `index.html` in your browser** to run the application.

## Documentation and Requirements Tracing

We will use Sphinx for generating project documentation and Sphinx-needs for requirements tracing. All documentation and requirements will be kept within the repository, following the process outlined in `Plans/01-Requirements_planning.md`.

Key aspects include:
*   **User Stories:** Captured in `Documentation/UserStories` as primary input.
*   **Requirement Definition:** Detailed requirements documented in `Documentation/Requirements`.
*   **Traceability:** Each requirement traces back to user stories.
*   **Verification:** Requirements include acceptance criteria.
*   **Structure:** Organized into Product, Functional, and Non-functional categories within `Documentation/Requirements`.

## Agent Instructions

*   **Understand the Goal:** Before making changes, understand the goal of the task and how it fits into the overall project.
*   **Follow Conventions:** Adhere to the development conventions outlined in this document.
*   **Start Small:** Break down large tasks into smaller, manageable steps.
*   **Test Your Changes:** Ensure that your changes do not break existing functionality.

## Common Development Issues and Solutions

*   **Recurring `ENOENT` error with Next.js:** If you encounter `ENOENT: no such file or directory, open '/Users/entity/Local Documents/git/wireforge/frontend/.next/server/pages/_document.js'`, it often indicates a corrupted Next.js build cache. The current workaround is to delete the `.next` directory (`rm -rf .next` in the `frontend` directory) and restart the development server.
*   **Interactive `npm test` or `npm lint`:** These commands might enter an interactive mode that the agent cannot respond to. Ensure the `test` script in `package.json` uses `jest --ci` for non-interactive testing, and that an `.eslintrc.json` file exists for non-interactive linting.
*   **React `act()` warnings in tests:** When testing React components, state updates should be wrapped in `act()` to ensure all updates are processed before assertions. For example: `act(() => { fireEvent.click(element); });`
