"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateColumnSettings = exports.updateColumnOption = exports.updateColumn = exports.updateAllColumns = void 0;
var _utils = require("../utils");
var _extract_columns_options_change = require("./extract_columns_options_change");
const updateAllColumns = (settings, _ref) => {
  let {
    value
  } = _ref;
  return value ? (0, _utils.preNormalizeColumns)(value) : settings;
};
exports.updateAllColumns = updateAllColumns;
const updateColumn = (settings, _ref2) => {
  let {
    columnIdx,
    value
  } = _ref2;
  const newSettings = [...settings];
  newSettings[columnIdx] = value;
  return (0, _utils.preNormalizeColumns)(newSettings);
};
exports.updateColumn = updateColumn;
const updateColumnOption = (settings, _ref3) => {
  let {
    columnIdx,
    optionPath,
    value
  } = _ref3;
  return (0, _utils.columnOptionUpdate)(settings, columnIdx, optionPath, value);
};
exports.updateColumnOption = updateColumnOption;
const updateColumnSettings = (settings, optionsChange) => {
  if (!optionsChange) {
    return settings;
  }
  const columnsOptionsChange = (0, _extract_columns_options_change.extractColumnsOptionsChange)(optionsChange);
  switch (columnsOptionsChange === null || columnsOptionsChange === void 0 ? void 0 : columnsOptionsChange.type) {
    case 'allColumns':
      return updateAllColumns(settings, columnsOptionsChange);
    case 'column':
      return updateColumn(settings, columnsOptionsChange);
    case 'columnOption':
      return updateColumnOption(settings, columnsOptionsChange);
    default:
      return settings;
  }
};
exports.updateColumnSettings = updateColumnSettings;