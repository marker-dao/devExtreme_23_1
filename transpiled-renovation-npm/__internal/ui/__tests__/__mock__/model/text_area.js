"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextAreaModel = void 0;
var _m_text_area = _interopRequireDefault(require("../../../../ui/m_text_area"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CLASSES = {
  textArea: 'dx-texteditor-input'
};
class TextAreaModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getInputElement() {
    return this.root.querySelector(`.${CLASSES.textArea}`);
  }
  setValue(value) {
    const input = this.getInputElement();
    input.value = value;
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
  }
  getInstance() {
    return _m_text_area.default.getInstance(this.root);
  }
}
exports.TextAreaModel = TextAreaModel;