function display(sum) {
    console.log(sum);
}
function calculator(x, y, callback) {
    sum = x + y;
    if (callback) callback(sum);
}
// calculator(4, 3, display);
calculator(4, 3);