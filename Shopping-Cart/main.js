import './style.css'
import {getCartItems, setCartItems} from "./utils"

async function getProducts() {
    const res = await fetch('https://dummyjson.com/products?limit=20&skip=10');
    const data = await res.json();

    return data.products;
}

function InitialState() {
    const cartItems = getCartItems();
    document.querySelector("#cartItemCount").innerText = cartItems.items.length;
}

function createProductCart(product) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl relative">
            <figure>
              <img class="h-[30%] w-[80%]"
                src="${product.thumbnail}"
                alt="${product.title}"
              />
            </figure>
            <div
              class="absolute top-0 right-0 bg-primary h-12 w-12 flex items-center justify-center text-center font-semibold rounded-tr-2xl rounded-bl-2xl text-sm"
            >
              ${product.discountPercentage}% OFF
            </div>
            <div class="card-body">
              <h2 class="card-title">${product.title}</h2>
              <p class="text-sm">${product.description.substring(0, 80)}</p>
              <p>$${product.price}</p>
              <div id="addToCart" class="card-actions justify-end">
                <button id="addToCartButton" class="btn btn-sm btn-primary"></button>
              </div>
            </div>
          </div>
    `
    const addtoCartButton = div.querySelector("#addToCartButton");
    addtoCartButton.innerText = "Add to Cart";
    addtoCartButton.addEventListener("click",() => {

        const cartItems = getCartItems();

        const productInCart = cartItems.items.find((item) => item.id === product.id);
        if (!productInCart) {
            cartItems.items.push({
                id: product.id,
                title: product.title,
                brand: product.brand,
                description:product.description,
                thumbnail: product.thumbnail,
                price: product.price,
                quantity:1
            })
        } else {
            cartItems.items = cartItems.items.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            })
        }

        document.querySelector("#cartItemCount").innerText = cartItems.items.length;

        setCartItems(cartItems);
    })
    return div;
}

async function renderProducts() {
    const products = await getProducts();
    const productDiv = document.querySelector("#products");


    products.forEach((product) => {
        productDiv.append(createProductCart(product));
    })
}

InitialState();
renderProducts();
