/**
* DevExtreme (esm/__internal/scheduler/__mock__/appointment_data_accessor.mock.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { AppointmentDataAccessor } from '../utils/data_accessor/appointment_data_accessor';
export const mockFieldExpressions = {
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
export const mockUppercaseFieldExpressions = {
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
export const mockAppointmentDataAccessor = new AppointmentDataAccessor(mockFieldExpressions, true);
