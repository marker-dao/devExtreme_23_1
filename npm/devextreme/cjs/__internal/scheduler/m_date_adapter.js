/**
* DevExtreme (cjs/__internal/scheduler/m_date_adapter.js)
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
var _date = _interopRequireDefault(require("../../core/utils/date"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const toMs = _date.default.dateToMilliseconds;
class DateAdapterCore {
  constructor(source) {
    this._source = new Date(source.getTime ? source.getTime() : source);
  }
  get source() {
    return this._source;
  }
  result() {
    return this._source;
  }
  getTimezoneOffset() {
    let format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    const value = this._source.getTimezoneOffset();
    if (format === 'minute') {
      return value * toMs('minute');
    }
    return value;
  }
  getTime() {
    return this._source.getTime();
  }
  setTime(value) {
    this._source.setTime(value);
    return this;
  }
  addTime(value) {
    this._source.setTime(this._source.getTime() + value);
    return this;
  }
  setMinutes(value) {
    this._source.setMinutes(value);
    return this;
  }
  addMinutes(value) {
    this._source.setMinutes(this._source.getMinutes() + value);
    return this;
  }
  subtractMinutes(value) {
    this._source.setMinutes(this._source.getMinutes() - value);
    return this;
  }
}
const DateAdapter = date => new DateAdapterCore(date);
var _default = exports.default = DateAdapter;
