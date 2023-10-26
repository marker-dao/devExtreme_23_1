/**
* DevExtreme (cjs/core/element.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getPublicElement = getPublicElement;
exports.setPublicElementWrapper = setPublicElementWrapper;
let strategy = function (element) {
  return element && element.get(0);
};
function getPublicElement(element) {
  return strategy(element);
}
function setPublicElementWrapper(newStrategy) {
  strategy = newStrategy;
}
