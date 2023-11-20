/**
* DevExtreme (renovation/ui/scheduler/appointment/content/layout.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.AppointmentContentProps = exports.AppointmentContent = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _layout = require("./details/layout");
var _layout2 = require("./title/layout");
const _excluded = ["appointmentTemplate", "data", "dateText", "hideReducedIconTooltip", "index", "isRecurrent", "isReduced", "showReducedIconTooltip", "text"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const viewFunction = _ref => {
  let {
    props: {
      appointmentTemplate,
      data,
      dateText,
      index,
      isRecurrent,
      isReduced,
      text
    },
    refReducedIcon
  } = _ref;
  const AppointmentTemplate = appointmentTemplate;
  return (0, _inferno.createVNode)(1, "div", "dx-scheduler-appointment-content", appointmentTemplate ? AppointmentTemplate({
    data: data,
    index: index
  }) : (0, _inferno.createFragment)([(0, _inferno.createComponentVNode)(2, _layout2.AppointmentTitle, {
    "text": text
  }), (0, _inferno.createComponentVNode)(2, _layout.AppointmentDetails, {
    "dateText": dateText
  }), isRecurrent && (0, _inferno.createVNode)(1, "div", "dx-scheduler-appointment-recurrence-icon dx-icon-repeat"), isReduced && (0, _inferno.createVNode)(1, "div", "dx-scheduler-appointment-reduced-icon", null, 1, null, null, refReducedIcon)], 0), 0);
};
exports.viewFunction = viewFunction;
const AppointmentContentProps = {
  text: '',
  dateText: '',
  isRecurrent: false,
  isReduced: false,
  index: 0
};
exports.AppointmentContentProps = AppointmentContentProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let AppointmentContent = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(AppointmentContent, _InfernoComponent);
  function AppointmentContent(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.refReducedIcon = (0, _inferno.createRef)();
    _this.bindHoverEffect = _this.bindHoverEffect.bind(_assertThisInitialized(_this));
    _this.onReducedIconMouseEnter = _this.onReducedIconMouseEnter.bind(_assertThisInitialized(_this));
    _this.onReducedIconMouseLeave = _this.onReducedIconMouseLeave.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = AppointmentContent.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.bindHoverEffect, [this.props.showReducedIconTooltip, this.props.data, this.props.hideReducedIconTooltip])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.showReducedIconTooltip, this.props.data, this.props.hideReducedIconTooltip]);
  };
  _proto.bindHoverEffect = function bindHoverEffect() {
    var _this$refReducedIcon$, _this$refReducedIcon$2;
    const onMouseEnter = () => this.onReducedIconMouseEnter();
    const onMouseLeave = () => this.onReducedIconMouseLeave();
    (_this$refReducedIcon$ = this.refReducedIcon.current) === null || _this$refReducedIcon$ === void 0 ? void 0 : _this$refReducedIcon$.addEventListener('mouseenter', onMouseEnter);
    (_this$refReducedIcon$2 = this.refReducedIcon.current) === null || _this$refReducedIcon$2 === void 0 ? void 0 : _this$refReducedIcon$2.addEventListener('mouseleave', onMouseLeave);
    return () => {
      var _this$refReducedIcon$3, _this$refReducedIcon$4;
      (_this$refReducedIcon$3 = this.refReducedIcon.current) === null || _this$refReducedIcon$3 === void 0 ? void 0 : _this$refReducedIcon$3.removeEventListener('mouseenter', onMouseEnter);
      (_this$refReducedIcon$4 = this.refReducedIcon.current) === null || _this$refReducedIcon$4 === void 0 ? void 0 : _this$refReducedIcon$4.removeEventListener('mouseleave', onMouseLeave);
    };
  };
  _proto.onReducedIconMouseEnter = function onReducedIconMouseEnter() {
    this.props.showReducedIconTooltip({
      target: this.refReducedIcon.current,
      endDate: this.props.data.appointmentData.endDate
    });
  };
  _proto.onReducedIconMouseLeave = function onReducedIconMouseLeave() {
    this.props.hideReducedIconTooltip();
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        appointmentTemplate: getTemplate(props.appointmentTemplate)
      }),
      refReducedIcon: this.refReducedIcon,
      onReducedIconMouseEnter: this.onReducedIconMouseEnter,
      onReducedIconMouseLeave: this.onReducedIconMouseLeave,
      restAttributes: this.restAttributes
    });
  };
  _createClass(AppointmentContent, [{
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return AppointmentContent;
}(_inferno2.InfernoComponent);
exports.AppointmentContent = AppointmentContent;
AppointmentContent.defaultProps = AppointmentContentProps;
