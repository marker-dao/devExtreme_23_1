"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiColumnController = void 0;
var _m_modules = require("../m_modules");
class AiColumnController extends _m_modules.Controller {
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
exports.AiColumnController = AiColumnController;