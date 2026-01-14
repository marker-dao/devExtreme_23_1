import { ViewController } from '../../m_modules';
export class AIPromptEditorViewController extends ViewController {
  init() {
    this.aiPromptEditorView = this.getView('aiPromptEditorView');
  }
  show(cellElement, column) {
    return this.aiPromptEditorView.show(cellElement, column);
  }
  hide() {
    return this.aiPromptEditorView.hide();
  }
}