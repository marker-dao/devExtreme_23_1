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