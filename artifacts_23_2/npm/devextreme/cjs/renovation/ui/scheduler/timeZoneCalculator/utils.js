/**
* DevExtreme (cjs/renovation/ui/scheduler/timeZoneCalculator/utils.js)
* Version: 23.2.2
* Build date: Wed Nov 22 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.TimeZoneCalculator = void 0;
var _type = require("../../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _types = require("./types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MS_IN_MINUTE = 60000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
let TimeZoneCalculator = /*#__PURE__*/function () {
  function TimeZoneCalculator(options) {
    this.options = options;
  }
  var _proto = TimeZoneCalculator.prototype;
  _proto.createDate = function createDate(sourceDate, info) {
    const date = new Date(sourceDate);
    switch (info.path) {
      case _types.PathTimeZoneConversion.fromSourceToAppointment:
        return this.getConvertedDate(date, info.appointmentTimeZone, true, false);
      case _types.PathTimeZoneConversion.fromAppointmentToSource:
        return this.getConvertedDate(date, info.appointmentTimeZone, true, true);
      case _types.PathTimeZoneConversion.fromSourceToGrid:
        return this.getConvertedDate(date, info.appointmentTimeZone, false, false);
      case _types.PathTimeZoneConversion.fromGridToSource:
        return this.getConvertedDate(date, info.appointmentTimeZone, false, true);
      default:
        throw new Error('not specified pathTimeZoneConversion');
    }
  };
  _proto.getOffsets = function getOffsets(date, appointmentTimezone) {
    const clientOffset = -this.getClientOffset(date) / _date.default.dateToMilliseconds('hour');
    const commonOffset = this.getCommonOffset(date);
    const appointmentOffset = this.getAppointmentOffset(date, appointmentTimezone);
    return {
      client: clientOffset,
      common: !(0, _type.isDefined)(commonOffset) ? clientOffset : commonOffset,
      appointment: typeof appointmentOffset !== 'number' ? clientOffset : appointmentOffset
    };
  };
  _proto.getConvertedDateByOffsets = function getConvertedDateByOffsets(date, clientOffset, targetOffset, isBack) {
    const direction = isBack ? -1 : 1;
    const resultDate = new Date(date);
    resultDate.setMinutes(resultDate.getMinutes() - direction * (60 * clientOffset));
    resultDate.setMinutes(resultDate.getMinutes() + direction * (60 * targetOffset));
    return new Date(resultDate);
  };
  _proto.getOriginStartDateOffsetInMs = function getOriginStartDateOffsetInMs(date, timezone, isUTCDate) {
    const offsetInHours = this.getOffsetInHours(date, timezone, isUTCDate);
    return offsetInHours * MS_IN_HOUR;
  };
  _proto.getOffsetInHours = function getOffsetInHours(date, timezone, isUTCDate) {
    const {
      appointment,
      client,
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
  };
  _proto.getClientOffset = function getClientOffset(date) {
    return this.options.getClientOffset(date);
  };
  _proto.getCommonOffset = function getCommonOffset(date) {
    return this.options.tryGetCommonOffset(date);
  };
  _proto.getAppointmentOffset = function getAppointmentOffset(date, appointmentTimezone) {
    return this.options.tryGetAppointmentOffset(date, appointmentTimezone);
  };
  _proto.getConvertedDate = function getConvertedDate(date, appointmentTimezone, useAppointmentTimeZone, isBack) {
    const newDate = new Date(date.getTime());
    const offsets = this.getOffsets(newDate, appointmentTimezone);
    if (useAppointmentTimeZone && !!appointmentTimezone) {
      return this.getConvertedDateByOffsets(date, offsets.client, offsets.appointment, isBack);
    }
    return this.getConvertedDateByOffsets(date, offsets.client, offsets.common, isBack);
  };
  return TimeZoneCalculator;
}();
exports.TimeZoneCalculator = TimeZoneCalculator;
