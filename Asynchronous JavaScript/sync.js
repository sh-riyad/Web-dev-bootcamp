const processOrder = () => {
    console.log("Processing order for customer");

    setTimeout(() => {
        console.log("Order processed");
    }, 3000);
}

console.log("Take order from customer");
processOrder();
console.log("Completed order for customer");