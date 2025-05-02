"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = void 0;
var _message = _interopRequireDefault(require("../../../../../localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = exports.defaultOptions = {
  pager: {
    visible: 'auto',
    showPageSizeSelector: false,
    allowedPageSizes: 'auto',
    label: _message.default.format('dxPager-ariaLabel')
  }
};