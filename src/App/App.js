import React from 'react';

import './style.scss';
import Calculator from './Calculator/Calculator';
import Output from './Output/Output';
import Buttons from './Buttons/Buttons';
import Button from './Button/Button';

const App = () => (
  <div className="app">
    <Calculator>
      <Output />
      <Buttons>
        <Button value="reset" />
        <Button value="negate" />
        <Button value="percent" />
        <Button value="divide" />
        <Button value="7" />
        <Button value="8" />
        <Button value="9" />
        <Button value="multiply" />
        <Button value="4" />
        <Button value="5" />
        <Button value="6" />
        <Button value="subtract" />
        <Button value="1" />
        <Button value="2" />
        <Button value="3" />
        <Button value="add" />
        <Button value="0" />
        <Button value="dot" />
        <Button value="equal" />
      </Buttons>
    </Calculator>
  </div>
);


export default App;