/**
* DevExtreme (esm/__internal/ui/html_editor/converters/m_delta.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ConverterController from '../m_converterController';
class DeltaConverter {
  constructor() {
    this.quillInstance = null;
  }
  setQuillInstance(quillInstance) {
    this.quillInstance = quillInstance;
  }
  toHtml() {
    if (!this.quillInstance) {
      return undefined;
    }
    return this._isQuillEmpty() ? '' : this.quillInstance.getSemanticHTML(0, this.quillInstance.getLength() + 1);
  }
  _isQuillEmpty() {
    if (!this.quillInstance) {
      return true;
    }
    const delta = this.quillInstance.getContents();
    return delta.length() === 1 && DeltaConverter._isDeltaEmpty(delta);
  }
  static _isDeltaEmpty(delta) {
    return delta.reduce((_, operation) => {
      if (typeof operation.insert === 'string') {
        return operation.insert.includes('\n');
      }
      return false;
    }, false);
  }
}
ConverterController.addConverter('delta', DeltaConverter);
export default DeltaConverter;
