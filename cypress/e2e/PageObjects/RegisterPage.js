class RegisterPage
{
    elements =
    {
        nameInput: "input[placeholder='Name']",
        emailInput: "input[data-qa='signup-email']",
        signupButton: "button[data-qa='signup-button']",
        titleMr: "#id_gender1",
        titleMrs: "#id_gender2",
        passwordInput: "#password",
        daySelect: "#days",
        monthSelect: "#months",
        yearSelect: "#years",
        firstName: "#first_name",
        lastName: "#last_name",
        company: "#company",
        address1: "#address1",
        country: "#country",
        state: "#state",
        city: "#city",
        zipcode: "#zipcode",
        mobileNumber: "#mobile_number",
        createAccountBtn: "button[data-qa='create-account']"
    }


    openSignup() 
    {
        cy.contains('Signup / Login').click();
    }

    startRegistration(name, email)
    {
        cy.get(this.elements.nameInput).clear().type(name);
        cy.get(this.elements.emailInput).clear().type(email);
        cy.get(this.elements.signupButton).click();
    }

    fillDetails({title = 'Mr', password, day, month, year, firstName, lastName, company, address, country, state, city, zipcode, mobile})
    {
        if(title === 'Mr')
        {
            cy.get(this.elements.titleMr).check();
        }
        else
        {
            cy.get(this.elements.titleMrs).check();
        }

        cy.get(this.elements.passwordInput).type(password);
        cy.get(this.elements.daySelect).select(day);
        cy.get(this.elements.monthSelect).select(month);
        cy.get(this.elements.yearSelect).select(year);


        cy.get(this.elements.firstName).type(firstName);
        cy.get(this.elements.lastName).type(lastName);
        cy.get(this.elements.company).type(company);
        cy.get(this.elements.address1).type(address);
        cy.get(this.elements.country).select(country);
        cy.get(this.elements.state).type(state);
        cy.get(this.elements.city).type(city);
        cy.get(this.elements.zipcode).type(zipcode);
        cy.get(this.elements.mobileNumber).type(mobile);
    }

    submitCreateAccount() 
    {
        cy.get(this.elements.createAccountBtn).click()
    }

}

module.exports = RegisterPage