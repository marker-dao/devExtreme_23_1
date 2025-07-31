/**
* DevExtreme (esm/__internal/ui/check_box/editor_base/text_editor_props.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { current, isMaterial } from '../../../../ui/themes';
export const defaultTextEditorProps = {
  maxLength: null,
  spellCheck: false,
  valueChangeEvent: 'change',
  stylingMode: isMaterial(current()) ? 'filled' : 'outlined',
  defaultValue: ''
};
