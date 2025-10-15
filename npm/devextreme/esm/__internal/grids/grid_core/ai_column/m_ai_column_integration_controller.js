/**
* DevExtreme (esm/__internal/grids/grid_core/ai_column/m_ai_column_integration_controller.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../../ui/widget/ui.errors';
import { Controller } from '../m_modules';
export class AiColumnIntegrationController extends Controller {
  init() {
    this.columnsController = this.getController('columns');
    this.dataController = this.getController('data');
  }
  sendRequest(columnName) {
    const aiIntegration = this.getAiIntegration(columnName);
    if (!aiIntegration) {
      return;
    }
    const data = this.dataController.items().filter(row => row.rowType === 'data').reduce((acc, row) => {
      acc[JSON.stringify(row.key)] = row.data;
      return acc;
    }, {});
    const prompt = this.columnsController.columnOption(columnName, 'ai.prompt');
    const abort = aiIntegration.generateGridColumn({
      text: prompt,
      data
    }, this.getAICommandCallbacks());
    this.abort = abort;
  }
  processCommandCompletion() {
    var _this$abort;
    (_this$abort = this.abort) === null || _this$abort === void 0 || _this$abort.call(this);
    this.abort = undefined;
  }
  updateResults(result) {
    // Update the results in the UI or internal state
  }
  getAICommandCallbacks() {
    const callbacks = {
      onComplete: finalResponse => {
        this.updateResults(String(finalResponse));
        this.processCommandCompletion();
      },
      onError: () => {
        this.processCommandCompletion();
      }
    };
    return callbacks;
  }
  abortRequest() {}
  showError(message) {}
  getAiIntegration(columnName) {
    if (!columnName) {
      errors.log('E1066');
    }
    const aiIntegration = this.columnsController.columnOption(columnName, 'ai.aiIntegration');
    if (aiIntegration) {
      return aiIntegration;
    }
    const gridAiIntegration = this.option('aiIntegration');
    if (gridAiIntegration) {
      return gridAiIntegration;
    }
    errors.log('E1067', columnName);
    return null;
  }
}
