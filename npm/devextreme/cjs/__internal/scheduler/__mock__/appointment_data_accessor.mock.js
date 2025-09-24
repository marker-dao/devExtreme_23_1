/**
* DevExtreme (cjs/__internal/scheduler/__mock__/appointment_data_accessor.mock.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockUppercaseFieldExpressions = exports.mockFieldExpressions = exports.mockAppointmentDataAccessor = void 0;
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
const mockUppercaseFieldExpressions = exports.mockUppercaseFieldExpressions = {
  startDateExpr: 'StartDate',
  endDateExpr: 'EndDate',
  startDateTimeZoneExpr: 'StartDateTimeZone',
  endDateTimeZoneExpr: 'EndDateTimeZone',
  allDayExpr: 'AllDay',
  textExpr: 'Text',
  descriptionExpr: 'Description',
  recurrenceRuleExpr: 'RecurrenceRule',
  recurrenceExceptionExpr: 'RecurrenceException',
  disabledExpr: 'Disabled',
  visibleExpr: 'Visible'
};
const mockAppointmentDataAccessor = exports.mockAppointmentDataAccessor = new _appointment_data_accessor.AppointmentDataAccessor(mockFieldExpressions, true);
