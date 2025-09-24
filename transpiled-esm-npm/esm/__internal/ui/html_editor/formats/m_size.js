import Quill from 'devextreme-quill';
const SizeStyle = (Quill === null || Quill === void 0 ? void 0 : Quill.import('attributors/style/size')) || {};
if ('whitelist' in SizeStyle) {
  SizeStyle.whitelist = null;
}
export default SizeStyle;