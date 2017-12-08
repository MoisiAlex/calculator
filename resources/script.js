function updateDisplay(e){
    console.log(e);
    const display = document.querySelector("#result");
  
    display.textContent = updateValues(e.target.value);
    
    console.log(values);
}

function updateValues(element){
    const op = ["/","*","+","-"];
    
    const formattedArray =values.reduce(function(a,b){
        if(op.includes(b))
            {
                
            }
        
    },{});
    
    if(op.includes(element)){
        console.log("operator")
        const holder = values.join('');
        values=[];
        values.push(holder);
    }
     values.push(element);
    
    return values.join('');
}

function clear(){
    const display=document.querySelector("#result");
    display.textContent = 0;
    values=[];
    console.log("Cleaned stored values:" +values);
}

function sum(arraySum){
   return arraySum.reduce((total,num) => total + num);
}

function sumOperation(){
    values.reduce((total,num) => toString(total)+toString(num));
    operation = "sum";
    console.log("we will sum: ")
    console.log(values);
}

function operate(operation){
     const display=document.querySelector(".display p"); 
     display.textContent = sum(values);
    console.log("Just summed:" +values);
}

let values=[];
let operation;
const numbers= document.querySelectorAll(".number");
const ac = document.querySelector(".ac");
const equal = document.querySelector(".equal");
const plus = document.querySelector(".sum");
const operations= document.querySelectorAll(".operation");

operations.forEach(operator=>operator.addEventListener('click',updateDisplay));
numbers.forEach(number=>number.addEventListener('click',updateDisplay));

plus.addEventListener('click',sumOperation)
ac.addEventListener('click',clear);
equal.addEventListener('click',function(){
    operate()
});
console.log(numbers);