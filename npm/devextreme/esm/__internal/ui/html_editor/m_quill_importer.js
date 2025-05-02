/**
* DevExtreme (esm/__internal/ui/html_editor/m_quill_importer.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Errors from '../../../ui/widget/ui.errors';
import Quill from 'devextreme-quill';
export function getQuill() {
  if (!Quill) {
    throw Errors.Error('E1041', 'Quill');
  }
  return Quill;
}
