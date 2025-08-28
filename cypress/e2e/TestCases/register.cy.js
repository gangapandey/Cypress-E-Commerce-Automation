const {generateUser} = require('../../fixtures/testData');
const HomePage = require('../PageObjects/HomePage');
const RegisterPage = require('../PageObjects/RegisterPage');
const { faker } = require('@faker-js/faker');

describe('User Registration', () => {
    const homePage = new HomePage();
    const registerPage = new RegisterPage();

    it("TC-1: Register new user with Faker data", () => 
        {
            const user = generateUser();
 
            homePage.open();
            homePage.opensignup();
            
            registerPage.startRegistration(user.firstName, user.email);

            registerPage.fillDetails(user);

            cy.wait(10000);
      
            registerPage.submitCreateAccount();

            // Verify account creation
            cy.contains('Account Created!').should('be.visible');
            cy.contains('Continue').click();

            // Store email/password for later login tests
            cy.wrap(email).as('registeredEmail');
            cy.wrap(password).as('registeredPassword');
    });
});
