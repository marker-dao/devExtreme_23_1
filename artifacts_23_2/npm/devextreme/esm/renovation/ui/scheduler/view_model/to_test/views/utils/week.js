/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/to_test/views/utils/week.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../../../../core/utils/date';
import dateLocalization from '../../../../../../../localization/date';
import { getCalculatedFirstDayOfWeek, getValidCellDateForLocalTimeFormat, getViewStartByOptions, setOptionHour } from './base';
export var getIntervalDuration = intervalCount => dateUtils.dateToMilliseconds('day') * 7 * intervalCount;
export var getValidStartDate = (startDate, firstDayOfWeek) => startDate ? dateUtils.getFirstWeekDate(startDate, firstDayOfWeek) : undefined;
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) => {
  var firstDayOfWeek = getCalculatedFirstDayOfWeek(firstDayOfWeekOption);
  var viewStart = getViewStartByOptions(startDate, currentDate, intervalDuration, getValidStartDate(startDate, firstDayOfWeek));
  var firstViewDate = dateUtils.getFirstWeekDate(viewStart, firstDayOfWeek);
  return setOptionHour(firstViewDate, startDayHour);
};
export var calculateViewStartDate = (startDateOption, firstDayOfWeek) => {
  var validFirstDayOfWeek = firstDayOfWeek !== null && firstDayOfWeek !== void 0 ? firstDayOfWeek : dateLocalization.firstDayOfWeekIndex();
  return dateUtils.getFirstWeekDate(startDateOption, validFirstDayOfWeek);
};
export var getTimePanelCellText = (rowIndex, date, startViewDate, cellDuration, startDayHour, viewOffset) => {
  if (rowIndex % 2 !== 0) {
    return '';
  }
  var validTimeDate = getValidCellDateForLocalTimeFormat(date, {
    startViewDate,
    startDayHour,
    cellIndexShift: Math.round(cellDuration) * rowIndex,
    viewOffset
  });
  return dateLocalization.format(validTimeDate, 'shorttime');
};