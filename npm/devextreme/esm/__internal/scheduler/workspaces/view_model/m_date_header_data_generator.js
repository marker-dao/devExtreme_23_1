/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_date_header_data_generator.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["startDate", "endDate", "isFirstGroupCell", "isLastGroupCell"];
import dateUtils from '../../../../core/utils/date';
import timeZoneUtils from '../../m_utils_time_zone';
import { formatWeekdayAndDay, getDisplayedCellCount, getHeaderCellText, getHorizontalGroupCount, getTotalCellCountByCompleteData, isTimelineView } from '../../r1/utils/index';
import { VIEWS } from '../../utils/options/constants_view';
export class DateHeaderDataGenerator {
  constructor(_viewDataGenerator) {
    this._viewDataGenerator = _viewDataGenerator;
  }
  getCompleteDateHeaderMap(options, completeViewDataMap) {
    const {
      isGenerateWeekDaysHeaderData
    } = options;
    const result = [];
    if (isGenerateWeekDaysHeaderData) {
      const weekDaysRow = this._generateWeekDaysHeaderRowMap(options, completeViewDataMap);
      result.push(weekDaysRow);
    }
    const dateRow = this._generateHeaderDateRow(options, completeViewDataMap);
    result.push(dateRow);
    return result;
  }
  _generateWeekDaysHeaderRowMap(options, completeViewDataMap) {
    const {
      isGroupedByDate,
      getResourceManager,
      groupOrientation,
      startDayHour,
      endDayHour,
      hoursInterval,
      isHorizontalGrouping,
      intervalCount,
      viewOffset
    } = options;
    const resourceManager = getResourceManager();
    const groupCount = resourceManager.groupCount();
    const cellCountInDay = this._viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
    const horizontalGroupCount = getHorizontalGroupCount(resourceManager.groupsLeafs, groupOrientation);
    const index = completeViewDataMap[0][0].allDay ? 1 : 0;
    const colSpan = isGroupedByDate ? horizontalGroupCount * cellCountInDay : cellCountInDay;
    const datesRepeatCount = isHorizontalGrouping && !isGroupedByDate ? groupCount : 1;
    const daysInGroup = this._viewDataGenerator.daysInInterval * intervalCount;
    const daysInView = daysInGroup * datesRepeatCount;
    const weekDaysRow = [];
    for (let dayIndex = 0; dayIndex < daysInView; dayIndex += 1) {
      const cell = completeViewDataMap[index][dayIndex * colSpan];
      const shiftedStartDate = timeZoneUtils.addOffsetsWithoutDST(cell.startDate, -viewOffset);
      weekDaysRow.push(_extends({}, cell, {
        colSpan,
        text: formatWeekdayAndDay(shiftedStartDate),
        isFirstGroupCell: false,
        isLastGroupCell: false
      }));
    }
    return weekDaysRow;
  }
  _generateHeaderDateRow(options, completeViewDataMap) {
    const {
      today,
      isGroupedByDate,
      groupOrientation,
      getResourceManager,
      headerCellTextFormat,
      getDateForHeaderText,
      interval,
      startViewDate,
      startDayHour,
      endDayHour,
      hoursInterval,
      intervalCount,
      currentDate,
      viewType,
      viewOffset
    } = options;
    const horizontalGroupCount = getHorizontalGroupCount(getResourceManager().groupsLeafs, groupOrientation);
    const index = completeViewDataMap[0][0].allDay ? 1 : 0;
    const colSpan = isGroupedByDate ? horizontalGroupCount : 1;
    const isVerticalGrouping = groupOrientation === 'vertical';
    const cellCountInGroupRow = this._viewDataGenerator.getCellCount({
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      startDayHour,
      endDayHour
    });
    const cellCountInDay = this._viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
    const slicedByColumnsData = isGroupedByDate ? completeViewDataMap[index].filter((_, columnIndex) => columnIndex % horizontalGroupCount === 0) : completeViewDataMap[index];
    // NOTE: Should leave dates as is when creating time row in timelines.
    const shouldShiftDatesForHeaderText = !isTimelineView(viewType) || viewType === VIEWS.TIMELINE_MONTH;
    return slicedByColumnsData.map((_ref, idx) => {
      let {
          startDate,
          isFirstGroupCell,
          isLastGroupCell
        } = _ref,
        restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
      const shiftedStartDate = timeZoneUtils.addOffsetsWithoutDST(startDate, -viewOffset);
      const shiftedStartDateForHeaderText = shouldShiftDatesForHeaderText ? shiftedStartDate : startDate;
      const text = getHeaderCellText(idx % cellCountInGroupRow, shiftedStartDateForHeaderText, headerCellTextFormat, getDateForHeaderText, {
        interval,
        startViewDate,
        startDayHour,
        cellCountInDay,
        viewOffset
      });
      return _extends({}, restProps, {
        startDate,
        text,
        today: dateUtils.sameDate(shiftedStartDate, today),
        colSpan,
        isFirstGroupCell: isGroupedByDate || isFirstGroupCell && !isVerticalGrouping,
        isLastGroupCell: isGroupedByDate || isLastGroupCell && !isVerticalGrouping
      });
    });
  }
  generateDateHeaderData(completeDateHeaderMap, completeViewDataMap, options) {
    const {
      isGenerateWeekDaysHeaderData,
      cellWidth,
      isProvideVirtualCellsWidth,
      startDayHour,
      endDayHour,
      hoursInterval,
      isMonthDateHeader
    } = options;
    const dataMap = [];
    let weekDayRowConfig = {};
    const validCellWidth = cellWidth || 0;
    if (isGenerateWeekDaysHeaderData) {
      weekDayRowConfig = this._generateDateHeaderDataRow(options, completeDateHeaderMap, completeViewDataMap, this._viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval), 0, validCellWidth);
      dataMap.push(weekDayRowConfig.dateRow);
    }
    const datesRowConfig = this._generateDateHeaderDataRow(options, completeDateHeaderMap, completeViewDataMap, 1, isGenerateWeekDaysHeaderData ? 1 : 0, validCellWidth);
    dataMap.push(datesRowConfig.dateRow);
    return {
      dataMap,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.rightVirtualCellWidth : undefined,
      leftVirtualCellCount: datesRowConfig.leftVirtualCellCount,
      rightVirtualCellCount: datesRowConfig.rightVirtualCellCount,
      weekDayLeftVirtualCellWidth: weekDayRowConfig.leftVirtualCellWidth,
      weekDayRightVirtualCellWidth: weekDayRowConfig.rightVirtualCellWidth,
      weekDayLeftVirtualCellCount: weekDayRowConfig.leftVirtualCellCount,
      weekDayRightVirtualCellCount: weekDayRowConfig.rightVirtualCellCount,
      isMonthDateHeader
    };
  }
  _generateDateHeaderDataRow(options, completeDateHeaderMap, completeViewDataMap, baseColSpan, rowIndex, cellWidth) {
    const {
      startCellIndex,
      cellCount,
      isProvideVirtualCellsWidth,
      getResourceManager,
      groupOrientation,
      isGroupedByDate
    } = options;
    const horizontalGroupCount = getHorizontalGroupCount(getResourceManager().groupsLeafs, groupOrientation);
    const colSpan = isGroupedByDate ? horizontalGroupCount * baseColSpan : baseColSpan;
    const leftVirtualCellCount = Math.floor(startCellIndex / colSpan);
    const displayedCellCount = getDisplayedCellCount(cellCount, completeViewDataMap);
    const actualCellCount = Math.ceil((startCellIndex + displayedCellCount) / colSpan);
    const totalCellCount = getTotalCellCountByCompleteData(completeViewDataMap);
    const dateRow = completeDateHeaderMap[rowIndex].slice(leftVirtualCellCount, actualCellCount);
    const finalLeftVirtualCellCount = leftVirtualCellCount * colSpan;
    const finalLeftVirtualCellWidth = finalLeftVirtualCellCount * cellWidth;
    const finalRightVirtualCellCount = totalCellCount - actualCellCount * colSpan;
    const finalRightVirtualCellWidth = finalRightVirtualCellCount * cellWidth;
    return {
      dateRow,
      leftVirtualCellCount: finalLeftVirtualCellCount,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? finalLeftVirtualCellWidth : undefined,
      rightVirtualCellCount: finalRightVirtualCellCount,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? finalRightVirtualCellWidth : undefined
    };
  }
}
