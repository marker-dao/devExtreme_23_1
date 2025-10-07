/**
* DevExtreme (esm/__internal/ui/check_box/editor_base/editor_label_props.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { current, isMaterial } from '../../../../ui/themes';
export const defaultEditorLabelProps = {
  label: '',
  labelMode: isMaterial(current()) ? 'floating' : 'static'
};
