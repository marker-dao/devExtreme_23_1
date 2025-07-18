/**
* DevExtreme (esm/__internal/ui/html_editor/formats/m_size.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
// eslint-disable-next-line import/no-mutable-exports
let SizeStyle = {};
if (Quill) {
  SizeStyle = Quill.import('attributors/style/size');
  // @ts-expect-error
  SizeStyle.whitelist = null;
}
export default SizeStyle;
