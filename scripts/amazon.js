import { cart,addToCart,CartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrancy } from "./utils.js";

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count} 
      </div>
    </div>

    <div class="product-price">
      $${formatCurrancy(product.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-for-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`
})

document.querySelector('.js-products-grid').innerHTML = productsHTML;




document.querySelector('.js-cart-quantity').innerHTML = CartQuantity();

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset;
    let quantity_of_this_P = Number(document.querySelector(`.js-quantity-selector-for-${productId}`).value);
    addToCart(productId, quantity_of_this_P);
    document.querySelector('.js-cart-quantity').innerHTML = CartQuantity();

  });
});


