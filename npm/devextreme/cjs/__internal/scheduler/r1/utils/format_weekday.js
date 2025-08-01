/**
* DevExtreme (cjs/__internal/scheduler/r1/utils/format_weekday.js)
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
exports.formatWeekdayAndDay = exports.formatWeekday = void 0;
var _date = _interopRequireDefault(require("../../../../common/core/localization/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const formatWeekday = date => _date.default.getDayNames('abbreviated')[date.getDay()];
exports.formatWeekday = formatWeekday;
const formatWeekdayAndDay = date => `${formatWeekday(date)} ${_date.default.format(date, 'day')}`;
exports.formatWeekdayAndDay = formatWeekdayAndDay;
