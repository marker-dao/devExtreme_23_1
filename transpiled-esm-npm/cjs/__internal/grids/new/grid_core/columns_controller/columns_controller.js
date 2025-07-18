"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnsController = void 0;
var _signalsCore = require("@preact/signals-core");
var _utils = require("../../../../grids/new/grid_core/filtering/header_filter/utils");
var _options_controller = require("../options_controller/options_controller");
var _index = require("./columns_settings/index");
var _utils2 = require("./utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class ColumnsController {
  constructor(options) {
    this.options = options;
    this.columnsConfiguration = this.options.oneWayWithChanges('columns');
    this.headerFilterConfiguration = this.options.oneWay('headerFilter');
    this.columnsSettings = (0, _signalsCore.signal)([]);
    this.columnsConfigurationFromData = (0, _signalsCore.signal)(null);
    (0, _signalsCore.effect)(() => {
      var _this$columnsConfigur;
      const settings = this.columnsSettings.peek() ?? [];
      const {
        value: columnsConfigurationFromOptions,
        changes
      } = this.columnsConfiguration.value;
      const newSettings = (0, _index.updateColumnSettings)(settings, changes);
      if (newSettings.length !== 0) {
        this.columnsSettings.value = newSettings;
        return;
      }
      const columnsConfigurationFromData = (_this$columnsConfigur = this.columnsConfigurationFromData.value) === null || _this$columnsConfigur === void 0 ? void 0 : _this$columnsConfigur.dataFields;
      const columnsConfiguration = columnsConfigurationFromOptions ?? columnsConfigurationFromData ?? [];
      this.columnsSettings.value = (0, _utils2.preNormalizeColumns)(columnsConfiguration);
    });
    this.columns = (0, _signalsCore.computed)(() => {
      var _this$columnsConfigur2;
      const columnsSettings = this.columnsSettings.value;
      const headerFilterRootOptions = this.headerFilterConfiguration.value;
      const columnsFromDataOptions = (_this$columnsConfigur2 = this.columnsConfigurationFromData.value) === null || _this$columnsConfigur2 === void 0 ? void 0 : _this$columnsConfigur2.columns;
      return (0, _utils2.normalizeColumns)(columnsSettings ?? [], template => template ? this.options.normalizeTemplate(template) : undefined, columnsFromDataOptions).map(column => (0, _utils.mergeColumnHeaderFilterOptions)(column, headerFilterRootOptions));
    });
    this.filterableColumns = (0, _signalsCore.computed)(() => this.columns.value.filter(col => (0, _utils.isColumnFilterable)(col)));
    this.visibleColumns = (0, _signalsCore.computed)(() => this.columns.value.filter(column => column.visible).sort((a, b) => a.visibleIndex - b.visibleIndex).map((column, index) => _extends({}, column, {
      headerPanelIndex: index
    })));
    this.nonVisibleColumns = (0, _signalsCore.computed)(() => this.columns.value.filter(column => !column.visible));
    this.allowColumnReordering = this.options.oneWay('allowColumnReordering');
  }
  addColumn(columnProps) {
    this.columnsSettings.value = (0, _utils2.preNormalizeColumns)([...this.columnsSettings.peek(), columnProps]);
  }
  deleteColumn(column) {
    this.columnsSettings.value = this.columnsSettings.peek().filter(c => c.name !== column.name);
  }
  columnOption(_ref,
  // TODO: Fix type -> option may be path with dots in runtime
  //  E.g: 'columnOption('A', 'headerFilter.search.enabled', true)
  option, value) {
    let {
      name
    } = _ref;
    const settings = this.columnsSettings.peek();
    const columnIdx = (0, _utils2.getColumnIndexByName)(settings, name);
    this.columnsSettings.value = (0, _utils2.columnOptionUpdate)(settings, columnIdx, option, value);
  }
  updateColumns(func) {
    let newColumnSettings = func(this.columnsSettings.peek());
    newColumnSettings = (0, _utils2.normalizeColumnsVisibleIndexes)(newColumnSettings);
    this.columnsSettings.value = newColumnSettings;
  }
  setColumnOptionsFromDataItem(item) {
    if (this.columnsConfigurationFromData.value) {
      return;
    }
    this.columnsConfigurationFromData.value = (0, _utils2.getColumnOptionsFromDataItem)(item);
  }
  resetColumnOptionsFromDataItem() {
    this.columnsConfigurationFromData.value = null;
  }
}
exports.ColumnsController = ColumnsController;
ColumnsController.dependencies = [_options_controller.OptionsController];