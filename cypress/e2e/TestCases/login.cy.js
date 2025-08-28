const HomePage = require('../PageObjects/HomePage');
const LoginPage = require('../PageObjects/LoginPage');
const users = require('../../fixtures/userData.json');

describe('User Login', ()=>
{
    const homePage = new HomePage();
    const loginPage = new LoginPage();

    it("TC-2: Login User Test", ()=>
    {
        cy.session([this.registeredEmail, this.registeredPassword], () => {
            homePage.open()
            loginPage.openLogin()
            loginPage.fillCredentials(this.registeredEmail, this.registeredPassword)
            loginPage.submit()
            cy.contains('Logged in as').should('be.visible')
        })
    })
})