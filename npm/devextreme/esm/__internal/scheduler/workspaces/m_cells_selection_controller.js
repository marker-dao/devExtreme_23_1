/**
* DevExtreme (esm/__internal/scheduler/workspaces/m_cells_selection_controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isDateAndTimeView } from '../../scheduler/r1/utils/index';
export class CellsSelectionController {
  handleArrowClick(options) {
    const {
      key,
      focusedCellPosition,
      edgeIndices,
      getCellDataByPosition,
      isAllDayPanelCell
    } = options;
    let nextCellIndices;
    switch (key) {
      case 'down':
        nextCellIndices = this.getCellFromNextRowPosition(focusedCellPosition, 'next', edgeIndices);
        break;
      case 'up':
        nextCellIndices = this.getCellFromNextRowPosition(focusedCellPosition, 'prev', edgeIndices);
        break;
      case 'left':
        nextCellIndices = this.getCellFromNextColumnPosition(_extends({}, options, {
          direction: 'prev'
        }));
        break;
      case 'right':
        nextCellIndices = this.getCellFromNextColumnPosition(_extends({}, options, {
          direction: 'next'
        }));
        break;
      default:
        break;
    }
    const currentCellData = getCellDataByPosition(nextCellIndices.rowIndex, nextCellIndices.columnIndex, isAllDayPanelCell);
    return this.moveToCell(_extends({}, options, {
      currentCellData
    }));
  }
  getCellFromNextRowPosition(focusedCellPosition, direction, edgeIndices) {
    const {
      columnIndex,
      rowIndex
    } = focusedCellPosition;
    const deltaPosition = direction === 'next' ? 1 : -1;
    const nextRowIndex = rowIndex + deltaPosition;
    const validRowIndex = nextRowIndex >= 0 && nextRowIndex <= edgeIndices.lastRowIndex ? nextRowIndex : rowIndex;
    return {
      columnIndex,
      rowIndex: validRowIndex
    };
  }
  getCellFromNextColumnPosition(options) {
    const {
      focusedCellPosition,
      direction,
      edgeIndices,
      isRTL,
      isGroupedByDate,
      groupCount,
      isMultiSelection,
      viewType
    } = options;
    const {
      columnIndex,
      rowIndex
    } = focusedCellPosition;
    const {
      firstColumnIndex,
      lastColumnIndex,
      firstRowIndex,
      lastRowIndex
    } = edgeIndices;
    const step = isGroupedByDate && isMultiSelection ? groupCount : 1;
    const sign = isRTL ? -1 : 1;
    const deltaColumnIndex = direction === 'next' ? sign * step : -1 * sign * step;
    const nextColumnIndex = columnIndex + deltaColumnIndex;
    const isValidColumnIndex = nextColumnIndex >= firstColumnIndex && nextColumnIndex <= lastColumnIndex;
    if (isValidColumnIndex) {
      return {
        columnIndex: nextColumnIndex,
        rowIndex
      };
    }
    return isDateAndTimeView(viewType) ? focusedCellPosition : this._processEdgeCell({
      nextColumnIndex,
      rowIndex,
      columnIndex,
      firstColumnIndex,
      lastColumnIndex,
      firstRowIndex,
      lastRowIndex,
      step
    });
  }
  _processEdgeCell(options) {
    const {
      nextColumnIndex,
      rowIndex,
      columnIndex,
      firstColumnIndex,
      lastColumnIndex,
      firstRowIndex,
      lastRowIndex,
      step
    } = options;
    let validColumnIndex = nextColumnIndex;
    let validRowIndex = rowIndex;
    const isLeftEdgeCell = nextColumnIndex < firstColumnIndex;
    const isRightEdgeCell = nextColumnIndex > lastColumnIndex;
    if (isLeftEdgeCell) {
      const columnIndexInNextRow = lastColumnIndex - (step - columnIndex % step - 1);
      const nextRowIndex = rowIndex - 1;
      const isValidRowIndex = nextRowIndex >= firstRowIndex;
      validRowIndex = isValidRowIndex ? nextRowIndex : rowIndex;
      validColumnIndex = isValidRowIndex ? columnIndexInNextRow : columnIndex;
    }
    if (isRightEdgeCell) {
      const columnIndexInNextRow = firstColumnIndex + columnIndex % step;
      const nextRowIndex = rowIndex + 1;
      const isValidRowIndex = nextRowIndex <= lastRowIndex;
      validRowIndex = isValidRowIndex ? nextRowIndex : rowIndex;
      validColumnIndex = isValidRowIndex ? columnIndexInNextRow : columnIndex;
    }
    return {
      columnIndex: validColumnIndex,
      rowIndex: validRowIndex
    };
  }
  moveToCell(options) {
    const {
      isMultiSelection,
      isMultiSelectionAllowed,
      focusedCellData,
      currentCellData
    } = options;
    const isValidMultiSelection = isMultiSelection && isMultiSelectionAllowed;
    const nextFocusedCellData = isValidMultiSelection ? this._getNextCellData(currentCellData, focusedCellData) : currentCellData;
    return nextFocusedCellData;
  }
  _getNextCellData(nextFocusedCellData, focusedCellData, isVirtualCell) {
    if (isVirtualCell) {
      return focusedCellData;
    }
    const isValidNextFocusedCell = this._isValidNextFocusedCell(nextFocusedCellData, focusedCellData);
    return isValidNextFocusedCell ? nextFocusedCellData : focusedCellData;
  }
  _isValidNextFocusedCell(nextFocusedCellData, focusedCellData) {
    if (!focusedCellData) {
      return true;
    }
    const {
      groupIndex,
      allDay
    } = focusedCellData;
    const {
      groupIndex: nextGroupIndex,
      allDay: nextAllDay
    } = nextFocusedCellData;
    return groupIndex === nextGroupIndex && allDay === nextAllDay;
  }
}
