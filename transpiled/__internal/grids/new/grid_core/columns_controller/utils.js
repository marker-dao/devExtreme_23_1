"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnByIndexOrName = getColumnByIndexOrName;
exports.getColumnFormat = void 0;
exports.getColumnIndexByName = getColumnIndexByName;
exports.getValueDataType = exports.getColumnOptionsFromDataItem = void 0;
exports.getVisibleIndexes = getVisibleIndexes;
exports.normalizeColumns = normalizeColumns;
exports.normalizeStringColumn = normalizeStringColumn;
exports.normalizeVisibleIndexes = normalizeVisibleIndexes;
exports.preNormalizeColumns = preNormalizeColumns;
var _data = require("../../../../../core/utils/data");
var _inflector = require("../../../../../core/utils/inflector");
var _type = require("../../../../../core/utils/type");
var _options = require("./options");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function normalizeColumn(column, templateNormalizationFunc, columnFromDataOptions) {
  const dataType = column.dataType ?? (columnFromDataOptions === null || columnFromDataOptions === void 0 ? void 0 : columnFromDataOptions.dataType) ?? _options.defaultColumnProperties.dataType;
  const columnDataTypeDefaultOptions = _options.defaultColumnPropertiesByDataType[dataType];
  const columnFormat = column.format ?? (columnFromDataOptions === null || columnFromDataOptions === void 0 ? void 0 : columnFromDataOptions.format);
  const caption = (0, _inflector.captionize)(column.name);
  const colWithDefaults = _extends({}, _options.defaultColumnProperties, columnDataTypeDefaultOptions, {
    caption
  }, column);
  return _extends({}, colWithDefaults, {
    dataType
  }, !!columnFormat && {
    format: columnFormat
  }, {
    calculateDisplayValue: (0, _type.isString)(colWithDefaults.calculateDisplayValue) ? (0, _data.compileGetter)(colWithDefaults.calculateDisplayValue) : colWithDefaults.calculateDisplayValue,
    headerItemTemplate: templateNormalizationFunc(colWithDefaults.headerItemTemplate),
    fieldTemplate: templateNormalizationFunc(colWithDefaults.fieldTemplate),
    fieldCaptionTemplate: templateNormalizationFunc(colWithDefaults.fieldCaptionTemplate),
    fieldValueTemplate: templateNormalizationFunc(colWithDefaults.fieldValueTemplate),
    // @ts-expect-error for compatibility
    calculateCellValue: colWithDefaults.calculateFieldValue
  });
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
  }).map((column, index) => _extends({}, column, {
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