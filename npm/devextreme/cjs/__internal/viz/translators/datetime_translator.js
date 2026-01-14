/**
* DevExtreme (cjs/__internal/viz/translators/datetime_translator.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../core/utils/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function parse(value) {
  return value !== null ? new Date(value) : value;
}
var _default = exports.default = {
  fromValue: parse,
  toValue: parse,
  _add: _date.default.addDateInterval,
  convert: _date.default.dateToMilliseconds
};
