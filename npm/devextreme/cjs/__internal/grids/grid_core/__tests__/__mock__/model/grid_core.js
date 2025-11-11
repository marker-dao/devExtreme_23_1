/**
* DevExtreme (cjs/__internal/grids/grid_core/__tests__/__mock__/model/grid_core.js)
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
exports.GridCoreModel = void 0;
var _renderer = _interopRequireDefault(require("../../../../../../core/renderer"));
var _load_panel = require("../../../../../ui/__tests__/__mock__/model/load_panel");
var _toast = require("../../../../../ui/__tests__/__mock__/model/toast");
var _ai_prompt_editor = require("./ai_prompt_editor");
var _ai_header_cell = require("./cell/ai_header_cell");
var _data_cell = require("./cell/data_cell");
var _header_cell = require("./cell/header_cell");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SELECTORS = {
  headerRowClass: 'dx-header-row',
  dataRowClass: 'dx-data-row',
  groupRowClass: 'dx-group-row',
  aiDialog: 'dx-aidialog',
  aiPromptEditor: 'dx-ai-prompt-editor',
  toast: 'dx-toast',
  loadPanel: 'dx-loadpanel'
};
class GridCoreModel {
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
    return new _header_cell.HeaderCellModel(this.getHeaderCells()[columnIndex], this.addWidgetPrefix.bind(this));
  }
  getAIHeaderCell(columnIndex) {
    return new _ai_header_cell.AIHeaderCellModel(this.getHeaderCells()[columnIndex], this.addWidgetPrefix.bind(this));
  }
  getDataRows() {
    return this.root.querySelectorAll(`.${SELECTORS.dataRowClass}`);
  }
  getDataCells(rowIndex) {
    return this.root.querySelectorAll(`.${SELECTORS.dataRowClass}:nth-child(${rowIndex + 1}) > td`);
  }
  getDataCell(rowIndex, columnIndex) {
    return new _data_cell.DataCellModel(this.getDataCells(rowIndex)[columnIndex]);
  }
  getGroupRows() {
    return this.root.querySelectorAll(`.${SELECTORS.groupRowClass}`);
  }
  getHeaderByText(text) {
    return (0, _renderer.default)(Array.from(this.getHeaderCells()).find(el => (0, _renderer.default)(el).text().includes(text)));
  }
  getAIDialog() {
    return document.body.querySelector(`.${SELECTORS.aiDialog}`);
  }
  getAIPromptEditor() {
    return new _ai_prompt_editor.AIPromptEditorModel(this.getPromptEditorContainer());
  }
  getToastContainer() {
    return document.body.querySelector(`.${SELECTORS.toast}`);
  }
  getToast() {
    return new _toast.ToastModel(this.getToastContainer());
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
    return new _load_panel.LoadPanelModel(document.body.querySelector(`.${SELECTORS.loadPanel}`));
  }
}
exports.GridCoreModel = GridCoreModel;
