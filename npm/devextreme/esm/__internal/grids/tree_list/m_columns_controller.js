/**
* DevExtreme (esm/__internal/grids/tree_list/m_columns_controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../core/utils/type';
import { ColumnsController, columnsControllerModule } from '../../grids/grid_core/columns_controller/m_columns_controller';
import treeListCore from './m_core';
class TreeListColumnsController extends ColumnsController {
  _getFirstItems(dataSourceAdapter) {
    return super._getFirstItems(dataSourceAdapter).map(node => node.data);
  }
  getFirstDataColumnIndex() {
    const visibleColumns = this.getVisibleColumns();
    const visibleColumnsLength = visibleColumns.length;
    let firstDataColumnIndex = 0;
    for (let i = 0; i <= visibleColumnsLength - 1; i++) {
      if (!isDefined(visibleColumns[i].command)) {
        firstDataColumnIndex = visibleColumns[i].index;
        break;
      }
    }
    return firstDataColumnIndex;
  }
}
treeListCore.registerModule('columns', {
  defaultOptions: columnsControllerModule.defaultOptions,
  controllers: {
    columns: TreeListColumnsController
  }
});
