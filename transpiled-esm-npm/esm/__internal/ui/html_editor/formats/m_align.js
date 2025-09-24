import Quill from 'devextreme-quill';
const AlignStyle = (Quill === null || Quill === void 0 ? void 0 : Quill.import('attributors/style/align')) || {};
if (Array.isArray(AlignStyle.whitelist)) {
  AlignStyle.whitelist.push('left');
}
export default AlignStyle;