class ProductPage 
{
    elements = 
    {
        productsMenu: "a[href='/products']",
        searchInput: "#search_product",
        searchButton: "#submit_search",
        firstSearchResult: ".productinfo .add-to-cart",
        viewCartLink: 'a[href="/view_cart"]',
        productWrapper: ".features_items .product-image-wrapper",
        addToCartBtn: ".productinfo .add-to-cart",
        quantityInput: "#quantity",
        addToCartDetailBtn: "button.cart",
        modalCloseBtn: ".btn.btn-success.close-modal.btn-block"
    }

    openProducts() 
    {
        cy.get(this.elements.productsMenu).click()
    }

    search(term) 
    {
        cy.get(this.elements.searchInput).clear().type(term)   //jeans
        cy.get(this.elements.searchButton).click()
        cy.get(".title.text-center").should('have.text', 'Searched Products')
    }

    addFirstResultToCart() 
    {
        cy.get(this.elements.firstSearchResult).first().within(() =>
            {
                cy.contains('Add to cart').first().click({ force: true })
            })
        cy.contains('Continue Shopping').should('be.visible').click();
    }


    navigateToCategory(mainCategory, subCategory)
    {
        cy.contains('a', mainCategory).click();
        cy.contains('a', subCategory).click();
    }

    addFirstCategoryProductToCart()
    {
        cy.get(this.elements.productWrapper)
            .first()
            .find(this.elements.addToCartBtn)
            .click({force:true})

        cy.get(this.elements.modalCloseBtn)
            .click({ force: true });

        cy.contains('Continue Shopping').should('be.visible').click();
        
        cy.wait(4000);

        
        
    }

    // openFirstCategoryProductDetail() 
    // {
    //     cy.get(this.elements.productWrapper)
    //         .first()
    //         .find('a[href*="/product_details"]')  //  "View Product"
    //         .click({ force: true });
    // }

    // setQuantityAndAddToCart(quantity) 
    // {
    //     cy.get(this.elements.quantityInput).clear().type(quantity)
    //     cy.get(this.elements.addToCartDetailBtn).click({ force: true })
    //     cy.contains('View Cart').click()
    // }

    // openProductDetailByIndex(index = 0) 
    // {
    //     cy.get(this.elements.productWrapper)
    //         .eq(index)
    //         .find('a[href*="/product_details"]')
    //         .click()
    // }
}


module.exports = ProductPage