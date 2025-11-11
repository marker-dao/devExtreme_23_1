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