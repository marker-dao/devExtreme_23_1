import { Controller } from '../m_modules';
import { AiColumnCacheController } from './m_ai_column_cache_controller';
import { AiColumnIntegrationController } from './m_ai_column_integration_controller';
export class AiColumnController extends Controller {
  init() {
    this.columnsController = this.getController('columns');
    this.dataController = this.getController('data');
    this.aiColumnCacheController = new AiColumnCacheController(this.component);
    this.aiColumnIntegrationController = new AiColumnIntegrationController(this.component);
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