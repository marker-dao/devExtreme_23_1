/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/options.js)
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
  editing: {
    changes: [],
    allowAdding: false,
    allowDeleting: false,
    allowUpdating: false,
    confirmDelete: true,
    form: {},
    popup: {},
    texts: {
      confirmDeleteMessage: _message.default.format('dxDataGrid-editingConfirmDeleteMessage'),
      confirmDeleteTitle: '',
      deleteCard: _message.default.format('dxDataGrid-editingDeleteRow'),
      editCard: _message.default.format('dxDataGrid-editingEditRow'),
      saveCard: _message.default.format('dxDataGrid-editingSaveRowChanges'),
      addCard: _message.default.format('dxDataGrid-editingAddRow'),
      cancel: _message.default.format('dxDataGrid-editingCancelRowChanges')
    }
  }
};
