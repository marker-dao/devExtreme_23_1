/**
* DevExtreme (cjs/__internal/common/m_charts.js)
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
exports.registerPattern = exports.registerGradient = exports.default = void 0;
var _utils = require("../../viz/core/utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const graphicObjects = {};
const registerPattern = options => {
  const id = (0, _utils.getNextDefsSvgId)();
  graphicObjects[id] = _extends({
    type: 'pattern'
  }, options);
  return id;
};
exports.registerPattern = registerPattern;
const registerGradient = (type, options) => {
  const id = (0, _utils.getNextDefsSvgId)();
  graphicObjects[id] = _extends({
    type
  }, options);
  return id;
};
exports.registerGradient = registerGradient;
const getGraphicObjects = () => graphicObjects;
var _default = exports.default = {
  getGraphicObjects
};
