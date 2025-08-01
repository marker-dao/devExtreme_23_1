/**
* DevExtreme (cjs/__internal/scheduler/workspaces/view_model/m_view_data_generator_month.js)
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
exports.ViewDataGeneratorMonth = void 0;
var _date = _interopRequireDefault(require("../../../../common/core/localization/date"));
var _date2 = _interopRequireDefault(require("../../../../core/utils/date"));
var _index = require("../../../scheduler/r1/utils/index");
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _m_view_data_generator = require("./m_view_data_generator");
var _view_generator_utils = require("./utils/view_generator_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const toMs = _date2.default.dateToMilliseconds;
const DAYS_IN_WEEK = 7;
class ViewDataGeneratorMonth extends _m_view_data_generator.ViewDataGenerator {
  constructor() {
    super(...arguments);
    this.tableAllDay = undefined;
  }
  getCellData(rowIndex, columnIndex, options) {
    const {
      indicatorTime,
      timeZoneCalculator,
      intervalCount,
      viewOffset
    } = options;
    const data = super.getCellData(rowIndex, columnIndex, options, false);
    const startDate = _m_utils_time_zone.default.addOffsetsWithoutDST(data.startDate, -viewOffset);
    data.today = this.isCurrentDate(startDate, indicatorTime, timeZoneCalculator);
    data.otherMonth = this.isOtherMonth(startDate, this._minVisibleDate, this._maxVisibleDate);
    data.isFirstDayMonthHighlighting = (0, _index.isFirstCellInMonthWithIntervalCount)(startDate, intervalCount);
    data.text = _index.monthUtils.getCellText(startDate, intervalCount);
    return data;
  }
  isCurrentDate(date, indicatorTime, timeZoneCalculator) {
    return _date2.default.sameDate(date, (0, _index.getToday)(indicatorTime, timeZoneCalculator));
  }
  isOtherMonth(cellDate, minDate, maxDate) {
    return !_date2.default.dateInRange(cellDate, minDate, maxDate, 'date');
  }
  _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
    return _index.monthUtils.calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount);
  }
  calculateEndDate(startDate, interval, endDayHour) {
    return (0, _index.setOptionHour)(startDate, endDayHour);
  }
  getInterval() {
    return toMs('day');
  }
  _calculateStartViewDate(options) {
    return _index.monthUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, options.intervalCount, this.getFirstDayOfWeek(options.firstDayOfWeek));
  }
  _setVisibilityDates(options) {
    const {
      intervalCount,
      startDate,
      currentDate
    } = options;
    const firstMonthDate = _date2.default.getFirstMonthDate(startDate);
    const viewStart = _index.monthUtils.getViewStartByOptions(startDate, currentDate, intervalCount, firstMonthDate);
    this._minVisibleDate = new Date(viewStart.setDate(1));
    const nextMonthDate = new Date(viewStart.setMonth(viewStart.getMonth() + intervalCount));
    this._maxVisibleDate = new Date(nextMonthDate.setDate(0));
  }
  getCellCount() {
    return DAYS_IN_WEEK;
  }
  getRowCount(options) {
    const startDate = new Date(options.currentDate);
    startDate.setDate(1);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + options.intervalCount);
    endDate.setDate(0);
    return (0, _view_generator_utils.calculateAlignedWeeksBetweenDates)(startDate, endDate, options.firstDayOfWeek ?? _date.default.firstDayOfWeekIndex());
  }
  getCellCountInDay() {
    return 1;
  }
  setHiddenInterval() {
    this.hiddenInterval = 0;
  }
  getCellEndDate(cellStartDate, options) {
    const {
      startDayHour,
      endDayHour
    } = options;
    const durationMs = (endDayHour - startDayHour) * toMs('hour');
    return _m_utils_time_zone.default.addOffsetsWithoutDST(cellStartDate, durationMs);
  }
}
exports.ViewDataGeneratorMonth = ViewDataGeneratorMonth;
