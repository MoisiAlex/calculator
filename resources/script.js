function updateNumbers(e){ 
//This function will read the digits entered and store them until we are ready to add a complete number to our value
    let digit = " ";
    if(e.type === "click") {
        digit = e.target.value;
    }
    else if(e.type="keydown")
    {
        digit = e.key;
 
    }
    
    console.log(e);
    if ((valueString.length > 0) &&(operationOrder.length === 0)) {valueString=[];history="";}
    if(digits.length<20){
        if ((digit === "." )&&(digits[digits.length-1]===".")) { 
            updateDisplays(".","Please don't add more decimal points ");}
        else{
    digits.push(digit);   
    console.log("Pushed number into digits array.Print the digit array")
    console.log(digits);
    updateDisplays(digits.join(""));
            }
    }
    else{
        updateDisplays("That's a lot of numbers!","This is a simple JS app, please hit clear and try something easier.");
    }
}



function updateOperations(e){
//This function will do some basic validation (no empty numbers, no duplicate operations) and update our valuestring with the full number as well as the operation that should take place
    let operator ="";
     if(e.type === "click") {
        operator = e.target.value;
    }
    else if(e.type="keydown")
    {
        operator = e.key;
        if(operator ==="Enter") {operator="=";}
 
    }
    
    let composedNumber= digits.join("");
   
    if(composedNumber!=""){
        if(composedNumber === ".") {
            composedNumber = "0.0";
            }
        
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
    
    console.log("Running through the math function. With the valueString & operationOrder");
    console.log(valueString);
    console.log(operationOrder);
    
     if(operationOrder[index]==="+"){
    
        valueString.splice(index,2,(Number(valueString[index]) + Number(valueString[index+1])));
        operationOrder.splice(index,1);
    }
    else if(operationOrder[index]==="-"){
         valueString.splice(index,2,(Number(valueString[index]) - Number(valueString[index+1])));
        operationOrder.splice(index,1);
    }
    else if(operationOrder[index]==="/"){
        if (valueString[index+1] === "0") {
            history="Division by 0 detected. Replaced with 1: ";
            valueString.splice(index,2,(Number(valueString[index]) / 1));
        }
        else{ valueString.splice(index,2,(Number(valueString[index]) / Number(valueString[index+1])));}
        
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

window.addEventListener('keydown', function(e){
    const operations= /[/|+|-|*]/;
    const equals =/[=|Enter]/g;
    const numberz= /^[0-9]*$/;
    const shift =/[Shift]/;
    console.log(e);
    console.log(equals.test(e.key));
     console.log(!shift.test(e.key));            
    console.log(((equals.test(e.key))&& !shift.test(e.key)));
   
   if((operations.test(e.key))&& !shift.test(e.key)){
        console.log("Operations");
        updateOperations(e);}
    
    else if((numberz.test(e.key))&& !shift.test(e.key)){
     console.log("Number");
        updateNumbers(e);}
    
    else if((equals.test(e.key)) ||(e.keyCode=13) && !shift.test(e.key)) {
        console.log("equals");
         updateOperations(e);
         operate(e);}
    else{ updateDisplays(e.key,"Please enter number");}
                                             });
