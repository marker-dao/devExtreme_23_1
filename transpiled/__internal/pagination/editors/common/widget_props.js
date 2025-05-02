"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetDefaultProps = void 0;
var _base_props = require("../../../core/r1/base_props");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DEFAULT_FEEDBACK_HIDE_TIMEOUT = 400;
const DEFAULT_FEEDBACK_SHOW_TIMEOUT = 30;
const WidgetDefaultProps = exports.WidgetDefaultProps = _extends({}, _base_props.BaseWidgetDefaultProps, {
  _feedbackHideTimeout: DEFAULT_FEEDBACK_HIDE_TIMEOUT,
  _feedbackShowTimeout: DEFAULT_FEEDBACK_SHOW_TIMEOUT,
  cssText: '',
  aria: {},
  classes: '',
  name: '',
  addWidgetClass: true
});