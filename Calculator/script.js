//Calculator Core Aspect

function add(a, b){
 return a + b;       
};

function substract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
if (b === 0) {
    return "Error";

}

    return a / b;
};
console.log(add(2, 3));
console.log(substract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 0));

//Variable
let firstNumber = "";
let operator = null;
let secondNumber = "";
let awaitingSecondNumber = false;

function operate(operator, a, b ){
    const operations = {
        "+": add,
        "-": substract,
        "*": multiply,
        "/": divide
    };
    return operations[operator](a, b);
};


console.log(operate("+", 3, 5));  // expect 8
console.log(operate("-", 10, 4)); // expect 6
console.log(operate("*", 3, 4));  // expect 12
console.log(operate("/", 20, 5)); // expect 4

// Calculator Display
const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".numbers-btn");

digitButtons.forEach(button =>{
    button.addEventListener("click", () =>{
        const digit = button.textContent;

        if(awaitingSecondNumber) {
            secondNumber += digit;

            
        }else{
            firstNumber += digit;


        }
         //display.value = awaitingSecondNumber ? secondNumber : firstNumber;
         if (awaitingSecondNumber){
             //display.value = secondNumber;
             display.value = firstNumber + " " + operator + " " + secondNumber;

         } else{
            display.value = firstNumber;
         }
    });
});

//Operation Buttons
const operatorButtons = document.querySelectorAll(".operator-btn");

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(firstNumber !== ""){
if (secondNumber !== "") {
                evaluate();
            }
        operator = button.textContent;
        awaitingSecondNumber = true;

      
         display.value = firstNumber + operator;
        }
    });
});

const equalButton = document.getElementById("equal-btn");

equalButton.addEventListener("click", () =>{
evaluate();
});


//evaluate and reset Logic
function evaluate() {
    if (firstNumber !== "" && operator !== null && secondNumber !==""){
    
    const result = roundResult(operate(operator, Number(firstNumber), Number(secondNumber)));
    display.value = result;

    firstNumber = String(result);
    secondNumber = "";
    operator = null;
    awaitingSecondNumber = false;
    };
};

//delete from calculator memory

const clearButton = document.getElementById("clear-btn");

clearButton.addEventListener("click", () => {
    firstNumber = "";
    secondNumber ="";
    operator = null;
    awaitingSecondNumber = false;
    display.value = "";
})


 function roundResult(number) {
    return Math.round(number * 10000) / 10000;
}
console.log(roundResult(10 / 3));

//Decimal-btn Function

const decimalButton = document.getElementById("decimal-btn");

decimalButton.addEventListener("click", () => {
    if (awaitingSecondNumber) {
        if (!secondNumber.includes(".")){
            secondNumber += ".";
            display.value = secondNumber;
        }
    }else {
        if (!firstNumber.includes(".")) {
            firstNumber += ".";
            display.value = firstNumber;
        }
    }
})

//backspace-btn
const backspaceButton = document.getElementById("backspace-btn");

backspaceButton.addEventListener("click", () => {
    if (awaitingSecondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        display.value = secondNumber;
    } else {
        firstNumber = firstNumber.slice(0, -1);
        display.value = firstNumber;
    }
});



//Keyboard Support

document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
         digitButtons.forEach(button => {
    if (button.textContent === e.key) {
        button.click();
    }
});    
    } else if (["+", "-", "*", "/"].includes(e.key)) {
         operatorButtons.forEach(button => {
            if (button.textContent === e.key) button.click();
        });
    } else if (e.key === "Enter" || e.key === "=") {
        equalButton.click();
    } else if (e.key === "Backspace") {
        backspaceButton.click();
    } else if (e.key === ".") {
        decimalButton.click();
    } else if (e.key === "Escape" || e.key.toLowerCase() === "c") {
        clearButton.click();
    }
});