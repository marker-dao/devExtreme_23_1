"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorDefaultProps = void 0;
var _base_widget_props = require("./base_widget_props");
var _widget_props = require("./widget_props");
const EditorDefaultProps = exports.EditorDefaultProps = Object.assign({}, _base_widget_props.BaseWidgetDefaultProps, {
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