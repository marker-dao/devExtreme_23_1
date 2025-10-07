/**
* DevExtreme (cjs/__internal/grids/grid_core/columns_controller/const.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_STATE_FIELD_NAMES_15_1 = exports.USER_STATE_FIELD_NAMES = exports.UNSUPPORTED_PROPERTIES_FOR_CHILD_COLUMNS = exports.MAX_SAFE_INTEGER = exports.IGNORE_COLUMN_OPTION_NAMES = exports.GROUP_LOCATION = exports.GROUP_COMMAND_COLUMN_NAME = exports.DETAIL_COMMAND_COLUMN_NAME = exports.DEFAULT_COLUMN_OPTIONS = exports.DATATYPE_OPERATIONS = exports.COMMAND_EXPAND_CLASS = exports.COMMAND_COLUMNS_WITH_REQUIRED_NAMES = exports.COLUMN_OPTION_REGEXP = exports.COLUMN_INDEX_OPTIONS = exports.COLUMN_CHOOSER_LOCATION = void 0;
const USER_STATE_FIELD_NAMES_15_1 = exports.USER_STATE_FIELD_NAMES_15_1 = ['filterValues', 'filterType', 'fixed', 'fixedPosition'];
const USER_STATE_FIELD_NAMES = exports.USER_STATE_FIELD_NAMES = ['visibleIndex', 'dataField', 'name', 'dataType', 'width', 'visible', 'sortOrder', 'lastSortOrder', 'sortIndex', 'groupIndex', 'filterValue', 'bufferedFilterValue', 'selectedFilterOperation', 'bufferedSelectedFilterOperation', 'added'].concat(USER_STATE_FIELD_NAMES_15_1);
// eslint-disable-next-line @stylistic/max-len
const IGNORE_COLUMN_OPTION_NAMES = exports.IGNORE_COLUMN_OPTION_NAMES = {
  visibleWidth: true,
  bestFitWidth: true,
  bufferedFilterValue: true
};
const COMMAND_EXPAND_CLASS = exports.COMMAND_EXPAND_CLASS = 'dx-command-expand';
const MAX_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991 /* IE11 */;
const GROUP_COMMAND_COLUMN_NAME = exports.GROUP_COMMAND_COLUMN_NAME = 'groupExpand';
const DETAIL_COMMAND_COLUMN_NAME = exports.DETAIL_COMMAND_COLUMN_NAME = 'detailExpand';
const COLUMN_OPTION_REGEXP = exports.COLUMN_OPTION_REGEXP = /columns\[(\d+)\]\.?/gi;
const DEFAULT_COLUMN_OPTIONS = exports.DEFAULT_COLUMN_OPTIONS = {
  visible: true,
  showInColumnChooser: true
};
const DATATYPE_OPERATIONS = exports.DATATYPE_OPERATIONS = {
  number: ['=', '<>', '<', '>', '<=', '>=', 'between'],
  string: ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>'],
  date: ['=', '<>', '<', '>', '<=', '>=', 'between'],
  datetime: ['=', '<>', '<', '>', '<=', '>=', 'between']
};
const COLUMN_INDEX_OPTIONS = exports.COLUMN_INDEX_OPTIONS = {
  visibleIndex: true,
  groupIndex: true,
  grouped: true,
  sortIndex: true,
  sortOrder: true
};
const GROUP_LOCATION = exports.GROUP_LOCATION = 'group';
const COLUMN_CHOOSER_LOCATION = exports.COLUMN_CHOOSER_LOCATION = 'columnChooser';
const UNSUPPORTED_PROPERTIES_FOR_CHILD_COLUMNS = exports.UNSUPPORTED_PROPERTIES_FOR_CHILD_COLUMNS = ['fixed', 'fixedPosition', 'type', 'buttons'];
const COMMAND_COLUMNS_WITH_REQUIRED_NAMES = exports.COMMAND_COLUMNS_WITH_REQUIRED_NAMES = ['ai'];
