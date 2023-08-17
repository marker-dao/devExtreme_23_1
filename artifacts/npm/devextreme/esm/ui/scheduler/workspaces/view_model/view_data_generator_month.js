/**
* DevExtreme (esm/ui/scheduler/workspaces/view_model/view_data_generator_month.js)
* Version: 23.2.0
* Build date: Thu Aug 17 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getToday, setOptionHour } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { ViewDataGenerator } from './view_data_generator';
import dateUtils from '../../../../core/utils/date';
import { calculateCellIndex, calculateStartViewDate, getCellText, isFirstCellInMonthWithIntervalCount, getViewStartByOptions } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/month';
import { calculateAlignedWeeksBetweenDates } from './utils';
import dateLocalization from '../../../../localization/date';
var DAY_IN_MILLISECONDS = dateUtils.dateToMilliseconds('day');
var DAYS_IN_WEEK = 7;
export class ViewDataGeneratorMonth extends ViewDataGenerator {
  get tableAllDay() {
    return undefined;
  }
  getCellData(rowIndex, columnIndex, options, allDay) {
    var data = super.getCellData(rowIndex, columnIndex, options, false);
    var startDate = data.startDate;
    var {
      indicatorTime,
      timeZoneCalculator,
      intervalCount
    } = options;
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
    return DAY_IN_MILLISECONDS;
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
    var _options$firstDayOfWe;
    var startDate = new Date(options.currentDate);
    startDate.setDate(1);
    var endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + options.intervalCount);
    endDate.setDate(0);
    return calculateAlignedWeeksBetweenDates(startDate, endDate, (_options$firstDayOfWe = options.firstDayOfWeek) !== null && _options$firstDayOfWe !== void 0 ? _options$firstDayOfWe : dateLocalization.firstDayOfWeekIndex());
  }
  getCellCountInDay() {
    return 1;
  }
  setHiddenInterval() {
    this.hiddenInterval = 0;
  }
}
