/**
* DevExtreme (esm/__internal/grids/grid_core/__tests__/__mock__/model/grid_core.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../../../core/renderer';
import { LoadPanelModel } from '../../../../../ui/__tests__/__mock__/model/load_panel';
import { ToastModel } from '../../../../../ui/__tests__/__mock__/model/toast';
import { AIPromptEditorModel } from './ai_prompt_editor';
import { AIHeaderCellModel } from './cell/ai_header_cell';
import { DataCellModel } from './cell/data_cell';
import { HeaderCellModel } from './cell/header_cell';
const SELECTORS = {
  headerRowClass: 'dx-header-row',
  dataRowClass: 'dx-data-row',
  groupRowClass: 'dx-group-row',
  aiDialog: 'dx-aidialog',
  aiPromptEditor: 'dx-ai-prompt-editor',
  toast: 'dx-toast',
  loadPanel: 'dx-loadpanel'
};
export class GridCoreModel {
  constructor(root) {
    this.root = root;
  }
  getPromptEditorContainer() {
    return this.root.querySelector(`.${SELECTORS.aiPromptEditor}`);
  }
  getHeaderCells() {
    return this.root.querySelectorAll(`.${SELECTORS.headerRowClass} > td`);
  }
  getHeaderCell(columnIndex) {
    return new HeaderCellModel(this.getHeaderCells()[columnIndex], this.addWidgetPrefix.bind(this));
  }
  getAIHeaderCell(columnIndex) {
    return new AIHeaderCellModel(this.getHeaderCells()[columnIndex], this.addWidgetPrefix.bind(this));
  }
  getDataRows() {
    return this.root.querySelectorAll(`.${SELECTORS.dataRowClass}`);
  }
  getDataCells(rowIndex) {
    return this.root.querySelectorAll(`.${SELECTORS.dataRowClass}:nth-child(${rowIndex + 1}) > td`);
  }
  getDataCell(rowIndex, columnIndex) {
    return new DataCellModel(this.getDataCells(rowIndex)[columnIndex]);
  }
  getGroupRows() {
    return this.root.querySelectorAll(`.${SELECTORS.groupRowClass}`);
  }
  getHeaderByText(text) {
    return $(Array.from(this.getHeaderCells()).find(el => $(el).text().includes(text)));
  }
  getAIDialog() {
    return document.body.querySelector(`.${SELECTORS.aiDialog}`);
  }
  getAIPromptEditor() {
    return new AIPromptEditorModel(this.getPromptEditorContainer());
  }
  getToastContainer() {
    return document.body.querySelector(`.${SELECTORS.toast}`);
  }
  getToast() {
    return new ToastModel(this.getToastContainer());
  }
  addWidgetPrefix(classNames) {
    const componentName = this.NAME;
    return `dx-${componentName.slice(2).toLowerCase()}${classNames ? `-${classNames}` : ''}`;
  }
  apiColumnOption(id, name, value) {
    switch (arguments.length) {
      case 1:
        return this.getInstance().columnOption(id);
      case 2:
        return this.getInstance().columnOption(id, name);
      default:
        this.getInstance().columnOption(id, name, value);
        return undefined;
    }
  }
  async apiRefresh() {
    await this.getInstance().refresh();
  }
  apiAbortAIColumnRequest(columnName) {
    this.getInstance().abortAIColumnRequest(columnName);
  }
  getLoadPanel() {
    return new LoadPanelModel(document.body.querySelector(`.${SELECTORS.loadPanel}`));
  }
}
