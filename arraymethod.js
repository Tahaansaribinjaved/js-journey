// Awesome, Taha! 💪
// Let’s jump into **Day 2** — today you'll master the most powerful **array methods** that are used in **every real-world JavaScript project** — from filtering data to building UI logic.

// ---

// ## 🔥 **Day 2: Mastering Array Methods**

// ### 🎯 **Goals for Today**

// Learn & practice the following ES6 array methods:

// * ✅ `map()`
// * ✅ `filter()`
// * ✅ `reduce()`
// * ✅ `find()`
// * ✅ `some()` / `every()`

// ---

// ## 1️⃣ `map()` – transforms each item

// ```js
// const nums = [1, 2, 3];
// const squared = nums.map(n => n * n);
// console.log(squared); // [1, 4, 9]
// ```

// ### ✅ Task:

// Make a `students` array, use `map` to return just the names.

// ```js
// const students = [
//   { name: "Taha", age: 18 },
//   { name: "Ali", age: 20 },
//   { name: "Sara", age: 17 }
// ];

// const names = students.map(s => s.name);
// console.log(names); // ["Taha", "Ali", "Sara"]
// ```

// ---

// ## 2️⃣ `filter()` – returns only matching items

// ```js
// const nums = [1, 2, 3, 4, 5];
// const evens = nums.filter(n => n % 2 === 0);
// console.log(evens); // [2, 4]
// ```

// ### ✅ Task:

// From the same `students`, return only students **18 or older**.

// ```js
// const adults = students.filter(s => s.age >= 18);
// console.log(adults); 
// // [{ name: "Taha", age: 18 }, { name: "Ali", age: 20 }]
// ```

// ---

// ## 3️⃣ `reduce()` – combine all values into one

// ```js
// const nums = [1, 2, 3, 4];
// const sum = nums.reduce((acc, curr) => acc + curr, 0);
// console.log(sum); // 10
// ```

// ### ✅ Task:

// Calculate the **total age** of all students.

// ```js
// const totalAge = students.reduce((acc, s) => acc + s.age, 0);
// console.log(totalAge); // 55
// ```

// ---

// ## 4️⃣ `find()` – returns the **first** match

// ```js
// const found = nums.find(n => n > 2);
// console.log(found); // 3
// ```

// ### ✅ Task:

// Find the first student **under 18**.

// ```js
// const minor = students.find(s => s.age < 18);
// console.log(minor); // { name: "Sara", age: 17 }
// ```

// ---

// ## 5️⃣ `some()` and `every()` – true/false checks

// * `some()` → **at least one** is true
// * `every()` → **all** must be true

// ```js
// const hasMinor = students.some(s => s.age < 18); // true
// const allAdults = students.every(s => s.age >= 18); // false
// ```

// ---

// ### 🧪 **Mini Challenge: Product Logic**

// ```js
// const products = [
//   { name: "Laptop", price: 1500 },
//   { name: "Phone", price: 800 },
//   { name: "Keyboard", price: 100 },
// ];

// // ✅ 1. Return all products above 500
// // ✅ 2. Get names only
// // ✅ 3. Find the product named “Phone”
// // ✅ 4. Check if any product is under 200
// // ✅ 5. Calculate total price
// ```

// ---

// ### 💡 Tip:

// These methods can be **chained**:

// ```js
// const expensiveNames = products
//   .filter(p => p.price > 500)
//   .map(p => p.name);
// console.log(expensiveNames); // ["Laptop", "Phone"]
// ```

// ---

// ### ✅ Let me know once you complete:

// * Tasks for `students`
// * Mini Challenge for `products`

// Then we’ll move to **Day 3: Closures, Callbacks, HOFs** (important for interviews + logic-building).
// Ready to start the tasks?
