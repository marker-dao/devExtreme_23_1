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