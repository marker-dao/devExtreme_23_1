/**
* DevExtreme (esm/ui/html_editor/formats/size.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
var SizeStyle = {};
if (Quill) {
  SizeStyle = Quill.import('attributors/style/size');
  SizeStyle.whitelist = null;
}
export default SizeStyle;