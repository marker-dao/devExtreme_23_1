import { getFilterExpression } from '../../../../filter_builder/m_utils';
export const getAppliedFilterExpressions = (appliedFilters, columns, customOperations) => [getFilterExpression(appliedFilters.filterPanel, columns, customOperations, 'filterBuilder'), getFilterExpression(appliedFilters.headerFilter, columns, customOperations, 'filterBuilder'),
// Note: Search filters do not contain filter expressions
appliedFilters.search].filter(filter => filter);