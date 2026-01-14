import './module_not_extended/editor_factory';
import { dataControllerEditingExtenderMixin, editingModule } from '../../grids/grid_core/editing/m_editing';
import gridCore from './m_core';
const data = Base => class DataEditingDataGridExtender extends dataControllerEditingExtenderMixin(Base) {
  _changeRowExpandCore(key) {
    const editingController = this._editingController;
    if (Array.isArray(key)) {
      editingController && editingController.refresh();
    }
    // @ts-expect-error
    return super._changeRowExpandCore.apply(this, arguments);
  }
};
gridCore.registerModule('editing', Object.assign({}, editingModule, {
  extenders: Object.assign({}, editingModule.extenders, {
    controllers: Object.assign({}, editingModule.extenders.controllers, {
      data
    })
  })
}));