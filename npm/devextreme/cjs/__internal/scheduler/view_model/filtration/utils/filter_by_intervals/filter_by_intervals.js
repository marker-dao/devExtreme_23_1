/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/filter_by_intervals/filter_by_intervals.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByIntervals = void 0;
var _is_appointment_matched_intervals = require("../../../common/is_appointment_matched_intervals");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getIntervals = (appointment, _ref) => {
  let {
    allDayIntervals,
    regularIntervals,
    isDateTimeView
  } = _ref;
  // NOTE: broken case for all day appointments in regular panel
  if (isDateTimeView && appointment.allDay && !appointment.isAllDayPanelOccupied) {
    return regularIntervals.map(interval => ({
      min: new Date(interval.min).setUTCHours(0, 0, 0, 0),
      max: interval.max
    }));
  }
  return appointment.allDay || appointment.isAllDayPanelOccupied ? allDayIntervals : regularIntervals;
};
const filterByIntervals = (entities, options) => entities.filter(appointment => {
  const intervals = getIntervals(appointment, options);
  // NOTE: if all day appointment ends at 00:00 make it longer to occupy next interval
  const fixedAppointment = _extends({}, appointment);
  if (appointment.allDay) {
    fixedAppointment.endDateUTC += 1;
  }
  return (0, _is_appointment_matched_intervals.isAppointmentMatchedIntervals)({
    startDate: fixedAppointment.startDateUTC,
    endDate: fixedAppointment.endDateUTC
  }, intervals);
});
exports.filterByIntervals = filterByIntervals;
