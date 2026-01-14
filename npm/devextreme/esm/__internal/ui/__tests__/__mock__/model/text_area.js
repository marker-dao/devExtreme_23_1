/**
* DevExtreme (esm/__internal/ui/__tests__/__mock__/model/text_area.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import TextArea from '../../../../ui/m_text_area';
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
  getInstance() {
    return TextArea.getInstance(this.root);
  }
}
