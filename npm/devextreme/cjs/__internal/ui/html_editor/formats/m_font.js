/**
* DevExtreme (cjs/__internal/ui/html_editor/formats/m_font.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FontStyle = (_devextremeQuill.default === null || _devextremeQuill.default === void 0 ? void 0 : _devextremeQuill.default.import('attributors/style/font')) || {};
if ('whitelist' in FontStyle) {
  FontStyle.whitelist = null;
}
var _default = exports.default = FontStyle;
