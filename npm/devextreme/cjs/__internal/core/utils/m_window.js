/**
* DevExtreme (cjs/__internal/core/utils/m_window.js)
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
exports.setWindow = exports.hasWindow = exports.hasProperty = exports.getWindow = exports.getNavigator = exports.getCurrentScreenFactor = exports.defaultScreenFactorFunc = exports.default = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* global window */

let hasWindowValue = typeof window !== 'undefined';
const hasWindow = () => hasWindowValue;
exports.hasWindow = hasWindow;
let windowObject = hasWindow() ? window : undefined;
if (!windowObject) {
  windowObject = {};
  windowObject.window = windowObject;
}
const getWindow = () => windowObject;
exports.getWindow = getWindow;
const setWindow = (newWindowObject, hasWindow) => {
  if (hasWindow === undefined) {
    hasWindowValue = typeof window !== 'undefined' && window === newWindowObject;
  } else {
    hasWindowValue = hasWindow;
  }
  windowObject = newWindowObject;
};
exports.setWindow = setWindow;
const hasProperty = prop => hasWindow() && prop in windowObject;
exports.hasProperty = hasProperty;
const defaultScreenFactorFunc = width => {
  if (width < 768) {
    return 'xs';
  }
  if (width < 992) {
    return 'sm';
  }
  if (width < 1200) {
    return 'md';
  }
  return 'lg';
};
exports.defaultScreenFactorFunc = defaultScreenFactorFunc;
const getCurrentScreenFactor = screenFactorCallback => {
  const screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;
  const windowWidth = _dom_adapter.default.getDocumentElement().clientWidth;
  return screenFactorFunc(windowWidth);
};
exports.getCurrentScreenFactor = getCurrentScreenFactor;
const getNavigator = () => {
  var _windowObject;
  return hasWindow() ? (_windowObject = windowObject) === null || _windowObject === void 0 ? void 0 : _windowObject.navigator : {
    userAgent: ''
  };
};
exports.getNavigator = getNavigator;
var _default = exports.default = {
  defaultScreenFactorFunc,
  getCurrentScreenFactor,
  getNavigator,
  getWindow,
  hasProperty,
  hasWindow,
  setWindow
};
