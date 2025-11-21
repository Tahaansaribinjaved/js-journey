        //! 1.Alerts

// 1.	Write a script to greet your website visitor using JS alert box.
// alert("Wellcome User!");/
// 2.	Write a script to display following message on your web page:
// alert("Error! Please enter a valid password.");
// 3.	Write a script to display following message on your web page: (Hint : Use line break)
// alert("Wellcome to JS Land \n Happy coding ");
// 4.	Write a script to display following messages in sequence:
// alert("Wellcome to JS land");
// alert("Happy coding");
        //! 2.VARIABLES	FOR	STRINGS

// 1. Declare a variable called username.
// var username;
// 2. Declare a variable called myName & assign to it a string
// that represents your Full Name.
// var myName = "Taha ansari"
// 3. Write a script to
// a. declare a JS variable, titled message
// b. assign “Hello World” to the variable message
// c. display the message in alert box
// 4. Write a script to save student’s bio data in JS variables
// and show the data in alert boxes. Example:
// VARIABLES	
//   FOR	
//   STRINGS |	
//   JAVASCRIPT
// Page	
//   2 of	
//   4
// 5. Write a script to display the following alert using one JS
// variable:
 // Single string variable with newline characters
    // const message = "JavaScript Alert\n\nPIZZA\nPIZZ\nPIZ\nPI\nP";

    // Display the alert
    // alert(message);
        //! 3.VARIABLES	FOR	  NUMBERS
// 3. Declare a variable called birthYear & assign to it your
// birth year. Show the following message in your browse

// var birthYear = 2007;
// alert("My birth year is " + birthYear+ "\ndataType of my declared variable is "+typeof(birthYear));


        //! 5-7.MAth
// 7. Write a program to implement checkout process of a shopping
// cart system for an e-commerce website. Store the following in
// variables
// a. Price of item 1
// b. Price of item 2
// c. Ordered quantity of item 1
// d. Ordered Quantity of item 2
// e. Shipping charges

// var price_of_p1 = 560;
// var price_of_p2 = 200;
// var Q_of_Item_1 = 2;
// var Q_of_Item_2 = 5;
// var Shipping_Charges =150;
// var total_cost = (price_of_p1*Q_of_Item_1)+(price_of_p2*Q_of_Item_2)+Shipping_Charges;
// alert(total_cost);

// Assume we have 10 US dollars & 25 Saudi Riyals. Write a script
// to convert the total currency to Pakistani Rupees. Perform all
// calculations in a single expression.
// (Exchange rates : 1 US Dollar = 104 Pakistani Rupee and
// 1 Saudi Riyal = 28 Pakistani Rupee)
// var total_pak_rupees = (10*104)+(25*28);
// // alert(total_pak_rupees);
// 10. Write a program to initialize a variable with some number
// and do arithmetic in following sequence:
// a. Add 5
// b. Multiply by 10
// c. Divide the result by 2
// Perform all calculations in a single expression.
// var num = 5;
// num = ((num+5)*10)/2;
// alert(num);

// 11. The Age Calculator: Forgot how old someone is? Calculate
// it!
// a. Store the current year in a variable.
// b. Store their birth year in a variable.
// c. Calculate their 2 possible ages based on the stored values.
// Output them to the screen like so: “They are either NN or NN
// years old”. 

// var c_year = new Date();
// var b_year = new Date("24-aug-2007")

// alert((c_year-b_year)/31557600000);

            //& math completed at 10 nov 12:46 AM

        //! 8-11_ConcatenatingStrings_Prompts_IFStatements_ComparisonOperators
// 4. Write a program to take “gender” as input from user. If the
// user is male, give the message: Good Morning Sir. If the user is
// female, give the message: Good Morning Ma’am.

// var gender = prompt("Enter your gender");

// if(gender.toLowerCase()=="male"){
//         console.log("Good morning,Sir");
// }else if(gender.toLowerCase()=="female"){
//         console.log("Good morning,MA'AM");
// }

// 10. Write a program to implement checkout process of a
// shopping cart system for an e-commerce website. Take input
// from users, the following:
// a. Name of item1
// b. Name of item2
// c. Price of item 1
// d. Price of item 2
// e. Ordered quantity of item 1
// f. Ordered Quantity of item 2
// g. Shipping charges
// Compute the total cost. If the total cost is above 2000 PKR ,
// offer them 10% discount & show the receipt in your browser.
// var price_of_p1 = 560;
// var price_of_p2 = 200;
// var Q_of_Item_1 = 2;
// var Q_of_Item_2 = 5;
// var Shipping_Charges =150;
// var discounted_price;
// var total_cost = (price_of_p1*Q_of_Item_1)+(price_of_p2*Q_of_Item_2)+Shipping_Charges;
// if(total_cost>2000){
//         discounted_price = total_cost - (total_cost * 10/100)
// }
// alert(`total price ${total_cost} , discounted cost : ${discounted_price}`);


// guess number
// var guess_number = +prompt("guess a number ");
// var secret_number = 5;
// if(guess_number==secret_number){
//         console.log(`Bom you guess excat number ${guess_number}`);
// }else if(guess_number>secret_number){
//         console.log(`excat number is lowest`);
// }else if(guess_number<secret_number){
//         console.log(`excat number is highest`);
// }

// Write a program that takes time as input from user in 24 hours
// clock format like: 1900 = 7pm. Implement the following case
// using if, else & else if statements

// var time = 1900;

// if(time>=0 &&time<1200){
//         console.log("Good morning");
// }else if(time>=1200&&time<1700){
//         console.log("Good afternoon");
// }else if(time>=1700&&time<2100){
//         console.log("Good evening");
// }else if(time>=2100&&time<2400){
//         console.log("Good night");
// }

// leap year
// var year = 1900;
// if(year%400==0){
//         console.log("leap year 400");
// }else if(year%100==0){
//         console.log("not leap year 100");
// }else if(year%4==0){
//         console.log("leap year 4");
// }else{
//         console.log("not leap year ");
// }

//

        //& array 10Q completed at 11 nov 12:20 AM

// var greeting;
//  var hour = 13;
//  if (hour < 18) {
//  greeting = "Good day";
//  }else{
//  greeting = "Good evening";
//  } 

// Write a JavaScript program that accept two integers and
// display the larger. Also show if the two integers are equal.

// var num1=+prompt("Enter number 1"),num2=+prompt("Enter number 2");
// console.log(num1==num2 ? "num1 and num2 is equal ":num1<num2?"num2 is greater":"num1 is greater");