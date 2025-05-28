// 🧪 Task 4:
// Make a program with:
// let score = 85;
let score = 95;

// Use if / else if / else to print:
if (score < 50) {
    console.log("Fail");
} else if (score < 60) {
    console.log("Grade D");
} else if (score < 70) {
    console.log("Grade C");
} else if (score < 80) {
    console.log("Grade B");
} else {
    console.log("Grade A");
}

// Use a ternary operator to print:
// "Passed" if score >= 50, otherwise "Failed"
console.log(score >= 50 ? "Passed" : "Failed");

// switch statement to print:
switch (true) {
    case (score < 50):
        console.log("Fail");
        break;
    case (score < 60):
        console.log("Grade D");
        break;
    case (score < 70):
        console.log("Grade C");
        break;
    case (score < 80):
        console.log("Grade B");
        break;
    default:
        console.log("Grade A");
}

