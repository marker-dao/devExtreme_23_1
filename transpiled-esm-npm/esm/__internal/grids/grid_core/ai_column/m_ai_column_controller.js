import { Controller } from '../m_modules';
export class AiColumnController extends Controller {
  init() {
    this.dataController = this.getController('data');
    this.dataChangedHandler = this.handleDataChanged.bind(this);
    this.dataController.changed.add(this.dataChangedHandler);
    this.createAction('onAIColumnRequestCreating');
    this.createAction('onAIColumnResponseReceived');
  }
  createAIColumnRequest() {
    const options = {};
    this.executeAction('onAIColumnRequestCreating', options);
  }
  receiveAIColumnResponse() {
    const options = {};
    this.executeAction('onAIColumnResponseReceived', options);
  }
  handleDataChanged(e) {}
  showResult(columnName, data) {
    // TODO
  }
  // API methods
  publicMethods() {
    return ['abortAIColumnRequest', 'sendAIColumnRequest', 'refreshAIColumn', 'clearAIColumn', 'getAIColumnText'];
  }
  abortAIColumnRequest(columnName) {}
  sendAIColumnRequest(columnName) {}
  refreshAIColumn(columnName) {}
  clearAIColumn(columnName) {}
  getAIColumnText(columnName, key) {}
  dispose() {
    this.dataController.changed.remove(this.dataChangedHandler);
  }
}