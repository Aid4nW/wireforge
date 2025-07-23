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
    // Drag and drop Connector A
    cy.get('.component-category button').contains('Connector').click();
    const dataTransferA = new DataTransfer();
    dataTransferA.setData('component/type', 'Connector A');
    cy.get('.component-category ul li').contains('Connector A').trigger('dragstart', { dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 500, clientY: 350, dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');
    cy.wait(2000); // Give Konva time to render pins

    // Drag and drop ECU A
    cy.get('.component-category button').contains('ECU').click(); // Open ECU menu
    const dataTransferECU = new DataTransfer();
    dataTransferECU.setData('component/type', 'ECU A');
    cy.get('.component-category ul li').contains('ECU A').trigger('dragstart', { dataTransfer: dataTransferECU });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 700, clientY: 350, dataTransfer: dataTransferECU });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');
    cy.wait(2000); // Give Konva time to render pins

    // Wait for components to be added to the state and rendered
    cy.window().its('harnessState.components').should('have.length', 2).wait(2000).then((components) => {
      cy.log('harnessState.components after drag and drop:', components);
      const connectorA = components.find((comp: any) => comp.type === 'Connector A');
      const ecuA = components.find((comp: any) => comp.type === 'ECU A');

      if (connectorA && ecuA) {
        cy.log('Connector A found:', connectorA);
        cy.log('ECU A found:', ecuA);
        cy.log('Connector A pins:', connectorA.pins);
        cy.log('ECU A pins:', ecuA.pins);

        // Assert that pins exist before clicking
        cy.wrap(connectorA.pins).should('have.length.at.least', 1);
        cy.wrap(ecuA.pins).should('have.length.at.least', 1);
        cy.wait(500); // Give time for pins to be rendered and state updated

        cy.log('Attempting to click pin p1 on Connector A');
        cy.triggerPinClick(connectorA.id, 'p1');
        cy.wait(1000); // Wait for first pin click to register
        cy.log('Attempting to click pin p1 on ECU A');
        cy.triggerPinClick(ecuA.id, 'p1');
        cy.wait(1000); // Wait for wire to be created
        cy.window().its('harnessState.wires').then((wires) => {
          cy.log('harnessState.wires after pin clicks:', wires);
        });
      } else {
        throw new Error('Could not find Connector A or ECU A on canvas');
      }
    });

    // Assert that one wire is drawn
    cy.assertWireCount(1);
    cy.window().its('harnessState.wires').then((wires) => {
      cy.log('harnessState.wires after wire creation:', wires);
    });
  });
});
