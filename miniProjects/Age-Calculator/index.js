let birthYear = prompt("Enter your birth year:");
let currentYear = new Date().getFullYear();
let age = currentYear - birthYear;
console.log(`Your age is: ${age}`);