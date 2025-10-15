"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateStartViewDate = exports.calculateRows = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _base = require("./base");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const calculateStartViewDate = (currentDate, startDayHour) => {
  const validCurrentDate = new Date(currentDate);
  return (0, _base.setOptionHour)(validCurrentDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;
const getDayStart = date => new Date(date).setUTCHours(0, 0, 0, 0);
const calculateRows = (appointments, agendaDuration, currentDate, groupCount) => {
  const dayMs = getDayStart(_m_utils_time_zone.default.createUTCDateWithLocalOffset(currentDate));
  const intervalsStartMap = new Map();
  const result = Array.from({
    length: groupCount || 1
  }, () => new Array(agendaDuration).fill(0));
  for (let i = 0; i < agendaDuration; i += 1) {
    const day = new Date(dayMs);
    intervalsStartMap.set(day.setUTCDate(day.getUTCDate() + i), i);
  }
  appointments.forEach(appointment => {
    const appointmentStart = getDayStart(appointment.startDateUTC);
    const intervalIndex = intervalsStartMap.get(appointmentStart);
    if (intervalIndex !== undefined) {
      result[appointment.groupIndex][intervalIndex] += 1;
    }
  });
  return result;
};
exports.calculateRows = calculateRows;