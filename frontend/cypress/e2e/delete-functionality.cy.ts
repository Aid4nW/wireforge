// REQ-FUNC-DEL-001: Delete Component Functionality
// REQ-FUNC-DEL-002: Delete Wire Functionality
describe('Delete Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(2000); // Increased initial wait time for application to fully initialize
  });

  it('should delete a component when selected and delete key is pressed', () => {
    // 1. Create a design with a component
    cy.get('.component-category button').contains('Connector').click();
    const dataTransferA = new DataTransfer();
    dataTransferA.setData('component/type', 'Connector A');
    cy.get('.component-category ul li').contains('Connector A').trigger('dragstart', { dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 200, clientY: 200, dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');
    cy.wait(5000); // Increased wait time for Konva to render

    let connectorAId: string; // Declare connectorAId here
    let connectorAId: string; // Declare connectorAId here
    cy.window().its('harnessState.components').should('have.length', 1).then((components) => {
      cy.log('Components after first drag (test 1):', components);
      const connectorA = components.find((comp: any) => comp.type === 'Connector A');
      if (connectorA) {
        connectorAId = connectorA.id; // Assign the ID to the outer-scoped variable
        cy.selectComponent(connectorAId);
        cy.log('Component selected successfully.');
      } else {
        throw new Error('Connector A not found on canvas state');
      }
    });
    cy.get('[data-testid="harness-canvas-wrapper"]').screenshot('after-drag-component-test1');
    cy.log('Before delete - harnessState:', window.harnessState);
    cy.screenshot('before-component-delete');

    // 2. Press Delete key
    cy.get('body').trigger('keydown', { key: 'Delete' });
    cy.wait(2000); // Increased wait time for deletion to process
    cy.screenshot('after-component-delete');

    // 3. Verify the component is deleted
    cy.window().its('harnessState.components').should('have.length', 0);
    cy.window().its('harnessState.selectedItemId').should('be.null');
    cy.window().its('harnessState.selectedItemType').should('be.null');
  });

  it('should delete a wire when selected and delete key is pressed', () => {
    let droppedConnectorId: string; // Declare variable to store the dynamically generated ID
    let droppedEcuId: string; // Declare variable to store the dynamically generated ID

    // 1. Create a design with two components and a wire
    cy.get('.component-category button').contains('Connector').click();
    const dataTransferA = new DataTransfer();
    dataTransferA.setData('component/type', 'Connector A');
    cy.get('.component-category ul li').contains('Connector A').trigger('dragstart', { dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 200, clientY: 200, dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');
    cy.wait(2000); // Increased wait time for Konva to render

    cy.get('.component-category button').contains('ECU').click();
    const dataTransferECU = new DataTransfer();
    dataTransferECU.setData('component/type', 'ECU A');
    cy.get('.component-category ul li').contains('ECU A').trigger('dragstart', { dataTransfer: dataTransferECU });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 400, clientY: 200, dataTransfer: dataTransferECU });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');
    cy.wait(2000); // Increased wait time for Konva to render

    cy.window().its('harnessState.components').should('have.length', 2).then((components) => {
      cy.log('Components after second drag (test 2):', components);
      const connectorA = components.find((comp: any) => comp.type === 'Connector A');
      const ecuA = components.find((comp: any) => comp.type === 'ECU A');
      
      if (connectorA && ecuA) {
        droppedConnectorId = connectorA.id;
        droppedEcuId = ecuA.id;

        cy.log('Connector A object:', connectorA);
        cy.log('ECU A object:', ecuA);
        cy.log('Connector A pins:', connectorA.pins);
        cy.log('ECU A pins:', ecuA.pins);

        cy.triggerPinClick(connectorA.id, 'p1');
        cy.wait(1000); // Wait for first pin click to register
        cy.triggerPinClick(ecuA.id, 'p1');
        cy.window().its('harnessState.wires').should('have.length', 1); // Explicitly wait for wire to be created
      } else {
        throw new Error('Could not find Connector A or ECU A on canvas state for wire test');
      }
    });
    cy.wait(1000); // Give time for wire to be created and state updated
    cy.assertWireCount(1).then((wires) => {
      cy.log('Wires after connection (test 2):', wires);
    });
    cy.get('[data-testid="harness-canvas-wrapper"]').screenshot('after-wire-creation-test2');
    cy.window().its('harnessState.wires').then((wires) => {
      cy.window().its('harnessState.components').then((components) => {
        const wire = wires[0];
        const startComponent = components.find((comp: any) => comp.id === wire.startComponentId);
        const endComponent = components.find((comp: any) => comp.id === wire.endComponentId);

        if (startComponent && endComponent) {
          const startPin = startComponent.pins.find((p: any) => p.id === wire.startPinId);
          const endPin = endComponent.pins.find((p: any) => p.id === wire.endPinId);

          if (startPin && endPin) {
            const startX = startComponent.x + startPin.xOffset;
            const startY = startComponent.y + startPin.yOffset;
            const endX = endComponent.x + endPin.xOffset;
            const endY = endComponent.y + endPin.yOffset;

            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;

            cy.window().its('harnessState.setSelectedItemId').then((setSelectedItemId) => {
          setSelectedItemId(wire.id);
        });
        cy.window().its('harnessState.setSelectedItemType').then((setSelectedItemType) => {
          setSelectedItemType('wire');
        });
        cy.wait(500); // Give time for selection to register
        cy.log('harnessState after wire click:', window.harnessState);
        cy.screenshot('after-wire-selection');
          }
        }
      });
    });

    cy.log('Before wire delete - harnessState:', window.harnessState);
    cy.screenshot('before-wire-delete');

    // 2. Press Delete key
    cy.get('body').trigger('keydown', { key: 'Delete' });
    cy.wait(2000); // Increased wait time for deletion to process
    cy.screenshot('after-wire-delete');

    // 3. Verify the wire is deleted
    cy.assertWireCount(0);
    cy.window().its('harnessState.wires').should('have.length', 0);
    cy.window().its('harnessState.selectedItemId').should('be.null');
    cy.window().its('harnessState.selectedItemType').should('be.null');
    cy.log('After wire delete - harnessState:', window.harnessState);
  });
});