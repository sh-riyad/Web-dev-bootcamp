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

loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username == "" || password == "") {
        showAlert("Username or password cannot be empty");
    }else if (usernames.includes(username)) {
        if (username === password) {
            showAlert("Login successfull");

            localStorage.setItem("username", username)

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);

        } else {
            showAlert("Invalid password");
        }
    } else {
        showAlert("Invalid username");
    }
});

function showAlert(message){
    alert.classList.remove("hidden");
    let alertMessage = alert.querySelector("#alertMessage");
    alertMessage.textContent = message;

    const button = alert.querySelector("button");
    button.addEventListener("click", hideAlert);

    setTimeout(hideAlert, 5000);
}

function hideAlert() {
    alert.classList.add("hidden");
}
