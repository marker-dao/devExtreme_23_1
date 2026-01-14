/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/view_controller.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { signal } from '../../../../../core/state_manager/index';
import { removeFieldConditionsFromFilter } from '../../../../../filter_builder/m_utils';
import gridCoreUtils from '../../../../../grids/grid_core/m_utils';
import { ColumnsController } from '../../columns_controller/index';
import { getColumnIndexByName } from '../../columns_controller/utils';
import { DataController } from '../../data_controller/index';
import { OptionsController } from '../../options_controller/options_controller';
import { FilterController } from '../filter_controller';
import { getAppliedFilterExpressions } from '../utils';
import { getDataSourceOptions, getHeaderFilterListType } from './legacy_header_filter';
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
  openPopup(element, column, onFilterCloseCallback, customApply, isFilterBuilder) {
    const rootDataSource = this.dataController.getStoreLoadAdapter();
    /*
      Note: Root headerFilter options are used because the legacy code handles retrieving
      options for specific columns on its own
    */
    const rootHeaderFilterOptions = this.options.oneWay('headerFilter').peek();
    const filterExpression = this.getFilterExpressionWithoutCurrentColumn(column);
    const type = getHeaderFilterListType(column);
    const {
      columnsController
    } = this;
    const applyFilter = (filterValues, filterType) => {
      if (customApply) {
        customApply(filterValues);
      } else {
        columnsController.updateColumns(columns => {
          const index = getColumnIndexByName(columns, column.name);
          const newColumns = [...columns];
          newColumns[index] = Object.assign({}, newColumns[index], {
            // NOTE: Copy array because of mutations in legacy code
            filterValues: Array.isArray(filterValues) ? [...filterValues] : filterValues,
            filterType
          });
          return newColumns;
        });
      }
      onFilterCloseCallback === null || onFilterCloseCallback === void 0 || onFilterCloseCallback();
    };
    const popupOptions = {
      type,
      column: Object.assign({}, column),
      isFilterBuilder,
      headerFilter: Object.assign({}, column.headerFilter),
      filterType: column.filterType,
      // NOTE: Copy array because of mutations in legacy code
      filterValues: Array.isArray(column.filterValues) ? [...column.filterValues] : column.filterValues,
      apply() {
        applyFilter(this.filterValues, this.filterType);
      },
      hidePopupCallback: () => {
        this.popupStateInternal.value = null;
        onFilterCloseCallback === null || onFilterCloseCallback === void 0 || onFilterCloseCallback();
      }
    };
    popupOptions.dataSource = getDataSourceOptions(rootDataSource, popupOptions,
    // NOTE: Only text used from root options
    {
      texts: rootHeaderFilterOptions.texts
    }, filterExpression);
    this.popupStateInternal.value = {
      element,
      options: popupOptions
    };
  }
  closePopup() {
    this.popupStateInternal.value = null;
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
    const filterableColumns = this.columnsController.filterableColumns.peek();
    const customOperations = this.filterController.customOperations.peek();
    const filterSyncEnabled = this.filterController.filterSyncEnabled.peek();
    const appliedFilterExpresssionsArray = getAppliedFilterExpressions(filtersWithoutCurrentColumn, filterableColumns, customOperations, filterSyncEnabled);
    return this.combineFilterExpressions(appliedFilterExpresssionsArray);
  }
}
HeaderFilterViewController.dependencies = [OptionsController, DataController, ColumnsController, FilterController];
