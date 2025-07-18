/**
* DevExtreme (esm/__internal/grids/data_grid/m_data_source_adapter.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSourceAdapter from '../../grids/grid_core/data_source_adapter/m_data_source_adapter';
let DataSourceAdapterType = DataSourceAdapter;
export default {
  extend(extender) {
    DataSourceAdapterType = extender(DataSourceAdapterType);
  },
  create(component) {
    return new DataSourceAdapterType(component);
  }
};
