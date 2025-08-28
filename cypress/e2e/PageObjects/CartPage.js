class CartPage 
{
    elements = 
    {
        cartRows: '#cart_info_table tbody tr',          
        proceedToCheckout: '.btn.btn-default.check_out' 
    }

    openCart() 
    {
        cy.get('a[href="/view_cart"]').click()
    }

    // Assert the number of items in cart
    assertItemCount(expectedCount) 
    {
        cy.get(this.elements.cartRows).should('have.length', expectedCount)
    }

    proceedToCheckout() 
    {
        cy.get(this.elements.proceedToCheckout).click()
    }

    // Optional: delete an item by product ID
    deleteItemById(productId) 
    {
        cy.get(`#cart_info_table a.cart_quantity_delete[data-product-id="${productId}"]`).click()
    }

    // Optional: get total price of an item by row index (0-based)
    getItemTotalPrice(rowIndex = 0) 
    {
        return cy.get(this.elements.cartRows).eq(rowIndex).find('p.cart_total_price')
    }
}

module.exports = CartPage
