/**
* DevExtreme (cjs/__internal/scheduler/__mock__/appointment_data_accessor.mock.js)
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
exports.mockFieldExpressions = exports.mockAppointmentDataAccessor = void 0;
var _appointment_data_accessor = require("../utils/data_accessor/appointment_data_accessor");
const mockFieldExpressions = exports.mockFieldExpressions = {
  startDateExpr: 'startDate',
  endDateExpr: 'endDate',
  startDateTimeZoneExpr: 'startDateTimeZone',
  endDateTimeZoneExpr: 'endDateTimeZone',
  allDayExpr: 'allDay',
  textExpr: 'text',
  descriptionExpr: 'description',
  recurrenceRuleExpr: 'recurrenceRule',
  recurrenceExceptionExpr: 'recurrenceException',
  disabledExpr: 'disabled',
  visibleExpr: 'visible'
};
const mockAppointmentDataAccessor = exports.mockAppointmentDataAccessor = new _appointment_data_accessor.AppointmentDataAccessor(mockFieldExpressions, true);
