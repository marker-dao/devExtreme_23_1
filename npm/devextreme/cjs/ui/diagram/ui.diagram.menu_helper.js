/**
* DevExtreme (cjs/ui/diagram/ui.diagram.menu_helper.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _icon = require("../../core/utils/icon");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DIAGRAM_CONTEXT_MENU_CLASS = 'dx-diagram-contextmenu';
const DiagramMenuHelper = {
  getContextMenuItemTemplate(contextMenu, itemData, itemIndex, itemElement) {
    const $itemElement = (0, _renderer.default)(itemElement);
    $itemElement.empty();
    const itemKey = itemData.rootCommand !== undefined ? itemData.rootCommand : -1;
    if (itemData.icon && !itemData.checked) {
      const $iconElement = (0, _icon.getImageContainer)(itemData.icon);
      $itemElement.append($iconElement);
    } else if (contextMenu._menuHasCheckedItems && contextMenu._menuHasCheckedItems[itemKey] === true) {
      const $checkElement = (0, _icon.getImageContainer)('check');
      $checkElement.css('visibility', !itemData.checked ? 'hidden' : 'visible');
      $itemElement.append($checkElement);
    }
    $itemElement.append('<span class="dx-menu-item-text">' + itemData.text + '</span>');
    if (Array.isArray(itemData.items) && itemData.items.length > 0) {
      $itemElement.append('<span class="dx-menu-item-popout-container"><div class="dx-menu-item-popout"></div></span>');
    }
  },
  getContextMenuCssClass() {
    return DIAGRAM_CONTEXT_MENU_CLASS;
  },
  onContextMenuItemClick(widget, itemData, actionHandler) {
    if ((itemData.command !== undefined || itemData.name !== undefined) && (!Array.isArray(itemData.items) || !itemData.items.length)) {
      const parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData);
      actionHandler.call(this, itemData.command, itemData.name, parameter);
    } else if (itemData.rootCommand !== undefined && itemData.value !== undefined) {
      const parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData, itemData.value);
      actionHandler.call(this, itemData.rootCommand, undefined, parameter);
    }
  },
  getItemValue(item) {
    return typeof item.value === 'object' ? JSON.stringify(item.value) : item.value;
  },
  getItemOptionText(contextMenu, indexPath) {
    if (contextMenu) {
      indexPath = indexPath.slice();
      const parentItemOptionText = this._getParentItemOptionText(indexPath);
      if (contextMenu._originalItemsInfo && contextMenu._originalItemsInfo[parentItemOptionText]) {
        indexPath[indexPath.length - 1] += contextMenu._originalItemsInfo[parentItemOptionText].indexPathCorrection;
      }
    }
    return this._getItemOptionTextCore(indexPath);
  },
  _getParentItemOptionText(indexPath) {
    const parentIndexPath = indexPath.slice(0, indexPath.length - 1);
    return this._getItemOptionTextCore(parentIndexPath);
  },
  _getItemOptionTextCore(indexPath) {
    return indexPath.reduce((r, i) => {
      return r + `items[${i}].`;
    }, '');
  },
  getItemCommandParameter(widget, item, value) {
    if (item.getParameter) {
      return item.getParameter(widget);
    }
    return value;
  },
  updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items) {
    if (!contextMenu._originalItemsInfo) {
      contextMenu._originalItemsInfo = {};
    }
    if (!contextMenu._originalItemsInfo[itemOptionText]) {
      contextMenu._originalItemsInfo[itemOptionText] = {
        items: contextMenu.option(itemOptionText + 'items') || []
      };
    }
    items = items.map(item => {
      return {
        'value': this.getItemValue(item),
        'text': item.text,
        'checked': item.checked,
        'widget': contextMenu,
        'rootCommand': rootCommandKey
      };
    });
    const originalItems = contextMenu._originalItemsInfo[itemOptionText].items;
    contextMenu.option(itemOptionText + 'items', items.concat(originalItems));
    if (contextMenu._originalItemsInfo[itemOptionText] && originalItems.length) {
      contextMenu._originalItemsInfo[itemOptionText].indexPathCorrection = items.length;
    }
  },
  updateContextMenuItemVisible(contextMenu, itemOptionText, visible) {
    contextMenu.option(itemOptionText + 'visible', visible);
  },
  updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value) {
    const items = contextMenu.option(itemOptionText + 'items');
    if (typeof value === 'boolean' && (!items || !items.length)) {
      this._setContextMenuHasCheckedItems(contextMenu, -1);
      contextMenu.option(itemOptionText + 'checked', value);
    } else if (value !== undefined) {
      this._setContextMenuHasCheckedItems(contextMenu, rootCommandKey);
      if (Array.isArray(items)) {
        items.forEach((item, index) => {
          item.checked = item.value === value;
        });
      }
    }
  },
  _setContextMenuHasCheckedItems(contextMenu, key) {
    if (!contextMenu._menuHasCheckedItems) {
      contextMenu._menuHasCheckedItems = {};
    }
    contextMenu._menuHasCheckedItems[key] = true;
  }
};
var _default = exports.default = DiagramMenuHelper;
module.exports = exports.default;
module.exports.default = exports.default;
