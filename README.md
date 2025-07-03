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
2.  **Open `index.html` in your browser** to run the application.