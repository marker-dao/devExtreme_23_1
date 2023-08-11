"use strict";

exports.EndDateEditorProps = exports.EndDateEditor = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _normalizeDate = require("../utils/normalizeDate");
var _dateEditor = require("./dateEditor");
var _utils = require("../../../../../../core/options/utils");
var _excluded = ["dateChange", "disabled", "endDate", "firstDayOfWeek", "isAllDay", "startDate", "value"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
    disabled = _ref$props.disabled,
    firstDayOfWeek = _ref$props.firstDayOfWeek,
    isAllDay = _ref$props.isAllDay,
    value = _ref$props.value,
    valueChange = _ref.valueChange;
  return (0, _inferno.createComponentVNode)(2, _dateEditor.DateEditor, {
    "value": value,
    "valueChange": valueChange,
    "firstDayOfWeek": firstDayOfWeek,
    "disabled": disabled,
    "isAllDay": isAllDay
  });
};
exports.viewFunction = viewFunction;
var EndDateEditorProps = {};
exports.EndDateEditorProps = EndDateEditorProps;
var EndDateEditor = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(EndDateEditor, _BaseInfernoComponent);
  function EndDateEditor(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.valueChange = _this.valueChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = EndDateEditor.prototype;
  _proto.valueChange = function valueChange(newDate) {
    var result = (0, _normalizeDate.normalizeNewEndDate)(newDate, this.props.startDate, this.props.endDate);
    this.props.dateChange(result);
    return result;
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      valueChange: this.valueChange,
      restAttributes: this.restAttributes
    });
  };
  _createClass(EndDateEditor, [{
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        dateChange = _this$props.dateChange,
        disabled = _this$props.disabled,
        endDate = _this$props.endDate,
        firstDayOfWeek = _this$props.firstDayOfWeek,
        isAllDay = _this$props.isAllDay,
        startDate = _this$props.startDate,
        value = _this$props.value,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return EndDateEditor;
}(_inferno2.BaseInfernoComponent);
exports.EndDateEditor = EndDateEditor;
EndDateEditor.defaultProps = EndDateEditorProps;
var __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  EndDateEditor.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(EndDateEditor.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))));
}