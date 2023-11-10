/**
* DevExtreme (renovation/ui/scheduler/view_model/to_test/views/utils/base.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.validateDayHours = exports.setOptionHour = exports.isTimelineView = exports.isHorizontalView = exports.isDateInRange = exports.isDateAndTimeView = exports.getViewStartByOptions = exports.getVerticalGroupCountClass = exports.getTotalRowCountByCompleteData = exports.getTotalCellCountByCompleteData = exports.getToday = exports.getStartViewDateWithoutDST = exports.getStartViewDateTimeOffset = exports.getHorizontalGroupCount = exports.getHeaderCellText = exports.getDisplayedRowCount = exports.getDisplayedCellCount = exports.getCellDuration = exports.getCalculatedFirstDayOfWeek = exports.formatWeekdayAndDay = exports.formatWeekday = exports.calculateViewStartDate = exports.calculateIsGroupedAllDayPanel = exports.calculateDayDuration = exports.calculateCellIndex = void 0;
var _ui = _interopRequireDefault(require("../../../../../../../ui/widget/ui.errors"));
var _date = _interopRequireDefault(require("../../../../../../../core/utils/date"));
var _type = require("../../../../../../../core/utils/type");
var _date2 = _interopRequireDefault(require("../../../../../../../localization/date"));
var _m_utils_time_zone = _interopRequireDefault(require("../../../../../../../__internal/scheduler/m_utils_time_zone"));
var _m_classes = require("../../../../../../../__internal/scheduler/m_classes");
var _m_constants = require("../../../../../../../__internal/scheduler/m_constants");
var _m_utils = require("../../../../../../../__internal/scheduler/resources/m_utils");
var _utils = require("../../../../workspaces/utils");
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const isDateInRange = (date, startDate, endDate, diff) => diff > 0 ? _date.default.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : _date.default.dateInRange(date, endDate, startDate, 'date');
exports.isDateInRange = isDateInRange;
const setOptionHour = (date, optionHour) => {
  const nextDate = new Date(date);
  if (!(0, _type.isDefined)(optionHour)) {
    return nextDate;
  }
  nextDate.setHours(optionHour, optionHour % 1 * 60, 0, 0);
  return nextDate;
};
exports.setOptionHour = setOptionHour;
const getViewStartByOptions = (startDate, currentDate, intervalDuration, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  }
  let currentStartDate = _date.default.trimTime(startViewDate);
  const diff = currentStartDate.getTime() <= currentDate.getTime() ? 1 : -1;
  let endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
  while (!isDateInRange(currentDate, currentStartDate, endDate, diff)) {
    currentStartDate = endDate;
    endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
  }
  return diff > 0 ? currentStartDate : endDate;
};
exports.getViewStartByOptions = getViewStartByOptions;
const getCalculatedFirstDayOfWeek = firstDayOfWeekOption => (0, _type.isDefined)(firstDayOfWeekOption) ? firstDayOfWeekOption : _date2.default.firstDayOfWeekIndex();
exports.getCalculatedFirstDayOfWeek = getCalculatedFirstDayOfWeek;
const calculateViewStartDate = startDateOption => startDateOption;
exports.calculateViewStartDate = calculateViewStartDate;
const calculateCellIndex = (rowIndex, columnIndex, rowCount) => columnIndex * rowCount + rowIndex;
exports.calculateCellIndex = calculateCellIndex;
const getStartViewDateWithoutDST = (startViewDate, startDayHour) => {
  const newStartViewDate = _m_utils_time_zone.default.getDateWithoutTimezoneChange(startViewDate);
  newStartViewDate.setHours(startDayHour);
  return newStartViewDate;
};
exports.getStartViewDateWithoutDST = getStartViewDateWithoutDST;
const getHeaderCellText = (headerIndex, date, headerCellTextFormat, getDateForHeaderText, additionalOptions) => {
  const validDate = getDateForHeaderText(headerIndex, date, additionalOptions);
  return _date2.default.format(validDate, headerCellTextFormat);
};
exports.getHeaderCellText = getHeaderCellText;
const validateDayHours = (startDayHour, endDayHour) => {
  if (startDayHour >= endDayHour) {
    throw _ui.default.Error('E1058');
  }
};
exports.validateDayHours = validateDayHours;
const getStartViewDateTimeOffset = (startViewDate, startDayHour) => {
  const validStartDayHour = Math.floor(startDayHour);
  const isDSTChange = _m_utils_time_zone.default.isTimezoneChangeInDate(startViewDate);
  if (isDSTChange && validStartDayHour !== startViewDate.getHours()) {
    return _date.default.dateToMilliseconds('hour');
  }
  return 0;
};
exports.getStartViewDateTimeOffset = getStartViewDateTimeOffset;
const formatWeekday = date => _date2.default.getDayNames('abbreviated')[date.getDay()];
exports.formatWeekday = formatWeekday;
const formatWeekdayAndDay = date => "".concat(formatWeekday(date), " ").concat(_date2.default.format(date, 'day'));
exports.formatWeekdayAndDay = formatWeekdayAndDay;
const getToday = (indicatorTime, timeZoneCalculator) => {
  const todayDate = indicatorTime !== null && indicatorTime !== void 0 ? indicatorTime : new Date();
  return (timeZoneCalculator === null || timeZoneCalculator === void 0 ? void 0 : timeZoneCalculator.createDate(todayDate, {
    path: 'toGrid'
  })) || todayDate;
};
exports.getToday = getToday;
const getVerticalGroupCountClass = groups => {
  switch (groups === null || groups === void 0 ? void 0 : groups.length) {
    case 1:
      return _m_classes.VERTICAL_GROUP_COUNT_CLASSES[0];
    case 2:
      return _m_classes.VERTICAL_GROUP_COUNT_CLASSES[1];
    case 3:
      return _m_classes.VERTICAL_GROUP_COUNT_CLASSES[2];
    default:
      return undefined;
  }
};
exports.getVerticalGroupCountClass = getVerticalGroupCountClass;
const isDateAndTimeView = viewType => viewType !== _m_constants.VIEWS.TIMELINE_MONTH && viewType !== _m_constants.VIEWS.MONTH;
exports.isDateAndTimeView = isDateAndTimeView;
const isTimelineView = viewType => !!_const.TIMELINE_VIEWS[viewType];
exports.isTimelineView = isTimelineView;
const getHorizontalGroupCount = (groups, groupOrientation) => {
  const groupCount = (0, _m_utils.getGroupCount)(groups) || 1;
  const isVerticalGrouping = (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation);
  return isVerticalGrouping ? 1 : groupCount;
};
exports.getHorizontalGroupCount = getHorizontalGroupCount;
const calculateIsGroupedAllDayPanel = (groups, groupOrientation, isAllDayPanelVisible) => (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && isAllDayPanelVisible;
exports.calculateIsGroupedAllDayPanel = calculateIsGroupedAllDayPanel;
const calculateDayDuration = (startDayHour, endDayHour) => endDayHour - startDayHour;
exports.calculateDayDuration = calculateDayDuration;
const isHorizontalView = viewType => {
  switch (viewType) {
    case _m_constants.VIEWS.TIMELINE_DAY:
    case _m_constants.VIEWS.TIMELINE_WEEK:
    case _m_constants.VIEWS.TIMELINE_WORK_WEEK:
    case _m_constants.VIEWS.TIMELINE_MONTH:
    case _m_constants.VIEWS.MONTH:
      return true;
    default:
      return false;
  }
};
exports.isHorizontalView = isHorizontalView;
const getTotalCellCountByCompleteData = completeData => completeData[completeData.length - 1].length;
exports.getTotalCellCountByCompleteData = getTotalCellCountByCompleteData;
const getTotalRowCountByCompleteData = completeData => completeData.length;
exports.getTotalRowCountByCompleteData = getTotalRowCountByCompleteData;
const getDisplayedCellCount = (displayedCellCount, completeData) => displayedCellCount !== null && displayedCellCount !== void 0 ? displayedCellCount : getTotalCellCountByCompleteData(completeData);
exports.getDisplayedCellCount = getDisplayedCellCount;
const getDisplayedRowCount = (displayedRowCount, completeData) => displayedRowCount !== null && displayedRowCount !== void 0 ? displayedRowCount : getTotalRowCountByCompleteData(completeData);
exports.getDisplayedRowCount = getDisplayedRowCount;
const getCellDuration = (viewType, startDayHour, endDayHour, hoursInterval) => {
  switch (viewType) {
    case 'month':
      return calculateDayDuration(startDayHour, endDayHour) * 3600000;
    case 'timelineMonth':
      return _date.default.dateToMilliseconds('day');
    default:
      return 3600000 * hoursInterval;
  }
};
exports.getCellDuration = getCellDuration;
