/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/utils.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppliedFilterExpressions = void 0;
var _m_utils = require("../../../../filter_builder/m_utils");
const getAppliedFilterExpressions = (appliedFilters, columns, customOperations) => [(0, _m_utils.getFilterExpression)(appliedFilters.filterPanel, columns, customOperations, 'filterBuilder'), (0, _m_utils.getFilterExpression)(appliedFilters.headerFilter, columns, customOperations, 'filterBuilder'),
// Note: Search filters do not contain filter expressions
appliedFilters.search].filter(filter => filter);
exports.getAppliedFilterExpressions = getAppliedFilterExpressions;
