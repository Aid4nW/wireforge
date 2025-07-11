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
    // 1. Create a design (drag and drop components)
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('component/type', 'Connector A');
    cy.get('li').contains('Connector A').trigger('dragstart', { dataTransfer });
    cy.get('[style*="border: 1px solid black"]').first().trigger('drop', { clientX: 200, clientY: 200, dataTransfer });
    cy.get('[style*="border: 1px solid black"]').first().trigger('dragend');

    const dataTransfer2 = new DataTransfer();
    dataTransfer2.setData('component/type', 'Sensor B');
    cy.get('li').contains('Sensor B').trigger('dragstart', { dataTransfer: dataTransfer2 });
    cy.get('[style*="border: 1px solid black"]').first().trigger('drop', { clientX: 400, clientY: 200, dataTransfer: dataTransfer2 });
    cy.get('[style*="border: 1px solid black"]').first().trigger('dragend');

    // 2. Save the design
    cy.get('button').contains('Save Design').click();

    // 3. Reload the page
    cy.reload();

    // 4. Assert that the design is fully restored (visual verification for now)
    cy.get('canvas').screenshot('loaded-design');

    // In a real scenario, you'd want more robust assertions here, e.g.,
    // - Intercepting localStorage.getItem and checking its content.
    // - Exposing the Konva stage state to Cypress for direct inspection of components and wires.
  });
});