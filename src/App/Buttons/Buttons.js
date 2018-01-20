import React from 'react';
import PropTypes from 'prop-types';

import Calculator from '../Calculator/Calculator';

class Buttons extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  static defaultProps = {
    children: null
  };

  static contextTypes = {
    [Calculator.CALCULATOR_CONTEXT]: PropTypes.shape({
      initial: PropTypes.bool
    })
  };

  render() {
    return (
      <div className="buttons">
        {this.props.children}
      </div>
    );
  }
}

export default Buttons;

