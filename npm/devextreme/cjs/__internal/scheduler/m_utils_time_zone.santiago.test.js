/**
* DevExtreme (cjs/__internal/scheduler/m_utils_time_zone.santiago.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _m_utils_time_zone = _interopRequireDefault(require("./m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @timezone America/Santiago
 */

(0, _globals.describe)('isLocalTimeMidnightDST', () => {
  (0, _globals.it)('should return false for summer DST', () => {
    const date = new Date(2025, 3, 6);
    (0, _globals.expect)(_m_utils_time_zone.default.isLocalTimeMidnightDST(date)).toBe(false);
  });
  (0, _globals.it)('should return false for no DST', () => {
    const date = new Date(2025, 6, 1);
    (0, _globals.expect)(_m_utils_time_zone.default.isLocalTimeMidnightDST(date)).toBe(false);
  });
  (0, _globals.it)('should return true for winter DST', () => {
    const date = new Date(2025, 8, 7);
    (0, _globals.expect)(_m_utils_time_zone.default.isLocalTimeMidnightDST(date)).toBe(true);
  });
});
