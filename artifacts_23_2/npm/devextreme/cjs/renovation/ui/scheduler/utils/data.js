/**
* DevExtreme (cjs/renovation/ui/scheduler/utils/data.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.resolveDataItems = exports.getPreparedDataItems = void 0;
var _m_utils = require("../../../../__internal/scheduler/appointments/data_provider/m_utils");
var _m_appointment_adapter = require("../../../../__internal/scheduler/m_appointment_adapter");
var _type = require("../../../../core/utils/type");
const RECURRENCE_FREQ = 'freq';
const getPreparedDataItems = (dataItems, dataAccessors, cellDurationInMinutes, timeZoneCalculator) => {
  const result = [];
  dataItems === null || dataItems === void 0 ? void 0 : dataItems.forEach(rawAppointment => {
    var _recurrenceRule$match;
    const startDate = new Date(dataAccessors.getter.startDate(rawAppointment));
    const endDate = new Date(dataAccessors.getter.endDate(rawAppointment));
    (0, _m_utils.replaceWrongEndDate)(rawAppointment, startDate, endDate, cellDurationInMinutes, dataAccessors);
    const adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, dataAccessors, timeZoneCalculator);
    const comparableStartDate = adapter.startDate && adapter.calculateStartDate('toGrid');
    const comparableEndDate = adapter.endDate && adapter.calculateEndDate('toGrid');
    const regex = new RegExp(RECURRENCE_FREQ, 'gi');
    const recurrenceRule = adapter.recurrenceRule;
    const hasRecurrenceRule = !!(recurrenceRule !== null && recurrenceRule !== void 0 && (_recurrenceRule$match = recurrenceRule.match(regex)) !== null && _recurrenceRule$match !== void 0 && _recurrenceRule$match.length);
    const visible = (0, _type.isDefined)(rawAppointment.visible) ? !!rawAppointment.visible : true;
    if (comparableStartDate && comparableEndDate) {
      result.push({
        allDay: !!adapter.allDay,
        startDate: comparableStartDate,
        startDateTimeZone: rawAppointment.startDateTimeZone,
        endDate: comparableEndDate,
        endDateTimeZone: rawAppointment.endDateTimeZone,
        recurrenceRule: adapter.recurrenceRule,
        recurrenceException: adapter.recurrenceException,
        hasRecurrenceRule,
        visible,
        rawAppointment
      });
    }
  });
  return result;
};
exports.getPreparedDataItems = getPreparedDataItems;
const resolveDataItems = options => Array.isArray(options) ? options : options.data;
exports.resolveDataItems = resolveDataItems;