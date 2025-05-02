/**
* DevExtreme (cjs/common/data/custom_store.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "CustomStore", {
  enumerable: true,
  get: function () {
    return _m_custom_store.default;
  }
});
exports.isGroupItemsArray = isGroupItemsArray;
exports.isItemsArray = isItemsArray;
exports.isLoadResultObject = isLoadResultObject;
var _m_custom_store = _interopRequireDefault(require("../../__internal/data/m_custom_store"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isGroupItem(item) {
  if (item === undefined || item === null || typeof item !== 'object') {
    return false;
  }
  return 'key' in item && 'items' in item;
}
function isLoadResultObject(res) {
  return !Array.isArray(res) && 'data' in res;
}
function isGroupItemsArray(res) {
  return Array.isArray(res) && !!res.length && isGroupItem(res[0]);
}
function isItemsArray(res) {
  return Array.isArray(res) && !isGroupItem(res[0]);
}
