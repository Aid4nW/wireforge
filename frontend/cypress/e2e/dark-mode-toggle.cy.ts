describe('Dark Mode Toggle', () => {
  beforeEach(() => {
    cy.visit('/');
    // Clear local storage before each test to ensure a clean state
    cy.clearLocalStorage();
    // Ensure body class is clean
    cy.get('body').invoke('removeClass', 'dark-mode light-mode');
    cy.get('.settings-menu-button').click(); // Open the settings menu
  });

  it('should toggle to dark mode when the switch is clicked', () => {
    // Verify initial state (light mode)
    cy.get('body').should('not.have.class', 'dark-mode');
    cy.get('body').should('have.class', 'light-mode');
    // Click the toggle switch by clicking its associated label
    cy.get('.theme-switch').click();

    // Verify dark mode is applied
    cy.get('body').should('have.class', 'dark-mode');
    cy.get('body').should('not.have.class', 'light-mode');
    cy.window().its('localStorage').invoke('getItem', 'theme').should('eq', 'dark-mode');
  });

  it('should toggle back to light mode when the switch is clicked again', () => {
    // Set initial state to dark mode via local storage and reload
    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'dark-mode');
    });
    cy.visit('/'); // Reload to apply the stored theme
    cy.get('.settings-menu-button').click(); // Open the settings menu
    // Verify initial state (dark mode)
    cy.get('body').should('have.class', 'dark-mode');
    cy.get('body').should('not.have.class', 'light-mode');
    cy.window().its('localStorage').invoke('getItem', 'theme').should('eq', 'dark-mode');

    // Click the toggle switch by clicking its associated label
    cy.get('.theme-switch').click();

    // Verify light mode is applied
    cy.get('body').should('not.have.class', 'dark-mode');
    cy.get('body').should('have.class', 'light-mode');

    cy.window().its('localStorage').invoke('getItem', 'theme').should('eq', 'light-mode');
  });

  it('should initialize with dark mode if preference is stored in localStorage', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'dark-mode');
    });
    cy.visit('/'); // Reload to apply the stored theme

    cy.get('body').should('have.class', 'dark-mode');
    cy.get('body').should('not.have.class', 'light-mode');
    
  });

  it('should initialize with light mode if no preference is stored in localStorage', () => {
    // No localStorage.setItem needed, as it's cleared in beforeEach
    cy.visit('/');

    cy.get('body').should('not.have.class', 'dark-mode');
    cy.get('body').should('have.class', 'light-mode');

  });
});
