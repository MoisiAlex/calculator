function numberz(e){
    console.log(e);
   e.target.firstChild.classList.add('pressed');
    const display=document.querySelector("#result p");
    const currentValue = parseInt(display.textContent);
    let digits=[];
    if (currentValue >0) {digits.push(currentValue);}
    
    
    digits.push(parseInt(e.target.textContent));
    display.textContent = digits.join('');
    console.log(digits)
}

function removeTransition(e) {
  //if (e.target.firstChild.propertyName !== 'transform') return;  
    e.target.firstChild.classList.remove('pressed');
  }

function clear(){
    const display=document.querySelector("#result p");
    display.textContent = 0;
}

function sum(){
    const display=document.querySelector("#result p");
}

function operate()

let values=[];
const numbers= document.querySelectorAll(".number");
const ac = document.querySelector(".ac");

numbers.forEach(number=>number.addEventListener('click',numberz));
//numbers.forEach(number=>number.addEventListener('transitionend',removeTransition));
ac.addEventListener('click',clear);
console.log(numbers);