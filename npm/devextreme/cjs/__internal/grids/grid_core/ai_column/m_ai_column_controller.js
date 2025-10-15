/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/m_ai_column_controller.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiColumnController = void 0;
var _m_modules = require("../m_modules");
var _m_ai_column_cache_controller = require("./m_ai_column_cache_controller");
var _m_ai_column_integration_controller = require("./m_ai_column_integration_controller");
class AiColumnController extends _m_modules.Controller {
  init() {
    this.columnsController = this.getController('columns');
    this.dataController = this.getController('data');
    this.aiColumnCacheController = new _m_ai_column_cache_controller.AiColumnCacheController(this.component);
    this.aiColumnIntegrationController = new _m_ai_column_integration_controller.AiColumnIntegrationController(this.component);
    this.aiColumnIntegrationController.init();
    this.aiColumnCacheController.init();
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
  refreshAIColumnInternal(columnName) {
    this.aiColumnIntegrationController.sendRequest(columnName);
  }
  handleDataChanged(e) {
    const aiColumns = this.columnsController.getColumns().filter(col => col.type === 'ai' && col.ai.mode === 'auto');
    for (const col of aiColumns) {
      this.refreshAIColumnInternal(col.name);
    }
  }
  showResult(columnName, data) {
    // TODO
  }
  // API methods
  publicMethods() {
    return ['abortAIColumnRequest', 'sendAIColumnRequest', 'refreshAIColumn', 'clearAIColumn', 'getAIColumnText'];
  }
  abortAIColumnRequest(columnName) {}
  sendAIColumnRequest(columnName) {
    this.aiColumnIntegrationController.sendRequest(columnName);
  }
  refreshAIColumn(columnName) {
    this.refreshAIColumnInternal(columnName);
  }
  clearAIColumn(columnName) {}
  getAIColumnText(columnName, key) {}
  dispose() {
    this.dataController.changed.remove(this.dataChangedHandler);
  }
}
exports.AiColumnController = AiColumnController;
