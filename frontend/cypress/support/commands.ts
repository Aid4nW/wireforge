export {};
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      assertWireCount(expectedCount: number): Chainable<void>;
      triggerPinClick(componentId: string, pinId: string): Chainable<void>;
      selectComponent(componentId: string): Chainable<void>;
  }
  interface Window {
      harnessState: {
        components: any[];
        wires: any[];
        selectedItemId: string | null;
        selectedItemType: 'component' | 'wire' | null;
        setSelectedItemId: (id: string | null) => void;
        setSelectedItemType: (type: 'component' | 'wire' | null) => void;
        handlePinClick: (componentId: string, pin: any, componentX: number, componentY: number) => void;
      };
  }
}
}

Cypress.Commands.add('assertWireCount', (expectedCount: number) => {
  cy.window().its('harnessState.wires').should('have.length', expectedCount);
});

Cypress.Commands.add('triggerPinClick', (componentId: string, pinId: string) => {
  cy.window().then((win) => {
    const { components, handlePinClick } = win.harnessState;
    const component = components.find((comp: any) => comp.id === componentId);
    if (!component) {
      throw new Error(`Component with ID ${componentId} not found`);
    }
    const pin = component.pins.find((p: any) => p.id === pinId);
    if (!pin) {
      throw new Error(`Pin with ID ${pinId} not found on component ${componentId}`);
    }
    // Directly call the handlePinClick function exposed on the window
    if (handlePinClick) {
      handlePinClick(component.id, pin, component.x, component.y);
    } else {
      throw new Error('handlePinClick is not exposed on window.harnessState');
    }
  });
});

Cypress.Commands.add('selectComponent', (componentId: string) => {
  cy.window().then((win) => {
    const { setSelectedItemId, setSelectedItemType } = win.harnessState;
    if (setSelectedItemId && setSelectedItemType) {
      setSelectedItemId(componentId);
      setSelectedItemType('component');
    } else {
      throw new Error('setSelectedItemId or setSelectedItemType is not exposed on window.harnessState');
    }
  });
});
