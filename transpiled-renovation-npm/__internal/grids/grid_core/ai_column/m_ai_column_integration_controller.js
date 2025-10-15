"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiColumnIntegrationController = void 0;
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = require("../m_modules");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AiColumnIntegrationController extends _m_modules.Controller {
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
      _ui.default.log('E1066');
    }
    const aiIntegration = this.columnsController.columnOption(columnName, 'ai.aiIntegration');
    if (aiIntegration) {
      return aiIntegration;
    }
    const gridAiIntegration = this.option('aiIntegration');
    if (gridAiIntegration) {
      return gridAiIntegration;
    }
    _ui.default.log('E1067', columnName);
    return null;
  }
}
exports.AiColumnIntegrationController = AiColumnIntegrationController;