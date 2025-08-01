/**
* DevExtreme (cjs/__internal/core/utils/m_variable_wrapper.js)
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
exports.variableWrapper = void 0;
var _console = require("../../../core/utils/console");
var _dependency_injector = _interopRequireDefault(require("../../../core/utils/dependency_injector"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable object-shorthand */

const variableWrapper = exports.variableWrapper = (0, _dependency_injector.default)({
  isWrapped: function () {
    return false;
  },
  isWritableWrapped: function () {
    return false;
  },
  wrap: function (value) {
    return value;
  },
  unwrap: function (value) {
    return value;
  },
  assign: function () {
    _console.logger.error('Method \'assign\' should not be used for not wrapped variables. Use \'isWrapped\' method for ensuring.');
  }
});
