import styled from 'styled-components';
import { font } from '../App.style';

const Input = styled.input`
  border: 1px solid #808080;
  outline: none;
`;

const Digit = Input.extend`
  ${font({ size: '6em' })} background: #e0e0e0;
  font-weight: 200;
`;

const Dot = Digit;

const Binary = Input.extend`
  ${font({ size: '5em' })} color: white;
  background: #f5923e;
`;

const Equal = Binary;

const Unary = Input.extend`
  ${font({ size: '5em' })} background: #d6d6d6;
  font-weight: 200;
`;

const Reset = Unary;

export default { Input, Digit, Dot, Binary, Unary, Equal, Reset };
