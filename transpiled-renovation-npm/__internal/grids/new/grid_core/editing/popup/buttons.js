"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCancelButtonConfig = getCancelButtonConfig;
exports.getSaveButtonConfig = getSaveButtonConfig;
var _themes = require("../../../../../../ui/themes");
function getSaveButtonConfig(props) {
  const config = {
    toolbar: 'bottom',
    location: 'after',
    widget: 'dxButton',
    options: {
      text: props.text,
      onClick: props.onSave
    }
  };
  if ((0, _themes.isFluent)((0, _themes.current)())) {
    config.options.stylingMode = 'contained';
    config.options.type = 'default';
  }
  return config;
}
function getCancelButtonConfig(props) {
  const config = {
    toolbar: 'bottom',
    location: 'after',
    widget: 'dxButton',
    options: {
      text: props.text,
      onClick: props.onCancel
    }
  };
  if ((0, _themes.isFluent)((0, _themes.current)())) {
    config.options.stylingMode = 'outlined';
  }
  return config;
}