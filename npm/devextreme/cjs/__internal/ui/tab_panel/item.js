/**
* DevExtreme (cjs/__internal/ui/tab_panel/item.js)
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
exports.default = void 0;
var _common = require("../../../core/utils/common");
var _item = _interopRequireDefault(require("../../ui/collection/item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TabPanelItem extends _item.default {
  _renderWatchers() {
    this._startWatcher('badge', _common.noop);
    super._renderWatchers();
  }
}
exports.default = TabPanelItem;
