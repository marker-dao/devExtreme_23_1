/**
* DevExtreme (cjs/__internal/ui/toolbar/toolbar.utils.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleItemFocusableElementTabIndex = toggleItemFocusableElementTabIndex;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BUTTON_GROUP_CLASS = 'dx-buttongroup';
const TOOLBAR_ITEMS = ['dxAutocomplete', 'dxButton', 'dxCheckBox', 'dxDateBox', 'dxMenu', 'dxSelectBox', 'dxTabs', 'dxTextBox', 'dxButtonGroup', 'dxDropDownButton'];
const getItemInstance = $element => {
  // @ts-expect-error ts-error
  const itemData = $element === null || $element === void 0 ? void 0 : $element.data();
  // @ts-expect-error ts-error
  const dxComponents = itemData === null || itemData === void 0 ? void 0 : itemData.dxComponents;
  const widgetName = dxComponents === null || dxComponents === void 0 ? void 0 : dxComponents[0];
  return widgetName && itemData[widgetName];
};
function toggleItemFocusableElementTabIndex(context, item) {
  var _itemData$options;
  if (!context) return;
  const $item = context._findItemElementByItem(item);
  if (!$item.length) {
    return;
  }
  const itemData = context._getItemData($item);
  const isItemNotFocusable = !!((_itemData$options = itemData.options) !== null && _itemData$options !== void 0 && _itemData$options.disabled || itemData.disabled || context.option('disabled'));
  const {
    widget
  } = itemData;
  if (widget && TOOLBAR_ITEMS.includes(widget)) {
    const $widget = $item.find(widget.toLowerCase().replace('dx', '.dx-'));
    if ($widget.length) {
      var _itemInstance$_focusT, _itemData$options2;
      const itemInstance = getItemInstance($widget);
      if (!itemInstance) {
        return;
      }
      let $focusTarget = (_itemInstance$_focusT = itemInstance._focusTarget) === null || _itemInstance$_focusT === void 0 ? void 0 : _itemInstance$_focusT.call(itemInstance);
      if (widget === 'dxDropDownButton') {
        var _$focusTarget;
        $focusTarget = (_$focusTarget = $focusTarget) === null || _$focusTarget === void 0 ? void 0 : _$focusTarget.find(`.${BUTTON_GROUP_CLASS}`);
      } else {
        $focusTarget = $focusTarget ?? (0, _renderer.default)(itemInstance.element());
      }
      const tabIndex = (_itemData$options2 = itemData.options) === null || _itemData$options2 === void 0 ? void 0 : _itemData$options2.tabIndex;
      if (isItemNotFocusable) {
        $focusTarget.attr('tabIndex', -1);
      } else {
        $focusTarget.attr('tabIndex', tabIndex ?? 0);
      }
    }
  }
}
