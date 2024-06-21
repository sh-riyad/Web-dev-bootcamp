import './style.css'

const baseUrl = "https://todo-crudl.deno.dev";

const taskSubmit = document.querySelector("#taskSubmit");
const alert = document.querySelector("#alert");
let completedContent = document.querySelector("#completedContainer");
let todoContent = document.querySelector("#todoContainer");
let inprogressContent = document.querySelector("#inprogressContainer");


let responseMessage;
let currentUser = localStorage.getItem("currentUser") || "None";

// this will verify login
function verifyLogin() {
    if (currentUser == "None") {
        window.location.href = 'login.html';
    } else {
        renderTodo();
    }
}

// to render the main container
async function renderTodo() {
    const todos = await readTodoList();
    console.log(todos);
    showTodo(todos);
    taskSubmit.addEventListener("click", () => { createTodo(todos) });
}

// Read todo list from api
async function readTodoList() {

    const url = `${baseUrl}/${currentUser}/todos`;
    const response = await fetch(url, {
        method: "GET"
    });
    const todos = await response.json();

    return todos;
    
}

// Show todo list in frontend
function showTodo(todos) {
    completedContent.innerHTML = "";
    todoContent.innerHTML = "";
    inprogressContent.innerHTML = "";

    todos.map(todo => {
        if (todo.status == "todo") {
            createTodoDiv(todo);
        } else if (todo.status == "pending") {
            createInprogressDiv(todo);
        } else if (todo.status == "completed") {
            createCompletedDiv(todo);
        }
        
    })
}

// Show todo list in frontend (status = completed)
function createCompletedDiv(todo) {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("p-2", "flex", "justify-between", "items-center")
    contentDiv.innerHTML = `
                <div class="flex items-center gap-3">
                  <span class="text-center font-medium">${todo.title}</span>
                </div>
                <button
                  id = "deleteCompletedTodo"
                  type="submit"
                  class="w-5 h-5 rounded-full hover:ring-1 hover:ring-red-800"
                >
                  <svg
                    fill="#ffffff"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24.00 24.00"
                    xml:space="preserve"
                    stroke="#ffffff"
                    stroke-width="0.00024000000000000003"
                  >
                    <g
                      id="SVGRepo_bgCarrier"
                      stroke-width="0"
                      transform="translate(4.5600000000000005,4.5600000000000005), scale(0.62)"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="24.00"
                        height="24.00"
                        rx="12"
                        fill="#000000"
                        strokewidth="0"
                      ></rect>
                    </g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="0.24000000000000005"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <style type="text/css">
                        .st0 {
                          fill: none;
                        }
                      </style>
                      <path
                        d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M10.8,16.8l-3.7-3.7l1.4-1.4l2.2,2.2l5.8-6.1L18,9.3 L10.8,16.8z"
                      ></path>
                      <rect class="st0" width="24" height="24"></rect>
                    </g>
                  </svg>
                </button>`
    completedContent.append(contentDiv);
    const deleteCompletedTodo = contentDiv.querySelector("#deleteCompletedTodo");
    deleteCompletedTodo.addEventListener("click",() => {
        deleteTodo(todo.id);
    })
}

