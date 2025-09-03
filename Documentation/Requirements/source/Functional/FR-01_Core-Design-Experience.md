# FR-01: Core Design Experience

This document defines the requirements for the core design experience, focusing on the main canvas and user interactions.

## 1. General Canvas Requirements

*   **REQ-FR-01.1:** The application shall feature a primary, infinite-scrolling 2D canvas for harness design.
*   **REQ-FR-01.2:** The canvas shall have a visible grid, which can be toggled on and off by the user.
*   **REQ-FR-01.3:** All components and wires placed on the canvas shall optionally snap to the grid. This feature can be toggled by the user.
*   **REQ-FR-01.4:** The user shall be able to pan and zoom the canvas using standard mouse and trackpad controls (e.g., middle-mouse drag to pan, scroll wheel to zoom).
*   **REQ-FR-01.5:** The canvas shall have a "zoom to fit" option that adjusts the view to show all placed components.

## 2. Component Interaction

*   **REQ-FR-02.1:** Users shall be able to drag and drop components from the component library onto the canvas.
*   **REQ-FR-02.2:** Once placed, components can be moved around the canvas by clicking and dragging.
*   **REQ-FR-02.3:** Selecting a component on the canvas shall display its properties in a dedicated properties panel.
*   **REQ-FR-02.4:** Users shall be able to delete a component by selecting it and pressing the 'delete' key, or by using a context menu option.
*   **REQ-FR-02.5:** A right-click context menu shall be available for all components, providing options for editing, rotating, and deleting.

## 3. Wiring Interaction

*   **REQ-FR-03.1:** To create a wire, the user shall click on a connection point of a component and then click on a connection point of another (or the same) component.
*   **REQ-FR-03.2:** While drawing a wire, a line shall be rendered from the starting point to the current cursor position.
*   **REQ-FR-03.3:** Wires shall be rendered as smooth curves or straight lines with adjustable waypoints. The user should be able to select the wire type.
*   **REQ-FR-03.4:** Selecting a wire shall display its properties (e.g., gauge, color, type) in the properties panel.
*   **REQ-FR-03.5:** Users shall be able to delete a wire by selecting it and pressing the 'delete' key, or by using a context menu.

## 4. General UI

*   **REQ-FR-04.1:** The application shall provide a "clear design" button to remove all components and wires from the canvas, with a confirmation dialog.
*   **REQ-FR-04.2:** All interactions should provide immediate visual feedback to the user.
