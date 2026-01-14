/**
* DevExtreme (cjs/__internal/data/odata/m_request_dispatcher.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../common/data/odata/query_adapter");
var _utils = require("../../../common/data/odata/utils");
const DEFAULT_PROTOCOL_VERSION = 4;
class RequestDispatcher {
  constructor(options) {
    options = options || {};
    // @ts-expect-error
    this._url = String(options.url).replace(/\/+$/, '');
    // @ts-expect-error
    this._beforeSend = options.beforeSend;
    // @ts-expect-error
    this._jsonp = options.jsonp;
    // @ts-expect-error
    this._version = options.version || DEFAULT_PROTOCOL_VERSION;
    // @ts-expect-error
    this._withCredentials = options.withCredentials;
    // @ts-expect-error
    this._processDatesAsUtc = options.processDatesAsUtc ?? options.deserializeDates ?? false;
    // @ts-expect-error
    this._filterToLower = options.filterToLower;
  }
  sendRequest(url, method, params, payload) {
    return (0, _utils.sendRequest)(this.version, {
      url,
      method,
      params: params || {},
      payload
    }, {
      // @ts-expect-error
      beforeSend: this._beforeSend,
      // @ts-expect-error
      jsonp: this._jsonp,
      // @ts-expect-error
      withCredentials: this._withCredentials,
      // @ts-expect-error
      processDatesAsUtc: this._processDatesAsUtc
    });
  }
  get version() {
    // @ts-expect-error
    return this._version;
  }
  get beforeSend() {
    // @ts-expect-error
    return this._beforeSend;
  }
  get url() {
    // @ts-expect-error
    return this._url;
  }
  get jsonp() {
    // @ts-expect-error
    return this._jsonp;
  }
  get filterToLower() {
    // @ts-expect-error
    return this._filterToLower;
  }
}
exports.default = RequestDispatcher;
