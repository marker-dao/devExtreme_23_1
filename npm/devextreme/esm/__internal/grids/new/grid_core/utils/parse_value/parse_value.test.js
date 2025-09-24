/**
* DevExtreme (esm/__internal/grids/new/grid_core/utils/parse_value/parse_value.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect } from '@jest/globals';
import each from 'jest-each';
import { parseBooleanValue, parseDateValue, parseNumberValue, parseValue } from './parse_value';
describe('Parsing value', () => {
  describe('parseBooleanValue', () => {
    each`
            text           | trueText  | falseText | expectedResult
            ${'test'}      | ${null}   | ${null}   | ${undefined}
            ${'test2'}     | ${'test'} | ${null}   | ${undefined}
            ${'test3'}     | ${null}   | ${'test2'}| ${undefined}
    `.it('should return undefined if a text does not equal to true of false expressions', _ref => {
      let {
        text,
        trueText,
        falseText,
        expectedResult
      } = _ref;
      const result = parseBooleanValue(text, trueText, falseText);
      expect(result).toEqual(expectedResult);
    });
    each`
        text           | trueText  | falseText | expectedResult
        ${'test2'}     | ${'test2'}| ${null}   | ${true}
        ${'test2'}     | ${null}   | ${'test2'}| ${false}
`.it('should return corresponding value if text matches with an expression', _ref2 => {
      let {
        text,
        trueText,
        falseText,
        expectedResult
      } = _ref2;
      const result = parseBooleanValue(text, trueText, falseText);
      expect(result).toEqual(expectedResult);
    });
  });
});
describe('parseNumberValue', () => {
  each`
      text           | format          | expectedResult
      ${'$10'}       | ${'currency'}   | ${10}
      ${'1.2345'}    | ${'decimal'}    | ${1.2345}
`.it('should take into account the format', _ref3 => {
    let {
      text,
      format,
      expectedResult
    } = _ref3;
    const result = parseNumberValue(text, format);
    expect(result).toEqual(expectedResult);
  });
  each`
      text           | format          | expectedResult
      ${'10'}        | ${null}         | ${10}
      ${'1.1'}       | ${null}         | ${1.1}
`.it('should parse number without format if possible', _ref4 => {
    let {
      text,
      format,
      expectedResult
    } = _ref4;
    const result = parseNumberValue(text, format);
    expect(result).toEqual(expectedResult);
  });
  each`
      text           | format          | expectedResult
      ${'A'}         | ${null}         | ${undefined}
      ${'123e'}      | ${null}         | ${undefined}
`.it('should return undefined if an arg is not a number', _ref5 => {
    let {
      text,
      format,
      expectedResult
    } = _ref5;
    const result = parseNumberValue(text, format);
    expect(result).toEqual(expectedResult);
  });
});
describe('parseDateValue', () => {
  each`
      text                                      | format                  | expectedResult
      ${'Thursday, July 15, 2021'}              | ${'longDate'}           | ${new Date(2021, 6, 15)}
      ${'7/15/2021'}                            | ${'shortDate'}          | ${new Date(2021, 6, 15)}
      ${'7/15/2021, 8:45 PM'}                   | ${'shortDateShortTime'} | ${new Date(2021, 6, 15, 20, 45)}
`.it('should take into account the format', _ref6 => {
    let {
      text,
      format,
      expectedResult
    } = _ref6;
    const result = parseDateValue(text, format);
    expect(result).toEqual(expectedResult);
  });
  each`
      text                                      | format                  | expectedResult
      ${'7/15/2021'}                            | ${null}                 | ${new Date(2021, 6, 15)}
      ${'7/15/2021, 8:45 PM'}                   | ${null}                 | ${new Date(2021, 6, 15, 20, 45)}
`.it('should parse short dates without format', _ref7 => {
    let {
      text,
      format,
      expectedResult
    } = _ref7;
    const result = parseDateValue(text, format);
    expect(result).toEqual(expectedResult);
  });
});
describe('parseValue', () => {
  each`
      column                                          | text                  | expectedResult
      ${{
    dataType: 'number'
  }}                       | ${'10'}               | ${10}
      ${{
    dataType: 'number',
    format: 'currency'
  }}   | ${'$5'}               | ${5}
      ${{
    dataType: 'boolean',
    trueText: 'test'
  }}    | ${'test'}             | ${true}
      ${{
    dataType: 'boolean'
  }}                      | ${'test'}             | ${undefined}
      ${{
    dataType: 'date'
  }}                         | ${'7/15/2021'}        | ${new Date(2021, 6, 15)}
      ${{
    dataType: 'customType'
  }}                   | ${'test'}             | ${'test'}
`.it('should take into account a column type', _ref8 => {
    let {
      column,
      text,
      expectedResult
    } = _ref8;
    const result = parseValue(column, text);
    expect(result).toEqual(expectedResult);
  });
});
