// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************



// Import commands.js using ES2015 syntax:


// support/e2e.js — runs before every test file
import './commands'
require('cypress-xpath')

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Unexpected token ')'")) {
    return false; // ignore the syntax error and continue the test
  }
});

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.contains('Logged in as').should('be.visible');
  });
});




