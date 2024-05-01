const processOrder = () => {
    console.log("Processing order for customer");

    var currentTime = new Date().getTime();
    while (currentTime + 3000 >= new Date().getTime());

    console.log("Order processed for customer");
};
console.log("Take order for customer");
processOrder();
console.log("Completed order for customer");