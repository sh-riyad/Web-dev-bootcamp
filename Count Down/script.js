const container = document.querySelector(".container");

function initialView() {

    localStorage.setItem("state", "initial");

    container.innerHTML = "";

    inputs = document.createElement("div");
    inputs.classList = "inputs";
    inputs.innerHTML =
        `   <input id="minutes" type="number">
            <input id="seconds" type="number">
        `;

    startContainer = document.createElement("div");
    startContainer.classList = "start-container";
    startContainer.innerHTML =
        `
            <input id="start" type="submit">
        `;

    container.append(inputs, startContainer);
    const startButton = document.querySelector("#start");
    const inputMinutes = document.querySelector("#minutes");
    const inputSeconds = document.querySelector("#seconds");

    startButton.addEventListener("click", () => {

        let minutes = parseInt(inputMinutes.value || 0) ;
        let seconds = parseInt(inputSeconds.value || 0);
    
        localStorage.setItem("state", "runnung");
        runningView(minutes, seconds);
    
    });
    
}

function runningView(minutes, seconds) {
    const duration = (minutes * 60) + seconds;

    container.innerHTML = "";
    const timmerContainer = document.createElement("div");
    timmerContainer.className = "timmer-container";
    const pauseStop = document.createElement("div");
    pauseStop.className = "pause-stop";


    

    for (let i = duration; i >= 0; i--){
        let minute = parseInt(i / 60);
        let second = parseInt(i % 60);

        new Promise((resolve, reject) => {
        
            setTimeout(() => {

                
            }, 1000);
        })

        //console.log(minute, second);
        timmerContainer.innerHTML =
        `
            <span class="display-minutes">${minute}</span>
            <span class="display-seconds">${second}</span>
        `;
        // container.replaceChild(timmerContainer, inputs);
        container.append(timmerContainer);
    
        pauseStop.innerHTML =
            `
                <button id="pause">pause</button>
                <button id="stop">stop</button>
            `;
        //container.replaceChild(pauseStop, startContainer);
        container.append(pauseStop);
        
    }
    

}

let state = localStorage.getItem("state") || "initial";
if (state == "initial") {
    initialView();
} else if (state == "runnung") {
    runningView();
}