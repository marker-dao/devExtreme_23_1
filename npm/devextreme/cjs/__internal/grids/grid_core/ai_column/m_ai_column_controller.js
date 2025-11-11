/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/m_ai_column_controller.js)
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
exports.AIColumnController = void 0;
var _m_modules = require("../m_modules");
var _m_ai_column_integration_controller = require("./m_ai_column_integration_controller");
var _utils = require("./utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class AIColumnController extends _m_modules.Controller {
  getDefaultCellValue(column, cellValue) {
    var _column$ai2;
    if (cellValue === undefined) {
      var _column$ai;
      return ((_column$ai = column.ai) === null || _column$ai === void 0 ? void 0 : _column$ai.emptyText) ?? null;
    }
    return ((_column$ai2 = column.ai) === null || _column$ai2 === void 0 ? void 0 : _column$ai2.noDataText) ?? null;
  }
  addAICommandColumn() {
    const that = this;
    const {
      dataController,
      aiColumnIntegrationController
    } = this;
    this.columnsController.addCommandColumn(_extends({}, (0, _utils.getAICommandColumnDefaultOptions)(), {
      calculateCellValue(data) {
        const key = dataController.keyOf(data);
        const cellValue = aiColumnIntegrationController.getAIColumnText(this.name, key);
        const defaultValue = that.getDefaultCellValue(this, cellValue);
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return cellValue || defaultValue;
      }
    }));
  }
  subscribeToDataSourceChanged() {
    var _this$dataController$;
    this.dataSourceChangedHandler = this.handleDataSourceChanged.bind(this);
    (_this$dataController$ = this.dataController.dataSource()) === null || _this$dataController$ === void 0 || _this$dataController$.changed.add(this.dataSourceChangedHandler);
  }
  updateAICells() {
    this.dataController.updateItems({
      repaintChangesOnly: this.option('repaintChangesOnly')
    });
  }
  callbackNames() {
    return ['aiRequestCompleted', 'aiRequestRejected'];
  }
  init() {
    this.columnsController = this.getController('columns');
    this.dataController = this.getController('data');
    this.aiColumnIntegrationController = new _m_ai_column_integration_controller.AIColumnIntegrationController(this.component);
    this.aiColumnIntegrationController.init();
    this.aiColumnOptionChangedHandler = this.aiColumnOptionChanged.bind(this);
    this.columnsController.aiColumnOptionChanged.add(this.aiColumnOptionChangedHandler);
    this.subscribeToDataSourceChanged();
    this.addAICommandColumn();
  }
  getAIColumns() {
    return this.columnsController.getColumns().filter(col => col.type === 'ai');
  }
  handleDataSourceChanged(args) {
    const aiColumns = this.getAIColumns();
    if ((args === null || args === void 0 ? void 0 : args.changeType) === 'loadError') {
      return;
    }
    for (const col of aiColumns) {
      if ((0, _utils.isAIColumnAutoMode)(col)) {
        this.sendRequest(col.name, true);
      }
    }
  }
  // API methods
  publicMethods() {
    return ['abortAIColumnRequest', 'sendAIColumnRequest', 'refreshAIColumn', 'clearAIColumn', 'getAIColumnText'];
  }
  abortAIColumnRequest(columnName) {
    this.aiColumnIntegrationController.abortRequest(columnName);
    if (!this.aiColumnIntegrationController.isAnyRequestAwaitingCompletion()) {
      this.dataController.endCustomLoading();
    }
  }
  sendRequest(columnName, useCache) {
    let needToShowLoadPanel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const callbacks = this.getRequestCallbacks();
    this.aiColumnIntegrationController.sendRequestCore({
      columnName,
      useCache,
      needToShowLoadPanel,
      callbacks
    });
  }
  sendAIColumnRequest(columnName) {
    this.sendRequest(columnName, false);
  }
  refreshAIColumn(columnName) {
    this.sendRequest(columnName, false);
  }
  getRequestCallbacks() {
    return {
      onRequestSending: needToShowLoadPanel => {
        if (needToShowLoadPanel) {
          this.dataController.beginCustomLoading();
        }
      },
      onComplete: data => {
        this.dataController.endCustomLoading();
        this.aiRequestCompleted.fire(data);
        this.updateAICells();
      },
      onError: error => {
        this.dataController.endCustomLoading();
        this.aiRequestRejected.fire(error);
      }
    };
  }
  clearAIColumn(columnName) {
    this.abortAIColumnRequest(columnName);
    this.aiColumnIntegrationController.clearAIColumn(columnName);
    this.columnsController.columnOption(columnName, 'ai.prompt', '');
    this.updateAICells();
  }
  getAIColumnText(columnName, key) {
    return this.aiColumnIntegrationController.getAIColumnText(columnName, key);
  }
  aiColumnOptionChanged(column, optionName, value) {
    const isPromptOptionName = (0, _utils.isPromptOption)(optionName, value);
    if (isPromptOptionName && column.name) {
      var _column$ai3;
      this.aiColumnIntegrationController.clearAIColumn(column.name);
      if (!((_column$ai3 = column.ai) !== null && _column$ai3 !== void 0 && _column$ai3.prompt)) {
        this.updateAICells();
      }
    }
  }
  dispose() {
    var _this$dataController$2;
    super.dispose();
    (_this$dataController$2 = this.dataController.dataSource()) === null || _this$dataController$2 === void 0 || _this$dataController$2.changed.remove(this.dataSourceChangedHandler);
  }
}
exports.AIColumnController = AIColumnController;
