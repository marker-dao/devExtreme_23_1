/**
* DevExtreme (cjs/__internal/grids/new/grid_core/columns_controller/columns_settings/extract_columns_options_change.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractColumnsOptionsChange = void 0;
var _data = require("../../../../../../core/utils/data");
var _utils = require("./utils");
const ROOT_COLUMNS_OPTION_NAME = 'columns';
const extractColumnsOptionsChange = _ref => {
  let {
    fullName,
    value
  } = _ref;
  const updatePath = (0, _data.getPathParts)(fullName);
  const [rootUpdatePath] = updatePath;
  switch (true) {
    case rootUpdatePath !== ROOT_COLUMNS_OPTION_NAME:
      return null;
    // NOTE: Whole columns array update case:
    // -> 'columns'
    case updatePath.length === 1 && Array.isArray(value):
      return {
        type: 'allColumns',
        value: value ?? null
      };
    // NOTE: Specific column update case:
    // -> 'columns[idx]'
    case updatePath.length === 2 && (0, _utils.isAllowedColumnValue)(value) && (0, _utils.isCorrectColumnIdx)(updatePath[1]):
      return {
        type: 'column',
        columnIdx: (0, _utils.getColumnIdxFromPath)(updatePath),
        value
      };
    // NOTE: Specific column property update case:
    // -> 'columns[idx].property'
    // -> 'columns[idx].nested.anotherNester.property'
    case updatePath.length > 2 && (0, _utils.isCorrectColumnIdx)(updatePath[1]):
      return {
        type: 'columnOption',
        columnIdx: (0, _utils.getColumnIdxFromPath)(updatePath),
        optionPath: (0, _utils.getColumnOptionPathStr)(updatePath),
        value
      };
    default:
      return null;
  }
};
exports.extractColumnsOptionsChange = extractColumnsOptionsChange;
