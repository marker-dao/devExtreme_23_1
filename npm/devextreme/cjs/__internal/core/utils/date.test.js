/**
* DevExtreme (cjs/__internal/core/utils/date.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _jestEach = _interopRequireDefault(require("jest-each"));
var _date = require("./date");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
(0, _globals.describe)('Date utils', () => {
  (0, _globals.describe)('addOffsets function', () => {
    (0, _jestEach.default)`
         offsets | expectedResult
         ${[0]} | ${new Date('2023-09-05T00:00:00Z')}
         ${[SECOND_MS]} | ${new Date('2023-09-05T00:00:01Z')}
         ${[-HOUR_MS]} | ${new Date('2023-09-04T23:00:00Z')}
         ${[2 * HOUR_MS, -HOUR_MS]} | ${new Date('2023-09-05T01:00:00Z')}
         ${[SECOND_MS, MINUTE_MS, HOUR_MS, DAY_MS]} | ${new Date('2023-09-06T01:01:01Z')}
         ${[-SECOND_MS, -MINUTE_MS, -HOUR_MS, -DAY_MS]} | ${new Date('2023-09-03T22:58:59Z')}
         ${[HOUR_MS, -HOUR_MS]} | ${new Date('2023-09-05T00:00:00Z')}
    `.it('should add ms offsets to date correctly', _ref => {
      let {
        offsets,
        expectedResult
      } = _ref;
      const date = new Date('2023-09-05T00:00:00Z');
      const result = _date.dateUtilsTs.addOffsets(date, offsets);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
});
