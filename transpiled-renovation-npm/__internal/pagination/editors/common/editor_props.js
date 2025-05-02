"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorDefaultProps = void 0;
var _base_widget_props = require("./base_widget_props");
var _widget_props = require("./widget_props");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const EditorDefaultProps = exports.EditorDefaultProps = _extends({}, _base_widget_props.BaseWidgetDefaultProps, {
  aria: _widget_props.WidgetDefaultProps.aria,
  classes: _widget_props.WidgetDefaultProps.classes,
  readOnly: false,
  name: '',
  value: null,
  validationError: null,
  validationErrors: null,
  validationMessageMode: 'auto',
  validationMessagePosition: 'bottom',
  validationStatus: 'valid',
  isValid: true,
  isDirty: false,
  inputAttr: {}
});