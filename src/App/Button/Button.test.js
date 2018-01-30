import React from 'react';
import { shallow, mount } from 'enzyme';

import Calculator from '../Calculator';
import Button from './Button';
import { getDataByValue } from '../../utils';


describe('Button', () => {
  test('renders empty button', () => {
    const context = { [Calculator.CALCULATOR_CONTEXT]: { initial: true } };
    const wrapper = shallow(<Button />, { context });
    expect(wrapper).toMatchSnapshot();
  });

  describe('button with value', () => {
    test('should render button', () => {
      const context = { [Calculator.CALCULATOR_CONTEXT]: { initial: true } };
      const value = 'add';
      const wrapper = mount(<Button value={value} />, { context });
      expect(wrapper).toMatchSnapshot();
    });

    test('key should be equal to \'value\' prop', () => {
      const context = { [Calculator.CALCULATOR_CONTEXT]: { initial: true } };
      const value = 'add';
      const wrapper = mount(<Button value={value} />, { context });
      expect(wrapper.find('input').key()).toBe(value);
    });

    describe('className', () => {
      const context = { [Calculator.CALCULATOR_CONTEXT]: { initial: true } };
      const value = 'add';
      const wrapper = mount(<Button value={value} />, { context });
      const { type } = getDataByValue({ value });

      test('className should have type', () => {
        expect(wrapper.find('input').hasClass(type)).toBeTruthy();
      });

      test('className should have type-value', () => {
        expect(wrapper.find('input').hasClass(`${type}-${value}`)).toBeTruthy();
      });

      describe('span', () => {
        test('className should have default span to be 1 when there is no \'span\' prop', () => {
          expect(wrapper.find('input').hasClass('span-1')).toBeTruthy();
        });

        test('className should have \'span\' prop', () => {
          expect(wrapper.find('input').hasClass('span-1')).toBeTruthy();
        });
      });
    });

    describe('when prop \'initial\' changes', () => {
      test('value should be the same if a nonInitialLabel is not provided', () => {
        const context = { [Calculator.CALCULATOR_CONTEXT]: { initial: true } };
        const wrapper = shallow(<Button value="reset" />, { context });
        expect(wrapper).toMatchSnapshot();
        wrapper.setContext({ [Calculator.CALCULATOR_CONTEXT]: { initial: false } });
        expect(wrapper).toMatchSnapshot();
      });

      test('value should change if a nonInitialLabel is provided', () => {
        const context = { [Calculator.CALCULATOR_CONTEXT]: { initial: true } };
        const wrapper = shallow(<Button value="reset" nonInitialLabel="C" />, { context });
        expect(wrapper).toMatchSnapshot();
        wrapper.setContext({ [Calculator.CALCULATOR_CONTEXT]: { initial: false } });
        expect(wrapper).toMatchSnapshot();
      });
    });

    test('onclick calls context.handleClick with value parameter', () => {
      const handleInput = jest.fn();
      const context = {
        [Calculator.CALCULATOR_CONTEXT]: {
          initial: true,
          handleInput
        }
      };

      const value = 'add';
      const wrapper = mount(<Button value={value} />, { context });
      wrapper.find('input').simulate('click');
      expect(handleInput).toBeCalledWith({ value });
    });
  });
});
