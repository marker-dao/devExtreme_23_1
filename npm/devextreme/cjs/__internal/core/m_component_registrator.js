/**
* DevExtreme (cjs/__internal/core/m_component_registrator.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerComponent = void 0;
var _component_registrator_callbacks = _interopRequireDefault(require("../../core/component_registrator_callbacks"));
var _errors = _interopRequireDefault(require("../../core/errors"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _public_component = require("../../core/utils/public_component");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const registerComponent = function (name, namespace, componentClass) {
  if (!componentClass) {
    componentClass = namespace;
  } else {
    namespace[name] = componentClass;
  }
  (0, _public_component.name)(componentClass, name);
  _component_registrator_callbacks.default.fire(name, componentClass);
};
exports.registerComponent = registerComponent;
const registerRendererComponent = function (name, componentClass) {
  // @ts-expect-error 'fn' does not exist on type '(selector?: string | Element | dxElementWrapper | undefined) => dxElementWrapper'
  _renderer.default.fn[name] = function (options) {
    const isMemberInvoke = typeof options === 'string';
    let result;
    if (isMemberInvoke) {
      const memberName = options;
      const memberArgs = [].slice.call(arguments).slice(1);
      this.each(function () {
        const instance = componentClass.getInstance(this);
        if (!instance) {
          throw _errors.default.Error('E0009', name);
        }
        const member = instance[memberName];
        const memberValue = member.apply(instance, memberArgs);
        if (result === undefined) {
          result = memberValue;
        }
      });
    } else {
      this.each(function () {
        const instance = componentClass.getInstance(this);
        if (instance) {
          instance.option(options);
        } else {
          // eslint-disable-next-line new-cap, no-new
          new componentClass(this, options);
        }
      });
      result = this;
    }
    return result;
  };
};
_component_registrator_callbacks.default.add(registerRendererComponent);
