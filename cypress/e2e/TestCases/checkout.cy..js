const CartPage = require('../PageObjects/CartPage');

describe('checkout', ()=>
{
    const cartPage = new CartPage();

    it("TC-4:  Checkout Process Test", ()=>
    {
        cartPage.openCart();
        cartPage.proceedToCheckout();

        // Assertion: URL contains checkout page
        cy.url().should('include', '/checkout')

    })
})