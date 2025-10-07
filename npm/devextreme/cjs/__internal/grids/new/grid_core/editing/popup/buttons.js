/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/popup/buttons.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
