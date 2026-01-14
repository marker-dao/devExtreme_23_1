"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentInfo = exports.getAgendaAppointmentInfo = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getAppointmentInfo = item => {
  const appointment = {
    allDay: item.allDay,
    startDate: _m_utils_time_zone.default.createDateFromUTCWithLocalOffset(new Date(item.datesBeforeSplit.startDateUTC)),
    endDate: _m_utils_time_zone.default.createDateFromUTCWithLocalOffset(new Date(item.datesBeforeSplit.endDateUTC))
  };
  const source = {
    allDay: item.allDay,
    startDate: new Date(item.source.startDate),
    endDate: new Date(item.source.endDate)
  };
  return {
    appointment,
    sourceAppointment: source
  };
};
exports.getAppointmentInfo = getAppointmentInfo;
const getAgendaAppointmentInfo = item => Object.assign({}, getAppointmentInfo(item), {
  partialDates: {
    allDay: item.allDay,
    startDate: _m_utils_time_zone.default.createDateFromUTCWithLocalOffset(new Date(item.datesAfterSplit.startDateUTC)),
    endDate: _m_utils_time_zone.default.createDateFromUTCWithLocalOffset(new Date(item.datesAfterSplit.endDateUTC))
  }
});
exports.getAgendaAppointmentInfo = getAgendaAppointmentInfo;