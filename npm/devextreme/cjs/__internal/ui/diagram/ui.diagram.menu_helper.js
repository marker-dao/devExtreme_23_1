/**
* DevExtreme (cjs/__internal/ui/diagram/ui.diagram.menu_helper.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _icon = require("../../../core/utils/icon");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const DIAGRAM_CONTEXT_MENU_CLASS = 'dx-diagram-contextmenu';
const DiagramMenuHelper = {
  getContextMenuItemTemplate(contextMenu, itemData, itemIndex, itemElement) {
    const $itemElement = (0, _renderer.default)(itemElement);
    $itemElement.empty();
    const itemKey = itemData.rootCommand !== undefined ? itemData.rootCommand : -1;
    if (itemData.icon && !itemData.checked) {
      const $iconElement = (0, _icon.getImageContainer)(itemData.icon);
      if ($iconElement) {
        $itemElement.append($iconElement);
      }
    } else if (contextMenu._menuHasCheckedItems && contextMenu._menuHasCheckedItems[itemKey] === true) {
      const $checkElement = (0, _icon.getImageContainer)('check');
      if ($checkElement) {
        $checkElement.css('visibility', !itemData.checked ? 'hidden' : 'visible');
        $itemElement.append($checkElement);
      }
    }
    $itemElement.append(
    // @ts-expect-error ts-error
    `<span class="dx-menu-item-text">${itemData.text}</span>`);
    if (Array.isArray(itemData.items) && itemData.items.length > 0) {
      $itemElement.append(
      // @ts-expect-error ts-error
      '<span class="dx-menu-item-popout-container"><div class="dx-menu-item-popout"></div></span>');
    }
  },
  getContextMenuCssClass() {
    return DIAGRAM_CONTEXT_MENU_CLASS;
  },
  onContextMenuItemClick(widget, itemData, actionHandler) {
    if ((itemData.command !== undefined || itemData.name !== undefined) && (!Array.isArray(itemData.items) || !itemData.items.length)) {
      // @ts-expect-error ts-error
      const parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData);
      actionHandler.call(this, itemData.command, itemData.name, parameter);
    } else if (itemData.rootCommand !== undefined && itemData.value !== undefined) {
      const parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData, itemData.value);
      actionHandler.call(this, itemData.rootCommand, undefined, parameter);
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getItemValue(item) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return typeof item.value === 'object' ? JSON.stringify(item.value) : item.value;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getItemOptionText(contextMenu, indexPath) {
    if (contextMenu) {
      var _contextMenu$_origina;
      // eslint-disable-next-line no-param-reassign
      indexPath = indexPath.slice();
      const parentItemOptionText = this._getParentItemOptionText(indexPath);
      if ((_contextMenu$_origina = contextMenu._originalItemsInfo) !== null && _contextMenu$_origina !== void 0 && _contextMenu$_origina[parentItemOptionText]) {
        indexPath[indexPath.length - 1] += contextMenu._originalItemsInfo[parentItemOptionText].indexPathCorrection;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getItemOptionTextCore(indexPath);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getParentItemOptionText(indexPath) {
    const parentIndexPath = indexPath.slice(0, indexPath.length - 1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getItemOptionTextCore(parentIndexPath);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getItemOptionTextCore(indexPath) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return indexPath.reduce((r, i) => `${r}items[${i}].`, '');
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getItemCommandParameter(widget, item, value) {
    if (item.getParameter) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return item.getParameter(widget);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  },
  updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items) {
    if (!contextMenu._originalItemsInfo) {
      contextMenu._originalItemsInfo = {};
    }
    if (!contextMenu._originalItemsInfo[itemOptionText]) {
      contextMenu._originalItemsInfo[itemOptionText] = {
        items: contextMenu.option(`${itemOptionText}items`) || []
      };
    }
    // eslint-disable-next-line no-param-reassign
    items = items.map(item => ({
      value: this.getItemValue(item),
      text: item.text,
      checked: item.checked,
      widget: contextMenu,
      rootCommand: rootCommandKey
    }));
    const originalItems = contextMenu._originalItemsInfo[itemOptionText].items;
    contextMenu.option(`${itemOptionText}items`, items.concat(originalItems));
    if (contextMenu._originalItemsInfo[itemOptionText] && originalItems.length) {
      contextMenu._originalItemsInfo[itemOptionText].indexPathCorrection = items.length;
    }
  },
  updateContextMenuItemVisible(contextMenu, itemOptionText, visible) {
    contextMenu.option(`${itemOptionText}visible`, visible);
  },
  updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value) {
    const items = contextMenu.option(`${itemOptionText}items`);
    if (typeof value === 'boolean' && !(items !== null && items !== void 0 && items.length)) {
      this._setContextMenuHasCheckedItems(contextMenu, -1);
      contextMenu.option(`${itemOptionText}checked`, value);
    } else if (value !== undefined) {
      this._setContextMenuHasCheckedItems(contextMenu, rootCommandKey);
      if (Array.isArray(items)) {
        items.forEach(item => {
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
