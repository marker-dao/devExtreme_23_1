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