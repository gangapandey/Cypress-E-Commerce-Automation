const HomePage = require("../PageObjects/HomePage");
const RegisterPage = require('../PageObjects/RegisterPage');
const LoginPage = require('../PageObjects/LoginPage');
const ProductPage = require('../PageObjects/ProductPage');
const CartPage = require('../PageObjects/CartPage');

const { generateUser } = require('../../fixtures/testData');

describe('E2E Full Flow: Register → Login → Product Search → Add to Cart → Checkout → Logout', () => 
    {
        const homePage = new HomePage();
        const registerPage = new RegisterPage();
        const loginPage = new LoginPage();
        const productPage = new ProductPage();
        const cartPage = new CartPage();

        // Generate user from fixture helper
        const user = generateUser();
        const productName = 'Blue Top'; // example product

        it('should complete full journey successfully', () => 
            {
                // 1) Register
                homePage.open();
                homePage.opensignup();
                registerPage.startRegistration(user.firstName, user.email);
                registerPage.fillDetails(user);
                registerPage.submitCreateAccount();

                cy.contains('Account Created!').should('be.visible');
                cy.contains('Continue').click();
                

                // 2) Logout and Login again
                /*
                homePage.opensignup();
                loginPage.login(user.email, user.password);*/
                

                // 3) Product Search + Add to Cart
                //homePage.goToProducts();
                productPage.searchProduct('Jeans');
                productPage.addProductToCartByName(productName);
                productPage.goToCart();

                // 4) Checkout
                cartPage.verifyProductInCart(productName);
                cartPage.proceedToCheckout();
                checkoutPage.verifyDeliveryAddress(user.firstName);
                checkoutPage.placeOrder({
                    nameOnCard: `${user.firstName} ${user.lastName}`,
                    cardNumber: Cypress._.random(1000000000000000, 9999999999999999).toString(), // random 16-digit
                    cvc: Cypress._.random(100, 999).toString(),
                    expMonth: `${Cypress._.random(1, 12)}`,
                    expYear: `${Cypress._.random(2026, 2032)}`
                });
                checkoutPage.verifyOrderSuccess();

                // 5) Logout
                homePage.clickLogout();
                homePage.verifyLoggedOut();
            });
});