/**
* DevExtreme (cjs/localization.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "date", {
  enumerable: true,
  get: function () {
    return _date.default;
  }
});
exports.disableIntl = disableIntl;
exports.locale = exports.loadMessages = exports.formatNumber = exports.formatMessage = exports.formatDate = void 0;
Object.defineProperty(exports, "message", {
  enumerable: true,
  get: function () {
    return _message.default;
  }
});
Object.defineProperty(exports, "number", {
  enumerable: true,
  get: function () {
    return _number.default;
  }
});
exports.parseNumber = exports.parseDate = void 0;
var _core = _interopRequireDefault(require("./localization/core"));
var _message = _interopRequireDefault(require("./localization/message"));
var _number = _interopRequireDefault(require("./localization/number"));
var _date = _interopRequireDefault(require("./localization/date"));
require("./localization/currency");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @name localization
 */

const locale = _core.default.locale.bind(_core.default);
exports.locale = locale;
const loadMessages = _message.default.load.bind(_message.default);
exports.loadMessages = loadMessages;
const formatMessage = _message.default.format.bind(_message.default);
exports.formatMessage = formatMessage;
const formatNumber = _number.default.format.bind(_number.default);
exports.formatNumber = formatNumber;
const parseNumber = _number.default.parse.bind(_number.default);
exports.parseNumber = parseNumber;
const formatDate = _date.default.format.bind(_date.default);
exports.formatDate = formatDate;
const parseDate = _date.default.parse.bind(_date.default);
exports.parseDate = parseDate;
function disableIntl() {
  if (_number.default.engine() === 'intl') {
    _number.default.resetInjection();
  }
  if (_date.default.engine() === 'intl') {
    _date.default.resetInjection();
  }
}