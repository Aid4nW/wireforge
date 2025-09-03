##############
BOM Generation
##############

.. freq:: Automatic Bill of Materials Generation
   :id: REQ-FUNC-BOM-001
   :status: Draft
   :importance: High
   :tags: bom, manufacturing
   :satisfies: REQ-PROD-MS-003, REQ-PROD-AE-002, REQ-PROD-AE-004, REQ-PROD-DIY-002, REQ-PROD-MS-004
   

   The system must automatically generate a Bill of Materials (BOM) for a harness design.

   **Acceptance Criteria:**
   *   The BOM includes a list of all components (connectors, terminals, etc.) with quantities.
   *   The BOM includes a list of all wires, with details such as type, gauge, color, and length.
   *   The BOM can be exported to a standard format (e.g., CSV, PDF).

.. freq:: Customizable BOM Templates
   :id: REQ-FUNC-BOM-002
   :status: Draft
   :importance: Medium
   :tags: bom, customization
   :satisfies: REQ-PROD-CRS-002, REQ-PROD-CRS-001, REQ-PROD-CS-004
   

   Users should be able to customize the format and content of the BOM.

   **Acceptance Criteria:**
   *   Users can select which columns to include in the BOM.
   *   Users can add their own company logo and contact information to the BOM.
   *   Custom BOM templates can be saved and reused.
