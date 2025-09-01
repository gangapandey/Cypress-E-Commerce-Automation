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


    // LoginPage.js
    loginWithInvalid(email, password, expectedError) 
    {
        this.fillCredentials(email, password);
        this.submit();
        cy.get('body').then($body => 
        {
            if ($body.text().includes(expectedError)) 
            {
                cy.log(`Handled expected error: ${expectedError}`);
            } else 
            {
                cy.log('Unexpected behavior, investigate login.');
            }
        });
    }


    submit() 
    {
        cy.get(this.elements.loginButton).click()
    }

    login(email, password) {
        this.fillCredentials(email, password);
        this.submit();
    }
}


module.exports = LoginPage