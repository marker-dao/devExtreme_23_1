/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/filter_panel/options.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
