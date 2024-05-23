import './style.css'
import {getCartItems, setCartItems} from "./utils"

function InitialState() {
    const cartItems = getCartItems();
  document.querySelector("#cartItemCount").innerText = cartItems.items.length;
  renderCartTotal();
}
function createCartRow(item,index) {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
  <td>
    <div class="flex items-center gap-3">
      <div class="avatar">
        <div class="mask mask-squircle w-12 h-12">
          <img
            src="${item.thumbnail}"
            alt="iphone 9"
          />
        </div>
      </div>
      <div>
        <div class="font-bold">${item.title}</div>
        <div class="text-sm opacity-50">${item.brand}</div>
      </div>
    </div>
  </td>
  <td>$${item.price}</td>
  <td>
    <input
      id="quantity"
      type="number"
      placeholder=""
      min="0"
      value="${item.quantity}"
      class="input input-bordered w-20 max-w-xs"
    />
  </td>
  <td id="total-price">$${item.price * item.quantity}</td>
  `
  const quantityInput = tableRow.querySelector("#quantity");
  quantityInput.addEventListener("input", (event) => {
    const newQuantity = event.target.valueAsNumber;

    const cartItems = getCartItems();

    if (Number.isInteger(newQuantity) && newQuantity >= 0) {
      cartItems.items[index].quantity = newQuantity;
      setCartItems(cartItems);
      renderCartTotal();
      renderCart();
      
    } 
  })
  

  return tableRow;
}





function renderCart(){
    const cartItems = getCartItems();

  //console.log(cartItems);
  
  const tableBody = document.querySelector("#table-body");
  tableBody.innerHTML = "";
    cartItems.items.forEach((item,index) => {
      //console.log(item);

      tableBody.append(createCartRow(item,index));
      // tableBody.insertAdjacentHTML('beforeend', createCartRow(item));

    })
}

function renderCartTotal() {
  const cartItems = getCartItems();
  const cartTotalDiv = document.querySelector("#cart-total")
  let totalSub = 0, discound=0,tax=0;
  cartItems.items.forEach((item) => {
    totalSub += (item.price * item.quantity);
  })

  cartTotalDiv.innerHTML = `
    <div class="cart shadow-xl">
      <div class="cart-body flex flex-col gap-3">
        <h2 class="card-title mb-2">Cart Totals</h2>
        <div class="flex justify-between">
          <span class="text-gray-500">Sub-Total</span>
          <span>$${totalSub}</span>
        </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Shipping</span>
                  <span>$${cartItems.shipping}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Discount</span>
                  <span>$${discound}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Tax</span>
                  <span>$${tax}</span>
                </div>
                <hr />

                <div class="flex justify-between">
                  <span class="text-gray-500">Total</span>
                  <span>$${totalSub + cartItems.shipping + discound + tax}</span>
                </div>
                <button class="btn btn-primary">Proceed to Checkout</button>
              </div>
            </div>
  `
}

InitialState()
renderCart()




