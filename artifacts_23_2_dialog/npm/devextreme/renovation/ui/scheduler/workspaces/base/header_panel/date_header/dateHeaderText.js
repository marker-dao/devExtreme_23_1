/**
* DevExtreme (renovation/ui/scheduler/workspaces/base/header_panel/date_header/dateHeaderText.js)
* Version: 23.2.0
* Build date: Tue Aug 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.DateHeaderTextProps = exports.DateHeaderText = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _excluded = ["splitText", "text"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
    splitText = _ref$props.splitText,
    text = _ref$props.text,
    textParts = _ref.textParts;
  return (0, _inferno.createFragment)(splitText ? textParts.map(function (part) {
    return (0, _inferno.createVNode)(1, "span", "dx-scheduler-header-panel-cell-date", part, 0);
  }) : text, 0);
};
exports.viewFunction = viewFunction;
var DateHeaderTextProps = {
  text: '',
  splitText: false
};
exports.DateHeaderTextProps = DateHeaderTextProps;
var DateHeaderText = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(DateHeaderText, _BaseInfernoComponent);
  function DateHeaderText(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.__getterCache = {};
    return _this;
  }
  var _proto = DateHeaderText.prototype;
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props['text'] !== nextProps['text']) {
      this.__getterCache['textParts'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      textParts: this.textParts,
      restAttributes: this.restAttributes
    });
  };
  _createClass(DateHeaderText, [{
    key: "textParts",
    get: function get() {
      var _this2 = this;
      if (this.__getterCache['textParts'] !== undefined) {
        return this.__getterCache['textParts'];
      }
      return this.__getterCache['textParts'] = function () {
        var text = _this2.props.text;
        return text ? text.split(' ') : [''];
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        splitText = _this$props.splitText,
        text = _this$props.text,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return DateHeaderText;
}(_inferno2.BaseInfernoComponent);
exports.DateHeaderText = DateHeaderText;
DateHeaderText.defaultProps = DateHeaderTextProps;