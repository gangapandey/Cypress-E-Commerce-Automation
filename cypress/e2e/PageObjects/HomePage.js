class HomePage
{
    elements = 
    {
        signupLogin: "a[href='/login']",
        homeCarousel: "header[id='header'] li:nth-child(1) a:nth-child(1)"
    }

    open()
    {
        cy.visit('/')
    }

    opensignup()
    {
        cy.contains(' Signup / Login').click();
    }
}

module.exports = HomePage