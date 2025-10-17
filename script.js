const form = document.querySelector('form')

let history = [];

function calculate(e) {
    e.preventDefault()

    const number1 = Number(form.number1.value);
    const number2 = Number(form.number2.value);

    console.log(typeof(number1) + ' ' + typeof(number2));

    if (typeof(number1) != 'number' || typeof(number2) != 'number') { return; };

    const resultElement = document.getElementById('result');
    const operator = form.operator.value;

    let result;

    console.log(number1, operator, number2);
    console.log(operator + ' ' + typeof(operator));

    switch (operator) {

        case 'add':
            result = number1 + number2;
            break;
        case 'sub':
            result = number1 - number2;
            break;
        case 'mul':
            result = number1 * number2;
            break;
        case 'div':
            result = number1 / number2;
            break;
        case 'pwr':
            result = number1 ** number2;
            break;
        case 'sqr': 
            result = Math.sqrt(number1);
            break;
        case 'mod':
            result = number1 % number2;

    };

    console.log(result);
    resultElement.innerText = result;

    history.push({
        number1 : number1,
        operator: operator,
        number2 : number2,
        result: result
    });
    console.log(history)

    render();
    form.reset();
}

function clearHistory() {

    history = [];
    localStorage.clear();

    console.log('Cleared history');
    render();
}

function createCalculationElement(number1, operator, number2, result) {

    const template = document.querySelector('.templates .calculation');
    const historyClass = document.querySelector('.history');

    let calculationElement = template.cloneNode(true);

    switch (operator) {

        case 'add':
            operator = '+';
            break;
        case 'sub':
            operator = '-';
            break;
        case 'mul':
            operator = '*';
            break;
        case 'div':
            operator = '/';
            break;
        case 'pwr':
            operator = '**';
            break;
        case 'sqr':     
            operator = '√';
            break;
        case 'mod':
            operator = '%';
    };

    calculationElement.querySelector('.number1').innerText = number1;
    if (operator != '√') {calculationElement.querySelector('.number2').innerText = number2;}
    else {calculationElement.querySelector('.number2').innerText = '';}
    calculationElement.querySelector('.operator').innerText = operator;
    calculationElement.querySelector('.result').innerText = result;

    historyClass.appendChild(calculationElement);
    return calculationElement;
};

function render() {
    
    const historyElement = document.querySelector('.history');
    historyElement.innerHTML = '';

    history.forEach(calculation => {
        createCalculationElement(calculation.number1, calculation.operator, calculation.number2, calculation.result);
    });
};

function saveAllToLocalStorage() {

    if (!history || history.length === 0) { console.log('nothing to save, aborting save'); return; };
    let increment = 0;

    localStorage.clear();

    history.forEach(calculation => {
        localStorage.setItem(increment, JSON.stringify(calculation));
        increment++;
    });
};

function loadAllFromLocalStorage() {

    let currentData;
    let increment = 0;

    while (true) {

        currentData = JSON.parse(localStorage.getItem(increment));
        increment++;

        createCalculationElement(currentData.number1, currentData.operator, currentData.number2, currentData.result);
        history.push(currentData);

        if (!localStorage.getItem(increment)) { break; };
    };

    render();
};

loadAllFromLocalStorage();
setInterval(saveAllToLocalStorage, 5000)
render();