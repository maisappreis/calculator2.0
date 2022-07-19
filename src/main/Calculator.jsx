import React, { Component } from "react";
import "./Calculator.css";

import Display from "../components/Display";
import Button from "../components/Button";

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0   // if the current is index 0 or index 1 of the array.
}

class Calculator extends Component {

    state = {...initialState}; // object clone.

    clearMemory() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        if(this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true }) // when I click in a operation.
        } else {
            const equals = operation === "=";  // when I click in the "=".
            const currentOperation = this.state.operation;

            const values = [...this.state.values]; // values clone

            try {
                if(isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                    return
                }

                if(currentOperation === "/") {
                    values[0] = values[0] / values[1] 
                } else if (currentOperation === "*") {
                    values[0] = values[0] * values[1] 
                } else if (currentOperation === "-") {
                    values[0] = values[0] - values[1] 
                } else {
                    values[0] = values[0] + values[1] 
                }


            } catch(e) {
                values[0] = this.state.values[0]; 
            }

            values[1] = 0;

            this.setState({
                displayValue: values[0], // store result.
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals, // limpa display se não clicar no igual.
                values
            })
        }
    }

    addDigit(n) {
        if(n === "." && this.state.displayValue.includes(".")) {
            return
        }

        const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay;
        const currentValue = clearDisplay ? "" : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({ displayValue, clearDisplay: false })

        if(n !== ".") {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
        }
    }

    render() {
        const addDigit = n => this.addDigit(n);
        const setOperation = op => this.setOperation(op);
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={() => this.clearMemory()} triple />
                <Button label="/" click={setOperation} operation />
                <Button label="7" click={addDigit} />
                <Button label="8" click={addDigit} />
                <Button label="9" click={addDigit} />
                <Button label="*" click={setOperation} operation />
                <Button label="4" click={addDigit} />
                <Button label="5" click={addDigit} />
                <Button label="6" click={addDigit} />
                <Button label="-" click={setOperation} operation />
                <Button label="1" click={addDigit} />
                <Button label="2" click={addDigit} />
                <Button label="3" click={addDigit} />
                <Button label="+" click={setOperation} operation />
                <Button label="0" click={addDigit} double />
                <Button label="." click={addDigit} />
                <Button label="=" click={setOperation} operation />
            </div>
        )
    }
}


export default Calculator;