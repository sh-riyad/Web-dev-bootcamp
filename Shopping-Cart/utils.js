export function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || { items:[],discound:0,shipping:100};
    setCartItems(cartItems);
    return cartItems;
}

export function setCartItems(cartItems) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

