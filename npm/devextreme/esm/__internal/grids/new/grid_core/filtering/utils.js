/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/utils.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getFilterExpression } from '../../../../filter_builder/m_utils';
export const getAppliedFilterExpressions = (appliedFilters, columns, customOperations) => [getFilterExpression(appliedFilters.filterPanel, columns, customOperations, 'filterBuilder'), getFilterExpression(appliedFilters.headerFilter, columns, customOperations, 'filterBuilder'),
// Note: Search filters do not contain filter expressions
appliedFilters.search].filter(filter => filter);
