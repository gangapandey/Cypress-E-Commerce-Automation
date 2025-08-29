class LoginPage 
{
    elements = 
    {
        emailInput: "input[data-qa='login-email']",
        passwordInput: "input[placeholder='Password']",
        loginButton: "button[data-qa='login-button']"
    }

    openLogin() 
    {
        cy.contains('Signup / Login').click()
    }

    fillCredentials(email, password) 
    {
        cy.get(this.elements.emailInput).clear().type(email)
        cy.get(this.elements.passwordInput).clear().type(password)
    }

    submit() 
    {
        cy.get(this.elements.loginButton).click()
    }

    login(email, password) {
        this.fillCredentials(email, password);
        this.submit();

        // Assertion after login (to confirm success)
        cy.contains('Logged in as').should('be.visible');
    }
}


module.exports = LoginPage