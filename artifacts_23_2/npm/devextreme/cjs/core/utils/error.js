/**
* DevExtreme (cjs/core/utils/error.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = _default;
var _extend = require("./extend");
var _console = require("./console");
var _string = require("./string");
var _version = require("../version");
/* eslint-disable import/no-commonjs */

const ERROR_URL = 'http://js.devexpress.com/error/' + _version.version.split('.').slice(0, 2).join('_') + '/';
function _default(baseErrors, errors) {
  const exports = {
    ERROR_MESSAGES: (0, _extend.extend)(errors, baseErrors),
    Error: function () {
      return makeError([].slice.call(arguments));
    },
    log: function (id) {
      let method = 'log';
      if (/^E\d+$/.test(id)) {
        method = 'error';
      } else if (/^W\d+$/.test(id)) {
        method = 'warn';
      }
      _console.logger[method](method === 'log' ? id : combineMessage([].slice.call(arguments)));
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
    return _string.format.apply(this, ['{0} - {1}. See:\n{2}', id, details, getErrorUrl(id)]);
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
      url: url
    });
  }
  function getErrorUrl(id) {
    return ERROR_URL + id;
  }
  return exports;
}
module.exports = exports.default;
module.exports.default = exports.default;