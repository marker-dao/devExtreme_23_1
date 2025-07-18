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