/**
* DevExtreme (cjs/__internal/core/utils/m_type.js)
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
exports.type = exports.isWindow = exports.isString = exports.isRenderer = exports.isPromise = exports.isPrimitive = exports.isPlainObject = exports.isObject = exports.isNumeric = exports.isFunction = exports.isExponential = exports.isEvent = exports.isEmptyObject = exports.isDefined = exports.isDeferred = exports.isDate = exports.isBoolean = exports.default = void 0;
const types = {
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object Object]': 'object',
  '[object String]': 'string'
};
const type = function (object) {
  if (object === null) {
    return 'null';
  }
  const typeOfObject = Object.prototype.toString.call(object);
  return typeof object === 'object' ? types[typeOfObject] || 'object' : typeof object;
};
exports.type = type;
const isBoolean = function (object) {
  return typeof object === 'boolean';
};
exports.isBoolean = isBoolean;
const isExponential = function (value) {
  return isNumeric(value) && value.toString().indexOf('e') !== -1;
};
exports.isExponential = isExponential;
const isDate = function (object) {
  return type(object) === 'date';
};
exports.isDate = isDate;
const isDefined = function (object) {
  return object !== null && object !== undefined;
};
exports.isDefined = isDefined;
const isFunction = function (object) {
  return typeof object === 'function';
};
exports.isFunction = isFunction;
const isString = function (object) {
  return typeof object === 'string';
};
exports.isString = isString;
const isNumeric = function (object) {
  return typeof object === 'number' && isFinite(object) || !isNaN(object - parseFloat(object));
};
exports.isNumeric = isNumeric;
const isObject = function (object) {
  return type(object) === 'object';
};
exports.isObject = isObject;
const isEmptyObject = function (object) {
  let property;
  // eslint-disable-next-line no-unreachable-loop
  for (property in object) {
    return false;
  }
  return true;
};
exports.isEmptyObject = isEmptyObject;
const isPlainObject = function (object) {
  if (!object || type(object) !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(object);
  if (!proto) {
    return true;
  }
  const ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof ctor === 'function' && Object.toString.call(ctor) === Object.toString.call(Object);
};
exports.isPlainObject = isPlainObject;
const isPrimitive = function (value) {
  return !['object', 'array', 'function'].includes(type(value));
};
exports.isPrimitive = isPrimitive;
const isWindow = function (object) {
  return object != null && object === object.window;
};
exports.isWindow = isWindow;
const isRenderer = function (object) {
  return !!object && !!(object.jquery || object.dxRenderer);
};
exports.isRenderer = isRenderer;
const isPromise = function (object) {
  return !!object && isFunction(object.then);
};
exports.isPromise = isPromise;
const isDeferred = function (object) {
  return !!object && isFunction(object.done) && isFunction(object.fail);
};
exports.isDeferred = isDeferred;
const isEvent = function (object) {
  return !!(object && object.preventDefault);
};
exports.isEvent = isEvent;
var _default = exports.default = {
  isBoolean,
  isDate,
  isDeferred,
  isDefined,
  isEmptyObject,
  isEvent,
  isExponential,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRenderer,
  isString,
  isWindow,
  type
};
