/**
* DevExtreme (cjs/__internal/scheduler/r1/timezone_calculator/calculator.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeZoneCalculator = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _type = require("../../../../core/utils/type");
var _date2 = require("../../../core/utils/date");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MS_IN_MINUTE = 60000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const toMs = _date.default.dateToMilliseconds;
class TimeZoneCalculator {
  constructor(options) {
    this.options = options;
  }
  createDate(sourceDate, path, appointmentTimeZone) {
    const date = new Date(sourceDate);
    switch (path) {
      case 'toAppointment':
        return this.getConvertedDate(date, appointmentTimeZone, false);
      case 'fromAppointment':
        return this.getConvertedDate(date, appointmentTimeZone, true);
      case 'toGrid':
        return this.getConvertedDate(date, undefined, false);
      case 'fromGrid':
        return this.getConvertedDate(date, undefined, true);
      default:
        throw new Error('not specified pathTimeZoneConversion');
    }
  }
  getOffsets(date, appointmentTimezone) {
    const clientOffset = -this.getClientOffset(date) / _date.default.dateToMilliseconds('hour');
    const commonOffset = this.getCommonOffset(date);
    const appointmentOffset = this.getAppointmentOffset(date, appointmentTimezone);
    return {
      client: clientOffset,
      common: !(0, _type.isDefined)(commonOffset) ? clientOffset : commonOffset,
      appointment: typeof appointmentOffset !== 'number' ? clientOffset : appointmentOffset
    };
  }
  getOriginStartDateOffsetInMs(date, timezone, isUTCDate) {
    const offsetInHours = this.getOffsetInHours(date, timezone, isUTCDate);
    return offsetInHours * MS_IN_HOUR;
  }
  getOffsetInHours(date, timezone, isUTCDate) {
    const {
      client,
      appointment,
      common
    } = this.getOffsets(date, timezone);
    if (!!timezone && isUTCDate) {
      return appointment - client;
    }
    if (!!timezone && !isUTCDate) {
      return appointment - common;
    }
    if (!timezone && isUTCDate) {
      return common - client;
    }
    return 0;
  }
  getClientOffset(date) {
    return this.options.getClientOffset(date);
  }
  getCommonOffset(date) {
    return this.options.tryGetCommonOffset(date);
  }
  getAppointmentOffset(date, appointmentTimezone) {
    return this.options.tryGetAppointmentOffset(date, appointmentTimezone);
  }
  getConvertedDate(date, appointmentTimezone, isBack) {
    const newDate = new Date(date.getTime());
    const offsets = this.getOffsets(newDate, appointmentTimezone);
    const targetOffsetName = appointmentTimezone ? 'appointment' : 'common';
    const direction = isBack ? -1 : 1;
    return _date2.dateUtilsTs.addOffsets(newDate, [direction * toMs('hour') * offsets[targetOffsetName], -direction * toMs('hour') * offsets.client]);
  }
}
exports.TimeZoneCalculator = TimeZoneCalculator;
