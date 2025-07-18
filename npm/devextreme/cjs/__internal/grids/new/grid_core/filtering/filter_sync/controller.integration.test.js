/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/filter_sync/controller.integration.test.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _widget = _interopRequireDefault(require("../../../../../grids/new/card_view/widget"));
var _index = require("../../../../../grids/new/grid_core/filtering/filter_sync/__intergation__/index");
var _inferno = require("inferno");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable spellcheck/spell-checker */
const DEFAULT_OPTIONS = {
  keyExpr: 'id',
  headerFilter: {
    visible: true
  },
  filterPanel: {
    visible: true
  },
  paging: {
    // NOTE: To check all cards in complex cases (default isn't enough)
    pageSize: 12
  }
};
const setup = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const container = document.createElement('div');
  const {
    body
  } = document;
  body.append(container);
  const cardView = new _widget.default(container, _extends({}, DEFAULT_OPTIONS, options));
  (0, _inferno.rerender)();
  return cardView;
};
const TEST_CASES_GROUPS = [{
  groupName: 'Simple cases | string - native',
  dataSource: _index.STRING_DATA_CONFIGS.string,
  dataType: 'string',
  cases: {
    headerFilter: _index.STRING_HEADER_FILTER,
    filterPanel: _index.STRING_FILTER_PANEL
  }
}, {
  groupName: 'Simple cases | number - native',
  dataSource: _index.NUMBER_DATA_CONFIGS.number,
  dataType: 'number',
  cases: {
    headerFilter: _index.NUMBER_HEADER_FILTER,
    filterPanel: _index.NUMBER_FILTER_PANEL
  }
}, {
  groupName: 'Simple cases | number - string',
  dataSource: _index.NUMBER_DATA_CONFIGS.number,
  dataType: 'number',
  cases: {
    headerFilter: _index.NUMBER_HEADER_FILTER,
    filterPanel: _index.NUMBER_FILTER_PANEL
  }
}, {
  groupName: 'Simple cases | date - native',
  dataSource: _index.DATE_DATA_CONFIG.date,
  dataType: 'date',
  cases: {
    headerFilter: _index.DATE_HEADER_FILTER,
    filterPanel: _index.DATE_FILTER_PANEL
  }
}, {
  groupName: 'Simple cases | date - string',
  dataSource: _index.DATE_DATA_CONFIG.string,
  dataType: 'date',
  cases: {
    headerFilter: _index.DATE_HEADER_FILTER,
    filterPanel: _index.DATE_FILTER_PANEL
  }
}, {
  groupName: 'Filter DS | string - values',
  dataSource: _index.STRING_DATA_CONFIGS.string,
  headerFilterDataSource: _index.STRING_HEADER_FILTER_DATA_CONFIGS.values,
  dataType: 'string',
  cases: {
    headerFilter: _index.STRING_DS_VALUES_HEADER_FILTER,
    filterPanel: _index.STRING_DS_VALUES_FILTER_PANEL
  }
}, {
  groupName: 'Filter DS | string - conditions',
  dataSource: _index.STRING_DATA_CONFIGS.string,
  headerFilterDataSource: _index.STRING_HEADER_FILTER_DATA_CONFIGS.conditions,
  dataType: 'string',
  cases: {
    headerFilter: _index.STRING_DS_CONDITIONS_HEADER_FILTER,
    filterPanel: _index.STRING_DS_CONDITIONS_FILTER_PANEL
  }
}];
// NOTE: Skip tests because FilterSync feature disabled
_globals.describe.skip('FilterSync', () => {
  TEST_CASES_GROUPS.forEach(_ref => {
    let {
      groupName,
      dataSource,
      dataType,
      headerFilterDataSource,
      cases
    } = _ref;
    (0, _globals.describe)(groupName, () => {
      (0, _globals.describe)('Initial config', () => {
        (0, _globals.describe)('HeaderFilter -> empty FilterPanel', () => {
          _globals.it.each(cases.headerFilter)('$caseName', _ref2 => {
            let {
              changes,
              expected,
              filteredIds
            } = _ref2;
            const cardView = setup({
              dataSource,
              columns: [{
                dataField: 'value',
                dataType,
                filterType: changes.headerFilterType,
                filterValues: changes.headerFilter,
                headerFilter: {
                  dataSource: headerFilterDataSource
                }
              }]
            });
            const headerFilterType = cardView.columnOption('value', 'filterType');
            const headerFilter = cardView.columnOption('value', 'filterValues');
            const filterPanel = cardView.option('filterValue');
            const visibleIds = cardView.getVisibleCards().map(_ref3 => {
              let {
                data
              } = _ref3;
              return data.id;
            });
            (0, _globals.expect)(headerFilterType).toStrictEqual(expected.headerFilterType);
            (0, _globals.expect)(headerFilter).toStrictEqual(expected.headerFilter);
            (0, _globals.expect)(filterPanel).toStrictEqual(expected.filterPanel);
            (0, _globals.expect)(visibleIds).toStrictEqual(filteredIds);
          });
        });
        (0, _globals.describe)('FilterPanel -> empty HeaderFilter', () => {
          _globals.it.each(cases.filterPanel)('$caseName', _ref4 => {
            let {
              changes,
              expected,
              filteredIds
            } = _ref4;
            const cardView = setup({
              dataSource,
              columns: [{
                dataField: 'value',
                dataType,
                headerFilter: {
                  dataSource: headerFilterDataSource
                }
              }],
              filterValue: changes.filterPanel
            });
            const headerFilterType = cardView.columnOption('value', 'filterType');
            const headerFilter = cardView.columnOption('value', 'filterValues');
            const filterPanel = cardView.option('filterValue');
            const visibleIds = cardView.getVisibleCards().map(_ref5 => {
              let {
                data
              } = _ref5;
              return data.id;
            });
            (0, _globals.expect)(headerFilterType).toStrictEqual(expected.headerFilterType);
            (0, _globals.expect)(headerFilter).toStrictEqual(expected.headerFilter);
            (0, _globals.expect)(filterPanel).toStrictEqual(expected.filterPanel);
            (0, _globals.expect)(visibleIds).toStrictEqual(filteredIds);
          });
        });
      });
      (0, _globals.describe)('Runtime option change', () => {
        (0, _globals.describe)('HeaderFilter -> empty FilterPanel', () => {
          _globals.it.each(cases.headerFilter)('ColumnOption: $caseName', _ref6 => {
            let {
              changes,
              expected,
              filteredIds
            } = _ref6;
            const cardView = setup({
              dataSource,
              columns: [{
                dataField: 'value',
                dataType,
                headerFilter: {
                  dataSource: headerFilterDataSource
                }
              }]
            });
            cardView.columnOption('value', 'filterType', changes.headerFilterType);
            cardView.columnOption('value', 'filterValues', changes.headerFilter);
            const headerFilterType = cardView.columnOption('value', 'filterType');
            const headerFilter = cardView.columnOption('value', 'filterValues');
            const filterPanel = cardView.option('filterValue');
            const visibleIds = cardView.getVisibleCards().map(_ref7 => {
              let {
                data
              } = _ref7;
              return data.id;
            });
            (0, _globals.expect)(headerFilterType).toStrictEqual(expected.headerFilterType);
            (0, _globals.expect)(headerFilter).toStrictEqual(expected.headerFilter);
            (0, _globals.expect)(filterPanel).toStrictEqual(expected.filterPanel);
            (0, _globals.expect)(visibleIds).toStrictEqual(filteredIds);
          });
          _globals.it.each(cases.headerFilter)('Option: $caseName', _ref8 => {
            let {
              changes,
              expected,
              filteredIds
            } = _ref8;
            const cardView = setup({
              dataSource,
              columns: [{
                dataField: 'value',
                dataType,
                headerFilter: {
                  dataSource: headerFilterDataSource
                }
              }]
            });
            const column = cardView.option('columns[0]');
            cardView.option('columns[0]', _extends({}, column, {
              filterType: changes.headerFilterType,
              filterValues: changes.headerFilter
            }));
            const headerFilterType = cardView.columnOption('value', 'filterType');
            const headerFilter = cardView.columnOption('value', 'filterValues');
            const filterPanel = cardView.option('filterValue');
            const visibleIds = cardView.getVisibleCards().map(_ref9 => {
              let {
                data
              } = _ref9;
              return data.id;
            });
            (0, _globals.expect)(headerFilterType).toStrictEqual(expected.headerFilterType);
            (0, _globals.expect)(headerFilter).toStrictEqual(expected.headerFilter);
            (0, _globals.expect)(filterPanel).toStrictEqual(expected.filterPanel);
            (0, _globals.expect)(visibleIds).toStrictEqual(filteredIds);
          });
        });
        (0, _globals.describe)('FilterPanel -> empty HeaderFilter', () => {
          _globals.it.each(cases.filterPanel)('Option: $caseName', _ref10 => {
            let {
              changes,
              expected,
              filteredIds
            } = _ref10;
            const cardView = setup({
              dataSource,
              columns: [{
                dataField: 'value',
                dataType,
                headerFilter: {
                  dataSource: headerFilterDataSource
                }
              }]
            });
            cardView.option('filterValue', changes.filterPanel);
            const headerFilterType = cardView.columnOption('value', 'filterType');
            const headerFilter = cardView.columnOption('value', 'filterValues');
            const filterPanel = cardView.option('filterValue');
            const visibleIds = cardView.getVisibleCards().map(_ref11 => {
              let {
                data
              } = _ref11;
              return data.id;
            });
            (0, _globals.expect)(headerFilterType).toStrictEqual(expected.headerFilterType);
            (0, _globals.expect)(headerFilter).toStrictEqual(expected.headerFilter);
            (0, _globals.expect)(filterPanel).toStrictEqual(expected.filterPanel);
            (0, _globals.expect)(visibleIds).toStrictEqual(filteredIds);
          });
        });
      });
    });
  });
});
