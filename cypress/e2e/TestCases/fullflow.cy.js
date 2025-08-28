const HomePage = require("../PageObjects/HomePage");
const RegisterPage = require('../PageObjects/RegisterPage');
const LoginPage = require('../PageObjects/LoginPage');
const ProductPage = require('../PageObjects/ProductPage');
const CartPage = require('../PageObjects/CartPage');
const CheckoutPage = require('../PageObjects/CheckoutPage');

const { generateUser } = require('../../fixtures/testData');

describe('E2E Full Flow: Register → Login → Product Search → Add to Cart → Checkout → Logout', () => 
    {
        const homePage = new HomePage();
        const registerPage = new RegisterPage();
        const loginPage = new LoginPage();
        const productPage = new ProductPage();
        const cartPage = new CartPage();
        const checkoutPage = new CheckoutPage();

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

                // Store email/password for later login tests
                //cy.wrap(email).as('registeredEmail');
                //cy.wrap(password).as('registeredPassword');
                

                // 2) Logout and Login again
                /*
                homePage.opensignup();
                loginPage.login(user.email, user.password);*/
                

                // 2) Product Search + Add to Cart
                productPage.openProducts();
                productPage.search('Jeans');
                productPage.addFirstResultToCart(productName);

                productPage.navigateToCategory('Kids', 'Tops & Shirts');
                productPage.addFirstCategoryProductToCart();

                productPage.navigateToCategory('Women', 'Saree');
                productPage.addFirstCategoryProductToCart();


                // 3. cart
                cartPage.openCart()
                cartPage.assertItemCount(3)

                cartPage.openFirstItemDetail();
                cartPage.updateQuantityAndReturnToCart(2);

                cartPage.proceedToCheckout();
               

               // 4. Checkout
               checkoutPage.validateAddressDetails(user); 
               checkoutPage.validateOrderSummary(3); 
               checkoutPage.validateTotalPrice(); 

               checkoutPage.placeOrder(); 

              
            });
});