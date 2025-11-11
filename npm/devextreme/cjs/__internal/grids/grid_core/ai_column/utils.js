/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/utils.js)
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
exports.reduceDataCachedKeys = exports.isRefreshOption = exports.isPromptOption = exports.isPopupOptions = exports.isHeaderDropDownButtonVisible = exports.isEditorOptions = exports.isAIColumnHeader = exports.isAIColumnAutoMode = exports.getDataFromRowItems = exports.getAICommandColumnDefaultOptions = void 0;
var _m_type = require("../../../core/utils/m_type");
var _const = require("./const");
const getAICommandColumnDefaultOptions = () => ({
  type: _const.AI_COLUMN_NAME,
  command: _const.AI_COLUMN_NAME,
  cssClass: _const.CLASSES.aiColumn,
  fixed: false,
  minWidth: 120
});
exports.getAICommandColumnDefaultOptions = getAICommandColumnDefaultOptions;
const getDataFromRowItems = items => items.filter(row => row.rowType === 'data').map(row => row.data);
exports.getDataFromRowItems = getDataFromRowItems;
const reduceDataCachedKeys = (data, cachedData, keyField) => {
  const newData = {};
  for (const item of data) {
    const key = item[keyField];
    if (!(key in cachedData)) {
      newData[key] = item;
    }
  }
  return newData;
};
exports.reduceDataCachedKeys = reduceDataCachedKeys;
const isAIColumnAutoMode = column => {
  var _column$ai;
  return column.type === 'ai' && (!((_column$ai = column.ai) !== null && _column$ai !== void 0 && _column$ai.mode) || column.ai.mode === 'auto');
};
exports.isAIColumnAutoMode = isAIColumnAutoMode;
const isPopupOptions = (optionName, value) => optionName.startsWith('ai.popup') || optionName === 'ai' && (0, _m_type.isDefined)(value === null || value === void 0 ? void 0 : value.popup);
exports.isPopupOptions = isPopupOptions;
const isEditorOptions = (optionName, value) => optionName.startsWith('ai.editorOptions') || optionName === 'ai' && (0, _m_type.isDefined)(value === null || value === void 0 ? void 0 : value.editorOptions);
exports.isEditorOptions = isEditorOptions;
const isPromptOption = (optionName, value) => optionName === 'ai.prompt' || optionName === 'ai' && (0, _m_type.isDefined)(value === null || value === void 0 ? void 0 : value.prompt);
exports.isPromptOption = isPromptOption;
const isRefreshOption = (optionName, value) => {
  const refreshOptionNames = ['showHeaderMenu', 'noDataText', 'emptyText'];
  const matchesName = refreshOptionNames.map(n => `ai.${n}`).includes(optionName);
  if (matchesName) {
    return true;
  }
  if (optionName !== 'ai') {
    return false;
  }
  const valueKeys = Object.keys(value);
  return valueKeys.some(key => refreshOptionNames.includes(key));
};
exports.isRefreshOption = isRefreshOption;
const isAIColumnHeader = function (column) {
  let rowType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'header';
  return rowType === 'header' && column.type === _const.AI_COLUMN_NAME;
};
exports.isAIColumnHeader = isAIColumnHeader;
const isHeaderDropDownButtonVisible = column => {
  var _column$ai2;
  return (column === null || column === void 0 || (_column$ai2 = column.ai) === null || _column$ai2 === void 0 ? void 0 : _column$ai2.showHeaderMenu) !== false;
};
exports.isHeaderDropDownButtonVisible = isHeaderDropDownButtonVisible;
