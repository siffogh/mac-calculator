import React from 'react';
import { shallow } from 'enzyme';

import Calculator from '../Calculator/Calculator';
import Output from './Output';


describe('Output', () => {
  test('renders output', () => {
    const context = { [Calculator.CALCULATOR_CONTEXT]: { output: '0' } };
    const wrapper = shallow(<Output />, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
