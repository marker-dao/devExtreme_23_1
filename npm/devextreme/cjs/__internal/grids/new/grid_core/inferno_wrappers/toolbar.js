/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/toolbar.js)
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
exports.Toolbar = void 0;
require("../../../../../ui/button");
require("../../../../../ui/check_box");
var _toolbar = _interopRequireDefault(require("../../../../../ui/toolbar"));
var _widget_wrapper = require("./widget_wrapper");
const _excluded = ["items"];
/* eslint-disable @typescript-eslint/no-non-null-assertion */
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const excludedStateOptions = ['onInput', 'inputAttr', 'elementAttr'];
class Toolbar extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _toolbar.default;
  }
  updateComponentOptions(prevProps, props) {
    if (Array.isArray(props.items) && Array.isArray(prevProps.items) && props.items.length === prevProps.items.length) {
      var _props$items;
      (_props$items = props.items) === null || _props$items === void 0 || _props$items.forEach((item, index) => {
        if (props.items[index] !== prevProps.items[index]) {
          const prevItem = prevProps.items[index];
          Object.keys(item).forEach(key => {
            if (item[key] !== prevItem[key]) {
              if (key !== 'options') {
                var _this$component;
                (_this$component = this.component) === null || _this$component === void 0 || _this$component.option(`items[${index}].${key}`, props.items[index][key]);
              } else {
                const prevOptions = prevItem[key];
                const currentOptions = item[key];
                Object.keys(currentOptions).forEach(option => {
                  const isOptionChanged = !(prevOptions !== null && prevOptions !== void 0 && prevOptions[option]) || (currentOptions === null || currentOptions === void 0 ? void 0 : currentOptions[option]) !== prevOptions[option];
                  const isExcludedOption = excludedStateOptions.includes(option);
                  if (isOptionChanged && !isExcludedOption) {
                    var _this$component2;
                    (_this$component2 = this.component) === null || _this$component2 === void 0 || _this$component2.option(`items[${index}].${key}.${option}`, props.items[index][key][option]);
                  }
                });
              }
            }
          });
        }
      });
      const propsToUpdate = _objectWithoutPropertiesLoose(props, _excluded);
      super.updateComponentOptions(prevProps, propsToUpdate);
    } else {
      super.updateComponentOptions(prevProps, props);
    }
  }
}
exports.Toolbar = Toolbar;
