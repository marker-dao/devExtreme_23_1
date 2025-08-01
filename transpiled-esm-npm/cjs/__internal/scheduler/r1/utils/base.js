"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitNumber = exports.setOptionHour = exports.isVerticalGroupingApplied = exports.isTimelineView = exports.isHorizontalView = exports.isHorizontalGroupingApplied = exports.isGroupingByDate = exports.isFirstCellInMonthWithIntervalCount = exports.isDateInRange = exports.isDateAndTimeView = exports.isDataOnWeekend = exports.isAppointmentTakesAllDay = exports.getWeekendsCount = exports.getViewStartByOptions = exports.getVerticalGroupCountClass = exports.getValidCellDateForLocalTimeFormat = exports.getTotalRowCountByCompleteData = exports.getTotalCellCountByCompleteData = exports.getToday = exports.getStartViewDateWithoutDST = exports.getStartViewDateTimeOffset = exports.getSkippedHoursInRange = exports.getOverflowIndicatorColor = exports.getKeyByGroup = exports.getIsGroupedAllDayPanel = exports.getHorizontalGroupCount = exports.getHeaderCellText = exports.getGroupPanelData = exports.getDisplayedRowCount = exports.getDisplayedCellCount = exports.getDatesWithoutTime = exports.getCellDuration = exports.getCalculatedFirstDayOfWeek = exports.getAppointmentKey = exports.extendGroupItemsForGroupingByDate = exports.calculateViewStartDate = exports.calculateIsGroupedAllDayPanel = exports.calculateDayDuration = exports.calculateCellIndex = void 0;
var _date = _interopRequireDefault(require("../../../../common/core/localization/date"));
var _date2 = _interopRequireDefault(require("../../../../core/utils/date"));
var _type = require("../../../../core/utils/type");
var _date3 = require("../../../core/utils/date");
var _constants = require("../../constants");
var _m_classes = require("../../m_classes");
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _constants_view = require("../../utils/options/constants_view");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const toMs = _date2.default.dateToMilliseconds;
const DAY_HOURS = 24;
const HOUR_IN_MS = 1000 * 60 * 60;
const SATURDAY_INDEX = 6;
const SUNDAY_INDEX = 0;
const getDurationInHours = (startDate, endDate) => Math.floor((endDate.getTime() - startDate.getTime()) / toMs('hour'));
const getDatesWithoutTime = (min, max) => {
  const newMin = _date2.default.trimTime(min);
  const newMax = _date2.default.trimTime(max);
  newMax.setDate(newMax.getDate() + 1);
  return [newMin, newMax];
};
exports.getDatesWithoutTime = getDatesWithoutTime;
const isAppointmentTakesAllDay = (appointmentAdapter, allDayPanelMode) => {
  const {
    startDate,
    endDate,
    allDay
  } = appointmentAdapter;
  switch (allDayPanelMode) {
    case 'hidden':
      return false;
    case 'allDay':
      return allDay;
    case 'all':
    default:
      if (allDay) {
        return true;
      }
      if (!(0, _type.isDefined)(endDate)) {
        return false;
      }
      return getDurationInHours(startDate, endDate) >= DAY_HOURS;
  }
};
exports.isAppointmentTakesAllDay = isAppointmentTakesAllDay;
const getAppointmentKey = geometry => {
  const {
    left,
    top,
    width,
    height
  } = geometry;
  return `${left}-${top}-${width}-${height}`;
};
exports.getAppointmentKey = getAppointmentKey;
const getOverflowIndicatorColor = (color, colors) => !colors.length || colors.filter(item => item !== color).length === 0 ? color : undefined;
exports.getOverflowIndicatorColor = getOverflowIndicatorColor;
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
const setOptionHour = (date, optionHour) => {
  const nextDate = new Date(date);
  if (!(0, _type.isDefined)(optionHour)) {
    return nextDate;
  }
  nextDate.setHours(optionHour, optionHour % 1 * 60, 0, 0);
  return nextDate;
};
exports.setOptionHour = setOptionHour;
const calculateDayDuration = (startDayHour, endDayHour) => endDayHour - startDayHour;
exports.calculateDayDuration = calculateDayDuration;
const getStartViewDateTimeOffset = (startViewDate, startDayHour) => {
  const validStartDayHour = Math.floor(startDayHour);
  const isDSTChange = _m_utils_time_zone.default.isTimezoneChangeInDate(startViewDate);
  if (isDSTChange && validStartDayHour !== startViewDate.getHours()) {
    return _date2.default.dateToMilliseconds('hour');
  }
  return 0;
};
exports.getStartViewDateTimeOffset = getStartViewDateTimeOffset;
const getValidCellDateForLocalTimeFormat = (date, _ref) => {
  let {
    startViewDate,
    startDayHour,
    cellIndexShift,
    viewOffset
  } = _ref;
  const originDate = _date3.dateUtilsTs.addOffsets(date, [-viewOffset]);
  const localTimeZoneChangedInOriginDate = _m_utils_time_zone.default.isTimezoneChangeInDate(originDate);
  if (!localTimeZoneChangedInOriginDate) {
    return date;
  }
  // NOTE: Shift the startViewDate by two days ahead because
  // we can have viewOffset equals -1/+1 day.
  // This strange method of changing date used here because
  // +2 days from DST date not affected by DST.
  const startViewDateWithoutDST = new Date(new Date(startViewDate).setDate(startViewDate.getDate() + 2));
  const startViewDateOffset = getStartViewDateTimeOffset(startViewDate, startDayHour);
  return _date3.dateUtilsTs.addOffsets(startViewDateWithoutDST, [viewOffset, cellIndexShift, -startViewDateOffset]);
};
exports.getValidCellDateForLocalTimeFormat = getValidCellDateForLocalTimeFormat;
const getTotalCellCountByCompleteData = completeData => completeData[completeData.length - 1].length;
exports.getTotalCellCountByCompleteData = getTotalCellCountByCompleteData;
const getDisplayedCellCount = (displayedCellCount, completeData) => displayedCellCount ?? getTotalCellCountByCompleteData(completeData);
exports.getDisplayedCellCount = getDisplayedCellCount;
const getHeaderCellText = (headerIndex, date, headerCellTextFormat, getDateForHeaderText, additionalOptions) => {
  const validDate = getDateForHeaderText(headerIndex, date, additionalOptions);
  return _date.default.format(validDate, headerCellTextFormat);
};
exports.getHeaderCellText = getHeaderCellText;
const isVerticalGroupingApplied = (groups, groupOrientation) => groupOrientation === _constants.VERTICAL_GROUP_ORIENTATION && !!groups.length;
// TODO(9): Get rid of it as soon as you can. More parameters then needed
exports.isVerticalGroupingApplied = isVerticalGroupingApplied;
const getHorizontalGroupCount = (groupLeafs, groupOrientation) => {
  const isVerticalGrouping = isVerticalGroupingApplied(groupLeafs, groupOrientation);
  return isVerticalGrouping ? 1 : groupLeafs.length;
};
exports.getHorizontalGroupCount = getHorizontalGroupCount;
const TIMELINE_VIEWS = [_constants_view.VIEWS.TIMELINE_DAY, _constants_view.VIEWS.TIMELINE_WEEK, _constants_view.VIEWS.TIMELINE_WORK_WEEK, _constants_view.VIEWS.TIMELINE_MONTH];
const isTimelineView = viewType => Boolean(viewType && TIMELINE_VIEWS.includes(viewType));
exports.isTimelineView = isTimelineView;
const isDateAndTimeView = viewType => viewType !== _constants_view.VIEWS.TIMELINE_MONTH && viewType !== _constants_view.VIEWS.MONTH;
exports.isDateAndTimeView = isDateAndTimeView;
const isHorizontalView = viewType => {
  switch (viewType) {
    case _constants_view.VIEWS.TIMELINE_DAY:
    case _constants_view.VIEWS.TIMELINE_WEEK:
    case _constants_view.VIEWS.TIMELINE_WORK_WEEK:
    case _constants_view.VIEWS.TIMELINE_MONTH:
    case _constants_view.VIEWS.MONTH:
      return true;
    default:
      return false;
  }
};
exports.isHorizontalView = isHorizontalView;
const isDateInRange = (date, startDate, endDate, diff) => diff > 0 ? _date2.default.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : _date2.default.dateInRange(date, endDate, startDate, 'date');
exports.isDateInRange = isDateInRange;
const isFirstCellInMonthWithIntervalCount = (cellDate, intervalCount) => cellDate.getDate() === 1 && intervalCount > 1;
exports.isFirstCellInMonthWithIntervalCount = isFirstCellInMonthWithIntervalCount;
const getViewStartByOptions = (startDate, currentDate, intervalDuration, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  }
  let currentStartDate = _date2.default.trimTime(startViewDate);
  const diff = currentStartDate.getTime() <= currentDate.getTime() ? 1 : -1;
  let endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
  while (!isDateInRange(currentDate, currentStartDate, endDate, diff)) {
    currentStartDate = endDate;
    endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
  }
  return diff > 0 ? currentStartDate : endDate;
};
exports.getViewStartByOptions = getViewStartByOptions;
const calculateIsGroupedAllDayPanel = (groups, groupOrientation, isAllDayPanelVisible) => isVerticalGroupingApplied(groups, groupOrientation) && isAllDayPanelVisible;
exports.calculateIsGroupedAllDayPanel = calculateIsGroupedAllDayPanel;
const calculateViewStartDate = startDateOption => startDateOption;
exports.calculateViewStartDate = calculateViewStartDate;
const getCellDuration = (viewType, startDayHour, endDayHour, hoursInterval) => {
  switch (viewType) {
    case 'month':
      return calculateDayDuration(startDayHour, endDayHour) * 3600000;
    case 'timelineMonth':
      return _date2.default.dateToMilliseconds('day');
    default:
      return 3600000 * hoursInterval;
  }
};
exports.getCellDuration = getCellDuration;
const calculateCellIndex = (rowIndex, columnIndex, rowCount) => columnIndex * rowCount + rowIndex;
exports.calculateCellIndex = calculateCellIndex;
const getTotalRowCountByCompleteData = completeData => completeData.length;
exports.getTotalRowCountByCompleteData = getTotalRowCountByCompleteData;
const getDisplayedRowCount = (displayedRowCount, completeData) => displayedRowCount ?? getTotalRowCountByCompleteData(completeData);
exports.getDisplayedRowCount = getDisplayedRowCount;
const getStartViewDateWithoutDST = (startViewDate, startDayHour) => {
  const newStartViewDate = _m_utils_time_zone.default.getDateWithoutTimezoneChange(startViewDate);
  newStartViewDate.setHours(startDayHour);
  return newStartViewDate;
};
exports.getStartViewDateWithoutDST = getStartViewDateWithoutDST;
const getIsGroupedAllDayPanel = (hasAllDayRow, isVerticalGrouping) => hasAllDayRow && isVerticalGrouping;
exports.getIsGroupedAllDayPanel = getIsGroupedAllDayPanel;
const getKeyByGroup = (groupIndex, isVerticalGrouping) => {
  if (isVerticalGrouping && !!groupIndex) {
    return groupIndex.toString();
  }
  return '0';
};
exports.getKeyByGroup = getKeyByGroup;
const getToday = (indicatorTime, timeZoneCalculator) => {
  const todayDate = indicatorTime ?? new Date();
  return (timeZoneCalculator === null || timeZoneCalculator === void 0 ? void 0 : timeZoneCalculator.createDate(todayDate, 'toGrid')) || todayDate;
};
exports.getToday = getToday;
const getCalculatedFirstDayOfWeek = firstDayOfWeekOption => (0, _type.isDefined)(firstDayOfWeekOption) ? firstDayOfWeekOption : _date.default.firstDayOfWeekIndex();
exports.getCalculatedFirstDayOfWeek = getCalculatedFirstDayOfWeek;
const isHorizontalGroupingApplied = (groups, groupOrientation) => groupOrientation === _constants.HORIZONTAL_GROUP_ORIENTATION && !!groups.length;
exports.isHorizontalGroupingApplied = isHorizontalGroupingApplied;
const isGroupingByDate = (groups, groupOrientation, groupByDate) => {
  const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
  return groupByDate && isHorizontalGrouping;
};
exports.isGroupingByDate = isGroupingByDate;
const getSkippedHoursInRange = (startDate, endDate, allDay, viewDataProvider) => {
  const isAllDay = allDay && !viewDataProvider.viewType.includes('timeline');
  let result = 0;
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 1);
  currentDate.setHours(0, 0, 0, 0);
  const endDateWithStartHour = new Date(endDate);
  endDateWithStartHour.setHours(0, 0, 0, 0);
  const {
    startDayHour,
    endDayHour
  } = viewDataProvider.getViewOptions();
  const dayHours = isAllDay ? DAY_HOURS : endDayHour - startDayHour;
  while (currentDate < endDateWithStartHour) {
    if (viewDataProvider.isSkippedDate(currentDate)) {
      result += dayHours;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  const startDateHours = startDate.getHours();
  const endDateHours = endDate.getHours() + endDate.getTime() % HOUR_IN_MS / HOUR_IN_MS;
  if (viewDataProvider.isSkippedDate(startDate)) {
    if (isAllDay) {
      result += DAY_HOURS;
    } else if (startDateHours < startDayHour) {
      result += dayHours;
    } else if (startDateHours < endDayHour) {
      result += endDayHour - startDateHours;
    }
  }
  if (viewDataProvider.isSkippedDate(endDate)) {
    if (isAllDay) {
      result += DAY_HOURS;
    } else if (endDateHours > endDayHour) {
      result += dayHours;
    } else if (endDateHours > startDayHour) {
      result += endDateHours - startDayHour;
    }
  }
  return result;
};
exports.getSkippedHoursInRange = getSkippedHoursInRange;
const isDataOnWeekend = date => {
  const day = date.getDay();
  return day === SATURDAY_INDEX || day === SUNDAY_INDEX;
};
exports.isDataOnWeekend = isDataOnWeekend;
const getWeekendsCount = days => 2 * Math.floor(days / 7);
exports.getWeekendsCount = getWeekendsCount;
const extendGroupItemsForGroupingByDate = (groupRenderItems, columnCountPerGroup) => [...new Array(columnCountPerGroup)].reduce((currentGroupItems, _, index) => groupRenderItems.map((groupsRow, rowIndex) => {
  const currentRow = currentGroupItems[rowIndex] || [];
  return [...currentRow, ...groupsRow.map((item, columnIndex) => _extends({}, item, {
    key: `${item.key}_group_by_date_${index}`,
    isFirstGroupCell: columnIndex === 0,
    isLastGroupCell: columnIndex === groupsRow.length - 1
  }))];
}), []);
exports.extendGroupItemsForGroupingByDate = extendGroupItemsForGroupingByDate;
const stringifyId = id => (0, _type.isObject)(id) ? JSON.stringify(id) : String(id);
const getGroupPanelData = (groupResources, columnCountPerGroup, groupByDate, baseColSpan) => {
  let repeatCount = 1;
  let groupPanelItems = groupResources.map(group => {
    const result = [];
    const {
      resourceName,
      resourceIndex,
      items,
      data
    } = group;
    for (let i = 0; i < repeatCount; i += 1) {
      result.push(...items.map((_ref2, index) => {
        let {
          id,
          text,
          color
        } = _ref2;
        return {
          id,
          text,
          color,
          key: `${i}_${resourceIndex}_${stringifyId(id)}`,
          resourceName,
          data: data === null || data === void 0 ? void 0 : data[index]
        };
      }));
    }
    repeatCount *= items.length;
    return result;
  }).filter(group => group.length);
  if (groupByDate) {
    groupPanelItems = extendGroupItemsForGroupingByDate(groupPanelItems, columnCountPerGroup);
  }
  return {
    groupPanelItems,
    baseColSpan
  };
};
exports.getGroupPanelData = getGroupPanelData;
const splitNumber = (value, splitValue) => Array.from({
  length: Math.ceil(value / splitValue)
}, (_, index) => Math.min(value - splitValue * index, splitValue));
exports.splitNumber = splitNumber;