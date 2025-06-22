// let user = {
//   name: "John",
//   years: 30
// };

// let { name , years: age ,isAdmin = false } = user;

// alert( name ); // John
// alert( age ); // 30
// alert( isAdmin ); // false
// name property into the variable name.
// years property into the variable age.
// isAdmin property into the variable isAdmin (false, if no such property)



// 2 Task 
// importance: 5
// There is a salaries object:

// let salaries = {
//   "John": 100,
//   "Pete": 300,
//   "Mary": 250
// };


// // Create the function topSalary(salaries) that returns the name of the top-paid person.
// function topSalary(salaries) {
//   let maxSalary = 0;
//   let topPerson = null;

//   for (let [name, salary] of Object.entries(salaries)) {
//     if (salary > maxSalary) {
//       maxSalary = salary;
//       topPerson = name;
//     }
//   }

//   return topPerson;
// }
// console.log(topSalary(salaries)); // "Pete"



// If salaries is empty, it should return null.
// If there are multiple top-paid persons, return any of them.
// P.S. Use Object.entries and destructuring to iterate over key/value pairs.

// Open a sandbox with tests.






    // Awesome, Taha! Let's crush **Day 1** 🚀
    // Today's focus is on **4 core ES6 features** that make your JavaScript cleaner and more powerful:

    // ---

    // ## 🔥 Day 1: ES6 Essentials

    // ### 🎯 Goals:

    // * ✅ Destructuring Arrays & Objects
    // * ✅ Spread & Rest Operators
    // * ✅ Default Parameters
    // * ✅ Enhanced Object Literals

    // ---

    // ## 1️⃣ Destructuring

    // ### 👉 Arrays

    // ```js
    // const arr = [10, 20, 30];
    // const [a, b, c] = arr;
    // console.log(a, b, c); // 10 20 30
    // ```

    // ### 👉 Objects

    // ```js
    // const user = { name: "Taha", age: 17 };
    // const { name, age } = user;
    // console.log(name, age); // Taha 17
    // ```

    // ### ✅ Task:

    // Create an object `student` and destructure its properties.

    // const student  = {name: "Taha", age : 18 , country:"Pakistan "};
    // const {name,age,country} = student;
    // console.log(name, age, country); // Taha 18 Pakistan
    // ---

    // ## 2️⃣ Spread & Rest

    // ### 👉 Spread (copy/merge arrays or objects)

    // ```js
    // const nums = [1, 2, 3];
    // const moreNums = [...nums, 4, 5]; 
    // console.log(moreNums); // [1, 2, 3, 4, 5]

    // const obj1 = { a: 1 };
    // const obj2 = { ...obj1, b: 2 }; 
    // console.log(obj2); // { a: 1, b: 2 }
    // ```

    // ### 👉 Rest (gather leftover args)

    // ```js
    // function sum(...numbers) {
    //   return numbers.reduce((a, b) => a + b);
    // }
    // console.log(sum(1, 2, 3)); // 6
    // ```

    // ### ✅ Task:

    // Make a function `logDetails(...info)` that logs all values.
    function logDetails(...info) {
    console.log(info);
    }
    logDetails("Taha", 18, "Pakistan"); // ["Taha", 18, "Pakistan"]


    // ---

    // ## 3️⃣ Default Parameters

    // ```js
    // function greet(name = "Guest") {
    //   console.log(`Hello, ${name}`);
    // }
    // greet(); // Hello, Guest
    // greet("Taha"); // Hello, Taha
    // ```

    // ### ✅ Task:

    // Make a function `multiply(x = 2, y = 3)` and log the product.

    function multiply(x = 2, y = 3) {
        console.log(x * y);
        }   
    multiply(); // 6
    // ---

    // ## 4️⃣ Enhanced Object Literals

    // ```js
    // const name = "Taha";
    // const age = 17;
    // const user = { name, age }; // shorter syntax
    // ```

    // ### ✅ Task:

    // Make a `product` object using short syntax with name, price, and quantity.

    const name = "Laptop";
    const price = 1000;
    const quantity = 5;
    const product = { name, price, quantity }; // shorter syntax

    // ---

    // ## 🧪 Practice Challenge (10–15 min)

    // Create a function `createUser({ name, age = 18, country = "Pakistan" })` using **object destructuring + default params** that returns a message:

    // ```js
    // createUser({ name: "Taha" }); 
    // // output: "Taha is 18 years old from Pakistan"
    // ```


    function createUser({ name, age = 18, country = "Pakistan" }) {
    return `${name} is ${age} years old from ${country}`;
    }
    console.log(createUser({ name: "Taha" })); // Taha is 18 years old from Pakistan
    const user1 = { name: "Ali", age: 20 };
    const user2 = { name: "Sara", age: 22, country: "USA" };
    createUser(user1, user1.country = 'UAE'); // Ali is 20 years old from UAE
    createUser(user2); // Sara is 22 years old from USA
    // console.log(createUser({ name: "Ali", age: 20 })); // Ali is 20 years old from Pakistan
    // console.log(createUser({ name: "Sara", age: 22, country: "USA" })); // Sara is 22 years old from USA
    // console.log(createUser({ name: "Aisha", country: "India" })); // Aisha is 18 years old from India
    // console.log(createUser({ name: "Omar", age: 25, country: "UAE" })); // Omar is 25 years old from UAE
    // destructuring + default params

    // ---

// ## ⏱️ Estimated Time:

// * Learning + practicing examples: **45 mins**
// * Challenge task: **15 mins**

// When you're done, send your **code for review**, and I’ll give you ✅ feedback + help you prepare for **Day 2: Array methods**!

// Ready to start writing code?
