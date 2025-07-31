/**
* DevExtreme (cjs/__internal/scheduler/appointments/data_provider/utils/get_appointment_filter/get_appointment_occurrence_dates.js)
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
exports.getShiftedAllDayStartDate = exports.getShiftedAllDayEndDate = exports.getAppointmentOccurrenceDates = void 0;
var _date = require("../../../../../core/utils/date");
var _m_date = require("../../../../../core/utils/m_date");
const toMs = _m_date.dateUtils.dateToMilliseconds;
const SECOND_MS = toMs('second');
const DAY_MS = toMs('day');
const DAY_WITHOUT_ONE_SECOND_MS = toMs('day') - toMs('second');
const getShiftedAllDayStartDate = (originalStartDate, viewOffset) => {
  const trimmedDate = _m_date.dateUtils.trimTime(originalStartDate);
  const startOfDay = _date.dateUtilsTs.addOffsets(trimmedDate, [viewOffset]);
  const endOfDay = _date.dateUtilsTs.addOffsets(trimmedDate, [DAY_WITHOUT_ONE_SECOND_MS, viewOffset]);
  switch (true) {
    case originalStartDate > endOfDay:
      return _date.dateUtilsTs.addOffsets(endOfDay, [SECOND_MS]);
    case originalStartDate < startOfDay:
      return _date.dateUtilsTs.addOffsets(startOfDay, [-DAY_MS]);
    // NOTE: originalStartDate in interval [startOfDay, endOfDay]
    // (include border points)
    default:
      return startOfDay;
  }
};
exports.getShiftedAllDayStartDate = getShiftedAllDayStartDate;
const getShiftedAllDayEndDate = (originalEndDate, viewOffset) => {
  const trimmedDate = _m_date.dateUtils.trimTime(originalEndDate);
  const startOfDay = _date.dateUtilsTs.addOffsets(trimmedDate, [viewOffset]);
  const endOfDay = _date.dateUtilsTs.addOffsets(trimmedDate, [DAY_WITHOUT_ONE_SECOND_MS, viewOffset]);
  switch (true) {
    case originalEndDate > endOfDay:
      return _date.dateUtilsTs.addOffsets(endOfDay, [DAY_MS]);
    case originalEndDate < startOfDay:
      return _date.dateUtilsTs.addOffsets(startOfDay, [-SECOND_MS]);
    // NOTE: originalEndDate in interval [startOfDay, endOfDay]
    // (include border points)
    default:
      return endOfDay;
  }
};
exports.getShiftedAllDayEndDate = getShiftedAllDayEndDate;
const getAppointmentOccurrenceDates = (_ref, viewOffset) => {
  let {
    startDate: originalStartDate,
    endDate: originalEndDate,
    allDay
  } = _ref;
  switch (true) {
    // NOTE: For regular appointments -> return original dates
    case !allDay:
      return {
        startDate: originalStartDate,
        endDate: originalEndDate
      };
    // NOTE: If viewOffset isn't set -> "round" dates
    // E.g: ['2024-02-01T10:00:00', '2024-02-02T11:00:00']
    // -> ['2024-02-01T00:00:00', '2024-02-02T23:59:59']
    case viewOffset === 0:
      return {
        startDate: _m_date.dateUtils.trimTime(originalStartDate),
        endDate: _date.dateUtilsTs.addOffsets(_m_date.dateUtils.trimTime(originalEndDate), [DAY_WITHOUT_ONE_SECOND_MS])
      };
    // NOTE: allDay appointment + viewOffset is set case
    default:
      return {
        startDate: getShiftedAllDayStartDate(originalStartDate, viewOffset),
        endDate: getShiftedAllDayEndDate(originalEndDate, viewOffset)
      };
  }
};
exports.getAppointmentOccurrenceDates = getAppointmentOccurrenceDates;
