// REQ-PROD-DIY-001: Safe and Reliable Harness Creation
// REQ-PROD-DIY-003: Learning and Accomplishment Support
// REQ-PROD-DIY-004: Simplicity and Intuitive Use
// REQ-PROD-EDU-001: Accessible Learning Tools
// REQ-PROD-EDU-002: Core Concept Illustration
// REQ-PROD-EDU-003: Engaging Project Creation
// REQ-PROD-ES-002: Theoretical Knowledge Application
// REQ-FUNC-CAN-001: Visual Component Placement
// REQ-FUNC-CAN-002: Wire and Connection Drawing
describe('Core Design Workflow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000); // Give the application time to initialize and expose test helpers
  });

  it('allows users to drag and drop components and draw wires', () => {
    // Drag and drop Connector A, accounting for the sidebar
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('component/type', 'Connector A');
    cy.get('li').contains('Connector A').trigger('dragstart', { dataTransfer });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 400, clientY: 300, dataTransfer });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');

    // Drag and drop Sensor B, accounting for the sidebar
    const dataTransfer2 = new DataTransfer();
    dataTransfer2.setData('component/type', 'Sensor B');
    cy.get('li').contains('Sensor B').trigger('dragstart', { dataTransfer: dataTransfer2 });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 600, clientY: 300, dataTransfer: dataTransfer2 });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');

    // Wait for components to be added to the state and rendered
    cy.window().its('harnessState.components').should('have.length', 2);

    // Get component positions from the exposed state
    cy.window().its('harnessState.components').then((components) => {
      const connectorA = components.find((comp: any) => comp.type === 'Connector A');
      const sensorB = components.find((comp: any) => comp.type === 'Sensor B');

      if (connectorA && sensorB) {
        // Ensure the test helper function is available before invoking it
        cy.triggerPinClick(connectorA.id, 'p1');
        cy.triggerPinClick(sensorB.id, 'p1');
      } else {
        throw new Error('Could not find Connector A or Sensor B on canvas');
      }
    });

    // Assert that one wire is drawn
    cy.assertWireCount(1);
  });
});
