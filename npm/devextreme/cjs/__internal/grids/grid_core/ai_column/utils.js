/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/utils.js)
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
exports.reduceDataCachedKeys = exports.isAIColumnAutoMode = exports.getDataFromRowItems = exports.getAICommandColumnOptions = void 0;
var _const = require("./const");
const getAICommandColumnOptions = () => ({
  type: _const.AI_COLUMN_NAME,
  command: _const.AI_COLUMN_NAME,
  cssClass: _const.CLASSES.aiColumn,
  fixed: false
});
exports.getAICommandColumnOptions = getAICommandColumnOptions;
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
