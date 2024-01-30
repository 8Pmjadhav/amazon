import { cart } from '../data/cart.js';

export function formatCurrancy(priceCents) {
    return (priceCents / 100).toFixed(2);
}

export function updateCartQuantity() {
    let total_in_cart = 0;
    cart.forEach((CartItem) => {
        total_in_cart += CartItem.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = total_in_cart;
    document.querySelector('.js-cart-checkout-quantity')
        .innerHTML = `${total_in_cart} items`;

}