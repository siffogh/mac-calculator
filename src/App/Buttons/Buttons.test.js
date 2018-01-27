import React from 'react';
import { shallow } from 'enzyme';

import Buttons from './Buttons';


describe('Buttons', () => {
  test('renders empty buttons', () => {
    const wrapper = shallow(<Buttons />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders children', () => {
    const wrapper = shallow(<Buttons> <div className="child">Child Div</div> </Buttons>);
    expect(wrapper).toMatchSnapshot();
  });
});
