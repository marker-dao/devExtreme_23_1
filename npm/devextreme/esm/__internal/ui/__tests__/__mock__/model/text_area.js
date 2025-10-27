/**
* DevExtreme (esm/__internal/ui/__tests__/__mock__/model/text_area.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const CLASSES = {
  textArea: 'dx-texteditor-input'
};
export class TextAreaModel {
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
