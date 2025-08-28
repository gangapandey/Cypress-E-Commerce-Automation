class ProductPage 
{
    elements = 
    {
        productsMenu: "a[href='/products']",
        searchInput: "#search_product",
        searchButton: "#submit_search",
        firstSearchResult: "body > section:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(4)",
        viewCartLink: "body > section:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2) > a:nth-child(1) > u:nth-child(1)"
    }

    openProducts() 
    {
        cy.get(this.elements.productsMenu).click()
    }

    search(term) 
    {
        cy.get(this.elements.searchInput).clear().type(term)   //jeans
        cy.get(this.elements.searchButton).click()
        cy.get(".title.text-center").should('have.tetx', 'Searched Products')
    }

    addFirstResultToCart() 
    {
        // try clicking the visible Add to cart button for the first product
        cy.get(this.elements.firstSearchResult).first().within(() =>
            {
                cy.contains('Add to cart').click({ force: true })
            })
        // confirm modal by clicking View Cart
        cy.contains('View Cart').click()
    }
}


module.exports = ProductPage