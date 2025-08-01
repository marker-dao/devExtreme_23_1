/**
* DevExtreme (cjs/__internal/core/templates/m_empty_template.js)
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
exports.EmptyTemplate = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _template_base = require("../../../core/templates/template_base");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EmptyTemplate extends _template_base.TemplateBase {
  _renderCore() {
    return (0, _renderer.default)();
  }
}
exports.EmptyTemplate = EmptyTemplate;
