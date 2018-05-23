import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

describe('button', () => {
  test('should render empty Button', () => {
    const wrapper = mount(<Button />);
    expect(wrapper.find('input[type="button"]')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render empty button if value doesn\'t match', () => {
    const wrapper = mount(<Button value="somevalue" />);
    expect(wrapper.find('input[type="button"]')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
