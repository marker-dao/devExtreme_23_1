/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator_month.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import dateLocalization from '../../../../localization/date';
import { getToday, setOptionHour } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { calculateCellIndex, calculateStartViewDate, getCellText, getViewStartByOptions, isFirstCellInMonthWithIntervalCount } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/month';
import timezoneUtils from '../../m_utils_time_zone';
// eslint-disable-next-line import/no-cycle
import { calculateAlignedWeeksBetweenDates } from './m_utils';
import { ViewDataGenerator } from './m_view_data_generator';
var toMs = dateUtils.dateToMilliseconds;
var DAYS_IN_WEEK = 7;
export class ViewDataGeneratorMonth extends ViewDataGenerator {
  constructor() {
    super(...arguments);
    this.tableAllDay = undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCellData(rowIndex, columnIndex, options, allDay) {
    var {
      indicatorTime,
      timeZoneCalculator,
      intervalCount,
      viewOffset
    } = options;
    var data = super.getCellData(rowIndex, columnIndex, options, false);
    var startDate = timezoneUtils.addOffsetsWithoutDST(data.startDate, -viewOffset);
    data.today = this.isCurrentDate(startDate, indicatorTime, timeZoneCalculator);
    data.otherMonth = this.isOtherMonth(startDate, this._minVisibleDate, this._maxVisibleDate);
    data.firstDayOfMonth = isFirstCellInMonthWithIntervalCount(startDate, intervalCount);
    data.text = getCellText(startDate, intervalCount);
    return data;
  }
  isCurrentDate(date, indicatorTime, timeZoneCalculator) {
    return dateUtils.sameDate(date, getToday(indicatorTime, timeZoneCalculator));
  }
  isOtherMonth(cellDate, minDate, maxDate) {
    return !dateUtils.dateInRange(cellDate, minDate, maxDate, 'date');
  }
  _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
    return calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount);
  }
  calculateEndDate(startDate, interval, endDayHour) {
    return setOptionHour(startDate, endDayHour);
  }
  getInterval() {
    return toMs('day');
  }
  _calculateStartViewDate(options) {
    return calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, options.intervalCount, this.getFirstDayOfWeek(options.firstDayOfWeek));
  }
  _setVisibilityDates(options) {
    var {
      intervalCount,
      startDate,
      currentDate
    } = options;
    var firstMonthDate = dateUtils.getFirstMonthDate(startDate);
    var viewStart = getViewStartByOptions(startDate, currentDate, intervalCount, firstMonthDate);
    this._minVisibleDate = new Date(viewStart.setDate(1));
    var nextMonthDate = new Date(viewStart.setMonth(viewStart.getMonth() + intervalCount));
    this._maxVisibleDate = new Date(nextMonthDate.setDate(0));
  }
  getCellCount() {
    return DAYS_IN_WEEK;
  }
  getRowCount(options) {
    var _a;
    var startDate = new Date(options.currentDate);
    startDate.setDate(1);
    var endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + options.intervalCount);
    endDate.setDate(0);
    return calculateAlignedWeeksBetweenDates(startDate, endDate, (_a = options.firstDayOfWeek) !== null && _a !== void 0 ? _a : dateLocalization.firstDayOfWeekIndex());
  }
  getCellCountInDay() {
    return 1;
  }
  setHiddenInterval() {
    this.hiddenInterval = 0;
  }
  getCellEndDate(cellStartDate, options) {
    var {
      startDayHour,
      endDayHour
    } = options;
    var durationMs = (endDayHour - startDayHour) * toMs('hour');
    return timezoneUtils.addOffsetsWithoutDST(cellStartDate, durationMs);
  }
}