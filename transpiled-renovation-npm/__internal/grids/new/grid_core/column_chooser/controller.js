"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnChooserController = void 0;
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _signalsCore = require("@preact/signals-core");
var _m_columns_controller_utils = require("../../../../grids/grid_core/columns_controller/m_columns_controller_utils");
var _columns_controller = require("../columns_controller/columns_controller");
var _utils = require("../columns_controller/utils");
var _options_controller = require("../options_controller/options_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CLASS = {
  hidden: 'dx-hidden'
};
class ColumnChooserController {
  constructor(columnsController, options) {
    this.columnsController = columnsController;
    this.options = options;
    this.draggingItem = (0, _signalsCore.signal)(null);
    this.onColumnMove = column => {
      this.columnsController.columnOption(column, 'visible', false);
    };
    this.onDragStart = e => {
      this.draggingItem.value = e.itemData;
    };
    this.onDragEnd = () => {
      this.draggingItem.value = null;
    };
    this.isColumnDraggable = column => column.allowHiding;
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    this.onPlaceholderPrepared = e => {
      const $placeholderElement = (0, _renderer.default)(e.placeholderElement);
      $placeholderElement.addClass(CLASS.hidden);
    };
    this.chooserColumns = (0, _signalsCore.computed)(() => {
      const sortOrder = this.options.oneWay('columnChooser.sortOrder').value;
      const mode = this.options.oneWay('columnChooser.mode').value;
      let chooserColumns = this.columnsController.columns.value;
      if (mode === 'dragAndDrop') {
        chooserColumns = chooserColumns.filter(column => !column.visible);
      }
      chooserColumns = chooserColumns.filter(column => column.showInColumnChooser);
      chooserColumns = (0, _m_columns_controller_utils.sortColumns)(chooserColumns, sortOrder);
      return chooserColumns;
    });
    this.items = (0, _signalsCore.computed)(() => this.chooserColumns.value.map((column, index) => ({
      id: index,
      columnName: column.name,
      selected: column.visible,
      text: column.caption,
      disabled: !column.allowHiding,
      column
    })));
  }
  onSelectionChanged(e) {
    const nodes = e.component.getNodes();
    this.columnsController.updateColumns(columns => {
      for (const node of nodes) {
        var _node$itemData;
        const columnIndex = (0, _utils.getColumnIndexByName)(columns, (_node$itemData = node.itemData) === null || _node$itemData === void 0 ? void 0 : _node$itemData.columnName);
        const canHide = columns[columnIndex].allowHiding ?? true;
        // in case when allowHiding=false and node.selected=false, we do not hide column
        const skip = !canHide && !node.selected;
        if (!skip) {
          columns[columnIndex] = _extends({}, columns[columnIndex], {
            visible: node.selected
          });
        }
      }
      return [...columns];
    });
  }
}
exports.ColumnChooserController = ColumnChooserController;
ColumnChooserController.dependencies = [_columns_controller.ColumnsController, _options_controller.OptionsController];