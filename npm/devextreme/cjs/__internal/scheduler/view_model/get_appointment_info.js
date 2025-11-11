/**
* DevExtreme (cjs/__internal/scheduler/view_model/get_appointment_info.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentInfo = exports.getAgendaAppointmentInfo = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../m_utils_time_zone"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const getAgendaAppointmentInfo = item => _extends({}, getAppointmentInfo(item), {
  partialDates: {
    allDay: item.allDay,
    startDate: _m_utils_time_zone.default.createDateFromUTCWithLocalOffset(new Date(item.datesAfterSplit.startDateUTC)),
    endDate: _m_utils_time_zone.default.createDateFromUTCWithLocalOffset(new Date(item.datesAfterSplit.endDateUTC))
  }
});
exports.getAgendaAppointmentInfo = getAgendaAppointmentInfo;
