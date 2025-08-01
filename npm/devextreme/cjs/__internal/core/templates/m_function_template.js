/**
* DevExtreme (cjs/__internal/core/templates/m_function_template.js)
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
exports.FunctionTemplate = void 0;
var _template_base = require("../../../core/templates/template_base");
var _dom = require("../../../core/utils/dom");
class FunctionTemplate extends _template_base.TemplateBase {
  constructor(render) {
    super();
    this._render = render;
  }
  // @ts-expect-error need type overload
  _renderCore(options) {
    return (0, _dom.normalizeTemplateElement)(this._render(options));
  }
}
exports.FunctionTemplate = FunctionTemplate;
