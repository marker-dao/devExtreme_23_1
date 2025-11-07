/**
* DevExtreme (esm/__internal/ui/toolbar/strategy/toolbar.multiline.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getOuterWidth, getWidth } from '../../../../core/utils/size';
const TOOLBAR_LABEL_CLASS = 'dx-toolbar-label';
export class MultiLineStrategy {
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
    const elementWidth = getWidth(this._toolbar.$element());
    const labelPaddings = getOuterWidth($label) - getWidth($label);
    $label.css('maxWidth', elementWidth - labelPaddings);
  }
  _hideOverflowItems() {}
  _dimensionChanged() {}
  _itemOptionChanged() {}
  _optionChanged() {}
}
