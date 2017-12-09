function updateNumbers(e){
    values.push(e.target.value);   
    console.log("Pushed number into values")
    console.log(values);
    updateDisplays(values.join(""));
    
}



function updateOperations(e){
    const operator = e.target.value;
    
    valueString.push(values.join(""));
     console.log("Pushed all numbers entered previously as one into value string");
     console.log(valueString);
    
    if(operator != "="){ 
        operationOrder.push(operator);  
        console.log("Not =, saved to operation order");
        console.log(operationOrder);
    }
    history = history+ values.join("")+operator;
    console.log("updated history with the previous digits and operator");
    console.log(history);

    updateDisplays(0,history);
    values=[];

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
    values=[];
    valueString=[];
    operationOrder=[];
    history ="";
    
    console.log("Cleaned all stored values:");
}


function operate(){
   
    while (operationOrder.length>0){
    if(operationOrder[0]==="+"){
     
        valueString.splice(0,2,(Number(valueString[0]) + Number(valueString[1])));
        operationOrder.splice(0,1);
    }
    else if(operationOrder[0]==="-"){
         valueString.splice(0,2,(Number(valueString[0]) - Number(valueString[1])));
        operationOrder.splice(0,1);
    }
    else if(operationOrder[0]==="/"){
         valueString.splice(0,2,(Number(valueString[0]) / Number(valueString[1])));
        operationOrder.splice(0,1);
    }
    
    else if(operationOrder[0]==="*"){
         valueString.splice(0,2,(Number(valueString[0]) * Number(valueString[1])));
        operationOrder.splice(0,1);
    }
    }
     console.log("Spliced value string:");
     console.log(valueString);
    console.log("Spliced operation array:");
     console.log(operationOrder);
    
    updateDisplays(valueString,history+valueString);
    
    
}

let values=[];
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
