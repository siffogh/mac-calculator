import styled from 'styled-components';

const Output = styled.div`
  position: relative;
  grid-column: span 4;
  background: #111111;
`;

Output.Text = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  display: grid;
  align-content: end;
  padding: 0 5%;
  box-sizing: border-box;
  transform-origin: right;
  white-space: nowrap;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 17em;
  font-weight: lighter;
  transform: ${({ scale }) => `scale(${scale})`};
`;

export default { Output };
