#############
Performance
#############

.. nfreq:: REQ-NON-PER-001
   :status: Draft
   :importance: High
   :tags: performance, canvas
   :related_stories: story:AutomotiveEngineer, story:MotorsportShop

   Responsive Canvas

   The design canvas must remain responsive and smooth, even with complex harness designs.

   **Acceptance Criteria:**
   *   Panning and zooming on the canvas is fluid, with a frame rate of at least 30 FPS.
   *   Actions like moving components or drawing wires have no noticeable lag.
   *   The application can handle designs with hundreds of components and connections without significant performance degradation.

.. nfreq:: REQ-NON-PER-002
   :status: Draft
   :importance: High
   :tags: performance, loading
   :related_stories: story:DIYHobbyist

   Fast Application Loading

   The application should load quickly in the user's browser.

   **Acceptance Criteria:**
   *   The initial application load time is less than 3 seconds on a standard broadband connection.
   *   Project files load in a reasonable amount of time, proportional to their complexity.
