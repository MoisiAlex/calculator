function numberz(e){
    console.log(e);
 
    const display=document.querySelector("#result p");   
    
    values.push(parseInt(e.target.textContent));
    display.textContent = values.join('');
    console.log("Currently stored values: " +values);
}


function clear(){
    const display=document.querySelector("#result p");
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
     const display=document.querySelector("#result p"); 
     display.textContent = sum(values);
    console.log("Just summed:" +values);
}

let values=[];
let operation;
const numbers= document.querySelectorAll(".number");
const ac = document.querySelector(".ac");
const equal = document.querySelector(".equal");
const plus = document.querySelector(".sum");

numbers.forEach(number=>number.addEventListener('click',numberz));

plus.addEventListener('click',sumOperation)
ac.addEventListener('click',clear);
equal.addEventListener('click',function(){
    operate()
});
console.log(numbers);