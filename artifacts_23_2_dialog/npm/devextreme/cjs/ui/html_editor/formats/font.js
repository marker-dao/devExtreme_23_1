/**
* DevExtreme (cjs/ui/html_editor/formats/font.js)
* Version: 23.2.0
* Build date: Tue Aug 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var FontStyle = {};
if (_devextremeQuill.default) {
  FontStyle = _devextremeQuill.default.import('attributors/style/font');
  FontStyle.whitelist = null;
}
var _default = FontStyle;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;