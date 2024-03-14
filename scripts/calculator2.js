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
        calculator.dataset.previousKeyType = keyType
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
    display.textContent = resultString
    updateCalculatorState()

    keys.addEventListener('click', e => {
        if (e.target.matches('button')) return
        const displayedNum = display.textContent
        const resultString = createResultString(
            e.target,
            displayedNum,
            calculator.dataset
        )

    })





