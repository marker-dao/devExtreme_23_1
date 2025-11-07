/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { compileGetter, getPathParts } from '../../../../../core/utils/data';
import { captionize } from '../../../../../core/utils/inflector';
import { isDefined, isString, type } from '../../../../../core/utils/type';
import { getTreeNodeByPath, setTreeNodeByPath } from '../../../../grids/new/grid_core/utils/tree/index';
import { defaultColumnProperties, defaultColumnPropertiesByDataType } from './options';
export function normalizeColumn(column, templateNormalizationFunc, columnFromDataOptions) {
  const dataType = column.dataType ?? (columnFromDataOptions === null || columnFromDataOptions === void 0 ? void 0 : columnFromDataOptions.dataType) ?? defaultColumnProperties.dataType;
  const columnDataTypeDefaultOptions = defaultColumnPropertiesByDataType[dataType];
  const columnFormat = column.format ?? (columnDataTypeDefaultOptions === null || columnDataTypeDefaultOptions === void 0 ? void 0 : columnDataTypeDefaultOptions.format) ?? (columnFromDataOptions === null || columnFromDataOptions === void 0 ? void 0 : columnFromDataOptions.format);
  const caption = captionize(column.name);
  const colWithDefaults = _extends({}, defaultColumnProperties, columnDataTypeDefaultOptions, {
    caption
  }, column);
  const normalizedColumn = _extends({}, colWithDefaults, {
    dataType
  }, !!columnFormat && {
    format: columnFormat
  }, {
    calculateDisplayValue: isString(colWithDefaults.calculateDisplayValue) ? compileGetter(colWithDefaults.calculateDisplayValue) : colWithDefaults.calculateDisplayValue,
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
export function getVisibleIndexes(indexes) {
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
export function normalizeVisibleIndexes(indexes, forceIndex) {
  const indexMap = indexes.map((visibleIndex, index) => [index, visibleIndex]);
  const sortedIndexMap = new Array(indexes.length);
  if (isDefined(forceIndex)) {
    sortedIndexMap[indexes[forceIndex]] = forceIndex;
  }
  let j = 0;
  indexMap.sort((a, b) => a[1] - b[1]).forEach(_ref => {
    let [index] = _ref;
    if (index === forceIndex) {
      return;
    }
    if (isDefined(sortedIndexMap[j])) {
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
export function normalizeColumnsVisibleIndexes(columns, forceIndex) {
  const result = [...columns];
  const visibleIndexes = normalizeVisibleIndexes(columns.map(c => c.visibleIndex), forceIndex);
  visibleIndexes.forEach((visibleIndex, i) => {
    result[i].visibleIndex = visibleIndex;
  });
  return result;
}
export function normalizeColumns(columns, templateNormalizationFunc, columnsFromData) {
  return columns.map(col => {
    const columnFromDataOptions = columnsFromData === null || columnsFromData === void 0 ? void 0 : columnsFromData[col.name];
    return normalizeColumn(col, templateNormalizationFunc, columnFromDataOptions);
  });
}
export function preNormalizeColumns(columns) {
  const normalizedColumns = columns === null || columns === void 0 ? void 0 : columns.map(column => {
    if (typeof column === 'string') {
      return {
        dataField: column
      };
    }
    return column;
  }).map((column, index) => _extends({}, column, {
    name: column.name ?? column.dataField ?? `column-${index}`
  }));
  const visibleIndexes = getVisibleIndexes(normalizedColumns === null || normalizedColumns === void 0 ? void 0 : normalizedColumns.map(c => c.visibleIndex));
  normalizedColumns === null || normalizedColumns === void 0 || normalizedColumns.forEach((_, i) => {
    normalizedColumns[i].visibleIndex = visibleIndexes[i];
  });
  return normalizedColumns;
}
export function normalizeStringColumn(column) {
  if (typeof column === 'string') {
    return {
      dataField: column
    };
  }
  return column;
}
export function getColumnIndexByName(columns, name) {
  return columns.findIndex(c => c.name === name);
}
export function getColumnByIndexOrName(columns, columnNameOrIndex) {
  const column = columns.find((c, i) => {
    if (isString(columnNameOrIndex)) {
      return c.name === columnNameOrIndex;
    }
    return i === columnNameOrIndex;
  });
  return column;
}
export const getValueDataType = value => {
  const dataType = type(value);
  const isUnknownDataType = dataType !== 'string' && dataType !== 'boolean' && dataType !== 'number' && dataType !== 'date' && dataType !== 'object';
  return isUnknownDataType ? undefined : dataType;
};
export const getColumnFormat = column => {
  if (column.format) {
    return column.format;
  }
  if (column.dataType === 'date' || column.dataType === 'datetime') {
    return 'shortDate';
  }
  return undefined;
};
export const getColumnOptionsFromDataItem = dataItem => {
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
export const columnOptionUpdate = (settings, columnIdx, updatePath, value) => {
  const newSettings = [...settings];
  const updatePathParts = getPathParts(updatePath);
  const columnTreeNode = getTreeNodeByPath(newSettings[columnIdx], updatePathParts);
  if (columnTreeNode === value) {
    return settings;
  }
  newSettings[columnIdx] = setTreeNodeByPath(settings[columnIdx], value, updatePathParts);
  return normalizeColumnsVisibleIndexes(newSettings, columnIdx);
};
export function addDataFieldToComputedColumns(columns) {
  return columns.map(column => {
    if (column.dataField) {
      return column;
    }
    // NOTE: same logic in datagrid
    return _extends({}, column, {
      dataField: column.name
    });
  });
}
