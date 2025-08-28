class CheckoutPage 
{
    elements = 
        {
            deliveryAddressBox: '#address_delivery',    
            billingAddressBox: '#address_invoice',     
            addressName: '.address_firstname',         
            addressCity: '.address_city',
            addressCountry: '.address_country_name',
            addressPhone: '.address_phone',

            reviewOrderTable: '.table.table-condensed',
            reviewOrderRows: 'tbody tr[id^="product-"]'
,
            productName: 'td.cart_description',
            productPrice: 'td.cart_price',
            productQuantity: 'td.cart_quantity',
            productTotal: 'td.cart_total',
            totalAmount: 'p.cart_total_price',          

            placeOrderBtn: '.btn.btn-default.check_out'
        }

        /* Validate delivery & billing address contain expected values */
        validateAddressDetails(user) 
        {
            cy.get(this.elements.deliveryAddressBox).within(() => 
                {
                    if(user.firstName) cy.contains(user.firstName).should('exist');
                    if(user.address) cy.contains(user.address).should('exist');
                    if(user.country) cy.contains(user.country).should('exist');
                    if(user.phone) cy.contains(user.phone).should('exist');
                })

            cy.get(this.elements.billingAddressBox).within(() => 
                {
                    if(user.firstName) cy.contains(user.firstName).should('exist');
                    if(user.address) cy.contains(user.address).should('exist');
                    if(user.country) cy.contains(user.country).should('exist');
                    if(user.phone) cy.contains(user.phone).should('exist');
                })
        }

        validateOrderSummary(expectedCount) 
        {
            // Assert number of rows matches items
            cy.get(this.elements.reviewOrderRows).should('have.length', expectedCount)
        }

        /* Validate total price = sum of each item’s (price × qty) */
        
        validateTotalPrice() 
        {
            let calculatedTotal = 0;

            cy.get(this.elements.reviewOrderRows).each(($row) => {
                cy.wrap($row).within(() => {
                    cy.get('td.cart_price p').invoke('text').then((priceText) => {
                        cy.get('td.cart_quantity button').invoke('text').then((qtyText) => {
                            cy.get('td.cart_total p.cart_total_price').invoke('text').then((totalText) => {
                                
                                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                                const qty = parseInt(qtyText.replace(/[^0-9]/g, ''));
                                const rowTotal = parseInt(totalText.replace(/[^0-9]/g, ''));

                                if (!isNaN(price) && !isNaN(qty) && !isNaN(rowTotal)) {
                                    expect(rowTotal).to.eq(price * qty);   // ✅ correct
                                    calculatedTotal += rowTotal;
                                }
                            });
                        });
                    });
                });
            }).then(() => {
                cy.get('tr:last-child td p.cart_total_price').invoke('text').then((text) => {
                    const displayedTotal = parseInt(text.replace(/[^0-9]/g, ''));
                    expect(displayedTotal).to.eq(calculatedTotal);
                });
            });
        }

               
    


        /* Place order */
        placeOrder() 
        {
            cy.get(this.elements.placeOrderBtn).click()
        }
}

module.exports = CheckoutPage
