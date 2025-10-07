/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtering/utils/get_appointment_filter/get_recurrence_exception.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecurrenceException = void 0;
var _date_serialization = _interopRequireDefault(require("../../../../../../core/utils/date_serialization"));
var _m_utils_time_zone = _interopRequireDefault(require("../../../../m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
const convertRecurrenceException = (rawExceptionString, startDate, timeZoneCalculator) => {
  const exceptionString = rawExceptionString.replace(/\s/g, '');
  const exceptionDate = _date_serialization.default.deserializeDate(exceptionString);
  const convertedStartDate = timeZoneCalculator.createDate(startDate, 'toGrid');
  let convertedExceptionDate = timeZoneCalculator.createDate(exceptionDate, 'toGrid');
  convertedExceptionDate = _m_utils_time_zone.default.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate);
  return _date_serialization.default.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
};
const getRecurrenceException = (recurrenceException, startDate, timeZoneCalculator) => {
  if (recurrenceException) {
    const exceptions = recurrenceException.split(',');
    for (let i = 0; i < exceptions.length; i += 1) {
      exceptions[i] = convertRecurrenceException(exceptions[i], startDate, timeZoneCalculator);
    }
    return exceptions.join();
  }
  return recurrenceException;
};
exports.getRecurrenceException = getRecurrenceException;
