"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _icon = require("../../core/utils/icon");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DIAGRAM_CONTEXT_MENU_CLASS = 'dx-diagram-contextmenu';
var DiagramMenuHelper = {
  getContextMenuItemTemplate(contextMenu, itemData, itemIndex, itemElement) {
    var $itemElement = (0, _renderer.default)(itemElement);
    $itemElement.empty();
    var itemKey = itemData.rootCommand !== undefined ? itemData.rootCommand : -1;
    if (itemData.icon && !itemData.checked) {
      var $iconElement = (0, _icon.getImageContainer)(itemData.icon);
      $itemElement.append($iconElement);
    } else if (contextMenu._menuHasCheckedItems && contextMenu._menuHasCheckedItems[itemKey] === true) {
      var $checkElement = (0, _icon.getImageContainer)('check');
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
      var parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData);
      actionHandler.call(this, itemData.command, itemData.name, parameter);
    } else if (itemData.rootCommand !== undefined && itemData.value !== undefined) {
      var _parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData, itemData.value);
      actionHandler.call(this, itemData.rootCommand, undefined, _parameter);
    }
  },
  getItemValue(item) {
    return typeof item.value === 'object' ? JSON.stringify(item.value) : item.value;
  },
  getItemOptionText(contextMenu, indexPath) {
    if (contextMenu) {
      indexPath = indexPath.slice();
      var parentItemOptionText = this._getParentItemOptionText(indexPath);
      if (contextMenu._originalItemsInfo && contextMenu._originalItemsInfo[parentItemOptionText]) {
        indexPath[indexPath.length - 1] += contextMenu._originalItemsInfo[parentItemOptionText].indexPathCorrection;
      }
    }
    return this._getItemOptionTextCore(indexPath);
  },
  _getParentItemOptionText(indexPath) {
    var parentIndexPath = indexPath.slice(0, indexPath.length - 1);
    return this._getItemOptionTextCore(parentIndexPath);
  },
  _getItemOptionTextCore(indexPath) {
    return indexPath.reduce(function (r, i) {
      return r + "items[".concat(i, "].");
    }, '');
  },
  getItemCommandParameter(widget, item, value) {
    if (item.getParameter) {
      return item.getParameter(widget);
    }
    return value;
  },
  updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items) {
    var _this = this;
    if (!contextMenu._originalItemsInfo) {
      contextMenu._originalItemsInfo = {};
    }
    if (!contextMenu._originalItemsInfo[itemOptionText]) {
      contextMenu._originalItemsInfo[itemOptionText] = {
        items: contextMenu.option(itemOptionText + 'items') || []
      };
    }
    items = items.map(function (item) {
      return {
        'value': _this.getItemValue(item),
        'text': item.text,
        'checked': item.checked,
        'widget': contextMenu,
        'rootCommand': rootCommandKey
      };
    });
    var originalItems = contextMenu._originalItemsInfo[itemOptionText].items;
    contextMenu.option(itemOptionText + 'items', items.concat(originalItems));
    if (contextMenu._originalItemsInfo[itemOptionText] && originalItems.length) {
      contextMenu._originalItemsInfo[itemOptionText].indexPathCorrection = items.length;
    }
  },
  updateContextMenuItemVisible(contextMenu, itemOptionText, visible) {
    contextMenu.option(itemOptionText + 'visible', visible);
  },
  updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value) {
    var items = contextMenu.option(itemOptionText + 'items');
    if (typeof value === 'boolean' && (!items || !items.length)) {
      this._setContextMenuHasCheckedItems(contextMenu, -1);
      contextMenu.option(itemOptionText + 'checked', value);
    } else if (value !== undefined) {
      this._setContextMenuHasCheckedItems(contextMenu, rootCommandKey);
      if (Array.isArray(items)) {
        items.forEach(function (item, index) {
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
var _default = DiagramMenuHelper;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;