let count = 0;

const timeInterval = setInterval(() => {
    if (count > 5) {
        clearInterval(timeInterval);
    }
    console.log(count++);
},1000)