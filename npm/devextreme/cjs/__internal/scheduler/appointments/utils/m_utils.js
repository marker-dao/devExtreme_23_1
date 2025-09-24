/**
* DevExtreme (cjs/__internal/scheduler/appointments/utils/m_utils.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortAppointmentsByStartDate = exports.getAppointmentTakesSeveralDays = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO: wrong place for these functions - move it to root utils
const getAppointmentTakesSeveralDays = dates => !_date.default.sameDate(dates.startDate, dates.endDate);
exports.getAppointmentTakesSeveralDays = getAppointmentTakesSeveralDays;
const sortAppointmentsByStartDate = (appointments, dataAccessors) => {
  appointments.sort((a, b) => {
    const firstDate = dataAccessors.get('startDate', a.settings || a);
    const secondDate = dataAccessors.get('startDate', b.settings || b);
    return Math.sign(firstDate.getTime() - secondDate.getTime());
  });
};
exports.sortAppointmentsByStartDate = sortAppointmentsByStartDate;
