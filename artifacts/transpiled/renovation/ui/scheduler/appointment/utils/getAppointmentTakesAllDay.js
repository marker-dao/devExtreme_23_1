"use strict";

exports.getAppointmentTakesAllDay = void 0;
var _type = require("../../../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAppointmentDurationInHours = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / _date.default.dateToMilliseconds('hour');
const appointmentHasShortDayDuration = (startDate, endDate, viewStartDayHour, viewEndDayHour) => {
  const appointmentDurationInHours = getAppointmentDurationInHours(startDate, endDate);
  const viewDurationInHours = viewEndDayHour - viewStartDayHour;
  const startDateHours = startDate.getHours();
  const endDateHours = endDate.getHours();
  return appointmentDurationInHours >= viewDurationInHours && startDateHours === viewStartDayHour && endDateHours === viewEndDayHour;
};
const getAppointmentTakesAllDay = (appointmentAdapter, viewStartDayHour, viewEndDayHour, allDayPanelMode) => {
  const hasAllDay = () => appointmentAdapter.allDay;
  switch (allDayPanelMode) {
    case 'hidden':
      return false;
    case 'allDay':
      return hasAllDay();
    case 'all':
    default:
      {
        if (hasAllDay()) {
          return true;
        }
        const {
          endDate,
          startDate
        } = appointmentAdapter;
        if (!(0, _type.isDefined)(endDate)) {
          return false;
        }
        const appointmentDurationInHours = getAppointmentDurationInHours(startDate, endDate);
        const dayDuration = 24;
        return appointmentDurationInHours >= dayDuration || appointmentHasShortDayDuration(startDate, endDate, viewStartDayHour, viewEndDayHour);
      }
  }
};
exports.getAppointmentTakesAllDay = getAppointmentTakesAllDay;