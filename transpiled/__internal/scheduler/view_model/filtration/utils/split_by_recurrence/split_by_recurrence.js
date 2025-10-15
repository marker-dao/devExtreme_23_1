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