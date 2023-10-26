/**
* DevExtreme (bundles/__internal/scheduler/workspaces/view_model/m_grouped_data_map_provider.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupedDataMapProvider = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let GroupedDataMapProvider = /*#__PURE__*/function () {
  function GroupedDataMapProvider(viewDataGenerator, viewDataMap, completeViewDataMap, viewOptions) {
    this.groupedDataMap = viewDataGenerator.generateGroupedDataMap(viewDataMap);
    this.completeViewDataMap = completeViewDataMap;
    this._viewOptions = viewOptions;
  }
  var _proto = GroupedDataMapProvider.prototype;
  _proto.getGroupStartDate = function getGroupStartDate(groupIndex) {
    const firstRow = this.getFirstGroupRow(groupIndex);
    if (firstRow) {
      const {
        startDate
      } = firstRow[0].cellData;
      return startDate;
    }
  };
  _proto.getGroupEndDate = function getGroupEndDate(groupIndex) {
    const lastRow = this.getLastGroupRow(groupIndex);
    if (lastRow) {
      const lastColumnIndex = lastRow.length - 1;
      const {
        cellData
      } = lastRow[lastColumnIndex];
      const {
        endDate
      } = cellData;
      return endDate;
    }
  };
  _proto.findGroupCellStartDate = function findGroupCellStartDate(groupIndex, startDate, endDate, isFindByDate) {
    const groupData = this.getGroupFromDateTableGroupMap(groupIndex);
    const checkCellStartDate = (rowIndex, columnIndex) => {
      const {
        cellData
      } = groupData[rowIndex][columnIndex];
      let {
        startDate: secondMin,
        endDate: secondMax
      } = cellData;
      if (isFindByDate) {
        secondMin = _date.default.trimTime(secondMin);
        secondMax = _date.default.setToDayEnd(secondMin);
      }
      if (_date.default.intervalsOverlap({
        firstMin: startDate,
        firstMax: endDate,
        secondMin,
        secondMax
      })) {
        return secondMin;
      }
    };
    const searchVertical = () => {
      const cellCount = groupData[0].length;
      for (let columnIndex = 0; columnIndex < cellCount; ++columnIndex) {
        for (let rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
          const result = checkCellStartDate(rowIndex, columnIndex);
          if (result) return result;
        }
      }
    };
    const searchHorizontal = () => {
      for (let rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
        const row = groupData[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
          const result = checkCellStartDate(rowIndex, columnIndex);
          if (result) return result;
        }
      }
    };
    const startDateVerticalSearch = searchVertical();
    const startDateHorizontalSearch = searchHorizontal();
    return startDateVerticalSearch > startDateHorizontalSearch ? startDateHorizontalSearch : startDateVerticalSearch;
  };
  _proto.findAllDayGroupCellStartDate = function findAllDayGroupCellStartDate(groupIndex, startDate) {
    const groupStartDate = this.getGroupStartDate(groupIndex);
    return groupStartDate > startDate ? groupStartDate : startDate;
  };
  _proto.findCellPositionInMap = function findCellPositionInMap(cellInfo) {
    const {
      groupIndex,
      startDate,
      isAllDay,
      index
    } = cellInfo;
    const startTime = isAllDay ? _date.default.trimTime(startDate).getTime() : startDate.getTime();
    const isStartDateInCell = cellData => {
      if (!(0, _base.isDateAndTimeView)(this._viewOptions.viewType)) {
        return _date.default.sameDate(startDate, cellData.startDate);
      }
      const cellStartTime = cellData.startDate.getTime();
      const cellEndTime = cellData.endDate.getTime();
      return isAllDay ? cellData.allDay && startTime >= cellStartTime && startTime <= cellEndTime : startTime >= cellStartTime && startTime < cellEndTime;
    };
    const {
      allDayPanelGroupedMap,
      dateTableGroupedMap
    } = this.groupedDataMap;
    const rows = isAllDay && !this._viewOptions.isVerticalGrouping ? allDayPanelGroupedMap[groupIndex] ? [allDayPanelGroupedMap[groupIndex]] : [] : dateTableGroupedMap[groupIndex] || [];
    for (let rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
      const row = rows[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
        const cell = row[columnIndex];
        const {
          cellData
        } = cell;
        if (this._isSameGroupIndexAndIndex(cellData, groupIndex, index)) {
          if (isStartDateInCell(cellData)) {
            return cell.position;
          }
        }
      }
    }
    return undefined;
  };
  _proto._isSameGroupIndexAndIndex = function _isSameGroupIndexAndIndex(cellData, groupIndex, index) {
    return cellData.groupIndex === groupIndex && (index === undefined || cellData.index === index);
  };
  _proto.getCellsGroup = function getCellsGroup(groupIndex) {
    const {
      dateTableGroupedMap
    } = this.groupedDataMap;
    const groupData = dateTableGroupedMap[groupIndex];
    if (groupData) {
      const {
        cellData
      } = groupData[0][0];
      return cellData.groups;
    }
  };
  _proto.getCompletedGroupsInfo = function getCompletedGroupsInfo() {
    const {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return dateTableGroupedMap.map(groupData => {
      const firstCell = groupData[0][0];
      const {
        allDay,
        groupIndex
      } = firstCell.cellData;
      return {
        allDay,
        groupIndex,
        startDate: this.getGroupStartDate(groupIndex),
        endDate: this.getGroupEndDate(groupIndex)
      };
    }).filter(_ref => {
      let {
        startDate
      } = _ref;
      return !!startDate;
    });
  };
  _proto.getGroupIndices = function getGroupIndices() {
    return this.getCompletedGroupsInfo().map(_ref2 => {
      let {
        groupIndex
      } = _ref2;
      return groupIndex;
    });
  };
  _proto.getGroupFromDateTableGroupMap = function getGroupFromDateTableGroupMap(groupIndex) {
    const {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return dateTableGroupedMap[groupIndex];
  };
  _proto.getFirstGroupRow = function getFirstGroupRow(groupIndex) {
    const groupedData = this.getGroupFromDateTableGroupMap(groupIndex);
    if (groupedData) {
      const {
        cellData
      } = groupedData[0][0];
      return !cellData.allDay ? groupedData[0] : groupedData[1];
    }
  };
  _proto.getLastGroupRow = function getLastGroupRow(groupIndex) {
    const {
      dateTableGroupedMap
    } = this.groupedDataMap;
    const groupedData = dateTableGroupedMap[groupIndex];
    if (groupedData) {
      const lastRowIndex = groupedData.length - 1;
      return groupedData[lastRowIndex];
    }
  };
  _proto.getLastGroupCellPosition = function getLastGroupCellPosition(groupIndex) {
    const groupRow = this.getLastGroupRow(groupIndex);
    // eslint-disable-next-line no-unsafe-optional-chaining
    return groupRow === null || groupRow === void 0 ? void 0 : groupRow[(groupRow === null || groupRow === void 0 ? void 0 : groupRow.length) - 1].position;
  };
  _proto.getRowCountInGroup = function getRowCountInGroup(groupIndex) {
    const groupRow = this.getLastGroupRow(groupIndex);
    const cellAmount = groupRow.length;
    const lastCellData = groupRow[cellAmount - 1].cellData;
    const lastCellIndex = lastCellData.index;
    return (lastCellIndex + 1) / groupRow.length;
  };
  return GroupedDataMapProvider;
}();
exports.GroupedDataMapProvider = GroupedDataMapProvider;
