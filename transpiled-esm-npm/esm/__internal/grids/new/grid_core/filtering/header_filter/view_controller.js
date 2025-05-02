import _extends from "@babel/runtime/helpers/esm/extends";
import { signal } from '@preact/signals-core';
import { removeFieldConditionsFromFilter } from '../../../../../filter_builder/m_utils';
import gridCoreUtils from '../../../../../grids/grid_core/m_utils';
import { ColumnsController } from '../../columns_controller/index';
import { getColumnIndexByName } from '../../columns_controller/utils';
import { DataController } from '../../data_controller/index';
import { OptionsController } from '../../options_controller/options_controller';
import { FilterController } from '../filter_controller';
import { getAppliedFilterExpressions } from '../utils';
import { getDataSourceOptions, getFilterType } from './legacy_header_filter';
import { getColumnIdentifier } from './utils';
export class HeaderFilterViewController {
  constructor(options, dataController, columnsController, filterController) {
    this.options = options;
    this.dataController = dataController;
    this.columnsController = columnsController;
    this.filterController = filterController;
    this.popupStateInternal = signal(null);
    this.popupState = this.popupStateInternal;
  }
  openPopup(element, column, onFilterCloseCallback) {
    const rootDataSource = this.dataController.getStoreLoadAdapter();
    const rootHeaderFilterOptions = this.options.oneWay('headerFilter').peek();
    const filterExpression = this.getFilterExpressionWithoutCurrentColumn(column);
    const filterDataSourceOptions = getDataSourceOptions(rootDataSource, _extends({}, column, {
      filterType: column.filterType,
      filterValues: column.filterValues
    }),
    // NOTE: Only text used from root options
    {
      texts: rootHeaderFilterOptions.texts
    }, filterExpression);
    const type = getFilterType(column);
    const colsController = this.columnsController;
    this.popupStateInternal.value = {
      element,
      options: {
        type,
        headerFilter: _extends({}, column.headerFilter),
        dataSource: filterDataSourceOptions,
        filterType: column.filterType,
        // NOTE: Copy array because of mutations in legacy code
        filterValues: Array.isArray(column.filterValues) ? [...column.filterValues] : column.filterValues,
        apply() {
          colsController.updateColumns(columns => {
            const index = getColumnIndexByName(columns, column.name);
            const newColumns = [...columns];
            newColumns[index] = _extends({}, newColumns[index], {
              headerFilter: _extends({}, newColumns[index].headerFilter),
              filterValues: Array.isArray(this.filterValues) ? [...this.filterValues] : this.filterValues,
              filterType: this.filterType
            });
            return newColumns;
          });
          onFilterCloseCallback === null || onFilterCloseCallback === void 0 || onFilterCloseCallback();
        },
        hidePopupCallback: () => {
          this.popupStateInternal.value = null;
          onFilterCloseCallback === null || onFilterCloseCallback === void 0 || onFilterCloseCallback();
        }
      }
    };
  }
  removeColumnFromFilters(appliedFilters, excludedColumn) {
    const columnId = getColumnIdentifier(excludedColumn);
    const filterPanel = removeFieldConditionsFromFilter(appliedFilters.filterPanel, columnId);
    const headerFilter = removeFieldConditionsFromFilter(appliedFilters.headerFilter, columnId);
    return {
      filterPanel,
      headerFilter,
      // Note: Search filter should not be handled as in the DataGrid implementation
      search: appliedFilters.search
    };
  }
  combineFilterExpressions(filterExpressions) {
    if (!filterExpressions || filterExpressions.length === 0) {
      return undefined;
    }
    return gridCoreUtils.combineFilters(filterExpressions);
  }
  getFilterExpressionWithoutCurrentColumn(column) {
    const appliedFilters = this.filterController.appliedFilters.peek();
    const filtersWithoutCurrentColumn = this.removeColumnFromFilters(appliedFilters, column);
    const allColumns = this.columnsController.columns.peek();
    const customOperations = this.filterController.customOperations.peek();
    const appliedFilterExpresssionsArray = getAppliedFilterExpressions(filtersWithoutCurrentColumn, allColumns, customOperations);
    return this.combineFilterExpressions(appliedFilterExpresssionsArray);
  }
}
HeaderFilterViewController.dependencies = [OptionsController, DataController, ColumnsController, FilterController];