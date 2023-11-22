/**
* DevExtreme (bundles/__internal/grids/grid_core/keyboard_navigation/const.js)
* Version: 23.2.2
* Build date: Wed Nov 22 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WIDGET_CLASS = exports.VIRTUAL_ROW_CLASS = exports.ROW_CLASS = exports.ROWS_VIEW_CLASS = exports.REVERT_BUTTON_CLASS = exports.NON_FOCUSABLE_ELEMENTS_SELECTOR = exports.MASTER_DETAIL_ROW_CLASS = exports.MASTER_DETAIL_CELL_CLASS = exports.INTERACTIVE_ELEMENTS_SELECTOR = exports.HEADER_ROW_CLASS = exports.GROUP_ROW_CLASS = exports.GROUP_FOOTER_CLASS = exports.FUNCTIONAL_KEYS = exports.FREESPACE_ROW_CLASS = exports.FOCUS_TYPE_ROW = exports.FOCUS_TYPE_CELL = exports.FOCUS_STATE_CLASS = exports.FOCUSED_CLASS = exports.FAST_EDITING_DELETE_KEY = exports.EDIT_MODE_FORM = exports.EDIT_FORM_ITEM_CLASS = exports.EDIT_FORM_CLASS = exports.EDITOR_CELL_CLASS = exports.DROPDOWN_EDITOR_OVERLAY_CLASS = exports.DATEBOX_WIDGET_NAME = exports.DATA_ROW_CLASS = exports.COMMAND_SELECT_CLASS = exports.COMMAND_EXPAND_CLASS = exports.COMMAND_EDIT_CLASS = exports.COMMAND_CELL_SELECTOR = exports.COLUMN_HEADERS_VIEW = exports.CELL_FOCUS_DISABLED_CLASS = exports.ATTRIBUTES = exports.ADAPTIVE_COLUMN_NAME_CLASS = void 0;
const ATTRIBUTES = {
  ariaColIndex: 'aria-colindex',
  dragCell: 'dx-drag-cell'
};
exports.ATTRIBUTES = ATTRIBUTES;
const ROWS_VIEW_CLASS = 'rowsview';
exports.ROWS_VIEW_CLASS = ROWS_VIEW_CLASS;
const EDIT_FORM_CLASS = 'edit-form';
exports.EDIT_FORM_CLASS = EDIT_FORM_CLASS;
const GROUP_FOOTER_CLASS = 'group-footer';
exports.GROUP_FOOTER_CLASS = GROUP_FOOTER_CLASS;
const ROW_CLASS = 'dx-row';
exports.ROW_CLASS = ROW_CLASS;
const DATA_ROW_CLASS = 'dx-data-row';
exports.DATA_ROW_CLASS = DATA_ROW_CLASS;
const GROUP_ROW_CLASS = 'dx-group-row';
exports.GROUP_ROW_CLASS = GROUP_ROW_CLASS;
const HEADER_ROW_CLASS = 'dx-header-row';
exports.HEADER_ROW_CLASS = HEADER_ROW_CLASS;
const EDIT_FORM_ITEM_CLASS = 'edit-form-item';
exports.EDIT_FORM_ITEM_CLASS = EDIT_FORM_ITEM_CLASS;
const MASTER_DETAIL_ROW_CLASS = 'dx-master-detail-row';
exports.MASTER_DETAIL_ROW_CLASS = MASTER_DETAIL_ROW_CLASS;
const FREESPACE_ROW_CLASS = 'dx-freespace-row';
exports.FREESPACE_ROW_CLASS = FREESPACE_ROW_CLASS;
const VIRTUAL_ROW_CLASS = 'dx-virtual-row';
exports.VIRTUAL_ROW_CLASS = VIRTUAL_ROW_CLASS;
const MASTER_DETAIL_CELL_CLASS = 'dx-master-detail-cell';
exports.MASTER_DETAIL_CELL_CLASS = MASTER_DETAIL_CELL_CLASS;
const EDITOR_CELL_CLASS = 'dx-editor-cell';
exports.EDITOR_CELL_CLASS = EDITOR_CELL_CLASS;
const DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
exports.DROPDOWN_EDITOR_OVERLAY_CLASS = DROPDOWN_EDITOR_OVERLAY_CLASS;
const COMMAND_EXPAND_CLASS = 'dx-command-expand';
exports.COMMAND_EXPAND_CLASS = COMMAND_EXPAND_CLASS;
const ADAPTIVE_COLUMN_NAME_CLASS = 'dx-command-adaptive';
exports.ADAPTIVE_COLUMN_NAME_CLASS = ADAPTIVE_COLUMN_NAME_CLASS;
const COMMAND_SELECT_CLASS = 'dx-command-select';
exports.COMMAND_SELECT_CLASS = COMMAND_SELECT_CLASS;
const COMMAND_EDIT_CLASS = 'dx-command-edit';
exports.COMMAND_EDIT_CLASS = COMMAND_EDIT_CLASS;
const COMMAND_CELL_SELECTOR = '[class^=dx-command]';
exports.COMMAND_CELL_SELECTOR = COMMAND_CELL_SELECTOR;
const CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
exports.CELL_FOCUS_DISABLED_CLASS = CELL_FOCUS_DISABLED_CLASS;
const DATEBOX_WIDGET_NAME = 'dxDateBox';
exports.DATEBOX_WIDGET_NAME = DATEBOX_WIDGET_NAME;
const FOCUS_STATE_CLASS = 'dx-state-focused';
exports.FOCUS_STATE_CLASS = FOCUS_STATE_CLASS;
const WIDGET_CLASS = 'dx-widget';
exports.WIDGET_CLASS = WIDGET_CLASS;
const REVERT_BUTTON_CLASS = 'dx-revert-button';
exports.REVERT_BUTTON_CLASS = REVERT_BUTTON_CLASS;
const FOCUSED_CLASS = 'dx-focused';
exports.FOCUSED_CLASS = FOCUSED_CLASS;
const FAST_EDITING_DELETE_KEY = 'delete';
exports.FAST_EDITING_DELETE_KEY = FAST_EDITING_DELETE_KEY;
const INTERACTIVE_ELEMENTS_SELECTOR = "\n  input:not([type=\"hidden\"]):not([disabled]),\n  textarea:not([disabled]),\n  a:not([disabled]),\n  select:not([disabled]),\n  button:not([disabled]),\n  [tabindex]:not([disabled]),\n  .dx-checkbox:not([disabled])\n";
exports.INTERACTIVE_ELEMENTS_SELECTOR = INTERACTIVE_ELEMENTS_SELECTOR;
const NON_FOCUSABLE_ELEMENTS_SELECTOR = "".concat(INTERACTIVE_ELEMENTS_SELECTOR, ", .dx-dropdowneditor-icon");
exports.NON_FOCUSABLE_ELEMENTS_SELECTOR = NON_FOCUSABLE_ELEMENTS_SELECTOR;
const EDIT_MODE_FORM = 'form';
exports.EDIT_MODE_FORM = EDIT_MODE_FORM;
const FOCUS_TYPE_ROW = 'row';
exports.FOCUS_TYPE_ROW = FOCUS_TYPE_ROW;
const FOCUS_TYPE_CELL = 'cell';
exports.FOCUS_TYPE_CELL = FOCUS_TYPE_CELL;
const COLUMN_HEADERS_VIEW = 'columnHeadersView';
exports.COLUMN_HEADERS_VIEW = COLUMN_HEADERS_VIEW;
const FUNCTIONAL_KEYS = ['shift', 'control', 'alt'];
exports.FUNCTIONAL_KEYS = FUNCTIONAL_KEYS;
