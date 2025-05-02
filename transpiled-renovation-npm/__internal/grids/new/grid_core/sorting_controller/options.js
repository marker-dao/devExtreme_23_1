"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = void 0;
var _message = _interopRequireDefault(require("../../../../../localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = exports.defaultOptions = {
  sorting: {
    ascendingText: _message.default.format('dxDataGrid-sortingAscendingText'),
    descendingText: _message.default.format('dxDataGrid-sortingDescendingText'),
    clearText: _message.default.format('dxDataGrid-sortingClearText'),
    mode: 'single',
    showSortIndexes: true
  }
};