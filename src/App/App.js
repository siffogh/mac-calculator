import React from 'react';

import './style.scss';
import Calculator from './Calculator';
import Output from './Output';
import Button from './Button';

const App = () => (
  <div className="app">
    <Calculator>
      <Output />
      <div className="buttons">
        <Button value="reset" nonInitialLabel="C" />
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
        <Button value="0" span="2" />
        <Button value="dot" />
        <Button value="equal" />
      </div>
    </Calculator>
  </div>
);


export default App;
