import './style.css'

const usernames = [
    "IB03001", "IB03002", "IB03003", "IB03004", "IB03005", "IB03006", "IB03007", "IB03008",
    "IB03009", "IB03010", "IB03011", "IB03012", "IB03013", "IB03014", "IB03015", "IB03016",
    "IB03017", "IB03018", "IB03019", "IB03020", "IB03021", "IB03022", "IB03023", "IB03024"
];

const loginButton = document.querySelector("#loginButton");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const alert = document.querySelector("#alert");

let currentUser = localStorage.getItem("currentUser") || "None";

// check if the user is already logged in or not
function initialState(){
    if (currentUser == "None") {
        renderLogin();
    } else {
        window.location.href = 'index.html';
    }
}


// verify email password and execute login operation
function renderLogin() {
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();

        // Take usename and password from user
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();


        if (username == "" || password == "") {
            
            showAlert("Username or password cannot be empty");
        }else if (usernames.includes(username)) {
            if (username === password) {
                showAlert("Login successfull", "green");
                localStorage.setItem("currentUser", username) // update localstorage

                // wait 1 sec before login
                setTimeout(() => {
                    window.location.href = 'index.html';
               }, 1000);

            } else {
                showAlert("Invalid password","red");
            }
        } else {
            showAlert("Invalid username","red");
        }
    });
    
}


// These functions will show the alert message
function showAlert(responseMessage, status){
    alert.classList.remove("hidden");
    let svg;
    if (status == "red") {
       svg = document.querySelector("#errorSVG");
       svg.classList.remove("hidden");
       alert.classList.add("text-red-800", "bg-red-300");
    } else {
       svg = document.querySelector("#successSVG");
       svg.classList.remove("hidden");
       alert.classList.add("text-green-800", "bg-green-300");
    }
   let alertMessage = alert.querySelector("#alertMessage");
   alertMessage.textContent = responseMessage;

   const button = alert.querySelector("button");
   button.addEventListener("click", () => hideAlert(svg));

    setTimeout(() => hideAlert(svg), 5000);
}

function hideAlert(svg) {
    alert.classList.add("hidden");
    alert.classList.remove("text-red-800", "bg-red-300", "text-green-800", "bg-green-300");
    svg.classList.add("hidden");
 }


initialState()
renderLogin()

