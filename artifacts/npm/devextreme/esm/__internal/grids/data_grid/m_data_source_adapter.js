/**
* DevExtreme (esm/__internal/grids/data_grid/m_data_source_adapter.js)
* Version: 23.2.0
* Build date: Fri Oct 06 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSourceAdapter from '../../grids/grid_core/data_source_adapter/m_data_source_adapter';
var dataSourceAdapterType = DataSourceAdapter;
export default {
  extend(extender) {
    dataSourceAdapterType = dataSourceAdapterType.inherit(extender);
  },
  create(component) {
    // eslint-disable-next-line new-cap
    return new dataSourceAdapterType(component);
  }
};
