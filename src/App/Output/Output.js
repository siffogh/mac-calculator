import React from 'react';
import PropTypes from 'prop-types';
import { CalculatorContext } from '../Calculator';


class Output extends React.Component {
  static propTypes = {
    output: PropTypes.string.isRequired
  }

  state = {
    scale: 1
  }

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

  refCallback = (node) => {
    this.node = node;
  }

  render() {
    const outputTextStyle = { transform: `scale(${this.state.scale})` };
    return (
      <div className="output">
        <div
          className="output-text"
          type="text"
          ref={this.refCallback}
          style={outputTextStyle}
        >
          {this.props.output}
        </div>
      </div>
    );
  }
}

export default props => (
  <CalculatorContext.Consumer>
    {({ output }) => <Output {...props} output={output} />}
  </CalculatorContext.Consumer>
);
