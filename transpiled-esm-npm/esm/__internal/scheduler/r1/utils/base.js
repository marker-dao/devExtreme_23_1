import dateLocalization from '../../../../common/core/localization/date';
import dateUtils from '../../../../core/utils/date';
import { isDefined, isObject } from '../../../../core/utils/type';
import { dateUtilsTs } from '../../../core/utils/date';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../constants';
import { VERTICAL_GROUP_COUNT_CLASSES } from '../../m_classes';
import timeZoneUtils from '../../m_utils_time_zone';
import { VIEWS } from '../../utils/options/constants_view';
const toMs = dateUtils.dateToMilliseconds;
const DAY_HOURS = 24;
const HOUR_IN_MS = 1000 * 60 * 60;
const SATURDAY_INDEX = 6;
const SUNDAY_INDEX = 0;
const getDurationInHours = (startDate, endDate) => Math.floor((endDate.getTime() - startDate.getTime()) / toMs('hour'));
export const getDatesWithoutTime = (min, max) => {
  const newMin = dateUtils.trimTime(new Date(min));
  const newMax = dateUtils.trimTime(new Date(max));
  newMax.setDate(newMax.getDate() + 1);
  return [newMin, newMax];
};
export const isAppointmentTakesAllDay = (appointmentAdapter, allDayPanelMode) => {
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
      if (!isDefined(endDate)) {
        return false;
      }
      return getDurationInHours(startDate, endDate) >= DAY_HOURS;
  }
};
export const getAppointmentKey = geometry => {
  const {
    left,
    top,
    width,
    height
  } = geometry;
  return `${left}-${top}-${width}-${height}`;
};
export const getOverflowIndicatorColor = (color, colors) => !colors.length || colors.filter(item => item !== color).length === 0 ? color : undefined;
export const getVerticalGroupCountClass = groups => {
  switch (groups === null || groups === void 0 ? void 0 : groups.length) {
    case 1:
      return VERTICAL_GROUP_COUNT_CLASSES[0];
    case 2:
      return VERTICAL_GROUP_COUNT_CLASSES[1];
    case 3:
      return VERTICAL_GROUP_COUNT_CLASSES[2];
    default:
      return undefined;
  }
};
export const setOptionHour = (date, optionHour) => {
  const nextDate = new Date(date);
  if (!isDefined(optionHour)) {
    return nextDate;
  }
  nextDate.setHours(optionHour, optionHour % 1 * 60, 0, 0);
  return nextDate;
};
export const calculateDayDuration = (startDayHour, endDayHour) => endDayHour - startDayHour;
export const getStartViewDateTimeOffset = (startViewDate, startDayHour) => {
  const validStartDayHour = Math.floor(startDayHour);
  const isDSTChange = timeZoneUtils.isTimezoneChangeInDate(startViewDate);
  if (isDSTChange && validStartDayHour !== startViewDate.getHours()) {
    return dateUtils.dateToMilliseconds('hour');
  }
  return 0;
};
export const getValidCellDateForLocalTimeFormat = (date, _ref) => {
  let {
    startViewDate,
    startDayHour,
    cellIndexShift,
    viewOffset
  } = _ref;
  const originDate = dateUtilsTs.addOffsets(date, -viewOffset);
  const localTimeZoneChangedInOriginDate = timeZoneUtils.isTimezoneChangeInDate(originDate);
  if (!localTimeZoneChangedInOriginDate) {
    return date;
  }
  // NOTE: Shift the startViewDate by two days ahead because
  // we can have viewOffset equals -1/+1 day.
  // This strange method of changing date used here because
  // +2 days from DST date not affected by DST.
  const startViewDateWithoutDST = new Date(new Date(startViewDate).setDate(startViewDate.getDate() + 2));
  const startViewDateOffset = getStartViewDateTimeOffset(startViewDate, startDayHour);
  return dateUtilsTs.addOffsets(startViewDateWithoutDST, viewOffset, cellIndexShift, -startViewDateOffset);
};
export const getTotalCellCountByCompleteData = completeData => completeData[completeData.length - 1].length;
export const getDisplayedCellCount = (displayedCellCount, completeData) => displayedCellCount ?? getTotalCellCountByCompleteData(completeData);
export const getHeaderCellText = (headerIndex, date, headerCellTextFormat, getDateForHeaderText, additionalOptions) => {
  const validDate = getDateForHeaderText(headerIndex, date, additionalOptions);
  return dateLocalization.format(validDate, headerCellTextFormat);
};
export const isVerticalGroupingApplied = (groupCount, groupOrientation) => groupOrientation === VERTICAL_GROUP_ORIENTATION && groupCount > 0;
export const getHorizontalGroupCount = (groupCount, groupOrientation) => {
  const isVerticalGrouping = isVerticalGroupingApplied(groupCount, groupOrientation);
  return isVerticalGrouping ? 1 : groupCount;
};
const TIMELINE_VIEWS = [VIEWS.TIMELINE_DAY, VIEWS.TIMELINE_WEEK, VIEWS.TIMELINE_WORK_WEEK, VIEWS.TIMELINE_MONTH];
export const isTimelineView = viewType => Boolean(viewType && TIMELINE_VIEWS.includes(viewType));
export const isDateAndTimeView = viewType => viewType !== VIEWS.TIMELINE_MONTH && viewType !== VIEWS.MONTH;
export const isHorizontalView = viewType => {
  switch (viewType) {
    case VIEWS.TIMELINE_DAY:
    case VIEWS.TIMELINE_WEEK:
    case VIEWS.TIMELINE_WORK_WEEK:
    case VIEWS.TIMELINE_MONTH:
    case VIEWS.MONTH:
      return true;
    default:
      return false;
  }
};
export const isDateInRange = (date, startDate, endDate, diff) => diff > 0 ? dateUtils.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : dateUtils.dateInRange(date, endDate, startDate, 'date');
export const isFirstCellInMonthWithIntervalCount = (cellDate, intervalCount) => cellDate.getDate() === 1 && intervalCount > 1;
export const getViewStartByOptions = (startDate, currentDate, intervalDuration, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  }
  let currentStartDate = dateUtils.trimTime(startViewDate);
  const diff = currentStartDate.getTime() <= currentDate.getTime() ? 1 : -1;
  let endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
  while (!isDateInRange(currentDate, currentStartDate, endDate, diff)) {
    currentStartDate = endDate;
    endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
  }
  return diff > 0 ? currentStartDate : endDate;
};
export const calculateIsGroupedAllDayPanel = (groupCount, groupOrientation, isAllDayPanelVisible) => isVerticalGroupingApplied(groupCount, groupOrientation) && isAllDayPanelVisible;
export const calculateViewStartDate = startDateOption => startDateOption;
export const getCellDuration = (viewType, startDayHour, endDayHour, hoursInterval) => {
  switch (viewType) {
    case 'month':
      return calculateDayDuration(startDayHour, endDayHour) * 3600000;
    case 'timelineMonth':
      return dateUtils.dateToMilliseconds('day');
    default:
      return 3600000 * hoursInterval;
  }
};
export const calculateCellIndex = (rowIndex, columnIndex, rowCount) => columnIndex * rowCount + rowIndex;
export const getTotalRowCountByCompleteData = completeData => completeData.length;
export const getDisplayedRowCount = (displayedRowCount, completeData) => displayedRowCount ?? getTotalRowCountByCompleteData(completeData);
export const getStartViewDateWithoutDST = (startViewDate, startDayHour) => {
  const newStartViewDate = timeZoneUtils.getDateWithoutTimezoneChange(startViewDate);
  newStartViewDate.setHours(startDayHour);
  return newStartViewDate;
};
export const getIsGroupedAllDayPanel = (hasAllDayRow, isVerticalGrouping) => hasAllDayRow && isVerticalGrouping;
export const getKeyByGroup = (groupIndex, isVerticalGrouping) => {
  if (isVerticalGrouping && groupIndex !== undefined) {
    return groupIndex.toString();
  }
  return '0';
};
export const getToday = (indicatorTime, timeZoneCalculator) => {
  const todayDate = indicatorTime ?? new Date();
  return (timeZoneCalculator === null || timeZoneCalculator === void 0 ? void 0 : timeZoneCalculator.createDate(todayDate, 'toGrid')) || todayDate;
};
export const getCalculatedFirstDayOfWeek = firstDayOfWeekOption => isDefined(firstDayOfWeekOption) ? firstDayOfWeekOption : dateLocalization.firstDayOfWeekIndex();
export const isHorizontalGroupingApplied = (groupCount, groupOrientation) => groupOrientation === HORIZONTAL_GROUP_ORIENTATION && groupCount > 0;
export const isGroupingByDate = (groupCount, groupOrientation, groupByDate) => {
  const isHorizontalGrouping = isHorizontalGroupingApplied(groupCount, groupOrientation);
  return groupByDate && isHorizontalGrouping;
};
export const getSkippedHoursInRange = (startDate, endDate, allDay, viewDataProvider) => {
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
    switch (true) {
      case isAllDay:
        result += DAY_HOURS;
        break;
      case startDateHours < startDayHour:
        result += dayHours;
        break;
      case startDateHours < endDayHour:
        result += endDayHour - startDateHours;
        break;
      default:
        break;
    }
  }
  if (viewDataProvider.isSkippedDate(endDate)) {
    switch (true) {
      case isAllDay:
        result += DAY_HOURS;
        break;
      case endDateHours > endDayHour:
        result += dayHours;
        break;
      case endDateHours > startDayHour:
        result += endDateHours - startDayHour;
        break;
      default:
        break;
    }
  }
  return result;
};
export const isDataOnWeekend = date => {
  const day = date.getDay();
  return day === SATURDAY_INDEX || day === SUNDAY_INDEX;
};
export const getWeekendsCount = days => 2 * Math.floor(days / 7);
export const extendGroupItemsForGroupingByDate = (groupRenderItems, columnCountPerGroup) => [...new Array(columnCountPerGroup)].reduce((currentGroupItems, _, index) => groupRenderItems.map((groupsRow, rowIndex) => {
  const currentRow = currentGroupItems[rowIndex] || [];
  return [...currentRow, ...groupsRow.map((item, columnIndex) => Object.assign({}, item, {
    key: `${item.key}_group_by_date_${index}`,
    isFirstGroupCell: columnIndex === 0,
    isLastGroupCell: columnIndex === groupsRow.length - 1
  }))];
}), []);
const stringifyId = id => isObject(id) ? JSON.stringify(id) : String(id);
export const getGroupPanelData = (groupResources, columnCountPerGroup, groupByDate, baseColSpan) => {
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
export const splitNumber = (value, splitValue) => Array.from({
  length: Math.ceil(value / splitValue)
}, (_, index) => Math.min(value - splitValue * index, splitValue));