// Show todo list in frontend (status = pending)
function createInprogressDiv(todo) {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("p-2", "flex", "justify-between", "items-center")
    contentDiv.innerHTML = `
                <div class="flex items-center gap-3">
                  <input id="updateForward" type="checkbox" class="w-5 h-5" />
                  <span class="text-center font-medium">${todo.title}</span>
                </div>
                <button
                  id="updateBackward"
                  type="submit"
                  class="w-5 h-5 rounded-full hover:ring-1 hover:ring-red-800"
                >
                  <svg
                    fill="#ffffff"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="-4 -4 48.00 48.00"
                    xml:space="preserve"
                    stroke="#ffffff"
                  >
                    <g
                      id="SVGRepo_bgCarrier"
                      stroke-width="0"
                      transform="translate(5.4,5.4), scale(0.73)"
                    >
                      <rect
                        x="-4"
                        y="-4"
                        width="48.00"
                        height="48.00"
                        rx="24"
                        fill="#000000"
                        strokewidth="0"
                      ></rect>
                    </g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="0.16"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path
                          d="M20,0C8.974,0,0,8.973,0,20c0,11.027,8.974,20,20,20c11.029,0,20-8.973,20-20C40,8.973,31.029,0,20,0z M25.738,31.079 c-0.592,0.506-1.316,0.753-2.037,0.754c-0.895,0.002-1.783-0.375-2.408-1.108l-7.385-8.666c-1.004-1.176-1.006-2.901-0.008-4.082 l7.355-8.692c1.125-1.329,3.115-1.495,4.442-0.37c1.33,1.125,1.496,3.115,0.371,4.443l-5.625,6.648l5.646,6.629 C27.223,27.96,27.064,29.95,25.738,31.079z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>`
    inprogressContent.append(contentDiv);
    const updateForward = contentDiv.querySelector("#updateForward")
    updateForward.addEventListener("click", () => {
        updateTodo(todo,"completed")
    })
    const updateBackward = contentDiv.querySelector("#updateBackward");
    updateBackward.addEventListener("click", () => {
        updateTodo(todo, "todo");
    })

}

// // Show todo list in frontend (status = todo)
function createTodoDiv(todo) {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("p-2", "flex", "justify-between", "items-center")
    contentDiv.innerHTML = `<div class="flex items-center gap-3">
                  <input id="updateForward" type="checkbox" class="w-5 h-5" />
                  <span class="text-center font-medium">${todo.title}</span>
                </div>
                <button 
                  id = "todoDelete"
                  type="submit"
                  class="w-5 h-5 rounded-full hover:ring-1 hover:ring-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 30 30"
                  >
                    <path
                      d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
                    ></path>
                  </svg>
                </button>`
    todoContent.append(contentDiv);
    const todoDelete = contentDiv.querySelector("#todoDelete");
    todoDelete.addEventListener("click", () => {
        deleteTodo(todo.id);
    })

    const updateForward = contentDiv.querySelector("#updateForward");
    updateForward.addEventListener("click", () => {
        updateTodo(todo, "pending");
    })

}

// Create new to todo
async function createTodo(todos) {
    const url = `${baseUrl}/${currentUser}/todos`;
    const todoInput = document.querySelector("#todoInput").value

    let flag = true;
    // check if new item is already available in todo list
    todos.map(todo => {
        if (todoInput == todo.title & todo.status == "todo") {
            flag = false;
        }
    })
    if (flag) {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                title: todoInput,
            })
        })
    
        if (!response.ok) {
            const data = await response.json();
            responseMessage = data.message + ". " + data.fieldErrors.title[0];
            showAlert(responseMessage,"red");
        } else {
            const data = await response.json();
            responseMessage = data.message
            showAlert(responseMessage, "green");
            renderTodo();

        }
    } else {
        showAlert("The item already exists in the to-do list.", "red");
    }
    

}

// Delete todo
async function deleteTodo(todo_id) {
    const url = `${baseUrl}/${currentUser}/todos/${todo_id}`;

    const response = await fetch(url, {
        method: "DELETE",
    })

    if (!response.ok) {
        const data = await response.json();
        let responseMessage = data.message
        showAlert(responseMessage,"red");
    } else {
        const data = await response.json();
        let responseMessage = data.message;
        showAlert(responseMessage, "green");
        renderTodo();
    }
}

// Update todo
async function updateTodo(todo, move) {
    const url = `${baseUrl}/${currentUser}/todos/${todo.id}`
    
    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            "status": move,
        })
    })

    if (!response.ok) {
        const data = await response.json();
        responseMessage = "Something is wrong!";
        console.log(responseMessage);
        showAlert(responseMessage,"red");
    } else {
        if (move == "pending") {
            responseMessage = `Task "${todo.title}" is now in progress`;
        } else if (move == "todo"){
            responseMessage = `Task "${todo.title}" is now in todo list`;
        } else {
            responseMessage = `Task "${todo.title}" is completed`;
        }
        
        showAlert(responseMessage, "green");
        renderTodo();
    }
    
}

// to show alert message
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

verifyLogin()