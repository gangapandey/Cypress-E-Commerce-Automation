const HomePage = require("../PageObjects/HomePage");
const RegisterPage = require('../PageObjects/RegisterPage');
const LoginPage = require('../PageObjects/LoginPage');
const ProductPage = require('../PageObjects/ProductPage');
const CartPage = require('../PageObjects/CartPage');
const CheckoutPage = require('../PageObjects/CheckoutPage');
const PaymentPage = require('../PageObjects/PaymentPage');
const LogoutPage = require('../PageObjects/LogoutPage');

const { generateUser } = require('../../fixtures/testData');


describe('E2E Full Flow: Register → Login → Product Search → Add to Cart → Checkout → Logout', () => 
    {
        const homePage = new HomePage();
        const registerPage = new RegisterPage();
        const loginPage = new LoginPage();
        const productPage = new ProductPage();
        const cartPage = new CartPage();
        const checkoutPage = new CheckoutPage();
        const paymentPage = new PaymentPage();
        const logoutPage = new LogoutPage();

        // Generate user from fixture helper
        let user;
        const productName = 'Blue Top'; // example product
        before(()=>
        {
            user = generateUser();
            Cypress.env('registeredUser', user);
        })

        
        it('TC-1: Navigate to the Home Page', ()=>
        {
            homePage.open();
            homePage.opensignup();
        })

        it('TC-2: Register new user ', ()=>
        {
            registerPage.startRegistration(user.firstName, user.email);
            cy.get('body').then($body =>
            {
                if ($body.text().includes('Email Address already exists!'))
                {
                    cy.log('user already exists, skipping registration.')
                }
                else
                {
                    registerPage.fillDetails(user);
                    registerPage.submitCreateAccount();

                    cy.contains('Account Created!', {timeout: 10000}).should('be.visible');
                    cy.contains('Continue').click();
                }
            }
            )
        })

        it('TC-3: Navigate to Product Page, Search Product and Add to cart ', ()=>
        {
            productPage.openProducts();
            productPage.search('Jeans');
            productPage.addFirstResultToCart(productName);
        })

        it('TC-4: Add product from diffrent categories to cart', ()=>
        {
            productPage.navigateToCategory('Kids', 'Tops & Shirts');
            productPage.addFirstCategoryProductToCart();

            productPage.navigateToCategory('Women', 'Saree');
            productPage.addFirstCategoryProductToCart();
        })

        it('TC-5: Validate the cart items and Proceed to checkout', ()=>
        {
            cartPage.openCart()
            cartPage.assertItemCount(3)

            cartPage.openFirstItemDetail();
            cartPage.updateQuantityAndReturnToCart(2);

            cartPage. deleteLastItem();

            cartPage.proceedToCheckout();
        })

        it('TC-6: Validate Address details, Order summary, Total Price and place order', ()=>
        {
            checkoutPage.validateAddressDetails(user); 
            checkoutPage.validateOrderSummary(2); 
            checkoutPage.validateTotalPrice(); 

            checkoutPage.placeOrder();
        })

        it('TC-7: Validate Payment and Order Confirmation', ()=>
        {
            paymentPage.assertPaymentPage();
            paymentPage.fillPaymentDetails();
            paymentPage.payAndConfirmOrder();
            paymentPage.validateSuccessMessage();
            paymentPage.downloadInvoiceAndContinue();
        })

        it('TC-8: Validate Logout Process', ()=>
        {
            logoutPage.assertUserLoggedIn(user.firstName);
            logoutPage.clickLogout();
        })

        it('TC-9: Save the registered user data and relogin wwith that login information without entering', ()=>
        {
            const savedUser = Cypress.env('registeredUser');
            homePage.opensignup();
            loginPage.login(savedUser.email, savedUser.password);
            logoutPage.assertReLoginSuccess(savedUser.firstName);
        })

        after(() => 
            {
                cy.clearCookies();
                cy.clearLocalStorage();
                sessionStorage.clear();
            });


       
                // Store email/password for later login tests
                //cy.wrap(email).as('registeredEmail');
                //cy.wrap(password).as('registeredPassword');
                

                // 2) Logout and Login again
                /*
                homePage.opensignup();
                loginPage.login(user.email, user.password);*/


});


