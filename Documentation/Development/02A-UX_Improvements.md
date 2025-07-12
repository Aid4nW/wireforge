# Phase 1-A: MVP User Experience Improvements

This plan details the work to improve the user experience of the MVP by integrating a more powerful and feature-rich canvas library. This work is still part of the overall MVP phase, but represents a shift in implementation strategy for the harness design canvas.

## Core Technology Change

- **Canvas Library:** We will replace the existing HTML `div` and `svg` implementation of the harness design canvas with `react-konva`. This will provide a more performant and feature-rich foundation for the canvas, leading to a better user experience.

## Implementation Plan

1.  **Install Dependencies:** Add `react-konva` and its peer dependency, `konva`, to the project.
2.  **Refactor `HarnessCanvas.tsx`:**
    *   Replace the main container `div` with a `react-konva` `<Stage>`.
    *   Add a `<Layer>` to hold all the shapes.
    *   Refactor the draggable components into `<Group>`s containing `<Rect>`s and other shapes.
    *   Refactor the component pins into `<Circle>`s.
    *   Refactor the wires into `<Line>` components.
3.  **Update State and Event Handling:** Adapt the existing logic for dragging components and drawing wires to use `react-konva`'s built-in event system.
4.  **Verify and Update Tests:** Run the application to ensure everything works as expected. The existing unit test for `BOMGenerator` should still pass. Future tests on the canvas itself will need to be written with the new component structure in mind.
