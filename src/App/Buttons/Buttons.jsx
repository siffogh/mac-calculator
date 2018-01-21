import React from 'react';
import PropTypes from 'prop-types';

const Buttons = ({ children }) => (
  <div className="buttons">
    {children}
  </div>
);

Buttons.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Buttons.defaultProps = {
  children: null
};


export default Buttons;

