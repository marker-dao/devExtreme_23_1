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