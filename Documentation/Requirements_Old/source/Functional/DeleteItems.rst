.. _req-func-del-001:
.. _req-func-del-002:

Delete Items Functionality
==========================

**REQ-FUNC-DEL-001:** The system SHALL allow users to delete individual components from the canvas.

  **Acceptance Criteria:**

  *   Users can select a component on the canvas.
  *   A mechanism (e.g., a context menu option, a dedicated delete button, or pressing the 'Delete' key) is provided to delete the selected component.
  *   Deleting a component also removes any wires connected to it.
  *   The component and its associated wires are removed from the internal state.

**REQ-FUNC-DEL-002:** The system SHALL allow users to delete individual wires from the canvas.

  **Acceptance Criteria:**

  *   Users can select a wire on the canvas.
  *   A mechanism (e.g., a context menu option, a dedicated delete button, or pressing the 'Delete' key) is provided to delete the selected wire.
  *   The wire is removed from the internal state.

**Traceability:**

*   :ref:`userstory-delete-items`
