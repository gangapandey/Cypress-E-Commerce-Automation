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
        cy.contains('a[href="/view_cart"]', 'Cart').click()
    }


    assertItemCount(expectedCount) 
    {
        cy.get(this.elements.cartRows).should('have.length', expectedCount)
    }

    openFirstItemDetail() 
    {
        cy.get(this.elements.cartRows)
            .first()
            .find('a[href*="/product_details"]')  // adjust selector to match product detail link
            .click({ force: true })
    }


    updateQuantityAndReturnToCart(quantity = 3) 
    {
        cy.get('#quantity').clear().type(quantity)
        cy.get('button.cart').click()  
        cy.contains('View Cart').click()  
    }

    getCartTotal() 
    {
        return cy.get(this.elements.cartTotalPrice).last().invoke('text').then((text) => 
            {
                return parseFloat(text.replace(/[^0-9.]/g, ''))
            })
    }

    
   // Delete last item and validate total amount and item
    deleteLastItemAndValidateTotal() {
    const cleanNumber = (text) => parseInt(text.replace(/[^0-9]/g, ''), 10);

    // Get previous total
    cy.get(this.elements.cartTotalPrice).last().invoke('text').then((totalText) => {
        const previousTotal = cleanNumber(totalText);

        // Get last item's price
        cy.get(this.elements.cartRows).last()
          .find('td.cart_total')   // adjust if selector differs
          .invoke('text').then((itemText) => {
            const lastItemPrice = cleanNumber(itemText);

            // Delete last item
            cy.get(this.elements.cartRows).last()
              .find('a.cart_quantity_delete').click();

            // Assert new total
            cy.get(this.elements.cartTotalPrice).last().invoke('text').then((newTotalText) => {
                const newTotal = cleanNumber(newTotalText);
                expect(newTotal).to.eq(previousTotal - lastItemPrice);
            });
        });
    });
}


    

    proceedToCheckout() 
    {
        cy.get(this.elements.proceedToCheckout).click()
    }


    
}

module.exports = CartPage
