/**
* DevExtreme (cjs/__internal/core/utils/m_public_component.js)
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
exports.attachInstanceToElement = attachInstanceToElement;
exports.default = void 0;
exports.getInstanceByElement = getInstanceByElement;
exports.name = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _remove = require("../../../common/core/events/remove");
var _element_data = require("../../../core/element_data");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const COMPONENT_NAMES_DATA_KEY = 'dxComponents';
const ANONYMOUS_COMPONENT_DATA_KEY = 'dxPrivateComponent';
const componentNames = new WeakMap();
let nextAnonymousComponent = 0;
const getName = function (componentClass, newName) {
  if ((0, _type.isDefined)(newName)) {
    componentNames.set(componentClass, newName);
    return;
  }
  if (!componentNames.has(componentClass)) {
    const generatedName = ANONYMOUS_COMPONENT_DATA_KEY + nextAnonymousComponent++;
    componentNames.set(componentClass, generatedName);
    return generatedName;
  }
  return componentNames.get(componentClass);
};
exports.name = getName;
function attachInstanceToElement($element, componentInstance, disposeFn) {
  const data = (0, _element_data.data)($element.get(0));
  const name = getName(componentInstance.constructor);
  data[name] = componentInstance;
  if (disposeFn) {
    _events_engine.default.one($element, _remove.removeEvent, function () {
      disposeFn.call(componentInstance);
    });
  }
  if (!data[COMPONENT_NAMES_DATA_KEY]) {
    data[COMPONENT_NAMES_DATA_KEY] = [];
  }
  data[COMPONENT_NAMES_DATA_KEY].push(name);
}
function getInstanceByElement($element, componentClass) {
  const name = getName(componentClass);
  return (0, _element_data.data)($element.get(0), name);
}
var _default = exports.default = {
  name: getName
};
