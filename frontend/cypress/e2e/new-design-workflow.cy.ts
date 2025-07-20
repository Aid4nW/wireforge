// REQ-FUNC-NEW-001: Clear Design Functionality
describe('New Design Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should clear the current design when "New" is confirmed', () => {
    // 1. Create a design (drag and drop components)
    cy.get('.component-category button').contains('Connector').click();
    const dataTransferA = new DataTransfer();
    dataTransferA.setData('component/type', 'Connector A');
    cy.get('.component-category ul li').contains('Connector A').trigger('dragstart', { dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 200, clientY: 200, dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');

    cy.window().its('harnessState.components').should('have.length', 1);

    // 2. Click the "New" button and confirm
    cy.get('.file-menu-button').click();
    cy.get('.file-menu-dropdown a').contains('New').click();

    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Are you sure you want to clear the current design?');
      return true; // Confirm the action
    });

    // 3. Verify the design is cleared
    cy.window().its('harnessState.components').should('have.length', 0);
    cy.window().its('harnessState.wires').should('have.length', 0);

    // Verify local storage is cleared
    cy.window().its('localStorage').invoke('getItem', 'harnessDesign').should('eq', '{"components":[],"wires":[]}');
  });

  it('should not clear the current design when "New" is cancelled', () => {
    // 1. Create a design
    cy.get('.component-category button').contains('Connector').click();
    const dataTransferA = new DataTransfer();
    dataTransferA.setData('component/type', 'Connector A');
    cy.get('.component-category ul li').contains('Connector A').trigger('dragstart', { dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('drop', { clientX: 200, clientY: 200, dataTransfer: dataTransferA });
    cy.get('[data-testid="harness-canvas-wrapper"]').first().trigger('dragend');

    cy.window().its('harnessState.components').should('have.length', 1);

    // 2. Click the "New" button and cancel
    cy.get('.file-menu-button').click();
    cy.get('.file-menu-dropdown a').contains('New').click();

    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Are you sure you want to clear the current design?');
      return false; // Cancel the action
    });

    // 3. Verify the design is not cleared
    cy.window().its('harnessState.components').should('have.length', 1);
  });
});
