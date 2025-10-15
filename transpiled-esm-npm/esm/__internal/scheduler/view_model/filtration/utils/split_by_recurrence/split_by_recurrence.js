import { getAppointmentRecurrenceOccurrences } from './get_appointment_recurrence_occurrences';
export const splitByRecurrence = (entities, _ref) => {
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
    const occurrences = getAppointmentRecurrenceOccurrences(appointment, {
      firstDayOfWeek,
      interval: recurrenceInterval,
      timeZone
    });
    acc.push(...occurrences);
    return acc;
  }, []);
};