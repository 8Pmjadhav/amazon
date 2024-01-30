
export let cart;

loadFromLocalStorade();

export function loadFromLocalStorade() {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [{
            productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
            quantity: 1,
            deliveryOptionsId: '2'
        },
        {
            productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
            quantity: 1,
            deliveryOptionsId: '3'
        }
        ];
    }

}

export function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity_of_this_P) {
    let machingCartItem;
    cart.forEach((CartItem) => {
        if (CartItem.productId === productId) {
            machingCartItem = CartItem;
        }
    });
    if (machingCartItem) {
        machingCartItem.quantity += quantity_of_this_P;
    }
    else {
        cart.push({
            productId: productId,
            quantity: quantity_of_this_P,
            deliveryOptionsId: '1'
        });
    }
    saveToLocalStorage();
}

export function updateToCart(productId, quantity) {
    cart.forEach((CartItem) => {
        if (CartItem.productId === productId) {
            CartItem.quantity = quantity;
        }
    });
    saveToLocalStorage();
}


export function removeFromCart(productId) {
    cart.forEach((CartItem, index) => {
        if (CartItem.productId === productId) {
            cart.splice(index, 1);
        }
    });
    saveToLocalStorage();
}

export function CartQuantity() {
    let total_in_cart = 0;
    cart.forEach((CartItem) => {
        total_in_cart += CartItem.quantity;
    })
    return total_in_cart;
}