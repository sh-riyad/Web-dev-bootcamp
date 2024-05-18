hasMetting = false;

const metting = new Promise((resolve, reject) => {
    if (!hasMetting) {
        const mettingDetails = {
            name: "Technical Metting",
            location: "Google Meet",
            time: "10:00 PM"
        }
        resolve(mettingDetails);
    }
    else {
        reject(new Error("Metting already scheduled"));
    }
});
/*
const addToCalendar = (mettingDetails) => {
    return new Promise((resolve, reject) => {
        const calendar = `${mettingDetails.name} has been scheduled on ${mettingDetails.location} at ${mettingDetails.time}.`;
        resolve(calendar)
    })
};
*/
// simplified version 
const addToCalendar = (mettingDetails) => {
    const calendar = `${mettingDetails.name} has been scheduled on ${mettingDetails.location} at ${mettingDetails.time}.`;
    return Promise.resolve(calendar);
}

metting
    .then(addToCalendar)
    .then((res) => {
        // console.log(JSON.stringify(res));
        console.log(res);
    })
    .catch((err) => {
        console.log(err.message);
    });



// for running all promise
/*
promise.all([promise1, promise2]).then((res) => {
    console.log(res)
});
*/

// If we have multiple promise and we only want the promise that resolve first
/*
promise.race([promise1, promise2]).then((res) => {
    console.log(res)
});
*/