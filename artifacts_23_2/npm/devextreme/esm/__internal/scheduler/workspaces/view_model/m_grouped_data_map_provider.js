/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_grouped_data_map_provider.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from '../../../../core/utils/date';
import { isDateAndTimeView } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { dateUtilsTs } from '../../../core/utils/date';
export class GroupedDataMapProvider {
  constructor(viewDataGenerator, viewDataMap, completeViewDataMap, viewOptions) {
    this.groupedDataMap = viewDataGenerator.generateGroupedDataMap(viewDataMap);
    this.completeViewDataMap = completeViewDataMap;
    this._viewOptions = viewOptions;
  }
  getGroupStartDate(groupIndex) {
    var _a, _b, _c;
    var firstRow = this.getFirstGroupRow(groupIndex);
    return (_c = (_b = (_a = firstRow === null || firstRow === void 0 ? void 0 : firstRow[0]) === null || _a === void 0 ? void 0 : _a.cellData) === null || _b === void 0 ? void 0 : _b.startDate) !== null && _c !== void 0 ? _c : null;
  }
  getGroupEndDate(groupIndex) {
    var lastRow = this.getLastGroupRow(groupIndex);
    if (lastRow) {
      var lastColumnIndex = lastRow.length - 1;
      var {
        cellData
      } = lastRow[lastColumnIndex];
      var {
        endDate
      } = cellData;
      return endDate;
    }
  }
  findGroupCellStartDate(groupIndex, startDate, endDate, isFindByDate) {
    var groupData = this.getGroupFromDateTableGroupMap(groupIndex);
    var checkCellStartDate = (rowIndex, columnIndex) => {
      var {
        cellData
      } = groupData[rowIndex][columnIndex];
      var {
        startDate: secondMin,
        endDate: secondMax
      } = cellData;
      if (isFindByDate) {
        secondMin = dateUtils.trimTime(secondMin);
        secondMax = dateUtils.setToDayEnd(secondMin);
      }
      if (dateUtils.intervalsOverlap({
        firstMin: startDate,
        firstMax: endDate,
        secondMin,
        secondMax
      })) {
        return secondMin;
      }
    };
    var searchVertical = () => {
      var cellCount = groupData[0].length;
      for (var columnIndex = 0; columnIndex < cellCount; ++columnIndex) {
        for (var rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
          var result = checkCellStartDate(rowIndex, columnIndex);
          if (result) return result;
        }
      }
    };
    var searchHorizontal = () => {
      for (var rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
        var row = groupData[rowIndex];
        for (var columnIndex = 0; columnIndex < row.length; ++columnIndex) {
          var result = checkCellStartDate(rowIndex, columnIndex);
          if (result) return result;
        }
      }
    };
    var startDateVerticalSearch = searchVertical();
    var startDateHorizontalSearch = searchHorizontal();
    return startDateVerticalSearch > startDateHorizontalSearch ? startDateHorizontalSearch : startDateVerticalSearch;
  }
  findAllDayGroupCellStartDate(groupIndex) {
    var _a, _b, _c;
    var groupedData = this.getGroupFromDateTableGroupMap(groupIndex);
    var cellData = (_b = (_a = groupedData === null || groupedData === void 0 ? void 0 : groupedData[0]) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.cellData;
    return (_c = cellData === null || cellData === void 0 ? void 0 : cellData.startDate) !== null && _c !== void 0 ? _c : null;
  }
  findCellPositionInMap(cellInfo, isAppointmentRender) {
    var {
      groupIndex,
      startDate,
      isAllDay,
      index
    } = cellInfo;
    var {
      allDayPanelGroupedMap,
      dateTableGroupedMap
    } = this.groupedDataMap;
    var {
      viewOffset
    } = this._viewOptions;
    var rows = isAllDay && !this._viewOptions.isVerticalGrouping ? allDayPanelGroupedMap[groupIndex] ? [allDayPanelGroupedMap[groupIndex]] : [] : dateTableGroupedMap[groupIndex] || [];
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
      var row = rows[rowIndex];
      for (var columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
        var cell = row[columnIndex];
        // NOTE: If this is appointment's render call
        // we should shift the real cellData dates by viewOffset
        // to find correct cell indexes.
        var cellData = isAppointmentRender ? _extends(_extends({}, cell.cellData), {
          startDate: dateUtilsTs.addOffsets(cell.cellData.startDate, [-viewOffset]),
          endDate: dateUtilsTs.addOffsets(cell.cellData.endDate, [-viewOffset])
        }) : cell.cellData;
        if (this._isSameGroupIndexAndIndex(cellData, groupIndex, index)) {
          if (this.isStartDateInCell(startDate, isAllDay, cellData)) {
            return cell.position;
          }
        }
      }
    }
    return undefined;
  }
  isStartDateInCell(startDate, inAllDayRow, _ref) {
    var {
      startDate: cellStartDate,
      endDate: cellEndDate,
      allDay: cellAllDay
    } = _ref;
    var {
      viewType
    } = this._viewOptions;
    switch (true) {
      case !isDateAndTimeView(viewType):
      case inAllDayRow && cellAllDay:
        return dateUtils.sameDate(startDate, cellStartDate);
      case !inAllDayRow:
        return startDate >= cellStartDate && startDate < cellEndDate;
      default:
        return false;
    }
  }
  _isSameGroupIndexAndIndex(cellData, groupIndex, index) {
    return cellData.groupIndex === groupIndex && (index === undefined || cellData.index === index);
  }
  getCellsGroup(groupIndex) {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    var groupData = dateTableGroupedMap[groupIndex];
    if (groupData) {
      var {
        cellData
      } = groupData[0][0];
      return cellData.groups;
    }
  }
  getCompletedGroupsInfo() {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return dateTableGroupedMap.map(groupData => {
      var firstCell = groupData[0][0];
      var {
        allDay,
        groupIndex
      } = firstCell.cellData;
      return {
        allDay,
        groupIndex,
        startDate: this.getGroupStartDate(groupIndex),
        endDate: this.getGroupEndDate(groupIndex)
      };
    }).filter(_ref2 => {
      var {
        startDate
      } = _ref2;
      return !!startDate;
    });
  }
  getGroupIndices() {
    return this.getCompletedGroupsInfo().map(_ref3 => {
      var {
        groupIndex
      } = _ref3;
      return groupIndex;
    });
  }
  getGroupFromDateTableGroupMap(groupIndex) {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return dateTableGroupedMap[groupIndex];
  }
  getFirstGroupRow(groupIndex) {
    var groupedData = this.getGroupFromDateTableGroupMap(groupIndex);
    if (groupedData) {
      var {
        cellData
      } = groupedData[0][0];
      return !cellData.allDay ? groupedData[0] : groupedData[1];
    }
  }
  getLastGroupRow(groupIndex) {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    var groupedData = dateTableGroupedMap[groupIndex];
    if (groupedData) {
      var lastRowIndex = groupedData.length - 1;
      return groupedData[lastRowIndex];
    }
  }
  getLastGroupCellPosition(groupIndex) {
    var groupRow = this.getLastGroupRow(groupIndex);
    // eslint-disable-next-line no-unsafe-optional-chaining
    return groupRow === null || groupRow === void 0 ? void 0 : groupRow[(groupRow === null || groupRow === void 0 ? void 0 : groupRow.length) - 1].position;
  }
  getRowCountInGroup(groupIndex) {
    var groupRow = this.getLastGroupRow(groupIndex);
    var cellAmount = groupRow.length;
    var lastCellData = groupRow[cellAmount - 1].cellData;
    var lastCellIndex = lastCellData.index;
    return (lastCellIndex + 1) / groupRow.length;
  }
}