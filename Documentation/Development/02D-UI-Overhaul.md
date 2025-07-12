## Phase 1: Global Styling and Theme Integration

1.  **Introduce Global CSS Variables:**
    *   Create a new global CSS file (e.g., `frontend/styles/globals.css`) or modify an existing one.
    *   Define CSS variables for both light and dark mode color palettes, as seen in the prototype's `<style>` block.
2.  **Implement Dark Mode Toggle Logic:**
    *   Modify `frontend/pages/_app.tsx` to:
        *   Read the theme preference from `localStorage` on initial load.
        *   Apply the `dark-mode` class to the `<body>` element based on the stored preference or default.
        *   Add a `useState` hook to manage the current theme state.
        *   Implement a function to toggle the theme class and update `localStorage`.
3.  **Integrate Dark Mode Switch Component:**
    *   Create a new React component (e.g., `frontend/components/DarkModeToggle.tsx`) for the dark mode switch (the `label` and `input` elements).
    *   Integrate this component into `frontend/pages/_app.tsx` or a new layout component, positioning it fixed at the bottom left as per the prototype's CSS.
    *   Connect the component's toggle event to the theme-switching logic in `_app.tsx`.

## Phase 2: Layout and Structural Overhaul

1.  **Create/Modify Layout Component:**
    *   Analyze `frontend/pages/index.tsx` and determine if a new dedicated layout component (e.g., `frontend/components/Layout.tsx`) is needed, or if `_app.tsx` can directly manage the main layout structure. For simplicity, we'll assume modifications to `_app.tsx` and `index.tsx` for now.
    *   Implement the main structural elements: `header`, `div.container` (containing `aside` and `main`), and `footer`.
2.  **Update Header and Navigation:**
    *   Modify the existing header structure (if any) or create a new header within `_app.tsx` or `index.tsx` to match the prototype's `<h1>` and `nav` elements.
    *   Apply the header-specific CSS from the prototype.
3.  **Develop Sidebar Component:**
    *   Create a new React component (e.g., `frontend/components/Sidebar.tsx`) to represent the `aside` element.
    *   Populate it with the "Components" and "Tools" sections, including the list items and their styling.
    *   Integrate this `Sidebar` component into the main layout.
4.  **Integrate Main Content Area:**
    *   Ensure `frontend/pages/index.tsx` (or the main content area of the layout) contains the `<h2>` for the project title, the `canvas-placeholder` (which will eventually be the `HarnessCanvas`), and the `controls` section.
    *   Apply the main content area CSS.
5.  **Develop Footer Component:**
    *   Create a new React component (e.g., `frontend/components/Footer.tsx`) for the `footer` element.
    *   Integrate this `Footer` component into the main layout.

## Phase 3: Component-Specific Styling and Refinement

1.  **Apply Canvas Styling:**
    *   Update the CSS for `frontend/components/HarnessCanvas.tsx` to match the `.canvas-placeholder` styles (background, border, text, font size, border-radius).
2.  **Apply Controls Styling:**
    *   Update the CSS for the controls section (likely within `frontend/components/BOMGenerator.tsx` or a new `Controls` component) to match the prototype's `.controls` and `.controls button` styles.
3.  **Review and Refine:**
    *   Thoroughly review all components and global styles to ensure they accurately reflect the `clean_minimalist_v6_dark_mode_labeled.html` design in both light and dark modes.
    *   Adjust any spacing, font sizes, or color usages as needed.

## Phase 4: Verification

1.  **Manual UI Verification:**
    *   Run the application locally (`npm run dev`).
    *   Manually inspect the UI in the browser to confirm the new design is applied correctly and the dark mode toggle functions as expected.
2.  **Automated Checks:**
    *   Run `npm run lint` to catch any new linting errors.
    *   Run `npm test` to ensure no existing functionality has been broken by the UI changes.
