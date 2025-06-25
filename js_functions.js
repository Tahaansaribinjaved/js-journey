// Awesome, Taha! Let’s dive into **Day 3** 🚀
// Today is all about **thinking like a JavaScript pro** — understanding how functions behave, how data flows, and how powerful function-based programming really is.

// ---

// ## 🔥 **Day 3: Closures, Callbacks & Higher-Order Functions**

// ### 🎯 Goals:

// * ✅ Understand **Closures**
// A closure is a function that has access to the parent scope, after the parent function has closed.

// Closures has historically been used to:

// Create private variables
// Preserve state between function calls
// Simulate block-scoping before let and const existed
// Implement certain design patterns like currying and memoization
// Note
// Old JavaScript code will often contain closures, but modern JavaScript will not use closures as frequently as before.

// ECMAScript 2015 and subsequent JavaScript versions have introduced new language features that provide alternatives to closures.

// While closures are a powerful concept in JavaScript, new JavaScript features make some use cases for closures less necessary.



// * ✅ Practice **Higher-Order Functions**
// * ✅ Learn how to use **Callbacks**
// * ✅ Build a small practical example

// ---

// ### 1️⃣ **Closures** – A function “remembers” the variables from where it was created.

// ```js
// function outer() {
//   let counter = 0;
//   return function inner() {
//     counter++;
//     console.log(`Counter: ${counter}`);
//   };
// }

// const count = outer();
// count(); // Counter: 1
// count(); // Counter: 2
// ```

// #### ✅ Task:

// Make a `makeMultiplier(multiplier)` function that returns a function which multiplies input by that multiplier.

// ```js
// function makeMultiplier(multiplier) {
//   return function (num) {
//     return num * multiplier;
//   };
// }

// const double = makeMultiplier(2);
// console.log(double(5)); // 10

// const triple = makeMultiplier(3);
// console.log(triple(5)); // 15
// ```

// ---

// ### 2️⃣ **Higher-Order Functions** – Functions that take or return other functions.

// ```js
// function greet(name) {
//   return `Hello, ${name}!`;
// }

// function processUser(name, callback) {
//   return callback(name);
// }

// console.log(processUser("Taha", greet)); // Hello, Taha!
// ```

// #### ✅ Task:

// Make a `calculator(a, b, operation)` function that applies the passed operation.

// ```js
// function calculator(a, b, operation) {
//   return operation(a, b);
// }

// function add(x, y) {
//   return x + y;
// }

// function multiply(x, y) {
//   return x * y;
// }

// console.log(calculator(5, 3, add)); // 8
// console.log(calculator(5, 3, multiply)); // 15
// ```

// ---

// ### 3️⃣ **Callbacks** – Pass a function and call it when ready.

// ```js
// function loadData(callback) {
//   console.log("Loading...");
//   setTimeout(() => {
//     callback("Data loaded!");
//   }, 1000);
// }

// loadData((message) => {
//   console.log(message);
// });
// ```

// #### ✅ Task:

// Simulate a user login system with a delay and callback:

// ```js
// function loginUser(username, callback) {
//   console.log("Authenticating...");
//   setTimeout(() => {
//     callback(`Welcome, ${username}!`);
//   }, 1500);
// }

// loginUser("Taha", (message) => {
//   console.log(message); // Welcome, Taha!
// });
// ```

// ---

// ### 🧪 Challenge: Closure Counter

// Create a function `createCounter(start)` that returns an object with two methods: `increment()` and `get()`.

// ```js
// function createCounter(start = 0) {
//   let count = start;
//   return {
//     increment: () => count++,
//     get: () => count
//   };
// }

// const counter = createCounter(5);
// counter.increment();
// counter.increment();
// console.log(counter.get()); // 7
// ```

// ---

// ✅ That’s Day 3 done, Taha! You now understand some of the **most powerful** and **frequently asked interview concepts**.

// When you're ready, say **"start Day 4"** and we’ll go deep into:

// * `this`, `bind`, `call`, `apply`
// * Arrow vs Regular Functions
// * Object Methods

// Let’s keep the momentum going! 🔥



// function createCounter(start = 0) {
//   let count = start;
//   return {
//     increment: () => count++,
//     get: () => count
//   };
// }

// const counter = createCounter(5);
// counter.increment();
// counter.increment();
// console.log(counter.get()); // 7



