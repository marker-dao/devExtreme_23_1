/**
* DevExtreme (cjs/__internal/grids/new/grid_core/columns_controller/utils.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDataFieldToComputedColumns = addDataFieldToComputedColumns;
exports.columnOptionUpdate = void 0;
exports.getColumnByIndexOrName = getColumnByIndexOrName;
exports.getColumnFormat = void 0;
exports.getColumnIndexByName = getColumnIndexByName;
exports.getValueDataType = exports.getColumnOptionsFromDataItem = void 0;
exports.getVisibleIndexes = getVisibleIndexes;
exports.normalizeColumn = normalizeColumn;
exports.normalizeColumns = normalizeColumns;
exports.normalizeColumnsVisibleIndexes = normalizeColumnsVisibleIndexes;
exports.normalizeStringColumn = normalizeStringColumn;
exports.normalizeVisibleIndexes = normalizeVisibleIndexes;
exports.preNormalizeColumns = preNormalizeColumns;
var _data = require("../../../../../core/utils/data");
var _inflector = require("../../../../../core/utils/inflector");
var _type = require("../../../../../core/utils/type");
var _index = require("../../../../grids/new/grid_core/utils/tree/index");
var _options = require("./options");
function normalizeColumn(column, templateNormalizationFunc, columnFromDataOptions) {
  const dataType = column.dataType ?? (columnFromDataOptions === null || columnFromDataOptions === void 0 ? void 0 : columnFromDataOptions.dataType) ?? _options.defaultColumnProperties.dataType;
  const columnDataTypeDefaultOptions = _options.defaultColumnPropertiesByDataType[dataType];
  const columnFormat = column.format ?? (columnDataTypeDefaultOptions === null || columnDataTypeDefaultOptions === void 0 ? void 0 : columnDataTypeDefaultOptions.format) ?? (columnFromDataOptions === null || columnFromDataOptions === void 0 ? void 0 : columnFromDataOptions.format);
  const caption = (0, _inflector.captionize)(column.name);
  const colWithDefaults = Object.assign({}, _options.defaultColumnProperties, columnDataTypeDefaultOptions, {
    caption
  }, column);
  const normalizedColumn = Object.assign({}, colWithDefaults, {
    dataType
  }, !!columnFormat && {
    format: columnFormat
  }, {
    calculateDisplayValue: (0, _type.isString)(colWithDefaults.calculateDisplayValue) ? (0, _data.compileGetter)(colWithDefaults.calculateDisplayValue) : colWithDefaults.calculateDisplayValue,
    headerItemTemplate: templateNormalizationFunc === null || templateNormalizationFunc === void 0 ? void 0 : templateNormalizationFunc(colWithDefaults.headerItemTemplate),
    fieldTemplate: templateNormalizationFunc === null || templateNormalizationFunc === void 0 ? void 0 : templateNormalizationFunc(colWithDefaults.fieldTemplate),
    fieldCaptionTemplate: templateNormalizationFunc === null || templateNormalizationFunc === void 0 ? void 0 : templateNormalizationFunc(colWithDefaults.fieldCaptionTemplate),
    fieldValueTemplate: templateNormalizationFunc === null || templateNormalizationFunc === void 0 ? void 0 : templateNormalizationFunc(colWithDefaults.fieldValueTemplate),
    // @ts-expect-error for compatibility
    calculateCellValue: colWithDefaults.calculateFieldValue,
    allowFiltering: colWithDefaults.allowFiltering ?? !!colWithDefaults.dataField,
    allowHeaderFiltering: colWithDefaults.allowHeaderFiltering ?? colWithDefaults.allowFiltering ?? !!colWithDefaults.dataField,
    allowSearch: colWithDefaults.allowSearch ?? colWithDefaults.allowFiltering ?? !!colWithDefaults.dataField,
    allowSorting: colWithDefaults.allowSorting ?? !!colWithDefaults.dataField
  });
  normalizedColumn.selector ?? (normalizedColumn.selector = data => normalizedColumn.calculateFieldValue(data));
  return normalizedColumn;
}
function getVisibleIndexes(indexes) {
  const newIndexes = [...indexes];
  let minNonExistingIndex = 0;
  indexes.forEach((visibleIndex, index) => {
    while (newIndexes.includes(minNonExistingIndex)) {
      minNonExistingIndex += 1;
    }
    newIndexes[index] = visibleIndex ?? minNonExistingIndex;
  });
  return newIndexes;
}
function normalizeVisibleIndexes(indexes, forceIndex) {
  const indexMap = indexes.map((visibleIndex, index) => [index, visibleIndex]);
  const sortedIndexMap = new Array(indexes.length);
  if ((0, _type.isDefined)(forceIndex)) {
    sortedIndexMap[indexes[forceIndex]] = forceIndex;
  }
  let j = 0;
  indexMap.sort((a, b) => a[1] - b[1]).forEach(_ref => {
    let [index] = _ref;
    if (index === forceIndex) {
      return;
    }
    if ((0, _type.isDefined)(sortedIndexMap[j])) {
      j += 1;
    }
    sortedIndexMap[j] = index;
    j += 1;
  });
  const returnIndexes = new Array(indexes.length);
  sortedIndexMap.forEach((index, visibleIndex) => {
    returnIndexes[index] = visibleIndex;
  });
  return returnIndexes;
}
function normalizeColumnsVisibleIndexes(columns, forceIndex) {
  const result = [...columns];
  const visibleIndexes = normalizeVisibleIndexes(columns.map(c => c.visibleIndex), forceIndex);
  visibleIndexes.forEach((visibleIndex, i) => {
    result[i].visibleIndex = visibleIndex;
  });
  return result;
}
function normalizeColumns(columns, templateNormalizationFunc, columnsFromData) {
  return columns.map(col => {
    const columnFromDataOptions = columnsFromData === null || columnsFromData === void 0 ? void 0 : columnsFromData[col.name];
    return normalizeColumn(col, templateNormalizationFunc, columnFromDataOptions);
  });
}
function preNormalizeColumns(columns) {
  const normalizedColumns = columns === null || columns === void 0 ? void 0 : columns.map(column => {
    if (typeof column === 'string') {
      return {
        dataField: column
      };
    }
    return column;
  }).map((column, index) => Object.assign({}, column, {
    name: column.name ?? column.dataField ?? `column-${index}`
  }));
  const visibleIndexes = getVisibleIndexes(normalizedColumns === null || normalizedColumns === void 0 ? void 0 : normalizedColumns.map(c => c.visibleIndex));
  normalizedColumns === null || normalizedColumns === void 0 || normalizedColumns.forEach((_, i) => {
    normalizedColumns[i].visibleIndex = visibleIndexes[i];
  });
  return normalizedColumns;
}
function normalizeStringColumn(column) {
  if (typeof column === 'string') {
    return {
      dataField: column
    };
  }
  return column;
}
function getColumnIndexByName(columns, name) {
  return columns.findIndex(c => c.name === name);
}
function getColumnByIndexOrName(columns, columnNameOrIndex) {
  const column = columns.find((c, i) => {
    if ((0, _type.isString)(columnNameOrIndex)) {
      return c.name === columnNameOrIndex;
    }
    return i === columnNameOrIndex;
  });
  return column;
}
const getValueDataType = value => {
  const dataType = (0, _type.type)(value);
  const isUnknownDataType = dataType !== 'string' && dataType !== 'boolean' && dataType !== 'number' && dataType !== 'date' && dataType !== 'object';
  return isUnknownDataType ? undefined : dataType;
};
exports.getValueDataType = getValueDataType;
const getColumnFormat = column => {
  if (column.format) {
    return column.format;
  }
  if (column.dataType === 'date' || column.dataType === 'datetime') {
    return 'shortDate';
  }
  return undefined;
};
exports.getColumnFormat = getColumnFormat;
const getColumnOptionsFromDataItem = dataItem => {
  const dataFields = Object.keys(dataItem);
  return {
    dataFields,
    columns: Object.entries(dataItem).reduce((result, _ref2) => {
      let [key, value] = _ref2;
      const dataType = getValueDataType(value);
      const format = getColumnFormat({
        dataType
      });
      result[key] = {
        dataType,
        format
      };
      return result;
    }, {})
  };
};
exports.getColumnOptionsFromDataItem = getColumnOptionsFromDataItem;
const columnOptionUpdate = (settings, columnIdx, updatePath, value) => {
  const newSettings = [...settings];
  const updatePathParts = (0, _data.getPathParts)(updatePath);
  const columnTreeNode = (0, _index.getTreeNodeByPath)(newSettings[columnIdx], updatePathParts);
  if (columnTreeNode === value) {
    return settings;
  }
  newSettings[columnIdx] = (0, _index.setTreeNodeByPath)(settings[columnIdx], value, updatePathParts);
  return normalizeColumnsVisibleIndexes(newSettings, columnIdx);
};
exports.columnOptionUpdate = columnOptionUpdate;
function addDataFieldToComputedColumns(columns) {
  return columns.map(column => {
    if (column.dataField) {
      return column;
    }
    // NOTE: same logic in datagrid
    return Object.assign({}, column, {
      dataField: column.name
    });
  });
}
