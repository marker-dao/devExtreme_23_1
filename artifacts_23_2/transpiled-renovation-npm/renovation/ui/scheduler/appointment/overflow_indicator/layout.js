"use strict";

exports.viewFunction = exports.OverflowIndicatorProps = exports.OverflowIndicator = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _combine_classes = require("../../../../utils/combine_classes");
var _button = require("../../../button");
var _utils = require("./utils");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _appointments_context = require("../../appointments_context");
var _utils2 = require("../utils");
const _excluded = ["groups", "overflowIndicatorTemplate", "viewModel"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    classes,
    data,
    props: {
      overflowIndicatorTemplate: OverflowIndicatorTemplate
    },
    styles,
    text
  } = _ref;
  return (0, _inferno.createComponentVNode)(2, _button.Button, {
    "style": (0, _inferno2.normalizeStyles)(styles),
    "className": classes,
    "type": "default",
    "stylingMode": "contained",
    children: OverflowIndicatorTemplate ? OverflowIndicatorTemplate({
      data: data
    }) : (0, _inferno.createVNode)(1, "span", null, text, 0)
  });
};
exports.viewFunction = viewFunction;
const OverflowIndicatorProps = {};
exports.OverflowIndicatorProps = OverflowIndicatorProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let OverflowIndicator = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(OverflowIndicator, _InfernoComponent);
  function OverflowIndicator(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {
      color: undefined
    };
    _this.updateStylesEffect = _this.updateStylesEffect.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = OverflowIndicator.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.updateStylesEffect, [this.props.groups, this.props.viewModel, this.appointmentsContextValue])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.groups, this.props.viewModel, this.appointmentsContextValue]);
  };
  _proto.updateStylesEffect = function updateStylesEffect() {
    const {
      groups,
      viewModel
    } = this.props;
    (0, _utils.getIndicatorColor)(this.appointmentsContextValue, viewModel, groups).then(color => {
      this.setState(__state_argument => ({
        color: color
      }));
    });
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        overflowIndicatorTemplate: getTemplate(props.overflowIndicatorTemplate)
      }),
      color: this.state.color,
      appointmentsContextValue: this.appointmentsContextValue,
      data: this.data,
      text: this.text,
      appointmentStyles: this.appointmentStyles,
      styles: this.styles,
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };
  _createClass(OverflowIndicator, [{
    key: "appointmentsContextValue",
    get: function () {
      if (this.context[_appointments_context.AppointmentsContext.id]) {
        return this.context[_appointments_context.AppointmentsContext.id];
      }
      return _appointments_context.AppointmentsContext.defaultValue;
    }
  }, {
    key: "data",
    get: function () {
      return {
        appointmentCount: this.props.viewModel.items.settings.length,
        isCompact: this.props.viewModel.isCompact
      };
    }
  }, {
    key: "text",
    get: function () {
      const {
        isCompact
      } = this.props.viewModel;
      const {
        appointmentCount
      } = this.data;
      if (isCompact) {
        return "".concat(appointmentCount);
      }
      const formatter = _message.default.getFormatter('dxScheduler-moreAppointments');
      return formatter(appointmentCount);
    }
  }, {
    key: "appointmentStyles",
    get: function () {
      return (0, _utils.getOverflowIndicatorStyles)(this.props.viewModel);
    }
  }, {
    key: "styles",
    get: function () {
      return (0, _utils2.mergeStylesWithColor)(this.state.color, this.appointmentStyles);
    }
  }, {
    key: "classes",
    get: function () {
      return (0, _combine_classes.combineClasses)({
        'dx-scheduler-appointment-collector': true,
        'dx-scheduler-appointment-collector-compact': this.data.isCompact
      });
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return OverflowIndicator;
}(_inferno2.InfernoComponent);
exports.OverflowIndicator = OverflowIndicator;
OverflowIndicator.defaultProps = OverflowIndicatorProps;