/**
* DevExtreme (cjs/__internal/core/r1/utils/update_props_immutable.js)
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
exports.updatePropsImmutable = void 0;
var _data = require("../../../../core/utils/data");
var _type = require("../../../../core/utils/type");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cloneObjectValue = value => Array.isArray(value) ? [...value] : _extends({}, value);
const cloneObjectProp = (value, prevValue, fullNameParts) => {
  const result = fullNameParts.length > 0 && prevValue && value !== prevValue ? cloneObjectValue(prevValue) : cloneObjectValue(value);
  const name = fullNameParts[0];
  if (fullNameParts.length > 1) {
    result[name] = cloneObjectProp(value[name], prevValue === null || prevValue === void 0 ? void 0 : prevValue[name], fullNameParts.slice(1));
  } else if (name) {
    if ((0, _type.isPlainObject)(value[name])) {
      result[name] = cloneObjectValue(value[name]);
    } else {
      result[name] = value[name];
    }
  }
  return result;
};
const updatePropsImmutable = (props, option, name, fullName) => {
  const currentPropsValue = option[name];
  const prevPropsValue = props[name];
  const result = props;
  if ((0, _type.isPlainObject)(currentPropsValue) || name !== fullName && Array.isArray(currentPropsValue)) {
    result[name] = cloneObjectProp(currentPropsValue, prevPropsValue, (0, _data.getPathParts)(fullName).slice(1));
  } else {
    result[name] = currentPropsValue;
  }
};
exports.updatePropsImmutable = updatePropsImmutable;
