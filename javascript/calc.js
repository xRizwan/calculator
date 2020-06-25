function calculate(){
    // splitting each character in the history
    let splitted = totalHistory.split(' ')
    // variable to store the reulst of each operation
    let resultingNum = 0;

    // while the operators *(multiplication), /(division) and %(remainder) exist in the array(splitted from the history)
    // execute from left to right each instance of the operator;
    while (splitted.indexOf('*') != -1 || splitted.indexOf("/") != -1 || splitted.indexOf("%") != -1) {

        // looping over each item in the array
        for (let i = 0; i < splitted.length; i++){

            // if the "ith" item of the array is either of (*,/,%) operator, then:
            if (splitted[i] === "*" || splitted[i] === '/' || splitted[i] === '%'){

                // parse the numbers from string to an integer
                numBefore = Number(splitted[i-1]);
                numAfter = Number(splitted[i+1]);
                
                if (splitted[i] === "*"){
                    // if the operator is * then multiply the numbers
                    resultingNum = numBefore * numAfter;
                }
                
                else if (splitted[i] === "/") {
                    // if the operator is / then divide the numbers
                    resultingNum = numBefore / numAfter ;
                }
                
                else {
                    // if the operator is % then mod the numbers
                    resultingNum = numBefore % numAfter ;
                }

                // remove the operators and the numbers used from array and insert at that location the result of the calculation
                splitted.splice(i-1, 3, resultingNum);
                // break from this loop to start with the new array
                break;
            }
        }
    }

    // while the operators +(addition) and -(subtraction) exist in the array(splitted from the history)
    // execute from left to right each instance of the operator;
    while (splitted.indexOf('+') != -1 || splitted.indexOf("-") != -1) {

        // looping over each item in the array
        for (let i = 0; i < splitted.length; i++){

            // if the "ith" item of the array is either of (+,-) operator, then:
            if (splitted[i] === "+" || splitted[i] === '-'){

                // parse the numbers from string to an integer
                numBefore = Number(splitted[i-1]);
                numAfter = Number(splitted[i+1]);
                if (splitted[i] === "+"){
                    // if the operator is "+" then add the numbers
                    resultingNum = numBefore + numAfter;
                }
                else {
                    // if the operator is "- then subtract the numbers
                    resultingNum = numBefore - numAfter;
                }
                
                // remove the operators and the numbers used from array and insert at that location the result of the calculation
                splitted.splice(i-1, 3, resultingNum);
                // break from this loop to start with the new array
                break;
            }
        }
    }
    return splitted;
}

// get the element with id of clear and also get the result displaying element
const clearbtn = document.querySelector("#clear");
const contentValue = document.querySelector(".contentValue");

// function to clear the screen content
function clear(){
    contentValue.innerHTML = " ";
}
// function to clear the history
function clearHistory(){
    totalHistory = '';
    historyValue.innerHTML = "";
}

// for all the keys with numbers and additionally "Clear" and "Delete" keys.
// find the all elements with the class of numkey and for each key check if it were clicked
let currentNumber = '';
let totalHistory = '';
const numberKeys = document.querySelectorAll(".numKey");
numberKeys.forEach((key) => {
    key.addEventListener("click",(e) => {
        if (e.target.id === "clear"){
            // remove all the numbers if "C" button was clicked
            clear();
            clearHistory();
        }

        else if (e.target.id === "delete"){
            // delete the lastItem of the screen content if "Del" button was clicked
            if (currentNumber) {
                let previousValue = contentValue.textContent;
                let newValue = '';
                for (let i = 0; i < previousValue.length - 1; i++){
                    newValue += previousValue[i];
                }
                contentValue.innerHTML = newValue;
                console.log(newValue);
                oldHistory = totalHistory;
                totalHistory = oldHistory.slice(0,oldHistory.length-1);
                console.log(totalHistory);
            }
        }

        else {
            // add the digits to the calculator screen when the button is pressed
            currentNumber = contentValue.textContent;
            currentNumber += e.target.id;
            contentValue.textContent = currentNumber;
            // store each key pressed in a variable for history
            totalHistory += e.target.id;
        }
        return currentNumber;
    })
})

// for all the mathematical operation keys
// get all the keys with class of mathKey and for each key check if it was clicked;
let mathKeys = document.querySelectorAll(".mathKey");
// for history functionality
let historyValue = document.querySelector(".historyValue");
let prevOperation = ' ';
// for each key update history and save the numbers
mathKeys = Array.from(mathKeys);
mathKeys.forEach(function(key){
    key.addEventListener("click", (e) => {
        // check if the equals key was pressed
        if (e.target.id === '='){
            const result = calculate();
            contentValue.textContent = result[0];
            currentNumber = result[0];
            totalHistory = result[0].toString();
            return result;
        }
        // updating the history if other keys were pressed
        else {
            if (currentNumber){
                // clear content if its been added to the history
                clear();
                // the operation that was selected is stored in a variable
                const operation = e.target.id;
                // if the updated part of the history is new and does not exist already then update it with the operator
                if (totalHistory !== historyValue.textContent){
                    totalHistory += ' ' + operation + ' ';
                }
                // if the user presses the math operator again without typing in another number. i.e changes his decision
                // assuming that it's the second time he pressed a math operator (that is different than the last operator)
                else {
                    // create a variable to store the value of the updated history with the new operator
                    let newHistory = '';
                    // if the last character of the history is the last operation used then change it with the newer operation
                    if (totalHistory.charAt(totalHistory.length-2) === prevOperation)
                    {
                        // loop over the characters and save it in a variable, except the last character(which is the operator)
                        for (let i = 0; i < totalHistory.length - 2; i++){
                            newHistory += totalHistory[i];
                        }
                        totalHistory = newHistory;
                        // add the new operator to the new value
                        totalHistory += operation + ' ';
                    }
                }
                //////////////////////prevNumber = currentNumber;
                // Displaying the history.
                historyValue.textContent = totalHistory;
                prevOperation = operation;
            }
        }
    })
})

// adding keyboard functionality for number keys;
window.addEventListener("keydown", (e) => {
    for (let i = 0; i < numberKeys.length; i++){
        if (e.key === numberKeys[i].id){
            currentNumber = contentValue.textContent;
            currentNumber += e.key;
            contentValue.textContent = currentNumber;
            totalHistory += e.key;
        }
    }
})
