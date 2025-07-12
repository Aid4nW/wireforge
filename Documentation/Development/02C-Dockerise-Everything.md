# Phase 1-C: Dockerize Documentation and Frontend Testing

This phase focuses on enhancing our Docker setup to include documentation building and enabling test execution within the frontend container.

## 1. Dockerize Documentation Build

### Goal
To create a dedicated Docker service for building the project documentation using Sphinx. This ensures a consistent build environment and simplifies the documentation generation process.

### Implementation Plan
1.  **Create `documentation/Dockerfile`:**
    *   Use a Python base image (e.g., `python:3.9-slim-buster`).
    *   Install Sphinx and `sphinx-needs` (and any other Sphinx extensions used).
    *   Copy the `Documentation/Requirements` directory into the image.
    *   Set the working directory.
    *   Define a command to build the documentation (e.g., `make html`).
2.  **Update `docker-compose.yml`:**
    *   Add a new service named `documentation`.
    *   Set its `build` context to `./Documentation/Requirements`.
    *   Map a volume to persist the built documentation (e.g., `./Documentation/Requirements/_build:/app/_build`).
    *   Define a `command` to run the Sphinx build.

### Instructions for Usage
To build the documentation:
```bash
docker compose run --rm documentation
```
The built documentation will be available in `Documentation/Requirements/_build/html`.

## 2. Extend Frontend Container for Testing

### Goal
To enable the execution of frontend tests (Jest and Cypress) within the Dockerized frontend environment. This ensures that tests run in an isolated and consistent environment, mirroring the production setup more closely.

### Implementation Plan
1.  **Review `frontend/Dockerfile`:**
    *   Ensure that all `devDependencies` (Jest, Cypress, etc.) are installed during the `deps` stage. The current `npm ci` should handle this.
    *   No major changes are expected here if `npm ci` is already installing dev dependencies.
2.  **Update `docker-compose.yml`:**
    *   Modify the `frontend` service to allow running test commands. This can be achieved by using `docker compose run` with an overridden command.
    *   Consider adding a separate service for testing if the testing process is complex or requires different configurations than the main application run. For simplicity, we'll stick to `docker compose run` for now.

### Instructions for Usage
To run Jest unit tests:
```bash
docker compose run --rm frontend npm test
```
To run Cypress end-to-end tests:
```bash
docker compose run --rm frontend npm run cypress:run
```
(Note: Cypress might require a headless browser setup within the Docker image if not already configured, and `wait-on` might need to be installed globally or within the container for `cypress:run` to work reliably.)

### Expected Outcome
-   A `documentation` Docker service that can build the Sphinx documentation.
-   The ability to run `npm test` and `npm run cypress:run` commands within the `frontend` Docker container using `docker compose run`.
