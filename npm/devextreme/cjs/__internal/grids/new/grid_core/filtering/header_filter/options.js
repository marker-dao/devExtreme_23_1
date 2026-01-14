/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/header_filter/options.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = void 0;
var _message = _interopRequireDefault(require("../../../../../../common/core/localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = exports.defaultOptions = {
  headerFilter: {
    visible: false,
    width: 252,
    height: 325,
    allowSelectAll: true,
    search: {
      enabled: false,
      timeout: 500,
      mode: 'contains',
      editorOptions: {}
    },
    texts: {
      emptyValue: _message.default.format('dxDataGrid-headerFilterEmptyValue'),
      ok: _message.default.format('dxDataGrid-headerFilterOK'),
      cancel: _message.default.format('dxDataGrid-headerFilterCancel')
    }
  }
};
