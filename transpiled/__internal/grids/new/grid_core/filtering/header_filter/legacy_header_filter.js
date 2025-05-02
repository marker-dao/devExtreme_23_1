"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilterType = exports.getDataSourceOptions = void 0;
var _deferred = require("../../../../../../core/utils/deferred");
var _type = require("../../../../../../core/utils/type");
var _filtering = _interopRequireDefault(require("../../../../../../ui/shared/filtering"));
var _m_extend = require("../../../../../core/utils/m_extend");
var _m_utils = require("../../../../../data/data_source/m_utils");
var _m_header_filter = require("../../../../../grids/grid_core/header_filter/m_header_filter");
var _m_header_filter_core = require("../../../../../grids/grid_core/header_filter/m_header_filter_core");
var _m_utils2 = _interopRequireDefault(require("../../../../../grids/grid_core/m_utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// NOTE: This code moved from old grid_core/header_filter/m_header_filter
// with minimal possible modifications
/* eslint-disable
   @typescript-eslint/explicit-function-return-type,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/naming-convention,
   no-plusplus,
   @typescript-eslint/init-declarations,
   no-param-reassign,
   prefer-destructuring,
   @typescript-eslint/explicit-module-boundary-types,
   @typescript-eslint/no-explicit-any,
*/

const getHeaderItemText = (displayValue, column, currentLevel,
// NOTE: Only text used from header filter options
headerFilterOptions) => {
  let text = _m_utils2.default.formatValue(displayValue, (0, _m_header_filter.getFormatOptions)(displayValue, column, currentLevel));
  if (!text) {
    var _headerFilterOptions$;
    text = (headerFilterOptions === null || headerFilterOptions === void 0 || (_headerFilterOptions$ = headerFilterOptions.texts) === null || _headerFilterOptions$ === void 0 ? void 0 : _headerFilterOptions$.emptyValue) ?? '(Blank)';
  }
  return text;
};
const _updateSelectedState = (items, column) => {
  let i = items.length;
  const isExclude = column.filterType === 'exclude';
  while (i--) {
    const item = items[i];
    if ('items' in items[i]) {
      _updateSelectedState(items[i].items, column);
    }
    (0, _m_header_filter_core.updateHeaderFilterItemSelectionState)(item, _m_utils2.default.getIndexByKey(items[i].value, column.filterValues, null) > -1, isExclude);
  }
};
const _normalizeGroupItem = (item, currentLevel, options) => {
  let value;
  let displayValue;
  const {
    path
  } = options;
  const {
    valueSelector
  } = options;
  const {
    displaySelector
  } = options;
  const {
    column
  } = options;
  if (valueSelector && displaySelector) {
    value = valueSelector(item);
    displayValue = displaySelector(item);
  } else {
    value = item.key;
    displayValue = value;
  }
  if (!(0, _type.isObject)(item)) {
    item = {};
  } else {
    item = (0, _m_extend.extend)({}, item);
  }
  path.push(value);
  if (path.length === 1) {
    // NOTE: Important! Deconstructing here causes a lot of failed usage scenarios.
    item.value = path[0];
  } else {
    item.value = path.join('/');
  }
  item.text = getHeaderItemText(displayValue, column, currentLevel, options.headerFilterOptions);
  return item;
};
const _processGroupItems = (groupItems, currentLevel, path, options) => {
  const {
    level
  } = options;
  path = path || [];
  currentLevel = currentLevel || 0;
  for (let i = 0; i < groupItems.length; i++) {
    groupItems[i] = _normalizeGroupItem(groupItems[i], currentLevel, {
      column: options.column,
      headerFilterOptions: options.headerFilterOptions,
      path
    });
    if ('items' in groupItems[i]) {
      if (currentLevel === level || !(0, _type.isDefined)(groupItems[i].value)) {
        delete groupItems[i].items;
      } else {
        _processGroupItems(groupItems[i].items, currentLevel + 1, path, options);
      }
    }
    path.pop();
  }
};
const getDataSourceOptions = (storeLoadAdapter, column, headerFilterOptions, filter) => {
  var _column$headerFilter;
  if (!storeLoadAdapter) {
    return undefined;
  }
  const {
    grouping: localGrouping
  } = storeLoadAdapter.getLocalLoadOperations();
  const remoteGrouping = !localGrouping;
  const group = _m_utils2.default.getHeaderFilterGroupParameters(column, remoteGrouping);
  const headerFilterDataSource = (_column$headerFilter = column.headerFilter) === null || _column$headerFilter === void 0 ? void 0 : _column$headerFilter.dataSource;
  const options = {};
  if ((0, _type.isDefined)(headerFilterDataSource) && !(0, _type.isFunction)(headerFilterDataSource)) {
    // @ts-expect-error
    options.dataSource = (0, _m_utils.normalizeDataSourceOptions)(headerFilterDataSource);
    return options.dataSource;
  }
  const cutoffLevel = Array.isArray(group) ? group.length - 1 : 0;
  options.dataSource = {
    filter,
    group,
    useDefaultSearch: true,
    load: loadOptions => {
      // @ts-expect-error Deferred ctor.
      const d = new _deferred.Deferred();
      // NOTE: this marked as deprecated in original code
      loadOptions.dataField = column.dataField || column.name;
      storeLoadAdapter.load(loadOptions).done(data => {
        const convertUTCDates = remoteGrouping && (0, _m_header_filter.isUTCFormat)(column.serializationFormat) && cutoffLevel > 3;
        if (convertUTCDates) {
          data = (0, _m_header_filter.convertDataFromUTCToLocal)(data, column);
        }
        _processGroupItems(data, null, null, {
          level: cutoffLevel,
          column,
          headerFilterOptions
        });
        d.resolve(data);
      }).fail(d.reject);
      return d;
    }
  };
  if ((0, _type.isFunction)(headerFilterDataSource)) {
    headerFilterDataSource.call(column, options);
  }
  const origPostProcess = options.dataSource.postProcess;
  options.dataSource.postProcess = data => {
    let items = data;
    items = (origPostProcess === null || origPostProcess === void 0 ? void 0 : origPostProcess.call(void 0, items)) || items;
    _updateSelectedState(items, column);
    return items;
  };
  return options.dataSource;
};
exports.getDataSourceOptions = getDataSourceOptions;
const getFilterType = column => {
  const groupInterval = _filtering.default.getGroupInterval(column);
  return groupInterval && groupInterval.length > 1 ? 'tree' : 'list';
};
exports.getFilterType = getFilterType;