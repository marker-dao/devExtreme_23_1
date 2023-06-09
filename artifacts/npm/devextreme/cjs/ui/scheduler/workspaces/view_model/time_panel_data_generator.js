/**
* DevExtreme (cjs/ui/scheduler/workspaces/view_model/time_panel_data_generator.js)
* Version: 23.2.0
* Build date: Thu Jun 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.TimePanelDataGenerator = void 0;
var _utils = require("../../../../renovation/ui/scheduler/workspaces/utils");
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _week = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week");
var _excluded = ["allDay", "startDate", "endDate", "groups", "groupIndex", "isFirstGroupCell", "isLastGroupCell", "index"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var TimePanelDataGenerator = /*#__PURE__*/function () {
  function TimePanelDataGenerator(viewDataGenerator) {
    this._viewDataGenerator = viewDataGenerator;
  }
  var _proto = TimePanelDataGenerator.prototype;
  _proto.getCompleteTimePanelMap = function getCompleteTimePanelMap(options, completeViewDataMap) {
    var startViewDate = options.startViewDate,
      cellDuration = options.cellDuration,
      startDayHour = options.startDayHour,
      isVerticalGrouping = options.isVerticalGrouping,
      intervalCount = options.intervalCount,
      currentDate = options.currentDate,
      viewType = options.viewType,
      hoursInterval = options.hoursInterval,
      endDayHour = options.endDayHour;
    var rowCountInGroup = this._viewDataGenerator.getRowCount({
      intervalCount: intervalCount,
      currentDate: currentDate,
      viewType: viewType,
      hoursInterval: hoursInterval,
      startDayHour: startDayHour,
      endDayHour: endDayHour
    });
    var cellCountInGroupRow = this._viewDataGenerator.getCellCount({
      intervalCount: intervalCount,
      currentDate: currentDate,
      viewType: viewType,
      hoursInterval: hoursInterval,
      startDayHour: startDayHour,
      endDayHour: endDayHour
    });
    var allDayRowsCount = 0;
    return completeViewDataMap.map(function (row, index) {
      var _row$ = row[0],
        allDay = _row$.allDay,
        startDate = _row$.startDate,
        endDate = _row$.endDate,
        groups = _row$.groups,
        groupIndex = _row$.groupIndex,
        isFirstGroupCell = _row$.isFirstGroupCell,
        isLastGroupCell = _row$.isLastGroupCell,
        cellIndex = _row$.index,
        restCellProps = _objectWithoutProperties(_row$, _excluded);
      if (allDay) {
        allDayRowsCount += 1;
      }
      var timeIndex = (index - allDayRowsCount) % rowCountInGroup;
      return _extends({}, restCellProps, {
        startDate: startDate,
        allDay: allDay,
        text: (0, _week.getTimePanelCellText)(timeIndex, startDate, startViewDate, cellDuration, startDayHour),
        groups: isVerticalGrouping ? groups : undefined,
        groupIndex: isVerticalGrouping ? groupIndex : undefined,
        isFirstGroupCell: isVerticalGrouping && isFirstGroupCell,
        isLastGroupCell: isVerticalGrouping && isLastGroupCell,
        index: Math.floor(cellIndex / cellCountInGroupRow)
      });
    });
  };
  _proto.generateTimePanelData = function generateTimePanelData(completeTimePanelMap, options) {
    var startRowIndex = options.startRowIndex,
      rowCount = options.rowCount,
      topVirtualRowHeight = options.topVirtualRowHeight,
      bottomVirtualRowHeight = options.bottomVirtualRowHeight,
      isGroupedAllDayPanel = options.isGroupedAllDayPanel,
      isVerticalGrouping = options.isVerticalGrouping,
      isAllDayPanelVisible = options.isAllDayPanelVisible;
    var indexDifference = isVerticalGrouping || !isAllDayPanelVisible ? 0 : 1;
    var correctedStartRowIndex = startRowIndex + indexDifference;
    var displayedRowCount = (0, _base.getDisplayedRowCount)(rowCount, completeTimePanelMap);
    var timePanelMap = completeTimePanelMap.slice(correctedStartRowIndex, correctedStartRowIndex + displayedRowCount);
    var timePanelData = {
      topVirtualRowHeight: topVirtualRowHeight,
      bottomVirtualRowHeight: bottomVirtualRowHeight,
      isGroupedAllDayPanel: isGroupedAllDayPanel
    };
    var _this$_generateTimePa = this._generateTimePanelDataFromMap(timePanelMap, isVerticalGrouping),
      groupedData = _this$_generateTimePa.previousGroupedData;
    timePanelData.groupedData = groupedData;
    return timePanelData;
  };
  _proto._generateTimePanelDataFromMap = function _generateTimePanelDataFromMap(timePanelMap, isVerticalGrouping) {
    return timePanelMap.reduce(function (_ref, cellData) {
      var previousGroupIndex = _ref.previousGroupIndex,
        previousGroupedData = _ref.previousGroupedData;
      var currentGroupIndex = cellData.groupIndex;
      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel: (0, _utils.getIsGroupedAllDayPanel)(!!cellData.allDay, isVerticalGrouping),
          groupIndex: currentGroupIndex,
          key: (0, _utils.getKeyByGroup)(currentGroupIndex, isVerticalGrouping)
        });
      }
      if (cellData.allDay) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellData;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellData);
      }
      return {
        previousGroupIndex: currentGroupIndex,
        previousGroupedData: previousGroupedData
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });
  };
  return TimePanelDataGenerator;
}();
exports.TimePanelDataGenerator = TimePanelDataGenerator;
