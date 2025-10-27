import { AI_COLUMN_NAME, CLASSES } from './const';
export const getAICommandColumnOptions = () => ({
  type: AI_COLUMN_NAME,
  command: AI_COLUMN_NAME,
  cssClass: CLASSES.aiColumn,
  fixed: false
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