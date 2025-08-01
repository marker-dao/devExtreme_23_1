/**
* DevExtreme (cjs/__internal/core/utils/m_extend.js)
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
exports.extendFromObject = exports.extend = void 0;
var _type = require("../../../core/utils/type");
const extendFromObject = function (target, source, overrideExistingValues) {
  target = target || {};
  for (const prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      const value = source[prop];
      if (!(prop in target) || overrideExistingValues) {
        target[prop] = value;
      }
    }
  }
  return target;
};
exports.extendFromObject = extendFromObject;
const extend = function (target) {
  target = target || {};
  let i = 1;
  let deep = false;
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i++;
  }
  for (; i < arguments.length; i++) {
    const source = arguments[i];
    if (source == null) {
      continue;
    }
    for (const key in source) {
      const targetValue = target[key];
      const sourceValue = source[key];
      let sourceValueIsArray = false;
      let clone;
      if (key === '__proto__' || key === 'constructor' || target === sourceValue) {
        continue;
      }
      if (deep && sourceValue && ((0, _type.isPlainObject)(sourceValue)
      // eslint-disable-next-line no-cond-assign
      || (sourceValueIsArray = Array.isArray(sourceValue)))) {
        if (sourceValueIsArray) {
          clone = targetValue && Array.isArray(targetValue) ? targetValue : [];
        } else {
          clone = targetValue && (0, _type.isPlainObject)(targetValue) ? targetValue : {};
        }
        target[key] = extend(deep, clone, sourceValue);
      } else if (sourceValue !== undefined) {
        target[key] = sourceValue;
      }
    }
  }
  return target;
};
exports.extend = extend;
