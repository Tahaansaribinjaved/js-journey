// randomString function to generate a random id for each todo item
// This function generates a random string of specified length
function randomString(length) {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }
  var str = "";
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

// global variable

let todo_list= document.getElementById("todo-list");
let todo_input = document.getElementById("todo-input");
let todo_list_obj = [];

// Function  to  Add Task
const addTodo = (value) => {
  todo_input.value = "";
  if (value.trim() === "") {
    alert("Please enter a valid task");
    return;
  }
  // Create a new todo object
  let todo_obj = {
    text: value,
    time: `${new Date().getHours() % 12 || 12} : ${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${new Date().getHours() >= 12 ? "PM" : "AM"}`,
    date: new Date().toDateString(),
    id: randomString(10),
    completed: false,
  };
  todo_list_obj.push(todo_obj);
  // console.log(todo_list_obj);
  renderTodoList();
};
// Function  to clear the todo list
const clearTodoList = () => {
    todo_list_obj = [];
    renderTodoList();
};

// Function  to render the todo list
const renderTodoList = () => {
  // Show loader at start
  document.getElementById('loader').style.display = 'block';
  document.getElementById('empty-banner').style.display = 'none';
    
  // Clear existing list
  todo_list.innerHTML = "";
  
  setTimeout(()=>{

    // Check if list empty
    if (todo_list_obj.length === 0) {
    // Hide loader
    document.getElementById('loader').style.display = 'none';
    // Show empty banner
    document.getElementById('empty-banner').style.display = 'block';
    return;
  }
  
  // Render list items
  todo_list_obj.forEach((todo) => {
    let todo_li = document.createElement("li");
    todo_li.setAttribute("data-id", todo.id);
    todo_li.innerHTML = `
    <div class="todo-item">
    <div class="left-section">
    <input type="checkbox" onchange="toggleComplete(event)" class="todo-checkbox" ${
      todo.completed ? "checked" : ""
      }>
      <span class="todo-text ${todo.completed ? "completed" : ""}">${
            todo.text
          }</span>
          </div>
          <div class="right-section">
          <button onclick="editTodo(event)" class="edit-todo">Edit</button>
          <button onclick="deleteTodo(event)" class="delete-todo">Delete</button>
        </div>
        <div class="time">${todo.time} - ${todo.date}</div>
        </div>
        `;
    todo_list.appendChild(todo_li);
  });
  
  // Hide loader after rendering
  document.getElementById('loader').style.display = 'none';
},200)
  


  // Save current list
  saveTodos();
};// Function  to delete the todo item

const deleteTodo = (e) => {
  let todo_id = e.target.closest("li").getAttribute("data-id");
  todo_list_obj = todo_list_obj.filter((todo) => todo.id !== todo_id);
  renderTodoList();
};
// Function to toggle the completed status of a todo item
const toggleComplete = (e) => {
  // Get the id of the todo item from the closest li element
  let todo_id = e.target.closest("li").getAttribute("data-id");
  // Find the todo object in the array
  let todo = todo_list_obj.find((todo) => todo.id === todo_id);
  if (todo) {
    // Toggle the completed status
    todo.completed = e.target.checked;
    // Add or remove class based on current checkbox state
    if (todo.completed) {
      e.target.nextElementSibling.classList.add("completed");
    } else {
      e.target.nextElementSibling.classList.remove("completed");
    }
    saveTodos
    // Re-render to update the UI
    // renderTodoList();
  }
};
// Function to edit a todo item
const editTodo = (e) => {
  let todo_id = e.target.closest("li").getAttribute("data-id");
  let todo = todo_list_obj.find((todo) => todo.id === todo_id);
  if (todo) {
    let newText = prompt("Edit your task:", todo.text);
    if (newText !== null && newText.trim() !== "") {
      todo.text = newText;
      renderTodoList();
    }else{
      alert('Please Enter a valid value to edit ');
    }
  }
};


// Save todos to localStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todo_list_obj));
};

// Load todos from localStorage
const loadTodos = () => {
    // Check if there are todos stored in localStorage
    // todo_list.innerHTML = "";
  const stored = localStorage.getItem("todos");
  if (stored) {
    console.log(stored);
    
    todo_list_obj = JSON.parse(stored);
    renderTodoList();
  }else {
        todo_list_obj = [];
    }
};


// All Event listner
let todo_form = document.getElementById("todo-form");
todo_form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(todo_input.value);
});
let clear_button = document.getElementById("clear-todos");
clear_button.addEventListener("click", clearTodoList);

// Initial render of the todo list
// renderTodoList();
loadTodos();
