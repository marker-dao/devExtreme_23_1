/**
* DevExtreme (renovation/ui/scheduler/workspaces/base/utils.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.isCellAllDay = exports.getTotalRowCount = exports.getTotalCellCount = exports.getSelectedCells = exports.getRowCountWithAllDayRow = exports.getHiddenInterval = exports.getDateTableWidth = exports.getDateForHeaderText = exports.getCellIndices = exports.createVirtualScrollingOptions = exports.createCellElementMetaData = exports.compareCellsByDateAndIndex = exports.DATE_TABLE_MIN_CELL_WIDTH = void 0;
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
var _m_utils = require("../../../../../__internal/scheduler/resources/m_utils");
var _utils = require("../utils");
var _const = require("../const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DAY_MS = _date.default.dateToMilliseconds('day');
const HOUR_MS = _date.default.dateToMilliseconds('hour');
const DATE_TABLE_MIN_CELL_WIDTH = 75;
exports.DATE_TABLE_MIN_CELL_WIDTH = DATE_TABLE_MIN_CELL_WIDTH;
const getTotalRowCount = (rowCount, groupOrientation, groups, isAllDayPanelVisible) => {
  const isVerticalGrouping = (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation);
  const groupCount = (0, _m_utils.getGroupCount)(groups);
  const totalRowCount = isVerticalGrouping ? rowCount * groupCount : rowCount;
  return isAllDayPanelVisible ? totalRowCount + groupCount : totalRowCount;
};
exports.getTotalRowCount = getTotalRowCount;
const getTotalCellCount = (cellCount, groupOrientation, groups) => {
  const isHorizontalGrouping = (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation);
  const groupCount = (0, _m_utils.getGroupCount)(groups);
  return isHorizontalGrouping ? cellCount * groupCount : cellCount;
};
exports.getTotalCellCount = getTotalCellCount;
const getRowCountWithAllDayRow = (rowCount, isAllDayPanelVisible) => isAllDayPanelVisible ? rowCount + 1 : rowCount;
exports.getRowCountWithAllDayRow = getRowCountWithAllDayRow;
const getHiddenInterval = (hoursInterval, cellCountInDay) => {
  const visibleInterval = hoursInterval * cellCountInDay * HOUR_MS;
  return DAY_MS - visibleInterval;
};
exports.getHiddenInterval = getHiddenInterval;
const createCellElementMetaData = (tableRect, cellRect) => {
  const {
    bottom,
    height,
    left,
    right,
    top,
    width,
    x,
    y
  } = cellRect;
  return {
    right,
    bottom,
    left: left - tableRect.left,
    top: top - tableRect.top,
    width,
    height,
    x,
    y
  };
};
exports.createCellElementMetaData = createCellElementMetaData;
const getDateForHeaderText = (_, date) => date;
exports.getDateForHeaderText = getDateForHeaderText;
const getDateTableWidth = (scrollableWidth, dateTable, viewDataProvider, workSpaceConfig) => {
  const dateTableCell = dateTable.querySelector('td:not(.dx-scheduler-virtual-cell)');
  let cellWidth = dateTableCell.getBoundingClientRect().width;
  if (cellWidth < DATE_TABLE_MIN_CELL_WIDTH) {
    cellWidth = DATE_TABLE_MIN_CELL_WIDTH;
  }
  const cellCount = viewDataProvider.getCellCount(workSpaceConfig);
  const totalCellCount = getTotalCellCount(cellCount, workSpaceConfig.groupOrientation, workSpaceConfig.groups);
  const minTablesWidth = totalCellCount * cellWidth;
  return scrollableWidth < minTablesWidth ? minTablesWidth : scrollableWidth;
};
exports.getDateTableWidth = getDateTableWidth;
const createVirtualScrollingOptions = options => ({
  getCellHeight: () => options.cellHeight,
  getCellWidth: () => options.cellWidth,
  getCellMinWidth: () => DATE_TABLE_MIN_CELL_WIDTH,
  isRTL: () => options.rtlEnabled,
  getSchedulerHeight: () => options.schedulerHeight,
  getSchedulerWidth: () => options.schedulerWidth,
  getViewHeight: () => options.viewHeight,
  getViewWidth: () => options.viewWidth,
  getScrolling: () => options.scrolling,
  getScrollableOuterWidth: () => options.scrollableWidth,
  getGroupCount: () => (0, _m_utils.getGroupCount)(options.groups),
  isVerticalGrouping: () => options.isVerticalGrouping,
  getTotalRowCount: () => options.completeRowCount,
  getTotalCellCount: () => options.completeColumnCount,
  getWindowHeight: () => options.windowHeight,
  getWindowWidth: () => options.windowWidth
});
exports.createVirtualScrollingOptions = createVirtualScrollingOptions;
const getCellIndices = cell => {
  const row = cell.closest(".".concat(_const.DATE_TABLE_ROW_CLASS, ", .").concat(_const.ALL_DAY_ROW_CLASS));
  const rowParent = row.parentNode;
  const cellParent = cell.parentNode;
  const columnIndex = [...Array.from(cellParent.children)].filter(child => child.className.includes(_const.DATE_TABLE_CELL_CLASS) || child.className.includes(_const.ALL_DAY_PANEL_CELL_CLASS)).indexOf(cell);
  const rowIndex = [...Array.from(rowParent.children)].filter(child => child.className.includes(_const.DATE_TABLE_ROW_CLASS)).indexOf(row);
  return {
    columnIndex,
    rowIndex
  };
};
exports.getCellIndices = getCellIndices;
const compareCellsByDateAndIndex = daysAndIndexes => {
  const {
    date,
    firstDate,
    firstIndex,
    index,
    lastDate,
    lastIndex
  } = daysAndIndexes;
  if (firstDate === lastDate) {
    let validFirstIndex = firstIndex;
    let validLastIndex = lastIndex;
    if (validFirstIndex > validLastIndex) {
      [validFirstIndex, validLastIndex] = [validLastIndex, validFirstIndex];
    }
    return firstDate === date && index >= validFirstIndex && index <= validLastIndex;
  }
  return date === firstDate && index >= firstIndex || date === lastDate && index <= lastIndex || firstDate < date && date < lastDate;
};
exports.compareCellsByDateAndIndex = compareCellsByDateAndIndex;
const filterCellsByDateAndIndex = (cellsRow, filterData) => {
  const {
    firstDate,
    firstIndex,
    lastDate,
    lastIndex
  } = filterData;
  const firstDay = _date.default.trimTime(firstDate).getTime();
  const lastDay = _date.default.trimTime(lastDate).getTime();
  return cellsRow.filter(cell => {
    const {
      index,
      startDate
    } = cell;
    const day = _date.default.trimTime(startDate).getTime();
    const daysAndIndexes = {
      date: day,
      index,
      firstDate: firstDay,
      firstIndex,
      lastDate: lastDay,
      lastIndex
    };
    return compareCellsByDateAndIndex(daysAndIndexes);
  });
};
const getSelectedCells = (viewDataProvider, firstSelectedCell, lastSelectedCell, isLastSelectedCellAllDay) => {
  let firstCell = firstSelectedCell;
  let lastCell = lastSelectedCell;
  if (firstCell.startDate.getTime() > lastCell.startDate.getTime()) {
    [firstCell, lastCell] = [lastCell, firstCell];
  }
  const {
    groupIndex: firstGroupIndex,
    index: firstCellIndex,
    startDate: firstStartDate
  } = firstCell;
  const {
    index: lastCellIndex,
    startDate: lastStartDate
  } = lastCell;
  const cells = viewDataProvider.getCellsByGroupIndexAndAllDay(firstGroupIndex !== null && firstGroupIndex !== void 0 ? firstGroupIndex : 0, isLastSelectedCellAllDay);
  const filteredCells = cells.reduce((selectedCells, cellsRow) => {
    const filterData = {
      firstDate: firstStartDate,
      lastDate: lastStartDate,
      firstIndex: firstCellIndex,
      lastIndex: lastCellIndex
    };
    const filteredRow = filterCellsByDateAndIndex(cellsRow, filterData);
    selectedCells.push(...filteredRow);
    return selectedCells;
  }, []);
  const selectedCells = filteredCells.sort((firstArg, secondArg) => firstArg.startDate.getTime() - secondArg.startDate.getTime());
  return selectedCells;
};
exports.getSelectedCells = getSelectedCells;
const isCellAllDay = cell => cell.className.includes(_const.ALL_DAY_PANEL_CELL_CLASS);
exports.isCellAllDay = isCellAllDay;
