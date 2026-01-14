// eslint-disable-next-line max-classes-per-file
import { stateStoringModule } from '../../grids/grid_core/state_storing/m_state_storing';
import treeListCore from './m_core';
const stateStoring = Base => class TreeListStateStoringExtender extends stateStoringModule.extenders.controllers.stateStoring(Base) {
  applyState(state) {
    super.applyState(state);
    this.option('expandedRowKeys', state.expandedRowKeys ? state.expandedRowKeys.slice() : []);
  }
};
const data = Base => class TreeListStateStoringDataExtender extends stateStoringModule.extenders.controllers.data(Base) {
  getUserState() {
    const state = super.getUserState();
    if (!this.option('autoExpandAll')) {
      state.expandedRowKeys = this.option('expandedRowKeys');
    }
    return state;
  }
};
treeListCore.registerModule('stateStoring', Object.assign({}, stateStoringModule, {
  extenders: Object.assign({}, stateStoringModule.extenders, {
    controllers: Object.assign({}, stateStoringModule.extenders.controllers, {
      stateStoring,
      data
    })
  })
}));