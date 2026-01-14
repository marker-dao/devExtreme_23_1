/**
* DevExtreme (esm/__internal/ui/html_editor/formats/m_align.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
const AlignStyle = (Quill === null || Quill === void 0 ? void 0 : Quill.import('attributors/style/align')) || {};
if (Array.isArray(AlignStyle.whitelist)) {
  AlignStyle.whitelist.push('left');
}
export default AlignStyle;
