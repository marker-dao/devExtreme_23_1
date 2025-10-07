/**
* DevExtreme (esm/__internal/grids/new/grid_core/column_chooser/controller.mock.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxTreeView from '../../../../../ui/tree_view';
import { effect } from '../../../../core/state_manager/index';
import { ColumnChooserController } from './controller';
export class ColumnChooserControllerMock extends ColumnChooserController {
  constructor(columnsController, options) {
    super(columnsController, options);
    this.treeViewElement = document.createElement('div');
    // eslint-disable-next-line new-cap
    this.treeView = new dxTreeView(this.treeViewElement, {
      showCheckBoxesMode: 'selectAll',
      onSelectionChanged: this.onSelectionChanged.bind(this)
    });
    effect(() => {
      this.treeView.option('items', this.items.value);
    });
  }
}
