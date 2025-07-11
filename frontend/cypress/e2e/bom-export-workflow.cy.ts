describe('BOM Export Workflow', () => {
  beforeEach(() => {
    cy.visit('/');
    // Clear downloads folder before each test
    cy.exec('rm -rf cypress/downloads/*', { failOnNonZeroExit: false });
  });

  it('should generate and download a correct Bill of Materials CSV', () => {
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

    // 2. Click the Generate BOM button
    cy.get('button').contains('Generate BOM (CSV)').click();

    // 3. Verify the file is downloaded and its content
    const downloadsFolder = Cypress.config('downloadsFolder');
    const filePath = `${downloadsFolder}/bill_of_materials.csv`;

    cy.readFile(filePath, { timeout: 10000 }).should('exist').then((content) => {
      expect(content).to.include('Component,Quantity');
      expect(content).to.include('Connector A,1');
      expect(content).to.include('Sensor B,1');
      expect(content).to.include('\nWire,Quantity\n');
      expect(content).to.include('Total Wires,0'); // No wires drawn in this test
    });
  });
});