import {
  START,
  START_DECIMAL,
  CUMUL,
  CUMUL_DECIMAL,
  LOW,
  HIGH,
  NOT_A_NUMBER,
  add,
  subtract,
  multiply,
  divide,
  negate,
  percent,
  concat,
  digits,
  buttonsData,
  availableShortcuts,
  getDataByValue,
  getDataByShortcut
} from './index';

describe('utils index', () => {
  describe('# constants', () => {
    test('START should be \'START\'', () => (
      expect(START).toBe('START')
    ));
    test('START_DECIMAL should be \'START_DECIMAL\'', () => (
      expect(START_DECIMAL).toBe('START_DECIMAL')
    ));
    test('CUMUL should be \'CUMUL\'', () => (
      expect(CUMUL).toBe('CUMUL')
    ));
    test('CUMUL_DECIMAL should be \'CUMUL_DECIMAL\'', () => (
      expect(CUMUL_DECIMAL).toBe('CUMUL_DECIMAL')
    ));
    test('LOW should be \'LOW\'', () => (
      expect(LOW).toBe('LOW')
    ));
    test('HIGH should be \'HIGH\'', () => (
      expect(HIGH).toBe('HIGH')
    ));
    test('NOT_A_NUMBER should be \'Not a number\'', () => (
      expect(NOT_A_NUMBER).toBe('Not a number')
    ));
  });

  describe('# operations', () => {
    describe('## binary operations', () => {
      describe('### add', () => {
        test('add(1,9) should be \'10\'', () => {
          expect(add(1, 9)).toBe('10');
        });

        test('add(\'a\',9) should be NOT_A_NUMBER', () => {
          expect(add('a', 9)).toBe(NOT_A_NUMBER);
        });
      });

      describe('### subtract', () => {
        test('subtract(9,1) should be \'8\'', () => {
          expect(subtract(9, 1)).toBe('8');
        });

        test('subtract(\'a\',9) should be NOT_A_NUMBER', () => {
          expect(subtract('a', 9)).toBe(NOT_A_NUMBER);
        });
      });

      describe('### multiply', () => {
        test('multiply(9,1) should be \'9\'', () => {
          expect(multiply(9, 1)).toBe('9');
        });

        test('multiply(\'a\',9) should be NOT_A_NUMBER', () => {
          expect(multiply('a', 9)).toBe(NOT_A_NUMBER);
        });
      });

      describe('### divide', () => {
        test('divide(9,1) should be \'9\'', () => {
          expect(divide(9, 1)).toBe('9');
        });

        test('divide(9, 0)) should be NOT_A_NUMBER', () => {
          expect(divide('9', 0)).toBe(NOT_A_NUMBER);
        });

        test('divide(\'a\',9) should be NOT_A_NUMBER', () => {
          expect(divide('a', 9)).toBe(NOT_A_NUMBER);
        });
      });
    });

    describe('## unary operations', () => {
      describe('### negate', () => {
        test('negate(9) should be \'-9\'', () => {
          expect(negate(9)).toBe('-9');
        });

        test('negate(\'a\') should be NOT_A_NUMBER', () => {
          expect(negate('a')).toBe(NOT_A_NUMBER);
        });
      });

      describe('### percent', () => {
        test('percent(9) should be \'0.09\'', () => {
          expect(percent(9)).toBe('0.09');
        });

        test('percent(\'a\') should be NOT_A_NUMBER', () => {
          expect(percent('a')).toBe(NOT_A_NUMBER);
        });
      });
    });

    describe('concat', () => {
      test('concat(\'1\', \'2\', START) should be \'2\'', () => {
        expect(concat('1', '2', START)).toBe('2');
      });

      test('concat(\'a\', \'2\', START) should be \'2\'', () => {
        expect(concat('a', '2', START)).toBe('2');
      });

      test('concat(\'1\', \'2\', START_DECIMAL) should be \'1.2\'', () => {
        expect(concat('1', '2', START_DECIMAL)).toBe('1.2');
      });

      test('concat(\'a\', \'2\', START_DECIMAL) should be NOT_A_NUMBER', () => {
        expect(concat('a', '2', START_DECIMAL)).toBe(NOT_A_NUMBER);
      });

      test('concat(\'1\', \'2\', CUMUL) should be \'1.2\'', () => {
        expect(concat('1', '2', START_DECIMAL)).toBe('1.2');
      });

      test('concat(\'1\', \'2\', CUMUL) should be \'12\'', () => {
        expect(concat('1', '2', CUMUL)).toBe('12');
      });

      test('concat(\'a\', \'2\', CUMUL) should be NOT_A_NUMBER', () => {
        expect(concat('a', '2', CUMUL)).toBe(NOT_A_NUMBER);
      });

      test('concat(\'1.12\', \'3\', CUMUL_DECIMAL) should be \'1.123\'', () => {
        expect(concat('1.12', '3', CUMUL_DECIMAL)).toBe('1.123');
      });

      test('concat(\'a\', \'2\', CUMUL_DECIMAL) should be NOT_A_NUMBER', () => {
        expect(concat('a', '2', CUMUL_DECIMAL)).toBe(NOT_A_NUMBER);
      });
    });

    describe('buttons', () => {
      test('digits', () => {
        expect(digits).toMatchSnapshot();
      });

      test('buttonsData', () => {
        expect(buttonsData).toMatchSnapshot();
      });

      test('availableShortcuts', () => {
        expect(availableShortcuts).toMatchSnapshot();
      });

      describe('getDataByValue', () => {
        test('getDataByValue({ value: \'x\' }) should be undefined', () => {
          expect(getDataByValue({ value: 'x' })).toBeUndefined();
        });

        test('getDataByValue({ value: \'add\' })', () => {
          expect(getDataByValue({ value: 'add' })).toMatchSnapshot();
        });
      });
      describe('getDataByShortcut', () => {
        test('getDataByShortcut({ shortcut: \'x\' }) should be undefined', () => {
          expect(getDataByShortcut({ shortcut: 'x' })).toBeUndefined();
        });

        test('getDataByShortcut({ shortcut: \'+\' })', () => {
          expect(getDataByShortcut({ shortcut: '+' })).toMatchSnapshot();
        });
      });
    });
  });
});
