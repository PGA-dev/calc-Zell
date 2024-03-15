document.addEventListener("DOMContentLoaded", function () {
    //variable dec
    const calculator = document.querySelector('.calculator')
    const keys = calculator.querySelector('.calculator__keys')
    const display = document.querySelector('.calculator__display')

    const calculate = (n1, operator, n2) => {
        const firstNum = parseFloat(n1)
        const secondNum = parseFloat(n2)
        if (operator === 'add') return firstNum + secondNum
        if (operator === 'subtract') return firstNum - secondNum
        if (operator === 'multiply') return firstNum * secondNum
        if (operator === 'divide') return firstNum / secondNum
    }

    //refactored getter for the type of key
    const getKeyType = key => {
        const { action } = key.dataset
        if (!action) return 'number'
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        )
            return 'operator'
        // For everything else, return the action
        return action
    }
    //Create string for calc results
    const createResultString = (key, displayedNum, state) => {
        const keyType = getKeyType(key)
        const keyContent = key.textContent
        const { firstValue, modValue, operator, previousKeyType } = state
        if (keyType === 'number') {
            return displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
                ? keyContent
                : displayedNum + keyContent
        }
        if (keyType === 'decimal') {
            if (!displayedNum.includes('.')) return displayedNum + '.'
            if (previousKeyType === 'operator' || previousKeyType === 'calculate')
                return '0.';
            return displayedNum;
        }
        if (keyType === 'operator') {
            return firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
                ? calculate(firstValue, operator, displayedNum)
                : displayedNum
        }
        if (keyType === 'clear') return 0;
        if (keyType === 'calculate') {
            return firstValue
                ? previousKeyType === 'calculate'
                    ? calculate(displayedNum, operator, modValue)
                    : calculate(firstValue, operator, displayedNum)
                : displayedNum
        }
    };

    //Impure functions

    const updateCalculatorState = (key,
        calculator,
        calculatedValue,
        displayedNum) => {
        const keyType = getKeyType(key)
        calculator.dataset.previousKeyType = keyType
        if (keyType === 'operator') {
            calculator.dataset.operator = key.dataset.action
            calculator.dataset.firstValue =
            calculator.dataset.firstValue &&
            calculator.dataset.operator &&
            calculator.dataset.previousKeyType !== 'operator' &&
            calculator.dataset.previousKeyType !== 'calculate'
                    ? calculatedValue
                    : displayedNum
        }
        if (keyType === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }
        }

        if (keyType === 'calculate') {
            calculator.dataset.modValue =
            calculator.dataset.firstValue && calculator.dataset.previousKeyType === 'calculate' ? calculator.dataset.modValue : displayedNum
        }
    }



    const updateVisualState = (key, calculator) => {
        const keyType = getKeyType(key)
        Array.from(key.parentNode.children).forEach(k =>
            k.classList.remove('is-depressed')
        )

        if (keyType === 'operator') key.classList.add('is-depressed')

        if (keyType === 'clear' && key.textContent !== 'AC') {
            key.textContent = 'AC'
        }

        if (keyType !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
    }


    keys.addEventListener('click', e => {
        if (!e.target.matches('button')) return
        const key = e.target
        const displayedNum = display.textContent

        // Pure functions
        const resultString = createResultString(key, displayedNum, calculator.dataset)

        // Update states
        display.textContent = resultString
        updateCalculatorState(key, calculator, resultString, displayedNum)
        updateVisualState(key, calculator)
    });
});
