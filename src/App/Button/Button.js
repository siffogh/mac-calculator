import React from 'react';
import PropTypes from 'prop-types';

import Calculator from '../Calculator/Calculator';
import { getDataByValue } from '../../utils';

class Button extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  };

  static contextTypes = {
    [Calculator.CALCULATOR_CONTEXT]: PropTypes.shape({
      initial: PropTypes.bool,
      handleInput: PropTypes.func
    })
  };

  handleClick = () => {
    this.context[Calculator.CALCULATOR_CONTEXT].handleInput({ value: this.props.value });
  };

  render() {
    const { value } = this.props;
    const { initial } = this.context[Calculator.CALCULATOR_CONTEXT];
    const buttonData = getDataByValue({ value });

    if (!buttonData) {
      return '';
    }

    const {
      type, label, nonInitialLabel, span
    } = buttonData;

    return (
      <input
        type="button"
        key={value}
        className={`${type} ${type}-${value} span-${span}`}
        onClick={this.handleClick}
        value={!initial && nonInitialLabel ? nonInitialLabel : label}
      />
    );
  }
}


export default Button;
