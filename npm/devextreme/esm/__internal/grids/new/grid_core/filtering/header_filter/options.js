/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/options.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../../../common/core/localization/message';
export const defaultOptions = {
  headerFilter: {
    visible: false,
    width: 252,
    height: 325,
    allowSelectAll: true,
    search: {
      enabled: false,
      timeout: 500,
      mode: 'contains',
      editorOptions: {}
    },
    texts: {
      emptyValue: messageLocalization.format('dxDataGrid-headerFilterEmptyValue'),
      ok: messageLocalization.format('dxDataGrid-headerFilterOK'),
      cancel: messageLocalization.format('dxDataGrid-headerFilterCancel')
    }
  }
};
