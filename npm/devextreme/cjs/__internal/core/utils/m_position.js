/**
* DevExtreme (cjs/__internal/core/utils/m_position.js)
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
exports.getDefaultAlignment = exports.getBoundingRect = void 0;
var _config = _interopRequireDefault(require("../../../core/config"));
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getDefaultAlignment = isRtlEnabled => {
  const rtlEnabled = isRtlEnabled ?? (0, _config.default)().rtlEnabled;
  return rtlEnabled ? 'right' : 'left';
};
exports.getDefaultAlignment = getDefaultAlignment;
const getBoundingRect = element => {
  var _element$getBoundingC;
  if ((0, _type.isWindow)(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }
  return (_element$getBoundingC = element.getBoundingClientRect) === null || _element$getBoundingC === void 0 ? void 0 : _element$getBoundingC.call(element);
};
exports.getBoundingRect = getBoundingRect;
