const { faker } = require('@faker-js/faker');

class PaymentPage 
{
    elements = {
        paymentHeader: 'h2:contains("Payment")',   // payment page text
        nameOnCard: '[data-qa="name-on-card"]',
        cardNumber: '[data-qa="card-number"]',
        cvc: '[data-qa="cvc"]',
        expMonth: '[data-qa="expiry-month"]',
        expYear: '[data-qa="expiry-year"]',
        payAndConfirmBtn: '[data-qa="pay-button"]',
        successMsg: 'p:contains("Your order has been placed successfully!")',
        orderPlacedText: 'h2:contains("Order Placed!")',
        downloadInvoiceBtn: '.btn.btn-default.check_out',
        continueBtn: '.btn.btn-primary'
    }

    assertPaymentPage() 
    {
        cy.get(this.elements.paymentHeader).should('be.visible');
    }

    fillPaymentDetails() 
    {
        cy.get(this.elements.nameOnCard).type(faker.person.fullName());
        cy.get(this.elements.cardNumber).type(faker.finance.creditCardNumber());
        cy.get(this.elements.cvc).type(faker.finance.creditCardCVV());
        cy.get(this.elements.expMonth).type('12');   
        cy.get(this.elements.expYear).type('2030');
    }

    payAndConfirmOrder() 
    {
        cy.get(this.elements.payAndConfirmBtn).click();
    }

    validateSuccessMessage() 
    {
        cy.get(this.elements.orderPlacedText).should('be.visible');
    }

    downloadInvoiceAndContinue() 
    {
        cy.get(this.elements.downloadInvoiceBtn).click();
        cy.get(this.elements.continueBtn).click();
    }
}

module.exports = PaymentPage;
