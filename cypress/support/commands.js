/* 
 This example commands.js shows you how to create various custom commands and overwrite existing commands.

 For more comprehensive examples of custom commands please read more here:
 https://on.cypress.io/custom-commands

*/

/// <reference types="cypress" />

// commands.js — custom reusable Cypress commands

const LoginPage = require('../e2e/PageObjects/LoginPage')
const ProductPage = require('../e2e/PageObjects/ProductPage')

Cypress.Commands.add('loginUI', (email, password) =>
{
    const login = new LoginPage();
    cy.visit('/');
    login.openLogin();
    login.fillCredentials(email, password)
    login.submit()
    cy.contains('Logged in as').should('be.visible');
})

Cypress.Commands.add('addProductToCart', (productName) => 
    {
        const product = new ProductPage()
        cy.visit('/')
        product.openProducts()
        product.search(productName)
        product.addFirstResultToCart()
    })


Cypress.Commands.add('uniqueEmail', (prefix = 'test') => 
    {
        const ts = Date.now()
        return `${prefix}_${ts}@example.com`
    })

Cypress.Commands.add('preserveLogin', (email, password) => {
  cy.session([email, password], () => {
    cy.loginUI(email, password); // your POM-based login command
  });
});


module.exports = {}   