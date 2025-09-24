"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SizeStyle = (_devextremeQuill.default === null || _devextremeQuill.default === void 0 ? void 0 : _devextremeQuill.default.import('attributors/style/size')) || {};
if ('whitelist' in SizeStyle) {
  SizeStyle.whitelist = null;
}
var _default = exports.default = SizeStyle;