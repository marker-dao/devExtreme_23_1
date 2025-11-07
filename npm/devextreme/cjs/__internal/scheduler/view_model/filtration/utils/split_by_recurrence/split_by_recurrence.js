/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/split_by_recurrence/split_by_recurrence.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitByRecurrence = void 0;
var _get_appointment_recurrence_occurrences = require("./get_appointment_recurrence_occurrences");
const splitByRecurrence = (entities, _ref) => {
  let {
    timeZone,
    firstDayOfWeek,
    allDayIntervals,
    regularIntervals
  } = _ref;
  return entities.reduce((acc, appointment) => {
    const intervals = appointment.allDay || appointment.isAllDayPanelOccupied ? allDayIntervals : regularIntervals;
    const recurrenceInterval = {
      min: intervals[0].min,
      max: intervals[intervals.length - 1].max
    };
    const occurrences = (0, _get_appointment_recurrence_occurrences.getAppointmentRecurrenceOccurrences)(appointment, {
      firstDayOfWeek,
      interval: recurrenceInterval,
      timeZone
    });
    acc.push(...occurrences);
    return acc;
  }, []);
};
exports.splitByRecurrence = splitByRecurrence;
