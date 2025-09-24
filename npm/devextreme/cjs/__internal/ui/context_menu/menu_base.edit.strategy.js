/**
* DevExtreme (cjs/__internal/ui/context_menu/menu_base.edit.strategy.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
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
var _iterator = require("../../../core/utils/iterator");
var _collection_widgetEditStrategy = _interopRequireDefault(require("../../ui/collection/collection_widget.edit.strategy.plain"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MenuBaseEditStrategy extends _collection_widgetEditStrategy.default {
  _getPlainItems() {
    const items = this._getItems();
    const result = (0, _iterator.map)(items, function getMenuItems(item) {
      return item.items ? [item].concat((0, _iterator.map)(item.items, getMenuItems)) : item;
    });
    return result.flat();
  }
  static _stringifyItem(item) {
    return JSON.stringify(item, (key, value) => {
      if (key === 'template') {
        return MenuBaseEditStrategy._getTemplateString(value);
      }
      return value;
    });
  }
  static _getTemplateString(template) {
    if (typeof template === 'object' && template !== null) {
      // @ts-expect-error ts-error
      return (0, _renderer.default)(template).text();
    }
    return String(template);
  }
}
var _default = exports.default = MenuBaseEditStrategy;
