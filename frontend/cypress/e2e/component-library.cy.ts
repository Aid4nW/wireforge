// REQ: REQ-FUNC-LIB-001 (Pre-populated Component Library)
describe('Component Library', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000); // Wait for the page to load and components to render
  });

  it('should display a list of pre-populated components', () => {
    // Verify the main component library div is visible
    cy.get('[data-testid="component-library"]').should('be.visible');

    // Test Connector submenu
    cy.get('.component-category button').contains('Connector').click();
    cy.get('.component-category ul li').contains('Connector A').should('be.visible');
    cy.get('.component-category ul li').contains('Connector B').should('be.visible');
    cy.get('.component-category button').contains('Connector').click(); // Close menu

    // Test ECU submenu
    cy.get('.component-category button').contains('ECU').click();
    cy.get('.component-category ul li').contains('ECU A').should('be.visible');
    cy.get('.component-category ul li').contains('ECU B').should('be.visible');
    cy.get('.component-category button').contains('ECU').click(); // Close menu

    // Test Fuel submenu
    cy.get('.component-category button').contains('Fuel').click();
    cy.get('.component-category ul li').contains('Fuel Pump').should('be.visible');
    cy.get('.component-category ul li').contains('Fuel Injector').should('be.visible');
    cy.get('.component-category button').contains('Fuel').click(); // Close menu

    // Test Ignition submenu
    cy.get('.component-category button').contains('Ignition').click();
    cy.get('.component-category ul li').contains('Ignition Coil').should('be.visible');
    cy.get('.component-category ul li').contains('Spark Plug').should('be.visible');
    cy.get('.component-category button').contains('Ignition').click(); // Close menu
  });
});