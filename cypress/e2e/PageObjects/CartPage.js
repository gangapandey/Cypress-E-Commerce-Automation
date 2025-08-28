class CartPage 
{
    elements = 
    {
        cartRows: '#cart_info_table tbody tr',          
        proceedToCheckout: '.btn.btn-default.check_out',
        deleteBtn: '#cart_info_table a.cart_quantity_delete',
        cartQuantity: '.cart_quantity',
        cartTotalPrice: 'p.cart_total_price'
    }

    openCart() 
    {
        cy.get('a[href="/view_cart"]').click()
    }

    assertItemCount(expectedCount) 
    {
        cy.get(this.elements.cartRows).should('have.length', expectedCount)
    }

    openFirstItemDetail() 
    {
        cy.get(this.elements.cartRows)
            .first()
            .find('a')
            .first() 
            .invoke('attr', 'href')
            .then((href) => {
                cy.visit(href)  // navigate to product detail page
        })
    }

    updateQuantityAndReturnToCart(quantity = 3) 
    {
        cy.get('#quantity').clear().type(quantity)
        cy.get('button.cart').click()  
        cy.contains('View Cart').click()  
    }

    deleteItemById(productId) 
    {
        cy.get(`${this.elements.deleteBtn}[data-product-id="${productId}"]`).click()
    }

    proceedToCheckout() 
    {
        cy.get(this.elements.proceedToCheckout).click()
    }

    
}

module.exports = CartPage
