/**
* DevExtreme (cjs/__internal/core/utils/m_data.js)
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
exports.toComparable = exports.getPathParts = exports.compileSetter = exports.compileGetter = void 0;
var _class = _interopRequireDefault(require("../../../core/class"));
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _iterator = require("../../../core/utils/iterator");
var _object = require("../../../core/utils/object");
var _type = require("../../../core/utils/type");
var _variable_wrapper = _interopRequireDefault(require("../../../core/utils/variable_wrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const unwrapVariable = _variable_wrapper.default.unwrap;
const {
  isWrapped
} = _variable_wrapper.default;
const {
  assign
} = _variable_wrapper.default;
const bracketsToDots = function (expr) {
  return expr.replace(/\[/g, '.').replace(/\]/g, '');
};
const getPathParts = function (name) {
  return bracketsToDots(name).split('.');
};
exports.getPathParts = getPathParts;
const readPropValue = function (obj, propName, options) {
  options = options || {};
  if (propName === 'this') {
    return unwrap(obj, options);
  }
  return unwrap(obj[propName], options);
};
const assignPropValue = function (obj, propName, value, options) {
  if (propName === 'this') {
    // @ts-expect-error only void function can be called with new
    throw new _errors.default.Error('E4016');
  }
  const propValue = obj[propName];
  if (options.unwrapObservables && isWrapped(propValue)) {
    assign(propValue, value);
  } else {
    obj[propName] = value;
  }
};
const prepareOptions = function (options) {
  options = options || {};
  options.unwrapObservables = options.unwrapObservables !== undefined ? options.unwrapObservables : true;
  return options;
};
function unwrap(value, options) {
  return options.unwrapObservables ? unwrapVariable(value) : value;
}
const compileGetter = function (expr) {
  if (arguments.length > 1) {
    expr = [].slice.call(arguments);
  }
  if (!expr || expr === 'this') {
    return function (obj) {
      return obj;
    };
  }
  if (typeof expr === 'string') {
    const path = getPathParts(expr);
    return function (obj, options) {
      options = prepareOptions(options);
      const functionAsIs = options.functionsAsIs;
      const hasDefaultValue = 'defaultValue' in options;
      let current = unwrap(obj, options);
      for (let i = 0; i < path.length; i++) {
        if (!current) {
          if (current == null && hasDefaultValue) {
            return options.defaultValue;
          }
          break;
        }
        const pathPart = path[i];
        if (hasDefaultValue && (0, _type.isObject)(current) && !(pathPart in current)) {
          return options.defaultValue;
        }
        let next = unwrap(current[pathPart], options);
        if (!functionAsIs && (0, _type.isFunction)(next)) {
          next = next.call(current);
        }
        current = next;
      }
      return current;
    };
  }
  if (Array.isArray(expr)) {
    return combineGetters(expr);
  }
  if ((0, _type.isFunction)(expr)) {
    return expr;
  }
};
exports.compileGetter = compileGetter;
function combineGetters(getters) {
  const compiledGetters = {};
  for (let i = 0, l = getters.length; i < l; i++) {
    const getter = getters[i];
    compiledGetters[getter] = compileGetter(getter);
  }
  return function (obj, options) {
    let result;
    (0, _iterator.each)(compiledGetters, function (name) {
      const value = this(obj, options);
      if (value === undefined) {
        return;
      }
      let current = result || (result = {});
      const path = name.split('.');
      const last = path.length - 1;
      for (let i = 0; i < last; i++) {
        const pathItem = path[i];
        if (!(pathItem in current)) {
          current[pathItem] = {};
        }
        current = current[pathItem];
      }
      current[path[last]] = value;
    });
    return result;
  };
}
function toLowerCase(value, options) {
  return options !== null && options !== void 0 && options.locale ? value.toLocaleLowerCase(options.locale) : value.toLowerCase();
}
function toUpperCase(value, options) {
  return options !== null && options !== void 0 && options.locale ? value.toLocaleUpperCase(options.locale) : value.toUpperCase();
}
const ensurePropValueDefined = function (obj, propName, value, options) {
  if ((0, _type.isDefined)(value)) {
    return value;
  }
  const newValue = {};
  assignPropValue(obj, propName, newValue, options);
  return newValue;
};
const compileSetter = function (expr) {
  expr = getPathParts(expr || 'this');
  const lastLevelIndex = expr.length - 1;
  return function (obj, value, options) {
    options = prepareOptions(options);
    let currentValue = unwrap(obj, options);
    expr.forEach(function (propertyName, levelIndex) {
      let propertyValue = readPropValue(currentValue, propertyName, options);
      const isPropertyFunc = !options.functionsAsIs && (0, _type.isFunction)(propertyValue) && !isWrapped(propertyValue);
      if (levelIndex === lastLevelIndex) {
        if (options.merge && (0, _type.isPlainObject)(value) && (!(0, _type.isDefined)(propertyValue) || (0, _type.isPlainObject)(propertyValue))) {
          propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
          (0, _object.deepExtendArraySafe)(propertyValue, value, false, true);
        } else if (isPropertyFunc) {
          currentValue[propertyName](value);
        } else {
          assignPropValue(currentValue, propertyName, value, options);
        }
      } else {
        propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
        if (isPropertyFunc) {
          propertyValue = propertyValue.call(currentValue);
        }
        currentValue = propertyValue;
      }
    });
  };
};
exports.compileSetter = compileSetter;
const toComparable = function (value, caseSensitive) {
  var _options$collatorOpti;
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (value instanceof Date) {
    return value.getTime();
  }
  const collatorSensitivity = options === null || options === void 0 || (_options$collatorOpti = options.collatorOptions) === null || _options$collatorOpti === void 0 ? void 0 : _options$collatorOpti.sensitivity;
  if (value && value instanceof _class.default && value.valueOf) {
    value = value.valueOf();
  } else if (typeof value === 'string' && (collatorSensitivity === 'base' || collatorSensitivity === 'case')) {
    const REMOVE_DIACRITICAL_MARKS_REGEXP = /[\u0300-\u036f]/g;
    if (collatorSensitivity === 'base') {
      value = toLowerCase(value, options);
    }
    value = value.normalize('NFD').replace(REMOVE_DIACRITICAL_MARKS_REGEXP, '');
  }
  const isCaseSensitive = caseSensitive || collatorSensitivity === 'case' || collatorSensitivity === 'variant';
  if (typeof value === 'string' && !isCaseSensitive) {
    var _options$locale;
    const locale = options === null || options === void 0 || (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : _options$locale.toLowerCase();
    const useUpperCase = locale && !!['hy', 'el'].find(code => locale === code || locale.startsWith(`${code}-`));
    return (useUpperCase ? toUpperCase : toLowerCase)(value, options);
  }
  return value;
};
exports.toComparable = toComparable;
