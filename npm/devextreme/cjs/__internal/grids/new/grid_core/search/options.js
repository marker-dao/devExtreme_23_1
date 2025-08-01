/**
* DevExtreme (cjs/__internal/grids/new/grid_core/search/options.js)
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
exports.defaultOptions = void 0;
var _message = _interopRequireDefault(require("../../../../../localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = exports.defaultOptions = {
  searchPanel: {
    highlightCaseSensitive: false,
    highlightSearchText: true,
    placeholder: _message.default.format('dxDataGrid-searchPanelPlaceholder'),
    searchVisibleColumnsOnly: false,
    text: '',
    visible: false,
    width: 160
  }
};
