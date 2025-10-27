/**
* DevExtreme (esm/__internal/ui/html_editor/formats/m_align.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
const AlignStyle = (Quill === null || Quill === void 0 ? void 0 : Quill.import('attributors/style/align')) || {};
if (Array.isArray(AlignStyle.whitelist)) {
  AlignStyle.whitelist.push('left');
}
export default AlignStyle;
