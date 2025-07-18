/**
* DevExtreme (cjs/__internal/ui/toolbar/strategy/toolbar.multiline.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiLineStrategy = void 0;
var _size = require("../../../../core/utils/size");
const TOOLBAR_LABEL_CLASS = 'dx-toolbar-label';
class MultiLineStrategy {
  constructor(toolbar) {
    this._toolbar = toolbar;
  }
  _initMarkup() {}
  _updateMenuVisibility() {}
  _renderMenuItems() {}
  _renderItem() {}
  // @ts-expect-error ts-error
  _getMenuItems() {}
  _getToolbarItems() {
    const {
      items = []
    } = this._toolbar.option();
    return items;
  }
  _getItemsWidth() {
    return this._toolbar._getSummaryItemsSize('width', this._toolbar._itemElements(), true);
  }
  _arrangeItems() {
    const $label = this._toolbar._$toolbarItemsContainer.find(`.${TOOLBAR_LABEL_CLASS}`).eq(0);
    if (!$label.length) {
      return;
    }
    const elementWidth = (0, _size.getWidth)(this._toolbar.$element());
    const labelPaddings = (0, _size.getOuterWidth)($label) - (0, _size.getWidth)($label);
    $label.css('maxWidth', elementWidth - labelPaddings);
  }
  _hideOverflowItems() {}
  _dimensionChanged() {}
  _itemOptionChanged() {}
  _optionChanged() {}
}
exports.MultiLineStrategy = MultiLineStrategy;
