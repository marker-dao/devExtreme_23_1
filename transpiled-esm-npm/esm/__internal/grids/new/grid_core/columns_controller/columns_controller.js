import _extends from "@babel/runtime/helpers/esm/extends";
import { computed, effect, signal } from '@preact/signals-core';
import { mergeColumnHeaderFilterOptions } from '../../../../grids/new/grid_core/filtering/header_filter/utils';
import { OptionsController } from '../options_controller/options_controller';
import { getColumnIndexByName, getColumnOptionsFromDataItem, normalizeColumns, normalizeVisibleIndexes, preNormalizeColumns } from './utils';
export class ColumnsController {
  constructor(options) {
    this.options = options;
    this.columnsConfiguration = this.options.oneWay('columns');
    this.headerFilterConfiguration = this.options.oneWay('headerFilter');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.columnsSettings = signal(undefined);
    this.columnsConfigurationFromData = signal(null);
    effect(() => {
      var _this$columnsConfigur;
      const columnsConfigurationFromOptions = this.columnsConfiguration.value;
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
  columnOption(column, option, value) {
    const columns = this.columnsSettings.peek();
    const index = getColumnIndexByName(columns, column.name);
    if (columns[index][option] === value) {
      this.columnsSettings.value = columns;
      return;
    }
    let newColumns = [...columns];
    newColumns[index] = _extends({}, newColumns[index], {
      [option]: value
    });
    newColumns = this.normalizeColumnsVisibleIndexes(newColumns, index);
    this.columnsSettings.value = newColumns;
  }
  updateColumns(func) {
    let newColumnSettings = func(this.columnsSettings.peek());
    newColumnSettings = this.normalizeColumnsVisibleIndexes(newColumnSettings);
    this.columnsSettings.value = newColumnSettings;
  }
  normalizeColumnsVisibleIndexes(columns, forceIndex) {
    const result = [...columns];
    const visibleIndexes = normalizeVisibleIndexes(columns.map(c => c.visibleIndex), forceIndex);
    visibleIndexes.forEach((visibleIndex, i) => {
      result[i].visibleIndex = visibleIndex;
    });
    return result;
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