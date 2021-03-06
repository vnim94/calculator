import { calculate } from './calculate.js';
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
const decimal = document.getElementById('decimal');
const percent = document.getElementById('percent');
const backspace = document.getElementById('backspace');

let input = '';
let numberOfOperators = 0;

const evaluate = () => {

    let result = calculate(input);
    display.textContent = result;
    input = '';
    numberOfOperators = 0;

};

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        
        if (numberOfOperators > 0 || input.length === 0) {
            display.textContent = '';
        }

        display.textContent+=e.target.textContent;
        input+=e.target.textContent;
        console.log(input)

    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        
        if (input.length == 0 && display.textContent.length > 0) {
            input = display.textContent;
        } else if (input.length == 0) {
            return;
        }

        if (numberOfOperators == 1) {
            evaluate();
            input = display.textContent;
        }

        input+=e.target.textContent;
        numberOfOperators++;
        
        if (e.target.textContent === '%') {
            evaluate();
        }
        
        console.log(input)

    });
});

equal.addEventListener('click', () => {

    if (numberOfOperators == 0) {
        return input;
    }

    evaluate();

});

clear.addEventListener('click', () => {
    display.textContent = '';
    input = '';
})

decimal.addEventListener('click', (e) => {

    if (!input || input.includes('.')) {
        return;
    };

    display.textContent+=e.target.textContent;
    input+=e.target.textContent;

});

percent.addEventListener('click', (e) =>  {

    input+=e.target.textContent;
    evaluate();

});

backspace.addEventListener('click', () => {

    input = input.slice(0,input.length-1);
    display.textContent = input;

});