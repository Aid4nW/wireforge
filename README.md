# WireForge

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

## Documentation and Requirements Tracing

We use Sphinx for generating project documentation and Sphinx-needs for requirements tracing. All documentation and requirements are kept within the `Documentation/Requirements` directory, categorized into Product, Functional, and Non-functional requirements.

## Getting Started

1.  **Clone the repository:** `git clone https://github.com/your-username/wireforge.git`
2.  **Navigate to the frontend directory:** `cd frontend`
3.  **Install dependencies:** `npm install`
4.  **Run the development server:** `npm run dev`
    *   The application will be accessible at `http://localhost:3000`.

## Current Development Status

We have successfully integrated `react-konva` as the 2D graphics library for the harness design canvas, replacing the initial HTML/SVG implementation. Key functionalities like component placement (drag-and-drop) and wire drawing are now implemented and functional.

### Testing

Unit tests are implemented using Jest and React Testing Library, covering core canvas interactions and BOM generation. End-to-end testing is planned for future phases.