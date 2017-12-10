function updateNumbers(e){ 
//This function will read the digits entered and store them until we are ready to add a complete number to our value
    if(digits.length<20){
    digits.push(e.target.value);   
    console.log("Pushed number into digits array.Print the digit array")
    console.log(digits);
    updateDisplays(digits.join(""));
    }
    else{
        updateDisplays("That's a lot of numbers!","This is a simple JS app, please hit clear and try something easier.");
    }
}



function updateOperations(e){
//This function will do some basic validation (no empty numbers, no duplicate operations) and update our valuestring with the full number as well as the operation that should take place
    
    const operator = e.target.value;
    const composedNumber= digits.join("");
   
    if(composedNumber!=""){
    valueString.push(composedNumber);
        
     console.log("Digit array not blank. Pushed all numbers entered previously as one into value string. Print ValueString");
     console.log(valueString);
        }
    
    if (valueString.length>0){
        
        history += composedNumber;
            if(operator != "="){ 
                if(operationOrder.length<valueString.length){               
                operationOrder.push(operator);  
                history += operator;
                }
                else{
                operationOrder.splice(operationOrder.length-1, 1, operator);
                 history =  history.replace(/.$/,operator);    
                }
                console.log("Not =, saved to operation order. Print OperationOrder");
                console.log(operationOrder);
                if(history.indexOf("=") != -1){history= history.slice(history.indexOf("=")+1); }  
            }
        else{
            history +=operator;
        }
           
            console.log("Updated history with the previous digits and operator. Print History");
            console.log(history);
            updateDisplays(operator,history);
            digits=[];
        }
 
        
    else{
        updateDisplays(operator,"Please enter a number first");
    }
    

}

function updateDisplays(mainDisplay,historyDisplay){
    const displayMain = document.querySelector("#result");
    const displayHistory = document.querySelector("#history");
    
    if (typeof historyDisplay === 'undefined'){
    displayMain.textContent = mainDisplay;
        }
    else if(typeof mainDisplay === 'undefined'){
    
    displayHistory.textContent = historyDisplay;
        }
    else{
        displayMain.textContent = mainDisplay;
        displayHistory.textContent = historyDisplay;
    }
    

}


function clear(){
    updateDisplays(0,0)
    digits=[];
    valueString=[];
    operationOrder=[];
    history ="";
    
    console.log("Cleaned all stored values:");
}

function runTheMath(index){
//This function handles the heavy lifting of the math as well as removing the operation from the list once it's been executed.
    
    console.log("Running through the math function.");
     if(operationOrder[index]==="+"){
    
        valueString.splice(index,2,(Number(valueString[index]) + Number(valueString[index+1])));
        operationOrder.splice(index,1);
    }
    else if(operationOrder[index]==="-"){
         valueString.splice(index,2,(Number(valueString[index]) - Number(valueString[index+1])));
        operationOrder.splice(index,1);
    }
    else if(operationOrder[index]==="/"){
         valueString.splice(index,2,(Number(valueString[index]) / Number(valueString[index+1])));
        operationOrder.splice(index,1);
    }
    
    else if(operationOrder[index]==="*"){
         valueString.splice(index,2,(Number(valueString[index]) * Number(valueString[index+1])));
        operationOrder.splice(index,1);
    }
     
     console.log("Spliced value string:");
     console.log(valueString);
    console.log("Spliced operation array:");
     console.log(operationOrder);
    
}

function operate(){
//This Function will check if there are any * or / operations and ask runTheMath to calculate those first, otherwise start with the first operation and move from there. 
    while (operationOrder.length>0){
        if(operationOrder.indexOf("*") != -1) {
            runTheMath(operationOrder.indexOf("*"));
        }
        if(operationOrder.indexOf("/") != -1) {
            runTheMath(operationOrder.indexOf("/"));
        }
        else{
            runTheMath(0);
        }
    }
    
    
    history=history+valueString
    
    updateDisplays(valueString,history);
    
    
}

let digits=[];
let valueString=[];
let operationOrder=[];
let history ="";
const numbers= document.querySelectorAll(".number");
const ac = document.querySelector(".ac");
const equal = document.querySelector(".equal");
const operations= document.querySelectorAll(".operation");

operations.forEach(operator=>operator.addEventListener('click',updateOperations));
numbers.forEach(number=>number.addEventListener('click',updateNumbers));

ac.addEventListener('click',clear);
equal.addEventListener('click',operate);
