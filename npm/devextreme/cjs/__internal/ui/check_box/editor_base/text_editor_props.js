/**
* DevExtreme (cjs/__internal/ui/check_box/editor_base/text_editor_props.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTextEditorProps = void 0;
var _themes = require("../../../../ui/themes");
const defaultTextEditorProps = exports.defaultTextEditorProps = {
  maxLength: null,
  spellCheck: false,
  valueChangeEvent: 'change',
  stylingMode: (0, _themes.isMaterial)((0, _themes.current)()) ? 'filled' : 'outlined',
  defaultValue: ''
};
