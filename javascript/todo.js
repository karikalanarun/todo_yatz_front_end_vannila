
let addButton = document.getElementById("add-btn")


function markAsCompleted(btnId) {
    document.getElementById(btnId).setAttribute("status", "completed")
}


function createTodoText(todoli, text) {
    let span = document.createElement("span")
    span.innerText = text;
    todoli.appendChild(span)
}


function createDeleteBtn(todoli, todo) {
    let deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"
    todoli.appendChild(deleteBtn)
}


function createMarkAsCompletedBtn(todoli, todo) {
    let markAsCompletedBtn = document.createElement("button")
    markAsCompletedBtn.innerText = "Mark as Completed"
    todoli.appendChild(markAsCompletedBtn)
}

function createEditBtn(todoli, todo) {
    let editBtn = document.createElement("button")
    editBtn.innerText = "Edit"
    todoli.appendChild(editBtn)
}

function createTodo(todo) {
    let todoItem = document.createElement("li")
    createTodoText(todoItem, todo.title)
    createEditBtn(todoItem, todo)
    createDeleteBtn(todoItem, todo)
    createMarkAsCompletedBtn(todoItem, todo)
    document.getElementById("todo-list").appendChild(todoItem)
}

addButton.addEventListener("click", function () {
    let inputBox = document.getElementById("todo-editor")
    let todoText = inputBox.value
    let createTodoReq = new XMLHttpRequest()
    createTodoReq.onreadystatechange = function () {
        if (createTodoReq.readyState === 4 && createTodoReq.status === 200) {
            createTodo(JSON.parse(createTodoReq.response))
        }
    }
    createTodoReq.open("POST", "https://arun-todo-app.herokuapp.com/todo")
    createTodoReq.setRequestHeader("Content-Type", "application/json")
    createTodoReq.send(JSON.stringify({ title: todoText, completed: false }))
})

let httpRequest = new XMLHttpRequest()

httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
        let todoList = JSON.parse(httpRequest.response).todos
        for (let i = 0; i < todoList.length; i++) {
            createTodo(todoList[i])
        }
    }
}
httpRequest.open("GET", "https://arun-todo-app.herokuapp.com/todos");
httpRequest.send()