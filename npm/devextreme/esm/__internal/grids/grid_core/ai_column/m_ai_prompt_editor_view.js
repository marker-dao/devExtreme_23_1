/**
* DevExtreme (esm/__internal/grids/grid_core/ai_column/m_ai_prompt_editor_view.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../../core/renderer';
import domAdapter from '../../../core/m_dom_adapter';
import { getColumnHeaderCellSelector } from '../columns_controller/m_columns_controller_utils';
import { View } from '../m_modules';
import { AIPromptEditor } from './ai_prompt_editor/ai_prompt_editor';
import { AI_COLUMN_NAME } from './const';
import { isAIColumnAutoMode, isEditorOptions, isPopupOptions, isPromptOption, isRefreshOption } from './utils';
export class AIPromptEditorView extends View {
  getAIPromptEditorConfig(column) {
    var _column$ai, _column$ai2, _column$ai3;
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
        this.aiColumnController.sendRequest(column.name, false, false);
      },
      popupOptions: _extends({
        container: domAdapter.getBody(),
        onHiding: () => {
          this.promptEditorInstance.updateStateOnAction('stop');
          this.aiColumnController.abortAIColumnRequest(column.name);
        },
        position: {
          my: `${alignment} top`,
          at: `${alignment} bottom`,
          of: getColumnHeaderCellSelector(visibleIndex),
          collision: 'fit',
          boundary: this.component.element()
        }
      }, (_column$ai2 = column.ai) === null || _column$ai2 === void 0 ? void 0 : _column$ai2.popup),
      editorOptions: _extends({}, (_column$ai3 = column.ai) === null || _column$ai3 === void 0 ? void 0 : _column$ai3.editorOptions)
    };
  }
  updatePromptEditorInstance(column) {
    const config = this.getAIPromptEditorConfig(column);
    if (!this.promptEditorInstance) {
      this.promptEditorInstance = new AIPromptEditor(config);
    } else {
      this.promptEditorInstance.updateOptions(config);
    }
  }
  ensureAIPromptEditorVisibility() {
    const aiColumns = this.aiColumnController.getAIColumns();
    const aiColumnsWithVisiblePopup = aiColumns.filter(column => {
      var _column$ai4;
      return (_column$ai4 = column.ai) === null || _column$ai4 === void 0 || (_column$ai4 = _column$ai4.popup) === null || _column$ai4 === void 0 ? void 0 : _column$ai4.visible;
    });
    if (aiColumnsWithVisiblePopup.length > 0) {
      this.updatePromptEditorInstance(aiColumnsWithVisiblePopup[0]);
    }
  }
  init() {
    this.columnsController = this.getController('columns');
    this.aiColumnController = this.getController('aiColumn');
    this.aiColumnController.aiRequestCompleted.add(() => {
      var _this$promptEditorIns, _this$promptEditorIns2;
      (_this$promptEditorIns = this.promptEditorInstance) === null || _this$promptEditorIns === void 0 || _this$promptEditorIns.updatePrompt(this.promptEditorInstance.getEditorValue());
      (_this$promptEditorIns2 = this.promptEditorInstance) === null || _this$promptEditorIns2 === void 0 || _this$promptEditorIns2.updateStateOnAction('stop');
    });
    this.aiColumnController.aiRequestRejected.add(() => {
      var _this$promptEditorIns3;
      (_this$promptEditorIns3 = this.promptEditorInstance) === null || _this$promptEditorIns3 === void 0 || _this$promptEditorIns3.updateStateOnAction('stop');
    });
    this.renderCompleted.add(() => {
      this.ensureAIPromptEditorVisibility();
    });
    this.aiColumnOptionChangedHandler = this.aiColumnOptionChanged.bind(this);
    this.columnsController.aiColumnOptionChanged.add(this.aiColumnOptionChangedHandler);
  }
  show(cellElement, column) {
    const $cellElement = $(cellElement);
    if (!($cellElement !== null && $cellElement !== void 0 && $cellElement.length) || (column === null || column === void 0 ? void 0 : column.type) !== AI_COLUMN_NAME) {
      return Promise.resolve(false);
    }
    this.updatePromptEditorInstance(column);
    return this.promptEditorInstance.show();
  }
  hide() {
    var _this$promptEditorIns4;
    return (_this$promptEditorIns4 = this.promptEditorInstance) === null || _this$promptEditorIns4 === void 0 ? void 0 : _this$promptEditorIns4.hide();
  }
  getPromptEditorInstance() {
    return this.promptEditorInstance;
  }
  // TODO: support changing all columns and the entire column
  aiColumnOptionChanged(column, optionName, value) {
    const isPromptOptionName = isPromptOption(optionName, value);
    if (isPromptOptionName) {
      var _this$promptEditorIns5;
      (_this$promptEditorIns5 = this.promptEditorInstance) === null || _this$promptEditorIns5 === void 0 || _this$promptEditorIns5.updatePrompt(value);
    }
    if (isPromptOptionName && isAIColumnAutoMode(column)) {
      var _this$promptEditorIns6;
      this.aiColumnController.sendRequest(column.name, false, !((_this$promptEditorIns6 = this.promptEditorInstance) !== null && _this$promptEditorIns6 !== void 0 && _this$promptEditorIns6.isVisible()));
    }
    const needUpdatePopup = isPopupOptions(optionName, value);
    const needUpdateEditor = isEditorOptions(optionName, value);
    if (needUpdatePopup || needUpdateEditor) {
      this.updatePromptEditorInstance(column);
    }
    if (isRefreshOption(optionName, value)) {
      // TODO: this.component.refresh();
    }
  }
  dispose() {
    super.dispose();
    if (this.aiColumnOptionChangedHandler) {
      this.columnsController.aiColumnOptionChanged.remove(this.aiColumnOptionChangedHandler);
    }
  }
}
