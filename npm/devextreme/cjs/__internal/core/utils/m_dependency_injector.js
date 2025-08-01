/**
* DevExtreme (cjs/__internal/core/utils/m_dependency_injector.js)
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
exports.injector = injector;
var _class = _interopRequireDefault(require("../../../core/class"));
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

function injector(object) {
  const BaseClass = _class.default.inherit(object);
  let InjectedClass = BaseClass;
  let instance = new InjectedClass(object);
  const initialFields = {};
  const injectFields = function (injectionObject, initial) {
    (0, _iterator.each)(injectionObject, function (key) {
      if ((0, _type.isFunction)(instance[key])) {
        if (initial || !object[key]) {
          object[key] = function () {
            return instance[key].apply(object, arguments);
          };
        }
      } else {
        if (initial) {
          initialFields[key] = object[key];
        }
        object[key] = instance[key];
      }
    });
  };
  injectFields(object, true);
  object.inject = function (injectionObject) {
    InjectedClass = InjectedClass.inherit(injectionObject);
    instance = new InjectedClass();
    injectFields(injectionObject);
  };
  object.resetInjection = function () {
    (0, _extend.extend)(object, initialFields);
    InjectedClass = BaseClass;
    instance = new BaseClass();
  };
  return object;
}
