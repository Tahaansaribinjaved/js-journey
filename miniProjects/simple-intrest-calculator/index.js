// ### Simple Interest Calculator — Step-by-step plan

// 1. **Input needed:**

//    * Principal amount (P)
//    * Rate of interest (R)
//    * Time period in years (T)

// 2. **Formula:**
//    Simple Interest (SI) = (P × R × T) / 100

// 3. **Steps:**

//    * Take input from user for P, R, and T (use `prompt()`)
//    * Convert inputs to numbers (make sure they aren’t strings)
//    * Calculate simple interest using the formula
//    * Display the result using `console.log()` or `alert()`

// 4. **Bonus:**

//    * Validate the inputs (make sure numbers are positive and not empty)
//    * Show a friendly message if input is invalid

// ---

let principal = prompt("Enter the principal amount (P):");
let rate = prompt("Enter the rate of interest (R):");
let time = prompt("Enter the time period in years (T):");
// Convert inputs to numbers
principal = parseFloat(principal);
rate = parseFloat(rate);
time = parseFloat(time);
// Validate inputs
if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate <= 0 || time <= 0) {
    alert("Please enter valid positive numbers for principal, rate, and time.");
} else {    
    // Calculate simple interest
    let simpleInterest = (principal * rate * time) / 100;
    // Display the result
    console.log(`The simple interest is: ${simpleInterest}`);
    alert(`The simple interest is: ${simpleInterest}`);
}