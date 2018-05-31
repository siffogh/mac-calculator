import React from 'react';

import styles from './App.style';
import Calculator from './Calculator';
import Output from './Output';
import Button from './Button';

const App = () => (
  <styles.App>
    <Calculator>
      <Output />
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
    </Calculator>
  </styles.App>
);

export default App;
