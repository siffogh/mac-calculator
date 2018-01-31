import React from 'react';
import { shallow } from 'enzyme';

import Output from './Output';


describe('Output', () => {
  test('renders output', () => {
    const context = { output: '0' };
    const wrapper = shallow(<Output />, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
