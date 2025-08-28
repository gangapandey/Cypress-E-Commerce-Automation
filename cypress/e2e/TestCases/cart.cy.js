const HomePage = require('../PageObjects/HomePage');
const ProductPage = require('../PageObjects/ProductPage');
const CartPage = require('../PageObjects/CartPage');

describe('Add product to cart', ()=>
{
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const cartPage = new CartPage();

    it('TC-3: Add product to car', ()=>
    {
        homePage.open()
        productPage.openProducts()
        productPage.search('Jeans')
        productPage.addFirstResultToCart()

        // Open cart and verify
        cartPage.openCart()
        cartPage.assertItemCount(1)
    })

})