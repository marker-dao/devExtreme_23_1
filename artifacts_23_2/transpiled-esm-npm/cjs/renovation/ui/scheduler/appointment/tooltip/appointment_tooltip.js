"use strict";

exports.AppointmentTooltipProps = exports.AppointmentTooltip = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _tooltip = require("../../../overlays/tooltip");
var _appointment_list = require("./appointment_list");
var _utils = require("../../../../../core/options/utils");
const _excluded = ["dataList", "onVisibleChange", "target", "visible"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const wrapperAttr = {
  class: 'dx-scheduler-appointment-tooltip-wrapper'
};
const viewFunction = _ref => {
  let {
    props: {
      dataList,
      onVisibleChange,
      target,
      visible
    }
  } = _ref;
  return (0, _inferno.createComponentVNode)(2, _tooltip.Tooltip, {
    "focusStateEnabled": false,
    "hideOnOutsideClick": true,
    "visible": visible,
    "visibleChange": onVisibleChange,
    "target": target,
    "wrapperAttr": wrapperAttr,
    children: (0, _inferno.createComponentVNode)(2, _appointment_list.AppointmentList, {
      "appointments": dataList
    })
  });
};
exports.viewFunction = viewFunction;
const AppointmentTooltipProps = {};
exports.AppointmentTooltipProps = AppointmentTooltipProps;
let AppointmentTooltip = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(AppointmentTooltip, _BaseInfernoComponent);
  function AppointmentTooltip(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = AppointmentTooltip.prototype;
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props),
      restAttributes: this.restAttributes
    });
  };
  _createClass(AppointmentTooltip, [{
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return AppointmentTooltip;
}(_inferno2.BaseInfernoComponent);
exports.AppointmentTooltip = AppointmentTooltip;
AppointmentTooltip.defaultProps = AppointmentTooltipProps;
const __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  AppointmentTooltip.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(AppointmentTooltip.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))));
}