"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRawAppointments = void 0;
const getRawAppointments = items => items.map(_ref => {
  let {
    rawAppointment
  } = _ref;
  return rawAppointment;
});
exports.getRawAppointments = getRawAppointments;