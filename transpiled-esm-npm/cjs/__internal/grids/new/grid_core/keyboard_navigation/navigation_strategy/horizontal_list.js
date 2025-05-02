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