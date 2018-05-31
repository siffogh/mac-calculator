import styled from 'styled-components';

const Calculator = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 2fr repeat(5, 1fr);
  color: white;
`;
export default { Calculator };
