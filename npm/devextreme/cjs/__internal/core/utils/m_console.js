/**
* DevExtreme (cjs/__internal/core/utils/m_console.js)
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
exports.logger = exports.default = exports.debug = void 0;
var _type = require("../../../core/utils/type");
/* global console */
/* eslint no-console: off */

const noop = function () {};
const getConsoleMethod = function (method) {
  if (typeof console === 'undefined' || !(0, _type.isFunction)(console[method])) {
    return noop;
  }
  return console[method].bind(console);
};
const logger = exports.logger = {
  log: getConsoleMethod('log'),
  info: getConsoleMethod('info'),
  warn: getConsoleMethod('warn'),
  error: getConsoleMethod('error')
};
const debug = exports.debug = function () {
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
  function assertParam(parameter, message) {
    assert(parameter !== null && parameter !== undefined, message);
  }
  return {
    assert,
    assertParam
  };
}();
var _default = exports.default = {
  logger,
  debug
};
