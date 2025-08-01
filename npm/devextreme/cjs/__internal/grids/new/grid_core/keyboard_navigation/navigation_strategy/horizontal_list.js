/**
* DevExtreme (cjs/__internal/grids/new/grid_core/keyboard_navigation/navigation_strategy/horizontal_list.js)
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
exports.NavigationStrategyHorizontalList = void 0;
var _base = require("./base");
class NavigationStrategyHorizontalList extends _base.NavigationStrategyBase {
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        this.moveActiveElement(-1);
        return true;
      case 'ArrowRight':
        this.moveActiveElement(1);
        return true;
      default:
        return false;
    }
  }
  moveActiveElement(idxShift) {
    const currentIdx = this.activeIdx;
    if (currentIdx < 0) {
      this.focusActiveItem();
      return;
    }
    const nextIdx = currentIdx + idxShift;
    this.setActiveItem(nextIdx, true);
  }
}
exports.NavigationStrategyHorizontalList = NavigationStrategyHorizontalList;
