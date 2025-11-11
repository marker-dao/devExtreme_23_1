/**
* DevExtreme (esm/__internal/grids/grid_core/ai_column/utils.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../core/utils/m_type';
import { AI_COLUMN_NAME, CLASSES } from './const';
export const getAICommandColumnDefaultOptions = () => ({
  type: AI_COLUMN_NAME,
  command: AI_COLUMN_NAME,
  cssClass: CLASSES.aiColumn,
  fixed: false,
  minWidth: 120
});
export const getDataFromRowItems = items => items.filter(row => row.rowType === 'data').map(row => row.data);
export const reduceDataCachedKeys = (data, cachedData, keyField) => {
  const newData = {};
  for (const item of data) {
    const key = item[keyField];
    if (!(key in cachedData)) {
      newData[key] = item;
    }
  }
  return newData;
};
export const isAIColumnAutoMode = column => {
  var _column$ai;
  return column.type === 'ai' && (!((_column$ai = column.ai) !== null && _column$ai !== void 0 && _column$ai.mode) || column.ai.mode === 'auto');
};
export const isPopupOptions = (optionName, value) => optionName.startsWith('ai.popup') || optionName === 'ai' && isDefined(value === null || value === void 0 ? void 0 : value.popup);
export const isEditorOptions = (optionName, value) => optionName.startsWith('ai.editorOptions') || optionName === 'ai' && isDefined(value === null || value === void 0 ? void 0 : value.editorOptions);
export const isPromptOption = (optionName, value) => optionName === 'ai.prompt' || optionName === 'ai' && isDefined(value === null || value === void 0 ? void 0 : value.prompt);
export const isRefreshOption = (optionName, value) => {
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
export const isAIColumnHeader = function (column) {
  let rowType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'header';
  return rowType === 'header' && column.type === AI_COLUMN_NAME;
};
export const isHeaderDropDownButtonVisible = column => {
  var _column$ai2;
  return (column === null || column === void 0 || (_column$ai2 = column.ai) === null || _column$ai2 === void 0 ? void 0 : _column$ai2.showHeaderMenu) !== false;
};
