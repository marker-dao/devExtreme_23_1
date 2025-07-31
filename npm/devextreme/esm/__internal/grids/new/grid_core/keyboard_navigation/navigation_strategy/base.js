/**
* DevExtreme (esm/__internal/grids/new/grid_core/keyboard_navigation/navigation_strategy/base.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export class NavigationStrategyBase {
  constructor() {
    this.items = [];
    this.activeIdx = 0;
  }
  setItem(idx, item) {
    this.items[idx] = item;
  }
  clear() {
    this.items = [];
  }
  normalizeActiveIdx() {
    if (!this.items[this.activeIdx]) {
      this.activeIdx = 0;
    }
  }
  focusActiveItem() {
    const activeItem = this.items[this.activeIdx];
    activeItem === null || activeItem === void 0 || activeItem.focus();
  }
  getActiveItem() {
    const activeItem = this.items[this.activeIdx];
    const element = activeItem === null || activeItem === void 0 ? void 0 : activeItem.getElement();
    if (!activeItem || !element) {
      return null;
    }
    return {
      idx: this.activeIdx,
      element
    };
  }
  setActiveItem(idx, focus) {
    if (!this.items[idx]) {
      return;
    }
    this.activeIdx = idx;
    if (focus) {
      this.focusActiveItem();
    }
  }
  getNewActiveItem(action) {
    const prevActiveItem = this.getActiveItem();
    const result = action();
    const nextActiveItem = this.getActiveItem();
    return !!nextActiveItem && (prevActiveItem === null || prevActiveItem === void 0 ? void 0 : prevActiveItem.element) !== (nextActiveItem === null || nextActiveItem === void 0 ? void 0 : nextActiveItem.element) ? [result, nextActiveItem] : [result, null];
  }
}
