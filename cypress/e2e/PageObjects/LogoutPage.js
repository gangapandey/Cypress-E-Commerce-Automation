class LogoutPage {
    elements = 
    {
        loggedInText: 'a:contains("Logged in as")',  // "Logged in as username"
        logoutBtn: 'a[href="/logout"]',
        loginEmail: '[data-qa="login-email"]',
        loginPassword: '[data-qa="login-password"]',
        loginBtn: '[data-qa="login-button"]'
    }

    assertUserLoggedIn(username)
    {
        cy.get(this.elements.loggedInText).should('contain', username);
    }

    clickLogout() 
    {
        cy.get(this.elements.logoutBtn).click();
    }

    assertLoginPage() 
    {
        cy.url().should('include', '/login');
    }

    loginWithSavedUser(userData) 
    {
        cy.get(this.elements.loginEmail).type(userData.email);
        cy.get(this.elements.loginPassword).type(userData.password);
        cy.get(this.elements.loginBtn).click();
    }

    assertReLoginSuccess(username) 
    {
        cy.get(this.elements.loggedInText).should('contain', username);
    }
}

module.exports = LogoutPage;

