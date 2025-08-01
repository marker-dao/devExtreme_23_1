/**
* DevExtreme (cjs/__internal/ui/check_box/wrappers/validation_message.js)
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
exports.defaultValidationMessageProps = exports.ValidationMessage = void 0;
var _inferno = require("inferno");
var _validation_message = _interopRequireDefault(require("../../../../ui/validation_message"));
var _base_props = require("../../../core/r1/base_props");
var _dom_component_wrapper = require("../../../core/r1/dom_component_wrapper");
var _index = require("../../../core/r1/runtime/inferno/index");
const _excluded = ["accessKey", "activeStateEnabled", "boundary", "className", "contentId", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "mode", "offset", "onClick", "onKeyDown", "positionSide", "rtlEnabled", "tabIndex", "target", "validationErrors", "visible", "visualContainer", "width"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const defaultValidationMessageProps = exports.defaultValidationMessageProps = _extends({}, _base_props.BaseWidgetDefaultProps, {
  mode: 'auto',
  positionSide: 'top',
  offset: Object.freeze({
    h: 0,
    v: 0
  }),
  isReactComponentWrapper: true
});
class ValidationMessage extends _index.BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get restAttributes() {
    const _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  render() {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
      "componentType": _validation_message.default,
      "componentProps": this.props,
      "templateNames": []
    }, this.restAttributes)));
  }
}
exports.ValidationMessage = ValidationMessage;
ValidationMessage.defaultProps = defaultValidationMessageProps;
