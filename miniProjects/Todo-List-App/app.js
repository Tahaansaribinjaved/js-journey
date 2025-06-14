// randomString function to generate a random id for each todo item
// This function generates a random string of specified length
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


// Add Task 
let todo_form = document.getElementById("todo-form");
let todo_list = document.getElementById("todo-list");
let todo_input = document.getElementById('todo-input')
let todo_list_obj = [
    
]
todo_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    addTodo(todo_input.value)
})

const addTodo = (value)=>{
    todo_input.value = ''

     if(value.trim() === '') {
        alert("Please enter a valid task");
        return;
    }
    // Create a new todo object 
   let todo_obj = {
  'text': value,
  'time': `${(new Date().getHours() % 12) || 12} : ${new Date().getMinutes().toString().padStart(2, '0')} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`,
  'date': new Date().toDateString(),
  'id': randomString(10),
  'completed': false
};
    todo_list_obj.push(todo_obj);
    console.log(todo_list_obj);
    renderTodoList();
}

const renderTodoList = () => {
    todo_list.innerHTML = '';
    todo_list_obj.forEach((todo) => {
        let todo_li = document.createElement('li');
        todo_li.setAttribute('data-id', todo.id);
        todo_li.innerHTML  = `
                <span>
                    <input type="checkbox" style="background-color: #6c757d;" onchange="toggleComplete(event)" class="todo-checkbox" ${todo.completed ? "checked" : ""} >
                    <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                </span>
                <span>
                    <span><button onclick="editTodo(event)" class="edit-todo">Edit</button>
                <button onclick="deleteTodo(event)" class="delete-todo">Delete</button></span>
                <span class="time">${todo.time} - ${todo.date}</span>
                </span>
    `
    console.log(todo_li);
    todo_list.appendChild(todo_li);
    });

}
const deleteTodo = (e) => {
    let todo_id = e.target.closest('li').getAttribute('data-id');
    todo_list_obj = todo_list_obj.filter(todo => todo.id !== todo_id);
    renderTodoList();
}
const toggleComplete = (e) => {
    // Get the id of the todo item from the closest li element
    let todo_id = e.target.closest('li').getAttribute('data-id');
    // Find the todo object in the array
    let todo = todo_list_obj.find(todo => todo.id === todo_id);
    if (todo) {
        // Toggle the completed status
        todo.completed = e.target.checked;
        // Add or remove class based on current checkbox state
        if (todo.completed) {
            e.target.nextElementSibling.classList.add('completed');
        } else {
            e.target.nextElementSibling.classList.remove('completed');
        }
        // Re-render to update the UI
        renderTodoList();
    }
}



const editTodo = (e) => {
    let todo_id = e.target.closest('li').getAttribute('data-id');
    let todo = todo_list_obj.find(todo => todo.id === todo_id);
    if (todo) {
        let newText = prompt("Edit your task:", todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText;
            renderTodoList();
        }
    }
}
// Initial render of the todo list
renderTodoList();