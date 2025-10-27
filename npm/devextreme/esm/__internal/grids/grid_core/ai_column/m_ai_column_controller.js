/**
* DevExtreme (esm/__internal/grids/grid_core/ai_column/m_ai_column_controller.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Controller } from '../m_modules';
import { AIColumnIntegrationController } from './m_ai_column_integration_controller';
import { isAIColumnAutoMode } from './utils';
export class AIColumnController extends Controller {
  callbackNames() {
    return ['aiRequestCompleted', 'aiRequestRejected'];
  }
  init() {
    this.columnsController = this.getController('columns');
    this.dataController = this.getController('data');
    this.aiColumnIntegrationController = new AIColumnIntegrationController(this.component);
    this.aiColumnIntegrationController.init();
    this.dataChangedHandler = this.handleDataChanged.bind(this);
    this.dataController.changed.add(this.dataChangedHandler);
  }
  showResults(columnName, result, cachedData) {
    // Update the results in the UI or internal state
  }
  handleDataChanged(e) {
    const aiColumns = this.columnsController.getColumns().filter(col => col.type === 'ai' && isAIColumnAutoMode(col));
    for (const col of aiColumns) {
      this.refreshAIColumn(col.name);
    }
  }
  // API methods
  publicMethods() {
    return ['abortAIColumnRequest', 'sendAIColumnRequest', 'refreshAIColumn', 'clearAIColumn', 'getAIColumnText'];
  }
  abortAIColumnRequest(columnName) {
    this.aiColumnIntegrationController.abortRequest(columnName);
  }
  sendAIColumnRequest(columnName) {
    this.aiColumnIntegrationController.sendRequest(columnName, true, this.getRequestCallbacks());
  }
  refreshAIColumn(columnName) {
    this.sendAIColumnRequest(columnName);
  }
  getRequestCallbacks() {
    return {
      onComplete: data => {
        this.aiRequestCompleted.fire(data);
      },
      onError: error => {
        this.aiRequestRejected.fire(error);
      }
    };
  }
  clearAIColumn(columnName) {
    this.aiColumnIntegrationController.abortRequest(columnName);
  }
  getAIColumnText(columnName, key) {}
  dispose() {
    this.dataController.changed.remove(this.dataChangedHandler);
  }
}
