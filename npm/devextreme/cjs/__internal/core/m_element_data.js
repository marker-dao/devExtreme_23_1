/**
* DevExtreme (cjs/__internal/core/m_element_data.js)
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
exports.afterCleanData = afterCleanData;
exports.beforeCleanData = beforeCleanData;
exports.cleanData = cleanData;
exports.cleanDataRecursive = cleanDataRecursive;
exports.data = data;
exports.getDataStrategy = getDataStrategy;
exports.removeData = removeData;
exports.strategyChanging = exports.setDataStrategy = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _memorized_callbacks = _interopRequireDefault(require("../../core/memorized_callbacks"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable object-shorthand */

const dataMap = new WeakMap();
let strategy;
const strategyChanging = exports.strategyChanging = new _memorized_callbacks.default();
let beforeCleanDataFunc = function () {};
let afterCleanDataFunc = function () {};
const setDataStrategy = function (value) {
  strategyChanging.fire(value);
  strategy = value;
  const {
    cleanData
  } = strategy;
  strategy.cleanData = function (nodes) {
    beforeCleanDataFunc(nodes);
    const result = cleanData.call(this, nodes);
    afterCleanDataFunc(nodes);
    return result;
  };
};
exports.setDataStrategy = setDataStrategy;
setDataStrategy({
  data: function () {
    const element = arguments.length <= 0 ? undefined : arguments[0];
    const key = arguments.length <= 1 ? undefined : arguments[1];
    const value = arguments.length <= 2 ? undefined : arguments[2];
    if (!element) return;
    let elementData = dataMap.get(element);
    if (!elementData) {
      elementData = {};
      dataMap.set(element, elementData);
    }
    if (key === undefined) {
      return elementData;
    }
    if (arguments.length === 2) {
      return elementData[key];
    }
    elementData[key] = value;
    return value;
  },
  removeData: function (element, key) {
    if (!element) return;
    if (key === undefined) {
      dataMap.delete(element);
    } else {
      const elementData = dataMap.get(element);
      if (elementData) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete elementData[key];
      }
    }
  },
  cleanData: function (elements) {
    for (let i = 0; i < elements.length; i++) {
      _events_engine.default.off(elements[i]);
      dataMap.delete(elements[i]);
    }
  }
});
function getDataStrategy() {
  return strategy;
}
function data() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return strategy.data.apply(this, args);
}
function beforeCleanData(callback) {
  beforeCleanDataFunc = callback;
}
function afterCleanData(callback) {
  afterCleanDataFunc = callback;
}
function cleanData(nodes) {
  return strategy.cleanData.call(this, nodes);
}
function removeData(element, key) {
  return strategy.removeData.call(this, element, key);
}
function cleanDataRecursive(element, cleanSelf) {
  if (!_dom_adapter.default.isElementNode(element)) {
    return;
  }
  const childElements = element.getElementsByTagName('*');
  strategy.cleanData(childElements);
  if (cleanSelf) {
    strategy.cleanData([element]);
  }
}
