"use strict";

exports.getAppointmentTakesAllDay = void 0;
var _type = require("../../../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const toMs = _date.default.dateToMilliseconds;
const DAY_HOURS = 24;
const getDurationInHours = (startDate, endDate) => Math.floor((endDate.getTime() - startDate.getTime()) / toMs('hour'));
const getAppointmentTakesAllDay = (appointmentAdapter, allDayPanelMode) => {
  const {
    allDay,
    endDate,
    startDate
  } = appointmentAdapter;
  switch (allDayPanelMode) {
    case 'hidden':
      return false;
    case 'allDay':
      return allDay;
    case 'all':
    default:
      if (allDay) {
        return true;
      }
      if (!(0, _type.isDefined)(endDate)) {
        return false;
      }
      return getDurationInHours(startDate, endDate) >= DAY_HOURS;
  }
};
exports.getAppointmentTakesAllDay = getAppointmentTakesAllDay;