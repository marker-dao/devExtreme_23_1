/**
* DevExtreme (cjs/__internal/scheduler/r1/components/timeline/date_header_timeline.js)
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
exports.TimelineDateHeaderLayout = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _themes = require("../../../../scheduler/r1/utils/themes");
var _index2 = require("../../utils/index");
var _date_header = require("../base/date_header");
var _date_header_cell = require("../base/date_header_cell");
var _row = require("../base/row");
const {
  isMaterialBased
} = (0, _themes.getThemeType)();
class TimelineDateHeaderLayout extends _index.BaseInfernoComponent {
  render() {
    const {
      viewContext,
      groupByDate,
      groupOrientation,
      groups,
      dateHeaderData,
      dateCellTemplate,
      timeCellTemplate
    } = this.props;
    const {
      dataMap,
      isMonthDateHeader,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      weekDayLeftVirtualCellCount,
      weekDayLeftVirtualCellWidth,
      weekDayRightVirtualCellCount,
      weekDayRightVirtualCellWidth
    } = dateHeaderData;
    const isHorizontalGrouping = (0, _index2.isHorizontalGroupingApplied)(groups, groupOrientation) && !groupByDate;
    return (0, _inferno.createFragment)(dataMap.map((dateHeaderRow, rowIndex) => {
      const rowsCount = dataMap.length;
      const isTimeCellTemplate = rowsCount - 1 === rowIndex;
      const isWeekDayRow = rowsCount > 1 && rowIndex === 0;
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const splitText = isMaterialBased && (isMonthDateHeader || isWeekDayRow);
      let validLeftVirtualCellCount = leftVirtualCellCount;
      let validRightVirtualCellCount = rightVirtualCellCount;
      let validRightVirtualCellWidth = rightVirtualCellWidth;
      let validLeftVirtualCellWidth = leftVirtualCellWidth;
      if (isWeekDayRow) {
        validLeftVirtualCellCount = weekDayLeftVirtualCellCount;
        validRightVirtualCellCount = weekDayRightVirtualCellCount;
        validRightVirtualCellWidth = weekDayRightVirtualCellWidth;
        validLeftVirtualCellWidth = weekDayLeftVirtualCellWidth;
      }
      return (0, _inferno.createComponentVNode)(2, _row.Row, {
        "className": "dx-scheduler-header-row",
        "leftVirtualCellWidth": validLeftVirtualCellWidth ?? _row.RowDefaultProps.leftVirtualCellWidth,
        "leftVirtualCellCount": validLeftVirtualCellCount,
        "rightVirtualCellWidth": validRightVirtualCellWidth ?? _row.RowDefaultProps.rightVirtualCellWidth,
        "rightVirtualCellCount": validRightVirtualCellCount,
        children: dateHeaderRow.map(_ref => {
          let {
            colSpan,
            endDate,
            groupIndex,
            groups: cellGroups,
            index,
            isFirstGroupCell,
            isLastGroupCell,
            key,
            startDate,
            text,
            today
          } = _ref;
          return (0, _inferno.createComponentVNode)(2, _date_header_cell.DateHeaderCell, {
            "viewContext": viewContext,
            "startDate": startDate,
            "endDate": endDate,
            "groups": isHorizontalGrouping ? cellGroups : undefined,
            "groupIndex": isHorizontalGrouping ? groupIndex : undefined,
            "today": today ?? _date_header_cell.DateHeaderCellDefaultProps.today,
            "index": index,
            "text": text,
            "isFirstGroupCell": isFirstGroupCell,
            "isLastGroupCell": isLastGroupCell,
            "isWeekDayCell": isWeekDayRow,
            "colSpan": colSpan,
            "splitText": splitText,
            "dateCellTemplate": dateCellTemplate,
            "timeCellTemplate": timeCellTemplate,
            "isTimeCellTemplate": isTimeCellTemplate
          }, key);
        })
      }, rowIndex.toString());
    }), 0);
  }
}
exports.TimelineDateHeaderLayout = TimelineDateHeaderLayout;
TimelineDateHeaderLayout.defaultProps = _date_header.DateHeaderDefaultProps;
