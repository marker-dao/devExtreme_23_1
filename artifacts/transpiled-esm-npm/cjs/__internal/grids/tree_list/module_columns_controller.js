"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnsController = void 0;
var _type = require("../../../core/utils/type");
var _module = require("../grid_core/columns_controller/module");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ColumnsController = _module.columnsControllerModule.controllers.columns.inherit(function () {
  return {
    _getFirstItems: function _getFirstItems(dataSourceAdapter) {
      return this.callBase(dataSourceAdapter).map(function (node) {
        return node.data;
      });
    },
    getFirstDataColumnIndex: function getFirstDataColumnIndex() {
      var visibleColumns = this.getVisibleColumns();
      var visibleColumnsLength = visibleColumns.length;
      var firstDataColumnIndex = 0;
      for (var i = 0; i <= visibleColumnsLength - 1; i++) {
        if (!(0, _type.isDefined)(visibleColumns[i].command)) {
          firstDataColumnIndex = visibleColumns[i].index;
          break;
        }
      }
      return firstDataColumnIndex;
    }
  };
}());
exports.ColumnsController = ColumnsController;
_module_core.default.registerModule('columns', {
  defaultOptions: _module.columnsControllerModule.defaultOptions,
  controllers: {
    columns: ColumnsController
  }
});