import _extends from "@babel/runtime/helpers/esm/extends";
import { describe, expect, it } from '@jest/globals';
import each from 'jest-each';
import * as utils from './utils';
describe('HeaderFilter', () => {
  describe('Utils', () => {
    describe('mergeColumnHeaderFilterOptions', () => {
      it('should spread other column options as is', () => {
        const otherOptions = {
          optA: 'A',
          optB: 'B'
        };
        const mergedOptions = utils.mergeColumnHeaderFilterOptions(otherOptions, {});
        expect(mergedOptions).toMatchObject(otherOptions);
      });
      it.each([{
        rootVisible: false,
        columnAllowFiltering: false,
        result: false
      }, {
        rootVisible: false,
        columnAllowFiltering: true,
        result: false
      }, {
        rootVisible: true,
        columnAllowFiltering: false,
        result: false
      }, {
        rootVisible: true,
        columnAllowFiltering: true,
        result: false
      }])('allowHeaderFiltering option (rootVisible: $rootVisible | columnAllowFiltering: $columnAllowFiltering)', _ref => {
        let {
          rootVisible,
          columnAllowFiltering,
          result
        } = _ref;
        const mergedOptions = utils.mergeColumnHeaderFilterOptions({
          allowHeaderFiltering: columnAllowFiltering
        }, {
          visible: rootVisible
        });
        expect(mergedOptions.allowHeaderFiltering).toBe(result);
      });
      it.each([{
        caseName: 'not take uniq properties from root',
        root: {
          visible: true,
          texts: {}
        },
        col: {},
        result: {
          headerFilter: {
            search: {}
          }
        }
      }, {
        caseName: 'take uniq properties from column',
        root: {},
        col: {
          headerFilter: {
            dataSource: {
              test: 'TEST_DS'
            }
          },
          filterValues: ['A', 'B', 'C']
        },
        result: {
          headerFilter: {
            dataSource: {
              test: 'TEST_DS'
            },
            search: {}
          },
          filterValues: ['A', 'B', 'C']
        }
      }, {
        caseName: 'apply root if columns not specified',
        root: {
          allowSelectAll: true,
          width: 150,
          height: 150
        },
        col: {},
        result: {
          headerFilter: {
            allowSelectAll: true,
            width: 150,
            height: 150,
            search: {}
          }
        }
      }, {
        caseName: 'override root if columns specified',
        root: {
          allowSelectAll: true,
          width: 150,
          height: 150
        },
        col: {
          headerFilter: {
            allowSelectAll: false,
            width: 200,
            height: 200
          }
        },
        result: {
          headerFilter: {
            allowSelectAll: false,
            width: 200,
            height: 200,
            search: {}
          }
        }
      }, {
        caseName: 'apply root search if columns not specified',
        root: {
          search: {
            enabled: true,
            editorOptions: {
              optA: 'A'
            },
            mode: 'equals',
            timeout: 999
          }
        },
        col: {},
        result: {
          headerFilter: {
            search: {
              enabled: true,
              editorOptions: {
                optA: 'A'
              },
              mode: 'equals',
              timeout: 999
            }
          }
        }
      }, {
        caseName: 'override root search if columns specified',
        root: {
          search: {
            enabled: true,
            editorOptions: {
              optA: 'A'
            },
            mode: 'equals',
            timeout: 999
          }
        },
        col: {
          headerFilter: {
            search: {
              enabled: false,
              editorOptions: {
                optA: 'B'
              },
              mode: 'contains',
              timeout: 100
            }
          }
        },
        result: {
          headerFilter: {
            search: {
              enabled: false,
              editorOptions: {
                optA: 'B'
              },
              mode: 'contains',
              timeout: 100
            }
          }
        }
      }, {
        caseName: 'take uniq properties from columns search',
        root: {},
        col: {
          headerFilter: {
            search: {
              searchExpr: '123_TEST'
            }
          }
        },
        result: {
          headerFilter: {
            search: {
              searchExpr: '123_TEST'
            }
          }
        }
      }])('$caseName: should correctly merge options', _ref2 => {
        let {
          root,
          col,
          result
        } = _ref2;
        const mergedOptions = utils.mergeColumnHeaderFilterOptions(col, root);
        expect(mergedOptions).toMatchObject(result);
      });
    });
    describe('getColumnName', () => {
      each`
      column                                          | expectedResult
      ${{
        name: 'testName'
      }}                         | ${'testName'}
      ${{
        dataField: 'testField'
      }}                   | ${'testField'}
      ${{
        name: 'testName',
        dataFiled: 'testField'
      }} | ${'testName'}

`.it('should return column name or dataField', _ref3 => {
        let {
          column,
          expectedResult
        } = _ref3;
        const result = utils.getColumnName(column);
        expect(result).toEqual(expectedResult);
      });
      it('should throw an exception if there are no name or dataField', () => {
        expect(() => utils.getColumnName({})).toThrowError();
      });
    });
    describe('getFilterOperator', () => {
      each`
      values                                          | filterType      | expectedResult
      ${[1, 2, 3]}                                    | ${'include'}    | ${'anyof'}
      ${[]}                                           | ${'include'}    | ${'anyof'}
      ${[1, 2, 3]}                                    | ${'exclude'}    | ${'noneof'}
      ${[]}                                           | ${'exclude'}    | ${'noneof'}
      ${[1, 2, 3]}                                    | ${undefined}    | ${'anyof'}
      ${[]}                                           | ${undefined}    | ${'anyof'}
`.it('should return anyof or noneof for array values', _ref4 => {
        let {
          values,
          filterType,
          expectedResult
        } = _ref4;
        const result = utils.getFilterOperator(values, filterType);
        expect(result).toEqual(expectedResult);
      });
      each`
    values                                  | filterType      | expectedResult
    ${1}                                    | ${'include'}    | ${'='}
    ${'test'}                               | ${'include'}    | ${'='}
    ${null}                                 | ${'include'}    | ${'='}
    ${1}                                    | ${'exclude'}    | ${'<>'}
    ${'test'}                               | ${'exclude'}    | ${'<>'}
    ${null}                                 | ${'exclude'}    | ${'<>'}
    ${1}                                    | ${undefined}    | ${'='}
    ${'test'}                               | ${undefined}    | ${'='}
    ${null}                                 | ${undefined}    | ${'='}
`.it('should return = or <> for plain values', _ref5 => {
        let {
          values,
          filterType,
          expectedResult
        } = _ref5;
        const result = utils.getFilterOperator(values, filterType);
        expect(result).toEqual(expectedResult);
      });
    });
    const allowFilteringColumnConfig = {
      allowFiltering: true,
      allowHeaderFiltering: true
    };
    describe('needCreateHeaderFilter', () => {
      each`
      column                                                      | expectedResult
      ${{
        allowFiltering: true,
        allowHeaderFiltering: false
      }}    | ${false}
      ${{
        allowFiltering: false,
        allowHeaderFiltering: true
      }}    | ${false}
      ${{
        allowFiltering: false,
        allowHeaderFiltering: false
      }}   | ${false}

`.it('should return false if filtering is prohibited', _ref6 => {
        let {
          column,
          expectedResult
        } = _ref6;
        const result = utils.needCreateHeaderFilter(column);
        expect(result).toEqual(expectedResult);
      });
      each`
      column                                                      | expectedResult
      ${_extends({}, allowFilteringColumnConfig, {
        filterValues: []
      })}                                                          | ${false}
      ${_extends({}, allowFilteringColumnConfig, {
        filterValues: [1, 2, 3]
      })}                                                          | ${true}
      ${_extends({}, allowFilteringColumnConfig, {
        filterValues: null
      })}                                                          | ${false}
      ${_extends({}, allowFilteringColumnConfig, {
        filterValues: 'test'
      })}                                                          | ${true}
      ${_extends({}, allowFilteringColumnConfig, {
        filterValues: [null]
      })}                                                          | ${true}
`.it('should check if there are selected values', _ref7 => {
        let {
          column,
          expectedResult
        } = _ref7;
        const result = utils.needCreateHeaderFilter(column);
        expect(result).toEqual(expectedResult);
      });
    });
    describe('getComposedHeaderFilter', () => {
      it.each([{
        caseName: 'two columns have plain values',
        columns: [_extends({}, allowFilteringColumnConfig, {
          dataField: 'ID1',
          filterValues: 'test'
        }), _extends({}, allowFilteringColumnConfig, {
          dataField: 'ID2',
          filterValues: 'test2'
        })],
        result: [['ID1', '=', 'test'], 'and', ['ID2', '=', 'test2']]
      }, {
        caseName: 'one columns has plain value',
        columns: [_extends({}, allowFilteringColumnConfig, {
          dataField: 'ID1',
          filterValues: 'test'
        })],
        result: [['ID1', '=', 'test']]
      }, {
        caseName: 'two columns have array values',
        columns: [_extends({}, allowFilteringColumnConfig, {
          dataField: 'ID1',
          filterValues: [1, 2, 3]
        }), _extends({}, allowFilteringColumnConfig, {
          dataField: 'ID2',
          filterValues: ['test1', 'test2']
        })],
        result: [['ID1', 'anyof', [1, 2, 3]], 'and', ['ID2', 'anyof', ['test1', 'test2']]]
      }, {
        caseName: 'it is prohibited to sort the first column',
        columns: [{
          dataField: 'ID1',
          filterValues: [1, 2, 3]
        }, _extends({}, allowFilteringColumnConfig, {
          dataField: 'ID2',
          filterValues: ['test1', 'test2']
        })],
        result: [['ID2', 'anyof', ['test1', 'test2']]]
      }, {
        caseName: 'two columns have exclude filterType',
        columns: [_extends({}, allowFilteringColumnConfig, {
          dataField: 'ID1',
          filterValues: [1, 2, 3],
          filterType: 'exclude'
        }), _extends({}, allowFilteringColumnConfig, {
          dataField: 'ID2',
          filterValues: 'test1',
          filterType: 'exclude'
        })],
        result: [['ID1', 'noneof', [1, 2, 3]], 'and', ['ID2', '<>', 'test1']]
      }])('$caseName: should correctly calculate the header filter', _ref8 => {
        let {
          columns,
          result
        } = _ref8;
        const headerFilter = utils.getComposedHeaderFilter(columns);
        expect(headerFilter).toStrictEqual(result);
      });
    });
  });
});