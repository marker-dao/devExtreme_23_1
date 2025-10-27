/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/m_ai_column_view.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AIColumnView = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _m_dom_adapter = _interopRequireDefault(require("../../../core/m_dom_adapter"));
var _m_modules = require("../m_modules");
var _ai_prompt_editor = require("./ai_prompt_editor/ai_prompt_editor");
var _const = require("./const");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AIColumnView extends _m_modules.View {
  addAICommandColumn() {
    this.columnsController.addCommandColumn((0, _utils.getAICommandColumnOptions)());
  }
  getAIPromptEditorConfig($cellElement, column) {
    var _column$ai;
    const alignment = column.alignment === 'right' ? 'left' : 'right';
    const visibleIndex = this.columnsController.getVisibleIndex(column.index);
    return {
      prompt: ((_column$ai = column.ai) === null || _column$ai === void 0 ? void 0 : _column$ai.prompt) ?? '',
      container: this.element(),
      createComponent: this._createComponent.bind(this),
      onSubmit: () => {
        this.promptEditorInstance.updateStateOnAction('apply');
        this.columnsController.columnOption(column.index, 'ai.prompt', this.promptEditorInstance.getEditorValue(), true);
      },
      onStop: () => {
        this.promptEditorInstance.updateStateOnAction('stop');
        this.aiColumnController.abortAIColumnRequest(column.name);
      },
      onRefresh: () => {
        this.promptEditorInstance.updateStateOnAction('regenerate');
        this.aiColumnController.refreshAIColumn(column.name);
      },
      popupOptions: {
        container: _m_dom_adapter.default.getBody(),
        onHiding: () => {
          this.promptEditorInstance.updateStateOnAction('stop');
          this.aiColumnController.abortAIColumnRequest(column.name);
        },
        position: {
          my: `${alignment} top`,
          at: `${alignment} bottom`,
          of: `.dx-header-row td[aria-colindex="${visibleIndex + 1}"]`,
          collision: 'fit',
          boundary: this.component.element()
        }
      }
    };
  }
  // TODO: support changing all columns and the entire column
  optionChanged(args) {
    super.optionChanged(args);
    if (args.name !== 'columns') {
      return;
    }
    const column = this.columnsController.getColumnByPath(args.fullName);
    if ((column === null || column === void 0 ? void 0 : column.type) !== _const.AI_COLUMN_NAME) {
      return;
    }
    const columnOptionName = this.columnsController.getColumnOptionNameByFullName(args.fullName);
    if (columnOptionName === 'ai.prompt' && (0, _utils.isAIColumnAutoMode)(column)) {
      this.aiColumnController.sendAIColumnRequest(column.name);
    }
  }
  init() {
    this.columnsController = this.getController('columns');
    this.aiColumnController = this.getController('aiColumn');
    this.addAICommandColumn();
    this.aiColumnController.aiRequestCompleted.add(() => {
      var _this$promptEditorIns, _this$promptEditorIns2;
      (_this$promptEditorIns = this.promptEditorInstance) === null || _this$promptEditorIns === void 0 || _this$promptEditorIns.updatePrompt(this.promptEditorInstance.getEditorValue());
      (_this$promptEditorIns2 = this.promptEditorInstance) === null || _this$promptEditorIns2 === void 0 || _this$promptEditorIns2.updateStateOnAction('stop');
    });
    this.aiColumnController.aiRequestRejected.add(() => {
      var _this$promptEditorIns3;
      (_this$promptEditorIns3 = this.promptEditorInstance) === null || _this$promptEditorIns3 === void 0 || _this$promptEditorIns3.updateStateOnAction('stop');
    });
  }
  showPromptEditor(cellElement, column) {
    const $cellElement = (0, _renderer.default)(cellElement);
    if (!($cellElement !== null && $cellElement !== void 0 && $cellElement.length) || (column === null || column === void 0 ? void 0 : column.type) !== _const.AI_COLUMN_NAME) {
      return Promise.resolve(false);
    }
    const config = this.getAIPromptEditorConfig($cellElement, column);
    if (!this.promptEditorInstance) {
      this.promptEditorInstance = new _ai_prompt_editor.AIPromptEditor(config);
    } else {
      this.promptEditorInstance.updateOptions(config);
    }
    return this.promptEditorInstance.show();
  }
  hidePromptEditor() {
    var _this$promptEditorIns4;
    return (_this$promptEditorIns4 = this.promptEditorInstance) === null || _this$promptEditorIns4 === void 0 ? void 0 : _this$promptEditorIns4.hide();
  }
  getPromptEditorInstance() {
    return this.promptEditorInstance;
  }
}
exports.AIColumnView = AIColumnView;
