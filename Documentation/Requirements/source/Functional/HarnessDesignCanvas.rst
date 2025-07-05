#######################
Harness Design Canvas
#######################

.. freq:: REQ-FUNC-CAN-001
   :status: Draft
   :importance: High
   :tags: canvas, usability
   :related_stories: story:DIYHobbyist

   Visual Component Placement

   Users must be able to visually drag and drop components onto a design canvas.

   **Acceptance Criteria:**
   *   A library of components is visible.
   *   Users can select a component from the library and place it on the canvas.
   *   Components on the canvas can be moved to new positions.

.. freq:: REQ-FUNC-CAN-002
   :status: Draft
   :importance: High
   :tags: canvas, core
   :related_stories: story:AutomotiveEngineer, story:DIYHobbyist

   Wire and Connection Drawing

   Users must be able to draw wires to create logical connections between component pins.

   **Acceptance Criteria:**
   *   Users can select a pin on a component to start a connection.
   *   Users can draw a line to a pin on another (or the same) component to complete a connection.
   *   The system visually represents the wire connecting the two pins.

.. freq:: REQ-FUNC-CAN-003
   :status: Draft
   :importance: Medium
   :tags: canvas, motorsport
   :related_stories: story:MotorsportShop

   Advanced Harness Features

   The system must support the design of advanced harness features like service loops and concentric twisting.

   **Acceptance Criteria:**
   *   Users can add properties to wires or groups of wires to specify a service loop.
   *   Users can define a set of wires to be concentrically twisted.
   *   The visual representation and data model reflect these advanced features for manufacturing outputs.
