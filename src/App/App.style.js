import styled, { injectGlobal } from 'styled-components';

injectGlobal`
html, body {
  margin: 0;
  overflow: hidden;
}
`;

const App = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 1vh;
`;

export const font = ({ family, size }) => `
    font-family: ${family || "'Helvetica Neue', Helvetica, Arial, sans-serif"};
    font-size: ${size || '1em'};
  `;

export default { App };
