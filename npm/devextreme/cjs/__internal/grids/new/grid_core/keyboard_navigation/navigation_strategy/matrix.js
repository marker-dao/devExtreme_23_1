/**
* DevExtreme (cjs/__internal/grids/new/grid_core/keyboard_navigation/navigation_strategy/matrix.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationStrategyMatrix = void 0;
var _base = require("./base");
class NavigationStrategyMatrix extends _base.NavigationStrategyBase {
  constructor(columnsCount) {
    super();
    this.columnsCount = columnsCount;
  }
  updateColumnsCount(columnsCount) {
    this.columnsCount = columnsCount;
  }
  onKeyDown(event) {
    return this.activeIdx >= 0 ? this.handleMovement(event) : false;
  }
  handleMovement(event) {
    switch (true) {
      case event.key === 'ArrowUp':
        this.moveActiveElement(-1, 0);
        return true;
      case event.key === 'ArrowDown':
        this.moveActiveElement(1, 0);
        return true;
      case event.key === 'ArrowLeft':
        this.moveActiveElement(0, -1);
        return true;
      case event.key === 'ArrowRight':
        this.moveActiveElement(0, 1);
        return true;
      case event.ctrlKey && event.key === 'Home':
        this.moveToFirstInFirstRow();
        return true;
      case event.key === 'Home':
        this.moveToFirstInRow();
        return true;
      case event.ctrlKey && event.key === 'End':
        this.moveToLastInLastRow();
        return true;
      case event.key === 'End':
        this.moveToLastInRow();
        return true;
      default:
        return false;
    }
  }
  moveActiveElement(rowShift, columnShift) {
    const currentIdx = this.activeIdx;
    const {
      columnsCount,
      items: {
        length: itemsCount
      }
    } = this;
    const rowCount = Math.ceil(itemsCount / columnsCount);
    const currentColumnIdx = currentIdx % columnsCount;
    const currentRowIdx = Math.floor(currentIdx / columnsCount);
    const nextColumnIdx = currentColumnIdx + columnShift;
    const nextRowIdx = currentRowIdx + rowShift;
    const nextIdx = currentIdx + columnShift + columnsCount * rowShift;
    if (nextIdx >= itemsCount || nextColumnIdx < 0 || nextColumnIdx >= columnsCount || nextRowIdx < 0 || nextRowIdx >= rowCount) {
      this.focusActiveItem();
      return;
    }
    this.setActiveItem(nextIdx, true);
  }
  moveToFirstInRow() {
    const currentIdx = this.activeIdx;
    const {
      columnsCount
    } = this;
    const currentColumnIdx = currentIdx % columnsCount;
    if (currentColumnIdx === 0) {
      return;
    }
    this.moveActiveElement(0, -currentColumnIdx);
  }
  moveToLastInRow() {
    const currentIdx = this.activeIdx;
    const {
      columnsCount
    } = this;
    const currentColumnIdx = currentIdx % columnsCount;
    if (currentColumnIdx === columnsCount - 1) {
      return;
    }
    this.moveActiveElement(0, columnsCount - currentColumnIdx - 1);
  }
  moveToFirstInFirstRow() {
    this.setActiveItem(0, true);
  }
  moveToLastInLastRow() {
    const {
      items: {
        length: itemsCount
      }
    } = this;
    this.setActiveItem(itemsCount - 1, true);
  }
}
exports.NavigationStrategyMatrix = NavigationStrategyMatrix;
