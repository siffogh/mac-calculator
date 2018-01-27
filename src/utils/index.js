import { BigNumber } from 'bignumber.js';

BigNumber.config({
  EXPONENTIAL_AT: 17,
  DECIMAL_PLACES: 15
});

/**
 * constants
 */
export const START = 'START';
export const START_DECIMAL = 'START_DECIMAL';
export const CUMUL = 'CUMUL';
export const CUMUL_DECIMAL = 'CUMUL_DECIMAL';
export const LOW = 'LOW';
export const HIGH = 'HIGH';
export const NOT_A_NUMBER = 'Not a number';

/**
 *
 * @param value1
 * @param value2
 * @param type
 * @returns  concatinated value
 */
export const concat = (value1, value2, type) => {
  if (type === START) {
    return value2;
  }

  try {
    const bigNumber1 = new BigNumber(value1);
    const bigNumber2 = new BigNumber(value2);
    if (!bigNumber1.isFinite() || !bigNumber2.isFinite()) {
      throw new Error('value1 and value2 must both be finite values.');
    }

    const formattedValue1 = bigNumber1.toPrecision();
    const formattedValue2 = bigNumber2.toPrecision();

    if (type === START_DECIMAL) {
      return `${formattedValue1}.${formattedValue2}`;
    }
    if (type === CUMUL_DECIMAL && value1.split('.')[1] === '0') {
      return `${formattedValue1}${formattedValue2}`;
    }
    return `${formattedValue1}${formattedValue2}`;
  } catch (e) {
    return NOT_A_NUMBER;
  }
};

/**
 * @param a
 * @param operation
 * @param b
 * @returns  result of performing safely operation on a and b safely
 */
const safeOperation = (a, operation, b) => {
  try {
    const A = new BigNumber(a);
    const B = new BigNumber(b);
    const result = A[operation](B).div(1);
    if (!A.isFinite() || !B.isFinite() || !result.isFinite()) {
      throw new Error();
    } else {
      return result.toString();
    }
  } catch (e) {
    return NOT_A_NUMBER;
  }
};

/**
 * Binary Operations
 */
export const add = (a, b) => safeOperation(a, 'add', b);
export const subtract = (a, b) => safeOperation(a, 'sub', b);
export const multiply = (a, b) => safeOperation(a, 'mul', b);
export const divide = (a, b) => safeOperation(a, 'div', b);

/**
 * Unary Operations
 */
export const negate = a => multiply(a, -1);
export const percent = a => multiply(a, 0.01);

/**
 * digits inputs
 */
export const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  .map(digit => ({
    value: `${digit}`,
    label: `${digit}`,
    shortcut: `${digit}`,
    type: 'Digit'
  }));

/**
 * All operations
 */
export const buttonsData = [
  {
    value: 'divide',
    label: '÷',
    shortcut: '/',
    type: 'Binary',
    work: divide,
    priority: 'HIGH'
  },
  {
    value: 'multiply',
    label: '×',
    shortcut: '*',
    type: 'Binary',
    work: multiply,
    priority: 'HIGH'
  },
  {
    value: 'subtract',
    label: '−',
    shortcut: '-',
    type: 'Binary',
    work: subtract,
    priority: 'LOW'
  },
  {
    value: 'add',
    label: '+',
    shortcut: '+',
    type: 'Binary',
    work: add,
    priority: 'LOW'
  },
  {
    value: 'negate',
    label: '+/-',
    type: 'Unary',
    work: negate
  },
  {
    value: 'percent',
    label: '%',
    shortcut: '%',
    type: 'Unary',
    work: percent
  },
  {
    value: 'equal',
    label: '=',
    shortcut: 'Enter',
    type: 'Equal'
  },
  {
    value: 'dot',
    label: ',',
    type: 'Dot'
  },
  {
    value: 'reset',
    label: 'AC',
    shortcut: 'Escape',
    type: 'Reset'
  },
  ...digits
];

export const availableShortcuts = buttonsData.map(({ shortcut }) => shortcut);

export const getDataByValue = ({ value: targetValue }) => (
  buttonsData.filter(({ value }) => value === targetValue)[0]
);

export const getDataByShortcut = ({ shortcut: targetShortcut }) => (
  buttonsData.filter(({ shortcut }) => shortcut === targetShortcut)[0]
);
