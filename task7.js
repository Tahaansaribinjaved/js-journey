//^ 🔹 1. Template Literals
// Use backticks ` to dynamically insert variables.

// ✅ Tasks:

// Create variables: name, language, and score
let name = "Taha";
let language = "JavaScript";
let score = 95;

// Log a message using a template literal like:
// "Hi Taha, you scored 95 in JavaScript!"
console.log(`Hi ${name}, you scored ${score} in ${language}!`);

// 🔹 2. DOM Manipulation (Basics)
// Practice targeting and updating HTML elements.

// ✅ Tasks:

// Add a <p id="demo">Hello</p> in your HTML
let p_tag = document.getElementById("demo");
p_tag.innerText = "Hello"; // Change text to "Hello"
// Use document.getElementById("demo").innerText to change its content

// Use .style.color and .style.fontSize to change style
p_tag.style.color = 'blue';
p_tag.style.fontSize = '20px';
// 🔹 3. Events
// Respond to user actions like button clicks.

// ✅ Tasks:

// Add a <button> with id="changeBtn"

// Add a click event that changes text in <p id="demo"> to "Text updated!"

let button_tag = document.createElement('button');
button_tag.innerText = 'Change text';
button_tag.id = 'changeBtn';
button_tag.addEventListener('click',()=>{
    p_tag.innerText = 'Text updated!';
})