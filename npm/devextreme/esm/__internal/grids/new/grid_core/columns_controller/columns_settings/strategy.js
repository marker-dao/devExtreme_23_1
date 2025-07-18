/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/columns_settings/strategy.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { columnOptionUpdate, preNormalizeColumns } from '../utils';
import { extractColumnsOptionsChange } from './extract_columns_options_change';
export const updateAllColumns = (settings, _ref) => {
  let {
    value
  } = _ref;
  return value ? preNormalizeColumns(value) : settings;
};
export const updateColumn = (settings, _ref2) => {
  let {
    columnIdx,
    value
  } = _ref2;
  const newSettings = [...settings];
  newSettings[columnIdx] = value;
  return preNormalizeColumns(newSettings);
};
export const updateColumnOption = (settings, _ref3) => {
  let {
    columnIdx,
    optionPath,
    value
  } = _ref3;
  return columnOptionUpdate(settings, columnIdx, optionPath, value);
};
export const updateColumnSettings = (settings, optionsChange) => {
  if (!optionsChange) {
    return settings;
  }
  const columnsOptionsChange = extractColumnsOptionsChange(optionsChange);
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
