/**
* DevExtreme (cjs/renovation/ui/scheduler/view_model/to_test/views/utils/week.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getValidStartDate = exports.getTimePanelCellText = exports.getIntervalDuration = exports.calculateViewStartDate = exports.calculateStartViewDate = void 0;
var _date = _interopRequireDefault(require("../../../../../../../core/utils/date"));
var _date2 = _interopRequireDefault(require("../../../../../../../localization/date"));
var _base = require("./base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getIntervalDuration = intervalCount => _date.default.dateToMilliseconds('day') * 7 * intervalCount;
exports.getIntervalDuration = getIntervalDuration;
const getValidStartDate = (startDate, firstDayOfWeek) => startDate ? _date.default.getFirstWeekDate(startDate, firstDayOfWeek) : undefined;
exports.getValidStartDate = getValidStartDate;
const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) => {
  const firstDayOfWeek = (0, _base.getCalculatedFirstDayOfWeek)(firstDayOfWeekOption);
  const viewStart = (0, _base.getViewStartByOptions)(startDate, currentDate, intervalDuration, getValidStartDate(startDate, firstDayOfWeek));
  const firstViewDate = _date.default.getFirstWeekDate(viewStart, firstDayOfWeek);
  return (0, _base.setOptionHour)(firstViewDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;
const calculateViewStartDate = (startDateOption, firstDayOfWeek) => {
  const validFirstDayOfWeek = firstDayOfWeek !== null && firstDayOfWeek !== void 0 ? firstDayOfWeek : _date2.default.firstDayOfWeekIndex();
  return _date.default.getFirstWeekDate(startDateOption, validFirstDayOfWeek);
};
exports.calculateViewStartDate = calculateViewStartDate;
const getTimePanelCellText = (rowIndex, date, startViewDate, cellDuration, startDayHour, viewOffset) => {
  if (rowIndex % 2 !== 0) {
    return '';
  }
  const validTimeDate = (0, _base.getValidCellDateForLocalTimeFormat)(date, {
    startViewDate,
    startDayHour,
    cellIndexShift: Math.round(cellDuration) * rowIndex,
    viewOffset
  });
  return _date2.default.format(validTimeDate, 'shorttime');
};
exports.getTimePanelCellText = getTimePanelCellText;