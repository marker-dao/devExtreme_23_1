"use strict";

var _globals = require("@jest/globals");
var _jestEach = _interopRequireDefault(require("jest-each"));
var utils = _interopRequireWildcard(require("./utils"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(0, _globals.describe)('HeaderFilter', () => {
  (0, _globals.describe)('Utils', () => {
    (0, _globals.describe)('mergeColumnHeaderFilterOptions', () => {
      (0, _globals.it)('should spread other column options as is', () => {
        const otherOptions = {
          optA: 'A',
          optB: 'B'
        };
        const mergedOptions = utils.mergeColumnHeaderFilterOptions(otherOptions, {});
        (0, _globals.expect)(mergedOptions).toMatchObject(otherOptions);
      });
      _globals.it.each([{
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
        (0, _globals.expect)(mergedOptions.allowHeaderFiltering).toBe(result);
      });
      _globals.it.each([{
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
        (0, _globals.expect)(mergedOptions).toMatchObject(result);
      });
    });
    (0, _globals.describe)('getColumnName', () => {
      (0, _jestEach.default)`
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
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
      (0, _globals.it)('should throw an exception if there are no name or dataField', () => {
        (0, _globals.expect)(() => utils.getColumnName({})).toThrowError();
      });
    });
    (0, _globals.describe)('getFilterOperator', () => {
      (0, _jestEach.default)`
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
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
      (0, _jestEach.default)`
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
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
    });
    const allowFilteringColumnConfig = {
      allowFiltering: true,
      allowHeaderFiltering: true
    };
    (0, _globals.describe)('needCreateHeaderFilter', () => {
      (0, _jestEach.default)`
      column                                                                               | expectedResult
      ${{
        allowFiltering: true,
        allowHeaderFiltering: false,
        filterValues: [1, 2, 3]
      }}    | ${true}
      ${{
        allowFiltering: false,
        allowHeaderFiltering: true,
        filterValues: [1, 2, 3]
      }}    | ${true}
      ${{
        allowFiltering: false,
        allowHeaderFiltering: false,
        filterValues: [1, 2, 3]
      }}   | ${false}

`.it('should take into account allowFiltering and allowHeaderFiltering', _ref6 => {
        let {
          column,
          expectedResult
        } = _ref6;
        const result = utils.needCreateHeaderFilter(column);
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
      (0, _jestEach.default)`
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
        (0, _globals.expect)(result).toEqual(expectedResult);
      });
    });
    (0, _globals.describe)('getComposedHeaderFilter', () => {
      _globals.it.each([{
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
        caseName: 'two columns have array values, one of them contain 1 item',
        columns: [_extends({}, allowFilteringColumnConfig, {
          dataField: 'ID1',
          filterValues: [1]
        }), _extends({}, allowFilteringColumnConfig, {
          dataField: 'ID2',
          filterValues: ['test1', 'test2']
        })],
        result: [['ID1', '=', 1], 'and', ['ID2', 'anyof', ['test1', 'test2']]]
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
      }, {
        caseName: 'one column has an array of filter expressions',
        columns: [_extends({}, allowFilteringColumnConfig, {
          dataField: 'ID1',
          filterValues: [['ID1', '>', 5], ['ID1', '<', 10]]
        })],
        result: [[['ID1', '>', 5], 'or', ['ID1', '<', 10]]]
      }, {
        caseName: 'one column has an array of plain value and filter expressions',
        columns: [_extends({}, allowFilteringColumnConfig, {
          dataField: 'ID1',
          filterValues: [5, ['ID1', '=', 10]]
        })],
        result: [[['ID1', '=', 5], 'or', ['ID1', '=', 10]]]
      }, {
        caseName: 'two column have an array of filter expressions',
        columns: [_extends({}, allowFilteringColumnConfig, {
          dataField: 'ID1',
          filterValues: [['ID1', '>', 5], ['ID1', '<', 10]]
        }), _extends({}, allowFilteringColumnConfig, {
          dataField: 'ID2',
          filterValues: [['ID2', '>', 6], ['ID2', '<', 9]]
        })],
        result: [[['ID1', '>', 5], 'or', ['ID1', '<', 10]], 'and', [['ID2', '>', 6], 'or', ['ID2', '<', 9]]]
      }])('$caseName: should correctly calculate the header filter', _ref8 => {
        let {
          columns,
          result
        } = _ref8;
        const headerFilterInfoArray = utils.getHeaderFilterInfoArray(columns);
        const headerFilter = utils.getComposedHeaderFilter(headerFilterInfoArray);
        (0, _globals.expect)(headerFilter).toStrictEqual(result);
      });
    });
  });
});