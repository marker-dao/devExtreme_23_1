/**
* DevExtreme (cjs/__internal/core/utils/m_error.js)
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
exports.error = error;
var _extend = require("../../../core/utils/extend");
var _string = require("../../../core/utils/string");
var _version = require("../../../core/version");
var _m_console = _interopRequireDefault(require("./m_console"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable import/no-commonjs */

const ERROR_URL = `https://js.devexpress.com/error/${_version.version.split('.').slice(0, 2).join('_')}/`;
function error(baseErrors, errors) {
  const exports = {
    ERROR_MESSAGES: (0, _extend.extend)(errors, baseErrors),
    // eslint-disable-next-line object-shorthand
    Error: function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return makeError(args);
    },
    log() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      const id = args[0];
      let method = 'log';
      if (/^E\d+$/.test(id)) {
        method = 'error';
      } else if (/^W\d+$/.test(id)) {
        method = 'warn';
      }
      _m_console.default.logger[method](method === 'log' ? id : combineMessage(args));
    }
  };
  function combineMessage(args) {
    const id = args[0];
    args = args.slice(1);
    return formatMessage(id, formatDetails(id, args));
  }
  function formatDetails(id, args) {
    args = [exports.ERROR_MESSAGES[id]].concat(args);
    return _string.format.apply(this, args).replace(/\.*\s*?$/, '');
  }
  function formatMessage(id, details) {
    const kind = id !== null && id !== void 0 && id.startsWith('W') ? 'warning' : 'error';
    return _string.format.apply(this, ['{0} - {1}.\n\nFor additional information on this {2} message, see: {3}', id, details, kind, getErrorUrl(id)]);
  }
  function makeError(args) {
    const id = args[0];
    args = args.slice(1);
    const details = formatDetails(id, args);
    const url = getErrorUrl(id);
    const message = formatMessage(id, details);
    return (0, _extend.extend)(new Error(message), {
      __id: id,
      __details: details,
      url
    });
  }
  function getErrorUrl(id) {
    return ERROR_URL + id;
  }
  return exports;
}
var _default = exports.default = error;
