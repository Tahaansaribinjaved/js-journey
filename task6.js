/*
Awesome! Let’s get into it 🔥
Here’s how we’ll tackle **Arrays** and **Objects** with some hands-on mini tasks.

---

//////// ! *📦 Arrays – Quick Concepts**

Arrays store multiple values in a single variable.

### ✅ Do These Tasks:

1. **Create an array** of 5 fruits. Log each one using a loop.
2. Add a fruit using `.push()`
3. Remove the last fruit using `.pop()`
4. Add one at the beginning using `.unshift()`
5. Remove the first one using `.shift()`
6. Use `.forEach()` to log all fruits with their index

---

*/
let fruits = ['Apple','Banana','Mango','PineApple','lechee'];




for(let i = 0;i<=fruits.length-1;i++){
   console.log(fruits[i]);
}
fruits.push("any fruit",2);


for(let i = 0;i<=fruits.length-1;i++){
   console.log(fruits[i]);
}

/*

## 🔹 **👤 Objects – Quick Concepts**

Objects hold key-value pairs.

### ✅ Do These Tasks:

1. **Create a `student` object** with:

   * name
   * age
   * isEnrolled
   * courses (an array of subjects)
2. Log the student’s name and course list.
3. Add a new property: `grade`
4. Update age
5. Delete `isEnrolled`
6. Loop through all properties using `for...in`

---

💡 Try these tasks in your own code (no code from me as you requested).

When done, reply with ✅ or any output/errors.
Then we’ll move to:
**Template Literals + DOM + Events**
and finally… your first **basic-level project** 😎
*/