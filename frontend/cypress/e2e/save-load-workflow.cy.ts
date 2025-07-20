// REQ-PROD-DIY-001: Safe and Reliable Harness Creation
// REQ-PROD-DIY-003: Learning and Accomplishment Support
// REQ-PROD-DIY-004: Simplicity and Intuitive Use
// REQ-PROD-EDU-001: Accessible Learning Tools
// REQ-PROD-EDU-002: Core Concept Illustration
// REQ-PROD-EDU-003: Engaging Project Creation
// REQ-PROD-ES-002: Theoretical Knowledge Application
describe('Save/Load Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should save and load a design from local storage', () => {
    // FEATURE: Local Storage Save/Load
    // 1. Create a design (drag and drop components)
    // Drag and drop Connector A
    cy.get('.component-category button').contains('Connector').click();
    const dataTransferA = new DataTransfer();
    dataTransferA.setData('component/type', 'Connector A');
    cy.get('.component-category ul li').contains('Connector A').trigger('dragstart', { dataTransfer: dataTransferA });
    cy.get('.canvas-placeholder').first().trigger('drop', { clientX: 200, clientY: 200, dataTransfer: dataTransferA });
    cy.get('.canvas-placeholder').first().trigger('dragend');

    // Drag and drop ECU A
    cy.get('.component-category button').contains('ECU').click(); // Open ECU menu
    const dataTransferECU = new DataTransfer();
    dataTransferECU.setData('component/type', 'ECU A');
    cy.get('.component-category ul li').contains('ECU A').trigger('dragstart', { dataTransfer: dataTransferECU });
    cy.get('.canvas-placeholder').first().trigger('drop', { clientX: 400, clientY: 200, dataTransfer: dataTransferECU });
    cy.get('.canvas-placeholder').first().trigger('dragend');

    // 2. Save the design
    cy.get('.file-menu-button').click(); // Open the File menu
    cy.get('.file-menu-dropdown a').contains('Save').click(); // Click Save

    // 3. Reload the page
    cy.reload();

    // 4. Assert that the design is fully restored (visual verification for now)
    cy.get('canvas').screenshot('loaded-design');

    // In a real scenario, you'd want more robust assertions here, e.g.,
    // - Intercepting localStorage.getItem and checking its content.
    // - Exposing the Konva stage state to Cypress for direct inspection of components and wires.
  });
});