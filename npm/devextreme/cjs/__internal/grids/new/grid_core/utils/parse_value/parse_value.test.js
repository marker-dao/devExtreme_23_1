/**
* DevExtreme (cjs/__internal/grids/new/grid_core/utils/parse_value/parse_value.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _jestEach = _interopRequireDefault(require("jest-each"));
var _parse_value = require("./parse_value");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.describe)('Parsing value', () => {
  (0, _globals.describe)('parseBooleanValue', () => {
    (0, _jestEach.default)`
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
      const result = (0, _parse_value.parseBooleanValue)(text, trueText, falseText);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
    (0, _jestEach.default)`
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
      const result = (0, _parse_value.parseBooleanValue)(text, trueText, falseText);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
});
(0, _globals.describe)('parseNumberValue', () => {
  (0, _jestEach.default)`
      text           | format          | expectedResult
      ${'$10'}       | ${'currency'}   | ${10}
      ${'1.2345'}    | ${'decimal'}    | ${1.2345}
`.it('should take into account the format', _ref3 => {
    let {
      text,
      format,
      expectedResult
    } = _ref3;
    const result = (0, _parse_value.parseNumberValue)(text, format);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
  (0, _jestEach.default)`
      text           | format          | expectedResult
      ${'10'}        | ${null}         | ${10}
      ${'1.1'}       | ${null}         | ${1.1}
`.it('should parse number without format if possible', _ref4 => {
    let {
      text,
      format,
      expectedResult
    } = _ref4;
    const result = (0, _parse_value.parseNumberValue)(text, format);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
  (0, _jestEach.default)`
      text           | format          | expectedResult
      ${'A'}         | ${null}         | ${undefined}
      ${'123e'}      | ${null}         | ${undefined}
`.it('should return undefined if an arg is not a number', _ref5 => {
    let {
      text,
      format,
      expectedResult
    } = _ref5;
    const result = (0, _parse_value.parseNumberValue)(text, format);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
});
(0, _globals.describe)('parseDateValue', () => {
  (0, _jestEach.default)`
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
    const result = (0, _parse_value.parseDateValue)(text, format);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
  (0, _jestEach.default)`
      text                                      | format                  | expectedResult
      ${'7/15/2021'}                            | ${null}                 | ${new Date(2021, 6, 15)}
      ${'7/15/2021, 8:45 PM'}                   | ${null}                 | ${new Date(2021, 6, 15, 20, 45)}
`.it('should parse short dates without format', _ref7 => {
    let {
      text,
      format,
      expectedResult
    } = _ref7;
    const result = (0, _parse_value.parseDateValue)(text, format);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
});
(0, _globals.describe)('parseValue', () => {
  (0, _jestEach.default)`
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
    const result = (0, _parse_value.parseValue)(column, text);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
});
