/**
* DevExtreme (cjs/__internal/grids/grid_core/column_chooser/const.js)
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
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = exports.defaultOptions = {
  columnChooser: {
    enabled: false,
    search: {
      enabled: false,
      timeout: 500,
      editorOptions: {}
    },
    selection: {
      allowSelectAll: false,
      selectByClick: false,
      recursive: false
    },
    position: undefined,
    sortOrder: undefined,
    mode: 'dragAndDrop',
    width: 250,
    height: 260,
    title: _message.default.format('dxDataGrid-columnChooserTitle'),
    emptyPanelText: _message.default.format('dxDataGrid-columnChooserEmptyText'),
    container: undefined
  }
};
