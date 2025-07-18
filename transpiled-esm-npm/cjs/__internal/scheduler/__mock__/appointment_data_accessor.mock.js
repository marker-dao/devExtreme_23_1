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