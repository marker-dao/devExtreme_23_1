/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/m_ai_column_integration_controller.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AIColumnIntegrationController = void 0;
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = require("../m_modules");
var _m_ai_column_cache_controller = require("./m_ai_column_cache_controller");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AIColumnIntegrationController extends _m_modules.Controller {
  constructor() {
    super(...arguments);
    this.aborts = {};
  }
  init() {
    this.columnsController = this.getController('columns');
    this.dataController = this.getController('data');
    this.errorHandlingController = this.getController('errorHandling');
    this.aiColumnCacheController = new _m_ai_column_cache_controller.AIColumnCacheController(this.component);
    this.aiColumnCacheController.init();
    this.createAction('onAIColumnRequestCreating');
    this.createAction('onAIColumnResponseReceived');
  }
  sendRequestCore(_ref) {
    let {
      columnName,
      useCache,
      needToShowLoadPanel,
      callbacks
    } = _ref;
    const aiIntegration = this.getAIIntegration(columnName);
    if (!aiIntegration) {
      return;
    }
    const column = this.columnsController.getColumnByName(columnName);
    if (!(column !== null && column !== void 0 && column.ai)) {
      return;
    }
    const {
      prompt
    } = column.ai;
    if (!prompt) {
      return;
    }
    if (this.isRequestAwaitingCompletion(columnName)) {
      this.abortRequest(columnName);
    }
    const rowItems = this.dataController.items();
    const data = (0, _utils.getDataFromRowItems)(rowItems);
    const args = {
      column,
      useCache,
      cancel: false,
      additionalInfo: {},
      data
    };
    this.executeAction('onAIColumnRequestCreating', args);
    if (args.cancel) {
      return;
    }
    const keyField = this.dataController.key();
    let cachedResponse = {};
    if (args.useCache) {
      const keys = data.map(item => item[keyField]);
      cachedResponse = this.aiColumnCacheController.getCachedResponse(columnName, keys);
    }
    const reducedData = (0, _utils.reduceDataCachedKeys)(data, cachedResponse, keyField);
    const areAllDataCached = Object.keys(reducedData).length === 0;
    if (areAllDataCached) {
      return;
    }
    callbacks.onRequestSending(needToShowLoadPanel);
    const abort = aiIntegration.generateGridColumn({
      text: prompt,
      data: reducedData,
      additionalInfo: args.additionalInfo
    }, this.getAICommandCallbacks(columnName, cachedResponse, callbacks));
    this.aborts[columnName] = abort;
  }
  processCommandCompletion(columnName) {
    this.abortRequest(columnName);
  }
  getAICommandCallbacks(columnName, cachedResponse, callBacks) {
    const column = this.columnsController.getColumnByName(columnName);
    const callbacks = {
      onComplete: finalResponse => {
        if (this.isRequestAwaitingCompletion(columnName)) {
          var _callBacks$onComplete;
          const args = {
            column,
            error: null,
            data: finalResponse.data
          };
          this.executeAction('onAIColumnResponseReceived', args);
          this.aiColumnCacheController.setCachedResponse(columnName, finalResponse.data);
          this.processCommandCompletion(columnName);
          callBacks === null || callBacks === void 0 || (_callBacks$onComplete = callBacks.onComplete) === null || _callBacks$onComplete === void 0 || _callBacks$onComplete.call(callBacks, finalResponse);
        }
      },
      onError: error => {
        var _callBacks$onError;
        const message = (error === null || error === void 0 ? void 0 : error.message) ?? error;
        this.executeAction('onAIColumnResponseReceived', {
          column,
          error: message,
          data: null
        });
        this.showError(message);
        this.processCommandCompletion(columnName);
        callBacks === null || callBacks === void 0 || (_callBacks$onError = callBacks.onError) === null || _callBacks$onError === void 0 || _callBacks$onError.call(callBacks, error);
      }
    };
    return callbacks;
  }
  isAnyRequestAwaitingCompletion() {
    return Object.values(this.aborts).some(abort => !!abort);
  }
  abortRequest(columnName) {
    var _this$aborts$columnNa, _this$aborts;
    (_this$aborts$columnNa = (_this$aborts = this.aborts)[columnName]) === null || _this$aborts$columnNa === void 0 || _this$aborts$columnNa.call(_this$aborts);
    this.aborts[columnName] = undefined;
  }
  showError(message) {
    var _this$errorHandlingCo;
    (_this$errorHandlingCo = this.errorHandlingController) === null || _this$errorHandlingCo === void 0 || _this$errorHandlingCo.showToastError(message);
  }
  getAIColumnText(columnName, key) {
    return this.aiColumnCacheController.getCachedString(columnName, key);
  }
  clearAIColumn(columnName) {
    this.aiColumnCacheController.clearCache(columnName);
  }
  getAIIntegration(columnName) {
    if (!columnName) {
      _ui.default.log('E1066');
    }
    const aiIntegration = this.columnsController.columnOption(columnName, 'ai.aiIntegration');
    if (aiIntegration) {
      return aiIntegration;
    }
    const gridAIIntegration = this.option('aiIntegration');
    if (gridAIIntegration) {
      return gridAIIntegration;
    }
    _ui.default.log('E1067', columnName);
    return null;
  }
  isRequestAwaitingCompletion(columnName) {
    return !!this.aborts[columnName];
  }
  dispose() {
    super.dispose();
    Object.keys(this.aborts).forEach(columnName => this.abortRequest(columnName));
  }
}
exports.AIColumnIntegrationController = AIColumnIntegrationController;
