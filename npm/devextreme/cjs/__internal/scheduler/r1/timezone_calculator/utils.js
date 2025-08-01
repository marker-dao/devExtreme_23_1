/**
* DevExtreme (cjs/__internal/scheduler/r1/timezone_calculator/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTimeZoneCalculator = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _calculator = require("./calculator");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createTimeZoneCalculator = currentTimeZone => new _calculator.TimeZoneCalculator({
  getClientOffset: date => _m_utils_time_zone.default.getClientTimezoneOffset(date),
  tryGetCommonOffset: date => _m_utils_time_zone.default.calculateTimezoneByValue(currentTimeZone, date),
  tryGetAppointmentOffset: (date, appointmentTimezone) => _m_utils_time_zone.default.calculateTimezoneByValue(appointmentTimezone, date)
});
exports.createTimeZoneCalculator = createTimeZoneCalculator;
