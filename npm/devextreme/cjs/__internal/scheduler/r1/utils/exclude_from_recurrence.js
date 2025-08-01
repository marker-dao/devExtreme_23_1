/**
* DevExtreme (cjs/__internal/scheduler/r1/utils/exclude_from_recurrence.js)
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
exports.excludeFromRecurrence = void 0;
var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));
var _appointment_adapter = require("../../utils/appointment_adapter/appointment_adapter");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
const UTC_FULL_DATE_FORMAT = `${FULL_DATE_FORMAT}Z`;
const getSerializedDate = (date, startDate, isAllDay) => {
  if (isAllDay) {
    date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
  }
  return _date_serialization.default.serializeDate(date, UTC_FULL_DATE_FORMAT);
};
const createRecurrenceException = (appointmentAdapter, exceptionDate) => {
  const result = [];
  if (appointmentAdapter.recurrenceException) {
    result.push(appointmentAdapter.recurrenceException);
  }
  result.push(getSerializedDate(exceptionDate, appointmentAdapter.startDate, appointmentAdapter.allDay));
  return result.join();
};
const excludeFromRecurrence = (appointment, exceptionDate, dataAccessors) => {
  const appointmentAdapter = new _appointment_adapter.AppointmentAdapter(_extends({}, appointment), dataAccessors);
  appointmentAdapter.recurrenceException = createRecurrenceException(appointmentAdapter, exceptionDate);
  return appointmentAdapter;
};
exports.excludeFromRecurrence = excludeFromRecurrence;
