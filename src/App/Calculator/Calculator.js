import React from 'react';
import PropTypes from 'prop-types';

import {
  START,
  START_DECIMAL,
  CUMUL,
  CUMUL_DECIMAL,
  LOW,
  availableShortcuts,
  cumulate,
  multiply,
  getDataByValue,
  getDataByShortcut } from '../../utils';

const initialState = {
  inputs: [0],
  pendingOps: [],
  target: {
    index: 0,
    status: START
  },
  output: '0',
  initial: true
};

class Calculator extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  static defaultProps = {
    children: null
  };

  static CALCULATOR_CONTEXT = '__calculator__';

  static childContextTypes = {
    [Calculator.CALCULATOR_CONTEXT]: PropTypes.shape({
      initial: PropTypes.bool,
      output: PropTypes.string,
      handleInput: PropTypes.func
    })
  };

  state = { ...initialState };


  getChildContext = () => ({
    [Calculator.CALCULATOR_CONTEXT]: {
      initial: this.state.initial,
      output: this.state.output,
      handleInput: this.handleInput
    }
  });

  componentDidMount() {
    document.onkeydown = this.handleKeyPress;
  }


  handleKeyPress = ({ key: shortcut }) => {
    if (!availableShortcuts.includes(shortcut)) {
      return;
    }
    const { value } = getDataByShortcut({ shortcut });
    this.handleInput({ value });
  }

  handleInput = ({ value: targetValue }) => {
    const targetData = getDataByValue({ value: targetValue });
    return targetData ?
      this[`handle${targetData.type}`](targetData) :
      null;
  };

  handleDigit = ({ value: digit }) => {
    const target = { ...this.state.target };
    const inputs = [...this.state.inputs];
    const { index, status } = { ...target };
    const output = cumulate(inputs[index] || 0, digit, status);
    if (status === START) {
      target.status = CUMUL;
      if (index === 2 && typeof inputs[2] !== 'undefined') {
        Object.assign(inputs, { 0: inputs[1], 1: inputs[0] });
      }
    } else if (status === START_DECIMAL) {
      target.status = CUMUL_DECIMAL;
    }
    inputs[index] = output;
    this.setState({
      inputs, target, output, initial: false
    });
  };

  handleBinary = (operation) => {
    const target = { ...this.state.target };
    const pendingOps = [...this.state.pendingOps];
    const { index } = { ...target };
    if (index === 0) {
      target.status = START;
      target.index = 1;
      pendingOps[0] = operation;
      return this.setState({
        pendingOps,
        target
      });
    }

    return operation.priority === LOW ?
      this.inputLowBinaryOp(operation) :
      this.inputHighBinaryOp(operation);
  };

  inputLowBinaryOp = (operation) => {
    const target = { ...this.state.target };
    let inputs = [...this.state.inputs];
    let pendingOps = [...this.state.pendingOps];
    const { index } = { ...target };
    let { output } = { ...this.state };
    target.status = START;
    if (index === 1) {
      if (typeof inputs[1] !== 'undefined') {
        output = pendingOps[0].work(inputs[0], inputs[1]);
      }
      pendingOps[0] = operation;
    } else if (typeof inputs[2] !== 'undefined') {
      output = pendingOps[0].work(inputs[0], pendingOps[1].work(inputs[1], inputs[2]));
    } else {
      output = pendingOps[0].work(inputs[0], inputs[1]);
      inputs[1] = output;
      pendingOps = [operation];
    }
    inputs = [output];
    target.index = 1;
    this.setState({
      inputs,
      target,
      pendingOps,
      output,
      initial: false
    });
  };

  inputHighBinaryOp = (operation) => {
    const target = { ...this.state.target };
    let inputs = [...this.state.inputs];
    const pendingOps = [...this.state.pendingOps];
    const { index } = { ...target };
    let { output } = { ...this.state };
    target.status = START;
    if (typeof inputs[index] === 'undefined') {
      pendingOps[index - 1] = operation;
    } else if (index === 1) {
      if (pendingOps[0].priority === LOW) {
        pendingOps[1] = operation;
        target.index = 2;
      } else {
        output = pendingOps[0].work(inputs[0], inputs[1]);
        inputs = [output];
        pendingOps[0] = operation;
        target.index = 0;
      }
    } else {
      output = pendingOps[1].work(inputs[1], inputs[2]);
    }
    this.setState({
      inputs,
      target,
      pendingOps,
      output,
      initial: false
    });
  };

  handleUnary = ({ key, work }) => {
    const target = { ...this.state.target };
    const inputs = [...this.state.inputs];
    const { index, status } = { ...target };
    let { output } = { ...this.state };
    if (index === 0 || status !== START) {
      output = work(inputs[index]);
      target.status = START;
    } else {
      output = key === '%' ?
        multiply(inputs[index - 1], work(inputs[index - 1])) :
        work(inputs[index - 1]);
      if (index === 1) {
        target.index = 0;
      }
    }
    inputs[index] = output;
    this.setState({
      inputs, target, output, initial: false
    });
  };

  handleDot = () => {
    const target = { ...this.state.target };
    const inputs = [...this.state.inputs];
    const { index, status } = { ...target };
    if (status === CUMUL_DECIMAL) {
      return;
    }
    target.status = START_DECIMAL;
    if (typeof inputs[index] === 'undefined') {
      inputs[index] = 0;
    }
    const output = `${inputs[index]}.`;
    this.setState({
      inputs, target, output, initial: false
    });
  };

  handleEqual = () => {
    const target = { ...this.state.target };
    let inputs = [...this.state.inputs];
    let pendingOps = [...this.state.pendingOps];
    const { index } = { ...target };
    let { output } = { ...this.state };

    target.status = START;
    switch (index) {
      case 0:
        if (typeof pendingOps[0] !== 'undefined') {
          output = pendingOps[0].work(inputs[0], inputs[1]);
        }
        break;
      case 1:
        if (typeof inputs[1] === 'undefined') {
          inputs = [inputs[0], inputs[0]];
        }
        output = pendingOps[0].work(inputs[0], inputs[1]);
        break;
      default:
        if (typeof inputs[2] !== 'undefined') {
          output = pendingOps[0].work(inputs[0], pendingOps[1].work(inputs[1], inputs[2]));
          inputs = [inputs[0], inputs[2]];
        } else {
          output = pendingOps[0].work(pendingOps[1].work(inputs[0], inputs[1]), inputs[1]);
        }
        pendingOps = [pendingOps[1]];
    }
    inputs[0] = output;
    target.index = 0;
    this.setState({
      inputs,
      target,
      output,
      pendingOps
    });
  };

  handleReset = () => this.setState(initialState);

  render() {
    return (
      <div className="calculator">
        { this.props.children }
      </div>
    );
  }
}


export default Calculator;
