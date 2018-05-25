import React from 'react';
import PropTypes from 'prop-types';

import { getDataByValue } from '../../utils';

class Button extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    span: PropTypes.string,
    nonInitialLabel: PropTypes.string
  };

  static defaultProps = {
    value: undefined,
    span: undefined,
    nonInitialLabel: undefined
  };

  static contextTypes = {
    initial: PropTypes.bool,
    handleInput: PropTypes.func
  };

  handleClick = () => {
    this.context.handleInput({ value: this.props.value });
  };

  render() {
    const { value = '', span = 1, nonInitialLabel } = this.props;
    const { initial } = this.context;
    const buttonData = getDataByValue({ value });

    if (!buttonData) {
      return <input type="button" />;
    }

    const { type, label } = buttonData;

    return (
      <input
        type="button"
        key={value}
        className={`${type} ${type}-${value}`}
        style={{ gridColumn: `span ${span}` }}
        onClick={this.handleClick}
        value={!initial && nonInitialLabel ? nonInitialLabel : label}
      />
    );
  }
}


export default Button;
