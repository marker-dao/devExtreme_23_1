import _extends from "@babel/runtime/helpers/esm/extends";
import { compileGetter } from '../../../../../core/utils/data';
import { captionize } from '../../../../../core/utils/inflector';
import { isDefined, isString, type } from '../../../../../core/utils/type';
import { defaultColumnProperties, defaultColumnPropertiesByDataType } from './options';
function normalizeColumn(column, templateNormalizationFunc, columnFromDataOptions) {
  const dataType = column.dataType ?? (columnFromDataOptions === null || columnFromDataOptions === void 0 ? void 0 : columnFromDataOptions.dataType) ?? defaultColumnProperties.dataType;
  const columnDataTypeDefaultOptions = defaultColumnPropertiesByDataType[dataType];
  const columnFormat = column.format ?? (columnFromDataOptions === null || columnFromDataOptions === void 0 ? void 0 : columnFromDataOptions.format);
  const caption = captionize(column.name);
  const colWithDefaults = _extends({}, defaultColumnProperties, columnDataTypeDefaultOptions, {
    caption
  }, column);
  return _extends({}, colWithDefaults, {
    dataType
  }, !!columnFormat && {
    format: columnFormat
  }, {
    calculateDisplayValue: isString(colWithDefaults.calculateDisplayValue) ? compileGetter(colWithDefaults.calculateDisplayValue) : colWithDefaults.calculateDisplayValue,
    headerItemTemplate: templateNormalizationFunc(colWithDefaults.headerItemTemplate),
    fieldTemplate: templateNormalizationFunc(colWithDefaults.fieldTemplate),
    fieldCaptionTemplate: templateNormalizationFunc(colWithDefaults.fieldCaptionTemplate),
    fieldValueTemplate: templateNormalizationFunc(colWithDefaults.fieldValueTemplate),
    // @ts-expect-error for compatibility
    calculateCellValue: colWithDefaults.calculateFieldValue
  });
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