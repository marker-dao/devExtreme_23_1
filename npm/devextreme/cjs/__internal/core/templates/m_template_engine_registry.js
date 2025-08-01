/**
* DevExtreme (cjs/__internal/core/templates/m_template_engine_registry.js)
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
exports.getCurrentTemplateEngine = getCurrentTemplateEngine;
exports.registerTemplateEngine = registerTemplateEngine;
exports.setTemplateEngine = setTemplateEngine;
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const templateEngines = {};
let currentTemplateEngine;
function registerTemplateEngine(name, templateEngine) {
  templateEngines[name] = templateEngine;
}
function setTemplateEngine(templateEngine) {
  if ((0, _type.isString)(templateEngine)) {
    currentTemplateEngine = templateEngines[templateEngine];
    if (!currentTemplateEngine) {
      throw _errors.default.Error('E0020', templateEngine);
    }
  } else {
    currentTemplateEngine = templateEngine;
  }
}
function getCurrentTemplateEngine() {
  return currentTemplateEngine;
}
