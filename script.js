let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const history = document.querySelector('.history');
const output = document.querySelector('.output');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const cleanBtn = document.querySelector('.btn__clean');
const deleteBtn = document.querySelector('.btn__delete');
const pointBtn = document.querySelector('.point');

numbers.forEach((number) =>
  number.addEventListener('click', () => appendNumber(number.textContent))
);

operators.forEach((operator) =>
  operator.addEventListener('click', () => setOperation(operator.textContent))
);

const appendNumber = function (num) {
  if (output.textContent === '0' || shouldResetScreen) resetDisplay();
  output.textContent += num;
};

const resetDisplay = function () {
  output.textContent = '';
  shouldResetScreen = false;
};

const cleanDisplay = function () {
  output.textContent = '0';
  history.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
};

const appendPoint = function () {
  if (shouldResetScreen) resetDisplay();
  if (output.textContent === '') output.textContent = '0';
  if (output.textContent.includes('.')) return (output.textContent += '.');
};

const deleteNumber = function () {
  output.textContent = output.textContent.toString().slice(0, -1);
};

const setOperation = function (operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = output.textContent;
  currentOperation = operator;
  history.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
};

const evaluate = function () {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === '÷' && output.textContent === '0') {
    alert('You can not divide by 0!');
    return;
  }
  secondOperand = output.textContent;
  output.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  history.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
};

const roundResult = function (num) {
  return Math.round(num * 1000) / 1000;
};

const handleKeyboard = function (e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendPoint();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') deleteNumber();
  if (e.key === 'Delete') cleanDisplay();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key));
};

const convertOperator = function (keyboardOperator) {
  if (keyboardOperator === '+') return '+';
  if (keyboardOperator === '-') return '-';
  if (keyboardOperator === '*') return '×';
  if (keyboardOperator === '/') return '÷';
};

window.addEventListener('keydown', handleKeyboard);
equalBtn.addEventListener('click', evaluate);
cleanBtn.addEventListener('click', cleanDisplay);
deleteBtn.addEventListener('click', deleteNumber);
pointBtn.addEventListener('click', appendPoint);

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const operate = function (operator, a, b) {
  a = parseInt(a);
  b = parseInt(b);
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === '×') return multiply(a, b);
  if (operator === '÷' && b === 0) return null;
  if (operator === '÷') return divide(a, b);
  return null;
};
