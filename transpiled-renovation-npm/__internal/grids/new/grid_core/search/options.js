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