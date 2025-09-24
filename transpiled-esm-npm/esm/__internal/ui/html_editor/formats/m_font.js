import Quill from 'devextreme-quill';
const FontStyle = (Quill === null || Quill === void 0 ? void 0 : Quill.import('attributors/style/font')) || {};
if ('whitelist' in FontStyle) {
  FontStyle.whitelist = null;
}
export default FontStyle;