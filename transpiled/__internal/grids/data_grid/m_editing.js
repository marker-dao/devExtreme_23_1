"use strict";

require("./module_not_extended/editor_factory");
var _m_editing = require("../../grids/grid_core/editing/m_editing");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const data = Base => class DataEditingDataGridExtender extends (0, _m_editing.dataControllerEditingExtenderMixin)(Base) {
  _changeRowExpandCore(key) {
    const editingController = this._editingController;
    if (Array.isArray(key)) {
      editingController && editingController.refresh();
    }
    // @ts-expect-error
    return super._changeRowExpandCore.apply(this, arguments);
  }
};
_m_core.default.registerModule('editing', Object.assign({}, _m_editing.editingModule, {
  extenders: Object.assign({}, _m_editing.editingModule.extenders, {
    controllers: Object.assign({}, _m_editing.editingModule.extenders.controllers, {
      data
    })
  })
}));