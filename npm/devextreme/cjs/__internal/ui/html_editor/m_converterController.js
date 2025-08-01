/**
* DevExtreme (cjs/__internal/ui/html_editor/m_converterController.js)
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
exports.default = void 0;
class ConverterController {
  constructor() {
    this._converters = {};
    this._converters = {};
  }
  addConverter(name, converter) {
    this._converters[name] = converter;
  }
  getConverter(name) {
    return this._converters[name];
  }
}
const controller = new ConverterController();
var _default = exports.default = controller;
