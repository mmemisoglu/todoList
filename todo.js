//Selecting all elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

//All Clear
function clearAllTodos(e) {
  if (confirm("Are you sure you want to delete them all?")) {
    //Clear todo in UI
    //todoList.innerHTML = "" //slow
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

//Todos filter
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach((listItems) => {
    const text = listItems.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      //Not found
      listItems.setAttribute("style", "display: none !important");
    } else {
      listItems.setAttribute("style", "display: block ");
    }
  });
}

//Delete todo in UI
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo deleted successfully");
  }
}

//Delete todo in storage
function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();
  todos.forEach((todo, index) => {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Todo listing on page load
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
}

//Todo data entry control
function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Please enter a todo...");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo has been successfully added");
  }
  e.preventDefault();
}

//Todos control in storage
function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

//Add new todo in storage
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Show information
function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 1500);
}

//Created todo UI
function addTodoToUI(newTodo) {
  //Defining <a> and <li> tags
  const listItem = document.createElement("li");
  const link = document.createElement("a");

  //Attribute defined
  link.href = "#";
  link.className = "detele-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";

  //Add text node
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //Add List Item to Todo List
  todoList.appendChild(listItem);
  //Clear input after adding
  todoInput.value = "";
}
