"use strict";

exports.viewFunction = exports.ReducedIconTooltipProps = exports.ReducedIconTooltip = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _tooltip = require("../../../overlays/tooltip");
var _utils = require("../utils");
const _excluded = ["endDate", "target", "visible"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const wrapperAttr = {
  class: 'dx-scheduler-reduced-icon-tooltip'
};
const viewFunction = _ref => {
  let {
    props: {
      target,
      visible
    },
    text
  } = _ref;
  return (0, _inferno.createComponentVNode)(2, _tooltip.Tooltip, {
    "visible": visible,
    "target": target,
    "wrapperAttr": wrapperAttr,
    children: (0, _inferno.createFragment)(text, 0)
  });
};
exports.viewFunction = viewFunction;
const ReducedIconTooltipProps = {
  visible: false
};
exports.ReducedIconTooltipProps = ReducedIconTooltipProps;
let ReducedIconTooltip = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(ReducedIconTooltip, _BaseInfernoComponent);
  function ReducedIconTooltip(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = ReducedIconTooltip.prototype;
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props),
      text: this.text,
      restAttributes: this.restAttributes
    });
  };
  _createClass(ReducedIconTooltip, [{
    key: "text",
    get: function () {
      return (0, _utils.getReducedIconTooltipText)(this.props.endDate);
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return ReducedIconTooltip;
}(_inferno2.BaseInfernoComponent);
exports.ReducedIconTooltip = ReducedIconTooltip;
ReducedIconTooltip.defaultProps = ReducedIconTooltipProps;