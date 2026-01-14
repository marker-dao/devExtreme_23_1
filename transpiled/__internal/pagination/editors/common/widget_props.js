"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetDefaultProps = void 0;
var _base_props = require("../../../core/r1/base_props");
const DEFAULT_FEEDBACK_HIDE_TIMEOUT = 400;
const DEFAULT_FEEDBACK_SHOW_TIMEOUT = 30;
const WidgetDefaultProps = exports.WidgetDefaultProps = Object.assign({}, _base_props.BaseWidgetDefaultProps, {
  _feedbackHideTimeout: DEFAULT_FEEDBACK_HIDE_TIMEOUT,
  _feedbackShowTimeout: DEFAULT_FEEDBACK_SHOW_TIMEOUT,
  cssText: '',
  aria: {},
  classes: '',
  name: '',
  addWidgetClass: true
});