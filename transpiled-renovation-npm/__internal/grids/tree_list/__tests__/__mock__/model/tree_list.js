"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeListModel = void 0;
var _tree_list = _interopRequireDefault(require("../../../../../../ui/tree_list"));
var _grid_core = require("../../../../grid_core/__tests__/__mock__/model/grid_core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TreeListModel extends _grid_core.GridCoreModel {
  constructor() {
    super(...arguments);
    this.NAME = 'dxTreeList';
  }
  getInstance() {
    return _tree_list.default.getInstance(this.root);
  }
  apiGetVisibleColumns(headerLevel) {
    if (headerLevel === undefined) {
      return this.getInstance().getVisibleColumns();
    }
    return this.getInstance().getVisibleColumns(headerLevel);
  }
}
exports.TreeListModel = TreeListModel;