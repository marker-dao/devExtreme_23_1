/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/columns_controller.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { computed, effect, signal } from '../../../../core/state_manager/index';
import { isColumnFilterable, mergeColumnHeaderFilterOptions } from '../../../../grids/new/grid_core/filtering/header_filter/utils';
import { OptionsController } from '../options_controller/options_controller';
import { updateColumnSettings } from './columns_settings/index';
import { columnOptionUpdate, getColumnIndexByName, getColumnOptionsFromDataItem, normalizeColumns, normalizeColumnsVisibleIndexes, preNormalizeColumns } from './utils';
export class ColumnsController {
  constructor(options) {
    this.options = options;
    this.columnsConfiguration = this.options.oneWayWithChanges('columns');
    this.headerFilterConfiguration = this.options.oneWay('headerFilter');
    this.columnsSettings = signal([]);
    this.columnsConfigurationFromData = signal(null);
    effect(() => {
      var _this$columnsConfigur;
      const settings = this.columnsSettings.peek() ?? [];
      const {
        value: columnsConfigurationFromOptions,
        changes
      } = this.columnsConfiguration.value;
      const newSettings = updateColumnSettings(settings, changes);
      if (newSettings.length !== 0) {
        this.columnsSettings.value = newSettings;
        return;
      }
      const columnsConfigurationFromData = (_this$columnsConfigur = this.columnsConfigurationFromData.value) === null || _this$columnsConfigur === void 0 ? void 0 : _this$columnsConfigur.dataFields;
      const columnsConfiguration = columnsConfigurationFromOptions ?? columnsConfigurationFromData ?? [];
      this.columnsSettings.value = preNormalizeColumns(columnsConfiguration);
    });
    this.columns = computed(() => {
      var _this$columnsConfigur2;
      const columnsSettings = this.columnsSettings.value;
      const headerFilterRootOptions = this.headerFilterConfiguration.value;
      const columnsFromDataOptions = (_this$columnsConfigur2 = this.columnsConfigurationFromData.value) === null || _this$columnsConfigur2 === void 0 ? void 0 : _this$columnsConfigur2.columns;
      return normalizeColumns(columnsSettings ?? [], template => template ? this.options.normalizeTemplate(template) : undefined, columnsFromDataOptions).map(column => mergeColumnHeaderFilterOptions(column, headerFilterRootOptions));
    });
    this.filterableColumns = computed(() => this.columns.value.filter(col => isColumnFilterable(col)));
    this.visibleColumns = computed(() => this.columns.value.filter(column => column.visible).sort((a, b) => a.visibleIndex - b.visibleIndex).map((column, index) => _extends({}, column, {
      headerPanelIndex: index
    })));
    this.nonVisibleColumns = computed(() => this.columns.value.filter(column => !column.visible));
    this.allowColumnReordering = this.options.oneWay('allowColumnReordering');
  }
  addColumn(columnProps) {
    this.columnsSettings.value = preNormalizeColumns([...this.columnsSettings.peek(), columnProps]);
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
    const columnIdx = getColumnIndexByName(settings, name);
    this.columnsSettings.value = columnOptionUpdate(settings, columnIdx, option, value);
  }
  updateColumns(func) {
    let newColumnSettings = func(this.columnsSettings.peek());
    newColumnSettings = normalizeColumnsVisibleIndexes(newColumnSettings);
    this.columnsSettings.value = newColumnSettings;
  }
  setColumnOptionsFromDataItem(item) {
    if (this.columnsConfigurationFromData.value) {
      return;
    }
    this.columnsConfigurationFromData.value = getColumnOptionsFromDataItem(item);
  }
  resetColumnOptionsFromDataItem() {
    this.columnsConfigurationFromData.value = null;
  }
}
ColumnsController.dependencies = [OptionsController];
