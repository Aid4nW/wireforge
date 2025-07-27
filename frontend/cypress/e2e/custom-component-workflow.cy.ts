describe('Custom Component Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    // Clear local storage before each test to ensure a clean state
    cy.clearLocalStorage();
    cy.reload();
    cy.wait(2000); // Increased wait time for the page to fully reload and render
    cy.get('nav').should('be.visible'); // Ensure navigation is visible before proceeding
  });

  it('should allow creating, using, editing, and deleting a custom component', () => {
    const componentName = 'MyCustomConnector';
    const componentType = 'CustomConnector';
    const pinIds = 'p1,p2,p3';
    const updatedComponentName = 'UpdatedCustomConnector';
    const updatedPinIds = 'p1,p2,p3,p4';

    // 1. Navigate to My Library
    cy.get('a[href="/my-library"]').should('be.visible').and('not.be.disabled').click();
    cy.url().should('include', '/my-library');

    // 2. Create a custom component
    cy.get('input[placeholder="Component Name"]').type(componentName);
    cy.get('input[placeholder="Component Type (e.g., Connector, ECU)"]').type(componentType);
    cy.get('input[placeholder="Pin IDs (comma-separated, e.g., p1,p2,p3)"]').type(pinIds);
    cy.get('button').contains('Add Component').click();

    // Verify component is added to the list
    cy.get('.component-list').should('contain', componentType);
    cy.get('.component-list').should('contain', '(3 pins)');

    // 3. Navigate back to the main canvas
    cy.get('nav').contains('Dashboard').click();
    cy.url().should('eq', 'http://localhost:3000/');

    // 4. Verify the custom component appears in the Component Library
    cy.get('[data-testid="component-library"]').contains('Custom Components').click();
    cy.get('[data-testid="component-library"]').contains(componentType).should('be.visible');

    // 5. Drag and drop the custom component onto the canvas
    const dataTransfer = new DataTransfer();
    cy.get('[data-testid="component-library"]').contains(componentType)
      .trigger('dragstart', {
        dataTransfer,
      });

    cy.get('[data-testid="harness-canvas-wrapper"]')
      .trigger('drop', {
        dataTransfer,
        clientX: 200, // Drop at a specific coordinate
        clientY: 200,
      })
      .trigger('dragend');

    // Verify the component is on the canvas
    cy.get('[data-testid^="konva-rect-"]').should('exist');
    cy.get('[data-testid^="konva-rect-"]').parent().contains(componentType).should('exist');

    // 6. Navigate back to My Library to edit
    cy.get('a[href="/my-library"]').should('be.visible').and('not.be.disabled').click();
    cy.url().should('include', '/my-library');

    // 7. Edit the custom component
    cy.get('.component-list li').contains(componentType).parent().contains('Edit').click();
    cy.get('input[placeholder="Component Name"]').clear().type(updatedComponentName);
    cy.get('input[placeholder="Pin IDs (comma-separated, e.g., p1,p2,p3)"]').clear().type(updatedPinIds);
    cy.get('button').contains('Update Component').click();

    // Verify component is updated in the list
    cy.get('.component-list').should('contain', updatedComponentName);
    cy.get('.component-list').should('contain', '(4 pins)');
    cy.get('.component-list').should('not.contain', componentType); // Old name should be gone

    // 8. Navigate back to the main canvas and verify the updated component is there
    cy.get('nav').contains('Dashboard').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('[data-testid="component-library"]').contains('Custom Components').click();
    cy.get('[data-testid="component-library"]').contains(updatedComponentName).should('be.visible');

    // 9. Navigate back to My Library to delete
    cy.get('a[href="/my-library"]').should('be.visible').and('not.be.disabled').click();
    cy.url().should('include', '/my-library');

    // 10. Delete the custom component
    cy.get('.component-list li').contains(updatedComponentName).parent().contains('Delete').click();
    cy.on('window:confirm', () => true); // Confirm the deletion

    // Verify component is removed from the list
    cy.get('.component-list').should('not.contain', updatedComponentName);
    cy.get('.component-list').should('contain', 'No custom components added yet.');
  });
});
