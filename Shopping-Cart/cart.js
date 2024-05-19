import './style.css'
import {getCartItems, setCartItems} from "./utils"

function InitialState() {
    const cartItems = getCartItems();
    document.querySelector("#cartItemCount").innerText = cartItems.items.length;
}
function createCartRow() {
    const cartRow = `
    <td>
        <div class="flex items-center gap-3">
            <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                    <img
                        src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
                                alt="iphone 9"
                              />
                            </div>
                          </div>
                          <div>
                            <div class="font-bold">iphone 9</div>
                            <div class="text-sm opacity-50">Apple</div>
                          </div>
                        </div>
    </td>
    <td>$549</td>
    <td>
                        <input
                          type="number"
                          placeholder=""
                          min="0"
                          value="0"
                          class="input input-bordered w-20 max-w-xs"
                        />
    </td>
    <td>$1098</td>
    `
    return cartRow;
}
function renderCart(){
    cartItems = getCartItems();

    console.log(cartItems);
    const row = document.querySelector("#cart-row");
    cartItem.forEach((cart) => {
        row.append(createCartRow(cart));

    })
    

}

renderCart()
InitialState()