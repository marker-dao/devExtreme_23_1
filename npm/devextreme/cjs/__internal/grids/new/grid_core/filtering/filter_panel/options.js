/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/filter_panel/options.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = void 0;
var _message = _interopRequireDefault(require("../../../../../../localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultOptions = exports.defaultOptions = {
  filterBuilder: {
    groupOperationDescriptions: {
      and: _message.default.format('dxFilterBuilder-and'),
      or: _message.default.format('dxFilterBuilder-or'),
      notAnd: _message.default.format('dxFilterBuilder-notAnd'),
      notOr: _message.default.format('dxFilterBuilder-notOr')
    },
    filterOperationDescriptions: {
      between: _message.default.format('dxFilterBuilder-filterOperationBetween'),
      equal: _message.default.format('dxFilterBuilder-filterOperationEquals'),
      notEqual: _message.default.format('dxFilterBuilder-filterOperationNotEquals'),
      lessThan: _message.default.format('dxFilterBuilder-filterOperationLess'),
      lessThanOrEqual: _message.default.format('dxFilterBuilder-filterOperationLessOrEquals'),
      greaterThan: _message.default.format('dxFilterBuilder-filterOperationGreater'),
      greaterThanOrEqual: _message.default.format('dxFilterBuilder-filterOperationGreaterOrEquals'),
      startsWith: _message.default.format('dxFilterBuilder-filterOperationStartsWith'),
      contains: _message.default.format('dxFilterBuilder-filterOperationContains'),
      notContains: _message.default.format('dxFilterBuilder-filterOperationNotContains'),
      endsWith: _message.default.format('dxFilterBuilder-filterOperationEndsWith'),
      isBlank: _message.default.format('dxFilterBuilder-filterOperationIsBlank'),
      isNotBlank: _message.default.format('dxFilterBuilder-filterOperationIsNotBlank')
    }
  },
  filterPanel: {
    visible: false,
    filterEnabled: true,
    texts: {
      createFilter: _message.default.format('dxDataGrid-filterPanelCreateFilter'),
      clearFilter: _message.default.format('dxDataGrid-filterPanelClearFilter'),
      filterEnabledHint: _message.default.format('dxDataGrid-filterPanelFilterEnabledHint')
    }
  },
  filterBuilderPopup: {}
};
