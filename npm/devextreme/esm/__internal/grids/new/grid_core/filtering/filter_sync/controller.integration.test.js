/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/filter_sync/controller.integration.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable spellcheck/spell-checker */
import { describe, expect, it } from '@jest/globals';
import CardView from '../../../../../grids/new/card_view/widget';
import { DATE_DATA_CONFIG, DATE_FILTER_PANEL, DATE_HEADER_FILTER, NUMBER_DATA_CONFIGS, NUMBER_FILTER_PANEL, NUMBER_HEADER_FILTER, STRING_DATA_CONFIGS, STRING_DS_CONDITIONS_FILTER_PANEL, STRING_DS_CONDITIONS_HEADER_FILTER, STRING_DS_VALUES_FILTER_PANEL, STRING_DS_VALUES_HEADER_FILTER, STRING_FILTER_PANEL, STRING_HEADER_FILTER, STRING_HEADER_FILTER_DATA_CONFIGS } from '../../../../../grids/new/grid_core/filtering/filter_sync/__intergation__/index';
import { rerender } from 'inferno';
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
  const cardView = new CardView(container, _extends({}, DEFAULT_OPTIONS, options));
  rerender();
  return cardView;
};
const TEST_CASES_GROUPS = [{
  groupName: 'Simple cases | string - native',
  dataSource: STRING_DATA_CONFIGS.string,
  dataType: 'string',
  cases: {
    headerFilter: STRING_HEADER_FILTER,
    filterPanel: STRING_FILTER_PANEL
  }
}, {
  groupName: 'Simple cases | number - native',
  dataSource: NUMBER_DATA_CONFIGS.number,
  dataType: 'number',
  cases: {
    headerFilter: NUMBER_HEADER_FILTER,
    filterPanel: NUMBER_FILTER_PANEL
  }
}, {
  groupName: 'Simple cases | number - string',
  dataSource: NUMBER_DATA_CONFIGS.number,
  dataType: 'number',
  cases: {
    headerFilter: NUMBER_HEADER_FILTER,
    filterPanel: NUMBER_FILTER_PANEL
  }
}, {
  groupName: 'Simple cases | date - native',
  dataSource: DATE_DATA_CONFIG.date,
  dataType: 'date',
  cases: {
    headerFilter: DATE_HEADER_FILTER,
    filterPanel: DATE_FILTER_PANEL
  }
}, {
  groupName: 'Simple cases | date - string',
  dataSource: DATE_DATA_CONFIG.string,
  dataType: 'date',
  cases: {
    headerFilter: DATE_HEADER_FILTER,
    filterPanel: DATE_FILTER_PANEL
  }
}, {
  groupName: 'Filter DS | string - values',
  dataSource: STRING_DATA_CONFIGS.string,
  headerFilterDataSource: STRING_HEADER_FILTER_DATA_CONFIGS.values,
  dataType: 'string',
  cases: {
    headerFilter: STRING_DS_VALUES_HEADER_FILTER,
    filterPanel: STRING_DS_VALUES_FILTER_PANEL
  }
}, {
  groupName: 'Filter DS | string - conditions',
  dataSource: STRING_DATA_CONFIGS.string,
  headerFilterDataSource: STRING_HEADER_FILTER_DATA_CONFIGS.conditions,
  dataType: 'string',
  cases: {
    headerFilter: STRING_DS_CONDITIONS_HEADER_FILTER,
    filterPanel: STRING_DS_CONDITIONS_FILTER_PANEL
  }
}];
// NOTE: Skip tests because FilterSync feature disabled
describe.skip('FilterSync', () => {
  TEST_CASES_GROUPS.forEach(_ref => {
    let {
      groupName,
      dataSource,
      dataType,
      headerFilterDataSource,
      cases
    } = _ref;
    describe(groupName, () => {
      describe('Initial config', () => {
        describe('HeaderFilter -> empty FilterPanel', () => {
          it.each(cases.headerFilter)('$caseName', _ref2 => {
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
            expect(headerFilterType).toStrictEqual(expected.headerFilterType);
            expect(headerFilter).toStrictEqual(expected.headerFilter);
            expect(filterPanel).toStrictEqual(expected.filterPanel);
            expect(visibleIds).toStrictEqual(filteredIds);
          });
        });
        describe('FilterPanel -> empty HeaderFilter', () => {
          it.each(cases.filterPanel)('$caseName', _ref4 => {
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
            expect(headerFilterType).toStrictEqual(expected.headerFilterType);
            expect(headerFilter).toStrictEqual(expected.headerFilter);
            expect(filterPanel).toStrictEqual(expected.filterPanel);
            expect(visibleIds).toStrictEqual(filteredIds);
          });
        });
      });
      describe('Runtime option change', () => {
        describe('HeaderFilter -> empty FilterPanel', () => {
          it.each(cases.headerFilter)('ColumnOption: $caseName', _ref6 => {
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
            expect(headerFilterType).toStrictEqual(expected.headerFilterType);
            expect(headerFilter).toStrictEqual(expected.headerFilter);
            expect(filterPanel).toStrictEqual(expected.filterPanel);
            expect(visibleIds).toStrictEqual(filteredIds);
          });
          it.each(cases.headerFilter)('Option: $caseName', _ref8 => {
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
            expect(headerFilterType).toStrictEqual(expected.headerFilterType);
            expect(headerFilter).toStrictEqual(expected.headerFilter);
            expect(filterPanel).toStrictEqual(expected.filterPanel);
            expect(visibleIds).toStrictEqual(filteredIds);
          });
        });
        describe('FilterPanel -> empty HeaderFilter', () => {
          it.each(cases.filterPanel)('Option: $caseName', _ref10 => {
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
            expect(headerFilterType).toStrictEqual(expected.headerFilterType);
            expect(headerFilter).toStrictEqual(expected.headerFilter);
            expect(filterPanel).toStrictEqual(expected.filterPanel);
            expect(visibleIds).toStrictEqual(filteredIds);
          });
        });
      });
    });
  });
});
