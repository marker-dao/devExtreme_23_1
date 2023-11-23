/**
* DevExtreme (cjs/__internal/grids/grid_core/filter/m_filter_sync.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterSyncModule = void 0;
var _type = require("../../../../core/utils/type");
var _utils = require("../../../../ui/filter_builder/utils");
var _filtering = _interopRequireDefault(require("../../../../ui/shared/filtering"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _m_filter_custom_operations = require("./m_filter_custom_operations");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FILTER_ROW_OPERATIONS = ['=', '<>', '<', '<=', '>', '>=', 'notcontains', 'contains', 'startswith', 'endswith', 'between'];
const FILTER_TYPES_INCLUDE = 'include';
const FILTER_TYPES_EXCLUDE = 'exclude';
function getColumnIdentifier(column) {
  return column.name || column.dataField;
}
function checkForErrors(columns) {
  columns.forEach(column => {
    const identifier = getColumnIdentifier(column);
    // @ts-expect-error
    if (!(0, _type.isDefined)(identifier) && column.allowFiltering) throw new _ui.default.Error('E1049', column.caption);
  });
}
const FilterSyncController = _m_modules.default.Controller.inherit(function () {
  const getEmptyFilterValues = function () {
    return {
      filterType: FILTER_TYPES_INCLUDE,
      filterValues: undefined
    };
  };
  const canSyncHeaderFilterWithFilterRow = function (column) {
    const filterValues = column.filterValues || [];
    return !_filtering.default.getGroupInterval(column) && !(column.headerFilter && column.headerFilter.dataSource) || filterValues.length === 1 && filterValues[0] === null;
  };
  const getHeaderFilterFromCondition = function (headerFilterCondition, column) {
    if (!headerFilterCondition) {
      return getEmptyFilterValues();
    }
    let filterType;
    const selectedFilterOperation = headerFilterCondition[1];
    const value = headerFilterCondition[2];
    const hasArrayValue = Array.isArray(value);
    if (!hasArrayValue) {
      if (!canSyncHeaderFilterWithFilterRow(column)) {
        return getEmptyFilterValues();
      }
    }
    switch (selectedFilterOperation) {
      case 'anyof':
      case '=':
        filterType = FILTER_TYPES_INCLUDE;
        break;
      case 'noneof':
      case '<>':
        filterType = FILTER_TYPES_EXCLUDE;
        break;
      default:
        return getEmptyFilterValues();
    }
    return {
      filterType,
      filterValues: hasArrayValue ? value : [value]
    };
  };
  const getConditionFromFilterRow = function (column) {
    const value = column.filterValue;
    if ((0, _type.isDefined)(value)) {
      const operation = column.selectedFilterOperation || column.defaultFilterOperation || (0, _utils.getDefaultOperation)(column);
      const filter = [getColumnIdentifier(column), operation, column.filterValue];
      return filter;
    }
    return null;
  };
  const getConditionFromHeaderFilter = function (column) {
    let selectedOperation;
    let value;
    const {
      filterValues
    } = column;
    if (!filterValues) return null;
    if (filterValues.length === 1 && canSyncHeaderFilterWithFilterRow(column) && !Array.isArray(filterValues[0])) {
      column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = '<>' : selectedOperation = '=';
      // eslint-disable-next-line prefer-destructuring
      value = filterValues[0];
    } else {
      column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = 'noneof' : selectedOperation = 'anyof';
      value = filterValues;
    }
    return [getColumnIdentifier(column), selectedOperation, value];
  };
  const updateHeaderFilterCondition = function (columnsController, column, headerFilterCondition) {
    const headerFilter = getHeaderFilterFromCondition(headerFilterCondition, column);
    columnsController.columnOption(getColumnIdentifier(column), headerFilter);
  };
  const updateFilterRowCondition = function (columnsController, column, condition) {
    let filterRowOptions;
    let selectedFilterOperation = condition === null || condition === void 0 ? void 0 : condition[1];
    const filterValue = condition === null || condition === void 0 ? void 0 : condition[2];
    const filterOperations = column.filterOperations || column.defaultFilterOperations;
    if ((!filterOperations || filterOperations.indexOf(selectedFilterOperation) >= 0 || selectedFilterOperation === column.defaultFilterOperation) && FILTER_ROW_OPERATIONS.includes(selectedFilterOperation) && filterValue !== null) {
      if (selectedFilterOperation === column.defaultFilterOperation && !(0, _type.isDefined)(column.selectedFilterOperation)) {
        selectedFilterOperation = column.selectedFilterOperation;
      }
      filterRowOptions = {
        filterValue,
        selectedFilterOperation
      };
    } else {
      filterRowOptions = {
        filterValue: undefined,
        selectedFilterOperation: undefined
      };
    }
    columnsController.columnOption(getColumnIdentifier(column), filterRowOptions);
  };
  return {
    syncFilterValue() {
      const that = this;
      const columnsController = that.getController('columns');
      const columns = columnsController.getFilteringColumns();
      this._skipSyncColumnOptions = true;
      columns.forEach(column => {
        const filterConditions = (0, _utils.getMatchedConditions)(that.option('filterValue'), getColumnIdentifier(column));
        if (filterConditions.length === 1) {
          const filterCondition = filterConditions[0];
          updateHeaderFilterCondition(columnsController, column, filterCondition);
          updateFilterRowCondition(columnsController, column, filterCondition);
        } else {
          (0, _type.isDefined)(column.filterValues) && updateHeaderFilterCondition(columnsController, column, null);
          (0, _type.isDefined)(column.filterValue) && updateFilterRowCondition(columnsController, column, null);
        }
      });
      this._skipSyncColumnOptions = false;
    },
    _initSync() {
      const columns = this.getController('columns').getColumns();
      const dataController = this.getController('data');
      const pageIndex = dataController.pageIndex();
      checkForErrors(columns);
      if (!this.option('filterValue')) {
        const filteringColumns = this.getController('columns').getFilteringColumns();
        const filterValue = this.getFilterValueFromColumns(filteringColumns);
        this.option('filterValue', filterValue);
      }
      this.syncFilterValue();
      dataController.pageIndex(pageIndex);
    },
    init() {
      const dataController = this.getController('data');
      if (dataController.isFilterSyncActive()) {
        if (this.getController('columns').isAllDataTypesDefined()) {
          this._initSync();
        } else {
          dataController.dataSourceChanged.add(() => this._initSync());
        }
      }
    },
    _getSyncFilterRow(filterValue, column) {
      const filter = getConditionFromFilterRow(column);
      if ((0, _type.isDefined)(filter)) {
        return (0, _utils.syncFilters)(filterValue, filter);
      }
      return (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(column));
    },
    _getSyncHeaderFilter(filterValue, column) {
      const filter = getConditionFromHeaderFilter(column);
      if (filter) {
        return (0, _utils.syncFilters)(filterValue, filter);
      }
      return (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(column));
    },
    getFilterValueFromColumns(columns) {
      if (!this.getController('data').isFilterSyncActive()) {
        return null;
      }
      const filterValue = ['and'];
      columns && columns.forEach(column => {
        const headerFilter = getConditionFromHeaderFilter(column);
        const filterRow = getConditionFromFilterRow(column);
        headerFilter && (0, _utils.addItem)(headerFilter, filterValue);
        filterRow && (0, _utils.addItem)(filterRow, filterValue);
      });
      return (0, _utils.getNormalizedFilter)(filterValue);
    },
    syncFilterRow(column) {
      this.option('filterValue', this._getSyncFilterRow(this.option('filterValue'), column));
    },
    syncHeaderFilter(column) {
      this.option('filterValue', this._getSyncHeaderFilter(this.option('filterValue'), column));
    },
    getCustomFilterOperations() {
      const filterBuilderCustomOperations = this.option('filterBuilder.customOperations') || [];
      return [(0, _m_filter_custom_operations.anyOf)(this.component), (0, _m_filter_custom_operations.noneOf)(this.component)].concat(filterBuilderCustomOperations);
    },
    publicMethods() {
      return ['getCustomFilterOperations'];
    }
  };
}());
const DataControllerFilterSyncExtender = {
  isFilterSyncActive() {
    const filterSyncEnabledValue = this.option('filterSyncEnabled');
    return filterSyncEnabledValue === 'auto' ? this.option('filterPanel.visible') : filterSyncEnabledValue;
  },
  skipCalculateColumnFilters() {
    const filterSyncController = this.getController('filterSync');
    return ((0, _type.isDefined)(this.option('filterValue')) || filterSyncController._skipSyncColumnOptions) && this.isFilterSyncActive();
  },
  _calculateAdditionalFilter() {
    if (this.option('filterPanel.filterEnabled') === false) {
      return this.callBase();
    }
    const filters = [this.callBase()];
    const columns = this.getController('columns').getFilteringColumns();
    let filterValue = this.option('filterValue');
    if (this.isFilterSyncActive()) {
      const currentColumnForHeaderFilter = this.getController('headerFilter').getCurrentColumn();
      const currentColumnForFilterRow = this.getController('applyFilter').getCurrentColumnForFiltering();
      const currentColumn = currentColumnForHeaderFilter || currentColumnForFilterRow;
      const needRemoveCurrentColumnFilter = currentColumnForHeaderFilter || (0, _type.isDefined)(currentColumnForFilterRow === null || currentColumnForFilterRow === void 0 ? void 0 : currentColumnForFilterRow.filterValue);
      if (needRemoveCurrentColumnFilter && filterValue) {
        filterValue = (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(currentColumn));
      }
    }
    const customOperations = this.getController('filterSync').getCustomFilterOperations();
    const calculatedFilterValue = (0, _utils.getFilterExpression)(filterValue, columns, customOperations, 'filterBuilder');
    if (calculatedFilterValue) {
      filters.push(calculatedFilterValue);
    }
    return _m_utils.default.combineFilters(filters);
  },
  _parseColumnPropertyName(fullName) {
    const matched = fullName.match(/.*\.(.*)/);
    if (matched) {
      return matched[1];
    }
    return null;
  },
  clearFilter(filterName) {
    this.component.beginUpdate();
    if (arguments.length > 0) {
      if (filterName === 'filterValue') {
        this.option('filterValue', null);
      }
      this.callBase(filterName);
    } else {
      this.option('filterValue', null);
      this.callBase();
    }
    this.component.endUpdate();
  },
  optionChanged(args) {
    switch (args.name) {
      case 'filterValue':
        this._applyFilter();
        this.isFilterSyncActive() && this.getController('filterSync').syncFilterValue();
        args.handled = true;
        break;
      case 'filterSyncEnabled':
        args.handled = true;
        break;
      case 'columns':
        if (this.isFilterSyncActive()) {
          const column = this.getController('columns').getColumnByPath(args.fullName);
          const filterSyncController = this.getController('filterSync');
          if (column && !filterSyncController._skipSyncColumnOptions) {
            const propertyName = this._parseColumnPropertyName(args.fullName);
            filterSyncController._skipSyncColumnOptions = true;
            if (propertyName === 'filterType') {
              if (FILTER_TYPES_EXCLUDE === args.value || FILTER_TYPES_EXCLUDE === args.previousValue) {
                filterSyncController.syncHeaderFilter(column);
              }
            } else if (propertyName === 'filterValues') {
              filterSyncController.syncHeaderFilter(column);
            } else if (['filterValue', 'selectedFilterOperation'].includes(propertyName)) {
              filterSyncController.syncFilterRow(column, column.filterValue);
            }
            filterSyncController._skipSyncColumnOptions = false;
          }
        }
        this.callBase(args);
        break;
      default:
        this.callBase(args);
    }
  }
};
const ColumnHeadersViewFilterSyncExtender = {
  _isHeaderFilterEmpty(column) {
    if (this.getController('data').isFilterSyncActive()) {
      return !(0, _utils.filterHasField)(this.option('filterValue'), getColumnIdentifier(column));
    }
    return this.callBase(column);
  },
  _needUpdateFilterIndicators() {
    return !this.getController('data').isFilterSyncActive();
  },
  optionChanged(args) {
    if (args.name === 'filterValue') {
      this._updateHeaderFilterIndicators();
    } else {
      this.callBase(args);
    }
  }
};
const filterSyncModule = {
  defaultOptions() {
    return {
      filterValue: null,
      filterSyncEnabled: 'auto'
    };
  },
  controllers: {
    filterSync: FilterSyncController
  },
  extenders: {
    controllers: {
      data: DataControllerFilterSyncExtender
    },
    views: {
      columnHeadersView: ColumnHeadersViewFilterSyncExtender
    }
  }
};
exports.filterSyncModule = filterSyncModule;
