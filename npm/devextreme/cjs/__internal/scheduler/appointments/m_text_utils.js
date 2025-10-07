/**
* DevExtreme (cjs/__internal/scheduler/appointments/m_text_utils.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormatType = exports.formatDates = exports.createFormattedDateText = exports.DateFormatType = void 0;
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _date2 = _interopRequireDefault(require("../../../core/utils/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var DateFormatType;
(function (DateFormatType) {
  DateFormatType["DATETIME"] = "DATETIME";
  DateFormatType["TIME"] = "TIME";
  DateFormatType["DATE"] = "DATE";
})(DateFormatType || (exports.DateFormatType = DateFormatType = {}));
const createFormattedDateText = options => {
  const {
    startDate,
    endDate,
    allDay,
    format
  } = options;
  const formatType = format || getFormatType(startDate, endDate, allDay);
  return formatDates(startDate, endDate, formatType);
};
exports.createFormattedDateText = createFormattedDateText;
const getFormatType = (startDate, endDate, isAllDay, isDateAndTimeView) => {
  if (isAllDay) {
    return DateFormatType.DATE;
  }
  if (isDateAndTimeView && _date2.default.sameDate(startDate, endDate)) {
    return DateFormatType.TIME;
  }
  return DateFormatType.DATETIME;
};
exports.getFormatType = getFormatType;
const formatDates = (startDate, endDate, formatType) => {
  const dateFormat = 'monthandday';
  const timeFormat = 'shorttime';
  const isSameDate = startDate.getDate() === endDate.getDate();
  switch (formatType) {
    case DateFormatType.DATETIME:
      return [_date.default.format(startDate, dateFormat), ' ', _date.default.format(startDate, timeFormat), ' - ', isSameDate ? '' : `${_date.default.format(endDate, dateFormat)} `, _date.default.format(endDate, timeFormat)].join('');
    case DateFormatType.TIME:
      return `${_date.default.format(startDate, timeFormat)} - ${_date.default.format(endDate, timeFormat)}`;
    case DateFormatType.DATE:
      return `${_date.default.format(startDate, dateFormat)}${isSameDate ? '' : ` - ${_date.default.format(endDate, dateFormat)}`}`;
    default:
      return undefined;
  }
};
exports.formatDates = formatDates;
