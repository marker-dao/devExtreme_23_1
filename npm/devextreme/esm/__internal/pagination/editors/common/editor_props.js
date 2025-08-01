/**
* DevExtreme (esm/__internal/pagination/editors/common/editor_props.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { BaseWidgetDefaultProps } from './base_widget_props';
import { WidgetDefaultProps } from './widget_props';
export const EditorDefaultProps = _extends({}, BaseWidgetDefaultProps, {
  aria: WidgetDefaultProps.aria,
  classes: WidgetDefaultProps.classes,
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
