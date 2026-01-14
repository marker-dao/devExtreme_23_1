/**
* DevExtreme (esm/__internal/grids/tree_list/__tests__/__mock__/model/tree_list.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import TreeList from '../../../../../../ui/tree_list';
import { GridCoreModel } from '../../../../grid_core/__tests__/__mock__/model/grid_core';
export class TreeListModel extends GridCoreModel {
  constructor() {
    super(...arguments);
    this.NAME = 'dxTreeList';
  }
  getInstance() {
    return TreeList.getInstance(this.root);
  }
  apiGetVisibleColumns(headerLevel) {
    if (headerLevel === undefined) {
      return this.getInstance().getVisibleColumns();
    }
    return this.getInstance().getVisibleColumns(headerLevel);
  }
}
