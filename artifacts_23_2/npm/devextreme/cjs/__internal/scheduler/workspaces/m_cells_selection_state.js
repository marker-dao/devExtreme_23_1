/**
* DevExtreme (cjs/__internal/scheduler/workspaces/m_cells_selection_state.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../../renovation/ui/scheduler/workspaces/base/utils");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
let CellsSelectionState = /*#__PURE__*/function () {
  function CellsSelectionState(_viewDataProvider) {
    this._viewDataProvider = _viewDataProvider;
    this._focusedCell = null;
    this._selectedCells = null;
    this._firstSelectedCell = null;
    this._prevFocusedCell = null;
    this._prevSelectedCells = null;
  }
  var _proto = CellsSelectionState.prototype;
  _proto.setFocusedCell = function setFocusedCell(rowIndex, columnIndex, isAllDay) {
    if (rowIndex >= 0) {
      const cell = this._viewDataProvider.getCellData(rowIndex, columnIndex, isAllDay);
      this._focusedCell = cell;
    }
  };
  _proto.setSelectedCells = function setSelectedCells(lastCellCoordinates) {
    let firstCellCoordinates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    const viewDataProvider = this._viewDataProvider;
    const {
      rowIndex: lastRowIndex,
      columnIndex: lastColumnIndex,
      allDay: isLastCellAllDay
    } = lastCellCoordinates;
    if (lastRowIndex < 0) {
      return;
    }
    const firstCell = firstCellCoordinates ? viewDataProvider.getCellData(firstCellCoordinates.rowIndex, firstCellCoordinates.columnIndex, firstCellCoordinates.allDay) : this._firstSelectedCell;
    const lastCell = viewDataProvider.getCellData(lastRowIndex, lastColumnIndex, isLastCellAllDay);
    this._firstSelectedCell = firstCell;
    this._selectedCells = (0, _utils.getSelectedCells)(this._viewDataProvider, firstCell, lastCell, isLastCellAllDay);
  };
  _proto.setSelectedCellsByData = function setSelectedCellsByData(selectedCellsData) {
    this._selectedCells = selectedCellsData;
  };
  _proto.getSelectedCells = function getSelectedCells() {
    return this._selectedCells;
  };
  _proto.releaseSelectedAndFocusedCells = function releaseSelectedAndFocusedCells() {
    this.releaseSelectedCells();
    this.releaseFocusedCell();
  };
  _proto.releaseSelectedCells = function releaseSelectedCells() {
    this._prevSelectedCells = this._selectedCells;
    this._prevFirstSelectedCell = this._firstSelectedCell;
    this._selectedCells = null;
    this._firstSelectedCell = null;
  };
  _proto.releaseFocusedCell = function releaseFocusedCell() {
    this._prevFocusedCell = this._focusedCell;
    this._focusedCell = null;
  };
  _proto.restoreSelectedAndFocusedCells = function restoreSelectedAndFocusedCells() {
    this._selectedCells = this._selectedCells || this._prevSelectedCells;
    this._focusedCell = this._focusedCell || this._prevFocusedCell;
    this._firstSelectedCell = this._firstSelectedCell || this._prevFirstSelectedCell;
    this._prevSelectedCells = null;
    this._prevFirstSelectedCell = null;
    this._prevFocusedCell = null;
  };
  _proto.clearSelectedAndFocusedCells = function clearSelectedAndFocusedCells() {
    this._prevSelectedCells = null;
    this._selectedCells = null;
    this._prevFocusedCell = null;
    this._focusedCell = null;
  };
  _createClass(CellsSelectionState, [{
    key: "viewDataProvider",
    get: function () {
      return this._viewDataProvider;
    }
  }, {
    key: "focusedCell",
    get: function () {
      const focusedCell = this._focusedCell;
      if (!focusedCell) {
        return undefined;
      }
      const {
        groupIndex,
        startDate,
        allDay
      } = focusedCell;
      const cellInfo = {
        groupIndex,
        startDate,
        isAllDay: allDay,
        index: focusedCell.index
      };
      const cellPosition = this.viewDataProvider.findCellPositionInMap(cellInfo);
      return {
        coordinates: cellPosition,
        cellData: focusedCell
      };
    }
  }]);
  return CellsSelectionState;
}();
exports.default = CellsSelectionState;