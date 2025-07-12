# Phase 8: Self-Hosting & Open Data

This final phase focuses on maximizing the project's reach and utility by empowering the community through self-hosting options and open data formats.

## Core Technologies

- **Backend:** The FastAPI backend will ensure data formats are open.
- **Documentation:** Comprehensive guides will be created to instruct users on how to deploy their own instance of the entire WireForge stack.

## Architecture

- **Data Formats:** We will ensure that the primary data format for harness designs is fully open and documented (e.g., JSON Schema), allowing users to easily read, write, and manipulate their data with external scripts.
- **Self-Hosting Documentation:** Comprehensive guides will be created to instruct users on how to deploy their own instance of the entire WireForge stack (frontend, backend, database) using tools like Docker.

## Fulfilled Requirements

This phase will address the following key requirements:

### Product Requirements
- **REQ-PROD-OSA-001 (FOSS Tool Utilization):** The entire stack is open-source.
- **REQ-PROD-OSA-002 (Vendor Lock-in Avoidance):** Achieved through open data formats.

## Testing Strategy

### 1. Unit Tests
- **Data Format Validation:** Create tests that validate designs against the official JSON schema to ensure data integrity.

### 2. Product Level Tests (End-to-End)
- **Self-Hosting Deployment:** While difficult to fully automate in a CI/CD pipeline, we will create a manual test plan to be run before each release. This involves following the self-hosting documentation from scratch to deploy a full instance of WireForge and running a basic set of smoke tests to ensure it is functional.
