import messageLocalization from '../../../../../../localization/message';
export const defaultOptions = {
  filterBuilder: {
    groupOperationDescriptions: {
      and: messageLocalization.format('dxFilterBuilder-and'),
      or: messageLocalization.format('dxFilterBuilder-or'),
      notAnd: messageLocalization.format('dxFilterBuilder-notAnd'),
      notOr: messageLocalization.format('dxFilterBuilder-notOr')
    },
    filterOperationDescriptions: {
      between: messageLocalization.format('dxFilterBuilder-filterOperationBetween'),
      equal: messageLocalization.format('dxFilterBuilder-filterOperationEquals'),
      notEqual: messageLocalization.format('dxFilterBuilder-filterOperationNotEquals'),
      lessThan: messageLocalization.format('dxFilterBuilder-filterOperationLess'),
      lessThanOrEqual: messageLocalization.format('dxFilterBuilder-filterOperationLessOrEquals'),
      greaterThan: messageLocalization.format('dxFilterBuilder-filterOperationGreater'),
      greaterThanOrEqual: messageLocalization.format('dxFilterBuilder-filterOperationGreaterOrEquals'),
      startsWith: messageLocalization.format('dxFilterBuilder-filterOperationStartsWith'),
      contains: messageLocalization.format('dxFilterBuilder-filterOperationContains'),
      notContains: messageLocalization.format('dxFilterBuilder-filterOperationNotContains'),
      endsWith: messageLocalization.format('dxFilterBuilder-filterOperationEndsWith'),
      isBlank: messageLocalization.format('dxFilterBuilder-filterOperationIsBlank'),
      isNotBlank: messageLocalization.format('dxFilterBuilder-filterOperationIsNotBlank')
    }
  },
  filterPanel: {
    visible: false,
    filterEnabled: true,
    texts: {
      createFilter: messageLocalization.format('dxDataGrid-filterPanelCreateFilter'),
      clearFilter: messageLocalization.format('dxDataGrid-filterPanelClearFilter'),
      filterEnabledHint: messageLocalization.format('dxDataGrid-filterPanelFilterEnabledHint')
    }
  },
  filterBuilderPopup: {}
};