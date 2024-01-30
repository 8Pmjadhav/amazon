import { cart, removeFromCart, CartQuantity, updateToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrancy } from "./utils.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import  dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();
const tommorow = today.add(2,'d');
console.log(tommorow.format('dddd, MMM D'));


let cartHTML = "";
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    cartHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${formatCurrancy(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}" value="${cartItem.quantity}">
            <span class="update-quantity-link link-primary js-update-link js-id-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
            Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
    </div>
    </div>`;
});

function deliveryOptionsHTML(matchingProduct,cartItem){
    let Ohtml = '';
    deliveryOptions.forEach( (delivery )=>{
        const today = dayjs();
        const deliveryDay = today.add(delivery.deliveryDays,'d');
        const delDayString = deliveryDay.format('dddd , MMM D');
        const cost = delivery.priceCents===0 ? 'FREE' : `$${formatCurrancy(delivery.priceCents)}-`;

        const isChecked = delivery.id === cartItem.deliveryOptionsId;


        Ohtml += `
        <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${delDayString}
            </div>
            <div class="delivery-option-price">
                ${cost} Shipping
            </div>
            </div>
        </div>`
    })
    return Ohtml;
}
document.querySelector(".js-order-summary").innerHTML = cartHTML;

document.querySelector('.js-cart-checkout-quantity').innerHTML = `${CartQuantity()} items`;

document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
        const { productId } = deleteLink.dataset;
        removeFromCart(productId);
        document.querySelector('.js-cart-checkout-quantity').innerHTML = `${CartQuantity()} items`;
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
});


document.querySelectorAll(".js-update-link").forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
        const { productId } = updateLink.dataset;
        const quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        if(quantity<1 || quantity>1000){
            alert('Enter quantity from 1 to 1000 only');
            return;
        }
        console.log(productId,quantity);
        updateToCart(productId,quantity);
        document.querySelector('.js-cart-checkout-quantity').innerHTML = `${CartQuantity()} items`;
        document.querySelector('.quantity-label').innerHTML = quantity;
    })
});
