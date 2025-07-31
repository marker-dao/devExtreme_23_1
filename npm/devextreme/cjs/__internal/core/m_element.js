/**
* DevExtreme (cjs/__internal/core/m_element.js)
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
exports.getPublicElement = getPublicElement;
exports.getPublicElementNonJquery = getPublicElementNonJquery;
exports.setPublicElementWrapper = setPublicElementWrapper;
function getPublicElementNonJquery(element) {
  if (element && element.get) {
    return element.get(0);
  }
  return element;
}
let strategy = getPublicElementNonJquery;
function getPublicElement(element) {
  return strategy(element);
}
function setPublicElementWrapper(newStrategy) {
  strategy = newStrategy;
}
