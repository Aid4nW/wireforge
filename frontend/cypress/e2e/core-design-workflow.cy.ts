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
  });

  it('allows users to drag and drop components and draw wires', () => {
    // Drag and drop Connector A
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('component/type', 'Connector A');
    cy.get('li').contains('Connector A').trigger('dragstart', { dataTransfer });
    cy.get('.canvas-placeholder').first().trigger('drop', { clientX: 200, clientY: 200, dataTransfer });
    cy.get('.canvas-placeholder').first().trigger('dragend');

    // Drag and drop Sensor B
    const dataTransfer2 = new DataTransfer();
    dataTransfer2.setData('component/type', 'Sensor B');
    cy.get('li').contains('Sensor B').trigger('dragstart', { dataTransfer: dataTransfer2 });
    cy.get('.canvas-placeholder').first().trigger('drop', { clientX: 400, clientY: 200, dataTransfer: dataTransfer2 });
    cy.get('.canvas-placeholder').first().trigger('dragend');

    // Wait for components to render on canvas
    cy.wait(500); 

    // Take a screenshot to visually verify components are on the canvas
    cy.get('.canvas-placeholder canvas').screenshot('components-on-canvas');

    // Get component positions from the exposed state
    cy.window().its('harnessState.components').then((components) => {
      const connectorA = components.find((comp: any) => comp.type === 'Connector A');
      const sensorB = components.find((comp: any) => comp.type === 'Sensor B');

      if (connectorA && sensorB) {
        // Calculate absolute pin positions
        const connectorAPin1X = connectorA.x + connectorA.pins[0].xOffset;
        const connectorAPin1Y = connectorA.y + connectorA.pins[0].yOffset;

        const sensorBPin1X = sensorB.x + sensorB.pins[0].xOffset;
        const sensorBPin1Y = sensorB.y + sensorB.pins[0].yOffset;

        // Click on a pin of Connector A
        cy.get('[data-testid="konva-circle"]').eq(0).click();

        // Click on a pin of Sensor B
        cy.get('canvas').click(sensorBPin1X, sensorBPin1Y);
      } else {
        throw new Error('Could not find Connector A or Sensor B on canvas');
      }
    });

    // Assert that one wire is drawn
    cy.assertWireCount(1);
  });
});
