/**
* DevExtreme (cjs/__internal/core/m_class.js)
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
var _errors = _interopRequireDefault(require("../../core/errors"));
var _type = require("../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const wrapOverridden = function (baseProto, methodName, method) {
  return function () {
    const prevCallBase = this.callBase;
    this.callBase = baseProto[methodName];
    try {
      return method.apply(this, arguments);
    } finally {
      this.callBase = prevCallBase;
    }
  };
};
const clonePrototype = function (obj) {
  const func = function () {};
  func.prototype = obj.prototype;
  // eslint-disable-next-line new-cap
  return new func();
};
const redefine = function (members) {
  const that = this;
  let overridden;
  let memberName;
  let member;
  if (!members) {
    return that;
  }
  for (memberName in members) {
    member = members[memberName];
    overridden = typeof that.prototype[memberName] === 'function' && typeof member === 'function';
    that.prototype[memberName] = overridden ? wrapOverridden(that.parent.prototype, memberName, member) : member;
  }
  return that;
};
const include = function () {
  const classObj = this;
  let argument;
  let name;
  let i;
  // NOTE: For ES6 classes. They don't have _includedCtors/_includedPostCtors
  // properties and get them from the ancestor class.
  const hasClassObjOwnProperty = Object.prototype.hasOwnProperty.bind(classObj);
  const isES6Class = !hasClassObjOwnProperty('_includedCtors') && !hasClassObjOwnProperty('_includedPostCtors');
  if (isES6Class) {
    classObj._includedCtors = classObj._includedCtors.slice(0);
    classObj._includedPostCtors = classObj._includedPostCtors.slice(0);
  }
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  for (i = 0; i < args.length; i++) {
    argument = args[i];
    if (argument.ctor) {
      classObj._includedCtors.push(argument.ctor);
    }
    if (argument.postCtor) {
      classObj._includedPostCtors.push(argument.postCtor);
    }
    // eslint-disable-next-line no-restricted-syntax
    for (name in argument) {
      if (name === 'ctor' || name === 'postCtor' || name === 'default') {
        continue;
      }
      classObj.prototype[name] = argument[name];
    }
  }
  return classObj;
};
const subclassOf = function (parentClass) {
  const hasParentProperty = Object.prototype.hasOwnProperty.bind(this)('parent');
  const isES6Class = !hasParentProperty && this.parent;
  if (isES6Class) {
    const baseClass = Object.getPrototypeOf(this);
    return baseClass === parentClass || baseClass.subclassOf(parentClass);
  }
  if (this.parent === parentClass) {
    return true;
  }
  if (!this.parent || !this.parent.subclassOf) {
    return false;
  }
  return this.parent.subclassOf(parentClass);
};
const abstract = function () {
  throw _errors.default.Error('E0001');
};
const classImpl = function () {};
classImpl.inherit = function (members) {
  const inheritor = function () {
    if (!this || (0, _type.isWindow)(this) || typeof this.constructor !== 'function') {
      throw _errors.default.Error('E0003');
    }
    const instance = this;
    const {
      ctor
    } = instance;
    const includedCtors = instance.constructor._includedCtors;
    const includedPostCtors = instance.constructor._includedPostCtors;
    let i;
    for (i = 0; i < includedCtors.length; i++) {
      includedCtors[i].call(instance);
    }
    if (ctor) {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      ctor.apply(instance, args);
    }
    for (i = 0; i < includedPostCtors.length; i++) {
      includedPostCtors[i].call(instance);
    }
  };
  inheritor.prototype = clonePrototype(this);
  Object.setPrototypeOf(inheritor, this);
  inheritor.inherit = this.inherit;
  inheritor.abstract = abstract;
  inheritor.redefine = redefine;
  inheritor.include = include;
  inheritor.subclassOf = subclassOf;
  inheritor.parent = this;
  inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
  inheritor._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
  inheritor.prototype.constructor = inheritor;
  inheritor.redefine(members);
  return inheritor;
};
classImpl.abstract = abstract;
var _default = exports.default = classImpl;
