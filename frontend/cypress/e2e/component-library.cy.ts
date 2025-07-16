// REQ: REQ-FUNC-LIB-001 (Pre-populated Component Library)
describe('Component Library', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000); // Wait for the page to load and components to render
  });

  it('should display a list of pre-populated components', () => {
    cy.get('aside ul').should('be.visible');
    cy.log('Component library should be visible');
    cy.get('aside ul li').should('have.length.at.least', 2); // At least two components should be visible
    cy.get('aside ul li').contains('Connector A').should('be.visible');
    cy.get('aside ul li').contains('Sensor B').should('be.visible');
  });
});