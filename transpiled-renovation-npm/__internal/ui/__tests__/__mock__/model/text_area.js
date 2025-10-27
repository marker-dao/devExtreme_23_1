"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextAreaModel = void 0;
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
}
exports.TextAreaModel = TextAreaModel;