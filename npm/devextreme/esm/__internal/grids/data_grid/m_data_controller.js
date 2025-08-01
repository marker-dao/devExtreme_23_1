/**
* DevExtreme (esm/__internal/grids/data_grid/m_data_controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../ui/widget/ui.errors';
import { DataController, dataControllerModule } from '../../grids/grid_core/data_controller/m_data_controller';
import gridCore from './m_core';
import dataSourceAdapterProvider from './m_data_source_adapter';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
class DataGridDataController extends DataController {
  _getDataSourceAdapter() {
    return dataSourceAdapterProvider;
  }
  _getSpecificDataSourceOption() {
    const dataSource = this.option('dataSource');
    if (dataSource && !Array.isArray(dataSource) && this.option('keyExpr')) {
      errors.log('W1011');
    }
    return super._getSpecificDataSourceOption();
  }
}
export { DataGridDataController as DataController };
gridCore.registerModule('data', {
  defaultOptions: dataControllerModule.defaultOptions,
  controllers: {
    data: DataGridDataController
  }
});
