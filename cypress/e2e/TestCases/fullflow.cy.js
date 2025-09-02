const HomePage = require("../PageObjects/HomePage");
const RegisterPage = require('../PageObjects/RegisterPage');
const LoginPage = require('../PageObjects/LoginPage');
const ProductPage = require('../PageObjects/ProductPage');
const CartPage = require('../PageObjects/CartPage');
const CheckoutPage = require('../PageObjects/CheckoutPage');
const PaymentPage = require('../PageObjects/PaymentPage');
const LogoutPage = require('../PageObjects/LogoutPage');

const { generateUser } = require('../../fixtures/testData');

 // Generate user from fixture helper
let user;
       
before(()=>
{
    user = generateUser();
    Cypress.env('registeredUser', user);
})


describe('E2E Full Flow', () => 
    {
        const homePage = new HomePage();
        const registerPage = new RegisterPage();
        const loginPage = new LoginPage();
        const productPage = new ProductPage();
        const cartPage = new CartPage();
        const checkoutPage = new CheckoutPage();
        const paymentPage = new PaymentPage();
        const logoutPage = new LogoutPage();

        let productName = 'Blue Top';

        
        it('TC-1: Navigate to the Home Page', ()=>
        {
            homePage.open();
            cy.url().should('include', '/');
            homePage.opensignup();
            cy.get('h2').should('contain.text', 'Signup');
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
            logoutPage.clickLogout();
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



describe('Negative Tests - Auth & Registration', () => 
{
    const homePage = new HomePage();
    const registerPage = new RegisterPage();
    const loginPage = new LoginPage();

    it('TC-10: Validate showing error for invalid email format', () => 
    {
        homePage.opensignup();
        loginPage.login('test@com', 'ValidPass123');
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    loginPage.loginWithEmptyPassword = (email) => 
    {
        cy.get(loginPage.elements.emailInput).clear().type(email);
        cy.get(loginPage.elements.passwordInput).clear(); 
    };

    it('TC-11: Validate error for empty password field', () => 
    {
        homePage.opensignup();
        loginPage.loginWithEmptyPassword('user@email.com');
        loginPage.submit();
        cy.contains('Logged in as').should('not.exist');
    });

    it('TC-12: Validate duplicate email registration', () => 
    {
        registerPage.startRegistration(user.firstName, user.email);
        cy.contains('Email Address already exist!').should('be.visible');
        cy.contains('Logged in as').should('not.exist');
    });

});


describe('Negative Tests - Product & Cart', () => 
{
    const productPage = new ProductPage();
    const cartPage = new CartPage();
    const loginPage = new LoginPage();
    const homePage = new HomePage();

    beforeEach(() => 
    {
        // Login a valid user before each cart/product test
        const savedUser = Cypress.env('registeredUser');
        homePage.opensignup();
        loginPage.login(savedUser.email, savedUser.password);
    });

    it('TC-13: Validate message for non-existent product search', () => 
    {
        productPage.openProducts();
        productPage.search('Topi');

        cy.get('.product-item').should('have.length', 0);
    });

    it('TC-14: Validate checkout with empty cart', () => 
    {
        cartPage.openCart();
        cartPage.deleteAllItems();
        cartPage.proceedToCheckout();
        cy.contains('Cart is empty').should('be.visible');
    });
});


describe('Negative Tests - Checkout & Payment', () => 
{
    const checkoutPage = new CheckoutPage();
    const paymentPage = new PaymentPage();
    const productPage = new ProductPage();
    const cartPage = new CartPage();

    beforeEach(() => 
    {
        // Ensure at least one product is in cart
        productPage.openProducts();
        productPage.search('Blue Top');
        productPage.addFirstResultToCart();
        cartPage.openCart();
        cartPage.proceedToCheckout();
        checkoutPage.placeOrder();
    });

    it('TC-15: Validate rejecting invalid payment card number', () => 
    {
        paymentPage.fillPaymentDetails('12345', '123', '12/30');
        paymentPage.payAndConfirmOrder();
        cy.contains('Invalid card number').should('be.visible');
    });

    it('TC-16:Validate rejecting expired card', () => 
    {
        paymentPage.fillPaymentDetails('4111111111111111', '123', '01/00');
        paymentPage.payAndConfirmOrder();
        cy.contains('Card expired').should('be.visible');
    });
 
});







