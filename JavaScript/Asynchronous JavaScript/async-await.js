hasMetting = false;

const meeting = new Promise((resolve, reject) => {
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

const addToCalendar = (mettingDetails) => {
    const calendar = `${mettingDetails.name} has been scheduled on ${mettingDetails.location} at ${mettingDetails.time}.`;
    return Promise.resolve(calendar);
}

async function myMeetings() {
    const meetingDetails = await meeting;
    const calendar = await addToCalendar(meetingDetails);
    console.log(calendar);
}

myMeetings();

console.log("This is outside of promise");