import React from 'react';
import PropTypes from 'prop-types';
import { CalculatorContext } from '../Calculator';
import styles from './Output.style';

class Output extends React.Component {
  static propTypes = {
    output: PropTypes.string.isRequired
  };

  state = {
    scale: 1
  };

  componentDidUpdate() {
    const scale = this.node.parentNode.offsetWidth / this.node.offsetWidth;
    if (scale === this.state.scale) {
      return;
    }
    if (scale < 1) {
      this.setState({ scale });
    } else if (this.state.scale < 1) {
      this.setState({ scale: 1 });
    }
  }

  refCallback = node => {
    this.node = node;
  };

  render() {
    return (
      <styles.Output>
        <styles.Output.Text
          className="output-text"
          type="text"
          innerRef={this.refCallback}
          scale={this.state.scale}
        >
          {this.props.output}
        </styles.Output.Text>
      </styles.Output>
    );
  }
}

export default props => (
  <CalculatorContext.Consumer>
    {({ output }) => <Output {...props} output={output} />}
  </CalculatorContext.Consumer>
);
