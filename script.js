class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // remove last element of current operand
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    neg() {
        this.currentOperand = this.currentOperand * -1;
    }

    factorial() {
        let result = 1;
        for (let i = 1; i <= this.currentOperand; i++) {
            result *= i;
        }
        this.currentOperand = result;
    }

    squared() {
        this.currentOperand = Math.pow(this.currentOperand, 2);
    }

    ln() {
        this.currentOperand = Math.log(this.currentOperand);
    }

    sqrt() {
        this.currentOperand = Math.pow(this.currentOperand, 1/2);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        // cast to string so it doesn't add the number, just appends
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // don't run if there's not previous or current value
        if  (isNaN(prev) || isNaN(current)) {
            return;}
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '÷':
                if (current == 0) throw "undefined";
                computation = prev / current;
                break
            case 'xʸ':
                computation = Math.pow(prev, current);
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        // separate the number into int and decimal parts
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } 
        else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else{
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const factorialButton = document.querySelector('[data-factorial]')
const negButton = document.querySelector('[data-neg]')
const hexButton = document.querySelector('[data-hex]')
const squaredButton = document.querySelector('[data-squared]')
const lnButton = document.querySelector('[data-ln]')
const sqrtButton = document.querySelector('[data-sqrt]')

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})


factorialButton.addEventListener('click', button => {
    calculator.factorial();
    calculator.updateDisplay();
})


negButton.addEventListener('click', button => {
    calculator.neg();
    calculator.updateDisplay();
})

squaredButton.addEventListener('click', button => {
    calculator.squared();
    calculator.updateDisplay();
})

lnButton.addEventListener('click', button => {
    calculator.ln();
    calculator.updateDisplay();
})

sqrtButton.addEventListener('click', button => {
    calculator.sqrt();
    calculator.updateDisplay();
})