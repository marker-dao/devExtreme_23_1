/**
* DevExtreme (cjs/data/endpoint_selector.js)
* Version: 23.2.2
* Build date: Mon Nov 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _errors = _interopRequireDefault(require("../core/errors"));
var _window = require("../core/utils/window");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* global Debug*/

const window = (0, _window.getWindow)();
let IS_WINJS_ORIGIN;
let IS_LOCAL_ORIGIN;
function isLocalHostName(url) {
  return /^(localhost$|127\.)/i.test(url); // TODO more precise check for 127.x.x.x IP
}

/**
* @name EndpointSelector.ctor
* @publicName ctor(options)
* @param1 options:Object
* @hidden
*/
const EndpointSelector = function (config) {
  this.config = config;
  IS_WINJS_ORIGIN = window.location.protocol === 'ms-appx:';
  IS_LOCAL_ORIGIN = isLocalHostName(window.location.hostname);
};
EndpointSelector.prototype = {
  urlFor: function (key) {
    const bag = this.config[key];
    if (!bag) {
      throw _errors.default.Error('E0006');
    }
    if (bag.production) {
      if (IS_WINJS_ORIGIN && !Debug.debuggerEnabled || !IS_WINJS_ORIGIN && !IS_LOCAL_ORIGIN) {
        return bag.production;
      }
    }
    return bag.local;
  }
};
var _default = EndpointSelector;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
