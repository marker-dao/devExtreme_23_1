"use strict";

var _globals = require("@jest/globals");
var _columns_controller = require("../columns_controller/columns_controller.mock");
var _options = require("../columns_controller/options");
var _utils = require("./utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(0, _globals.describe)('Search', () => {
  (0, _globals.describe)('Text highlighting', () => {
    (0, _globals.describe)('Utils', () => {
      (0, _globals.describe)('compareTextPart', () => {
        _globals.it.each([{
          textPart: 'AAA',
          searchStr: 'aaa',
          result: true
        }, {
          textPart: 'aaa',
          searchStr: 'AAA',
          result: true
        }, {
          textPart: 'aaa',
          searchStr: 'aaa',
          result: true
        }, {
          textPart: 'AAA',
          searchStr: 'AAA',
          result: true
        }, {
          textPart: 'bbb',
          searchStr: 'aaa',
          result: false
        }, {
          textPart: 'BBB',
          searchStr: 'aaa',
          result: false
        }])('case insensitive comparison: "$textPart" with "$searchStr" = $result', _ref => {
          let {
            textPart,
            searchStr,
            result
          } = _ref;
          const comparisonResult = (0, _utils.compareTextPart)(textPart, searchStr, false);
          (0, _globals.expect)(comparisonResult).toBe(result);
        });
        _globals.it.each([{
          textPart: 'AAA',
          searchStr: 'aaa',
          result: false
        }, {
          textPart: 'aaa',
          searchStr: 'AAA',
          result: false
        }, {
          textPart: 'aaa',
          searchStr: 'aaa',
          result: true
        }, {
          textPart: 'AAA',
          searchStr: 'AAA',
          result: true
        }, {
          textPart: 'bbb',
          searchStr: 'aaa',
          result: false
        }, {
          textPart: 'BBB',
          searchStr: 'aaa',
          result: false
        }])('case sensitive comparison: "$textPart" with "$searchStr" = $result', _ref2 => {
          let {
            textPart,
            searchStr,
            result
          } = _ref2;
          const comparisonResult = (0, _utils.compareTextPart)(textPart, searchStr, true);
          (0, _globals.expect)(comparisonResult).toBe(result);
        });
      });
      (0, _globals.describe)('splitHighlightedText', () => {
        (0, _globals.it)('should return null if highlighting disabled', () => {
          const result = (0, _utils.splitHighlightedText)('some text', {
            enabled: false,
            searchStr: 'some',
            caseSensitive: false
          });
          (0, _globals.expect)(result).toBeNull();
        });
        (0, _globals.it)('should return null if search string is empty', () => {
          const result = (0, _utils.splitHighlightedText)('some text', {
            enabled: true,
            searchStr: '',
            caseSensitive: false
          });
          (0, _globals.expect)(result).toBeNull();
        });
        (0, _globals.it)('case insensitive: should return null if search string has not any matches with text', () => {
          const result = (0, _utils.splitHighlightedText)('some text', {
            enabled: true,
            searchStr: 'AAA',
            caseSensitive: false
          });
          (0, _globals.expect)(result).toBeNull();
        });
        (0, _globals.it)('case sensitive: should return null if search string has not any matches with text', () => {
          const result = (0, _utils.splitHighlightedText)('some text', {
            enabled: true,
            searchStr: 'SOME TEXT',
            caseSensitive: true
          });
          (0, _globals.expect)(result).toBeNull();
        });
        _globals.it.each([{
          caseName: 'case insensitive: start match',
          text: 'Some text',
          searchStr: 'some',
          caseSensitive: false,
          result: [{
            type: 'highlighted',
            text: 'Some'
          }, {
            type: 'usual',
            text: ' text'
          }]
        }, {
          caseName: 'case insensitive: middle match',
          text: 'some text',
          searchStr: 'ME TE',
          caseSensitive: false,
          result: [{
            type: 'usual',
            text: 'so'
          }, {
            type: 'highlighted',
            text: 'me te'
          }, {
            type: 'usual',
            text: 'xt'
          }]
        }, {
          caseName: 'case insensitive: end match',
          text: 'Some TeXt',
          searchStr: 'text',
          caseSensitive: false,
          result: [{
            type: 'usual',
            text: 'Some '
          }, {
            type: 'highlighted',
            text: 'TeXt'
          }]
        }, {
          caseName: 'case insensitive: one letter match',
          text: 'some text sOme text',
          searchStr: 'o',
          caseSensitive: false,
          result: [{
            type: 'usual',
            text: 's'
          }, {
            type: 'highlighted',
            text: 'o'
          }, {
            type: 'usual',
            text: 'me text s'
          }, {
            type: 'highlighted',
            text: 'O'
          }, {
            type: 'usual',
            text: 'me text'
          }]
        }, {
          caseName: 'case insensitive: multiple match',
          text: 'some multiple text some match',
          searchStr: 'SOME',
          caseSensitive: false,
          result: [{
            type: 'highlighted',
            text: 'some'
          }, {
            type: 'usual',
            text: ' multiple text '
          }, {
            type: 'highlighted',
            text: 'some'
          }, {
            type: 'usual',
            text: ' match'
          }]
        }, {
          caseName: 'case insensitive: special characters match',
          text: '$@some $!@text $@var',
          searchStr: '$@',
          caseSensitive: false,
          result: [{
            type: 'highlighted',
            text: '$@'
          }, {
            type: 'usual',
            text: 'some $!@text '
          }, {
            type: 'highlighted',
            text: '$@'
          }, {
            type: 'usual',
            text: 'var'
          }]
        }, {
          caseName: 'case insensitive: special characters with text match',
          text: '$@some $!@text $@var',
          searchStr: '$!@text',
          caseSensitive: false,
          result: [{
            type: 'usual',
            text: '$@some '
          }, {
            type: 'highlighted',
            text: '$!@text'
          }, {
            type: 'usual',
            text: ' $@var'
          }]
        }, {
          caseName: 'case sensitive: start match',
          text: 'Some text',
          searchStr: 'Some',
          caseSensitive: true,
          result: [{
            type: 'highlighted',
            text: 'Some'
          }, {
            type: 'usual',
            text: ' text'
          }]
        }, {
          caseName: 'case sensitive: middle match',
          text: 'Some Text',
          searchStr: 'me Te',
          caseSensitive: true,
          result: [{
            type: 'usual',
            text: 'So'
          }, {
            type: 'highlighted',
            text: 'me Te'
          }, {
            type: 'usual',
            text: 'xt'
          }]
        }, {
          caseName: 'case sensitive: end match',
          text: 'Some Text',
          searchStr: 'Text',
          caseSensitive: true,
          result: [{
            type: 'usual',
            text: 'Some '
          }, {
            type: 'highlighted',
            text: 'Text'
          }]
        }, {
          caseName: 'case sensitive: one letter match',
          text: 'Some text sOme text',
          searchStr: 'o',
          caseSensitive: true,
          result: [{
            type: 'usual',
            text: 'S'
          }, {
            type: 'highlighted',
            text: 'o'
          }, {
            type: 'usual',
            text: 'me text sOme text'
          }]
        }, {
          caseName: 'case sensitive: multiple match',
          text: 'Some multiple text some match',
          searchStr: 'Some',
          caseSensitive: true,
          result: [{
            type: 'highlighted',
            text: 'Some'
          }, {
            type: 'usual',
            text: ' multiple text some match'
          }]
        }, {
          caseName: 'case sensitive: special characters match',
          text: '$@some $!@text $@var',
          searchStr: '$@',
          caseSensitive: true,
          result: [{
            type: 'highlighted',
            text: '$@'
          }, {
            type: 'usual',
            text: 'some $!@text '
          }, {
            type: 'highlighted',
            text: '$@'
          }, {
            type: 'usual',
            text: 'var'
          }]
        }, {
          caseName: 'case sensitive: special characters with text match',
          text: '$@some $!@TeXt $@var $!@text',
          searchStr: '$!@TeXt',
          caseSensitive: true,
          result: [{
            type: 'usual',
            text: '$@some '
          }, {
            type: 'highlighted',
            text: '$!@TeXt'
          }, {
            type: 'usual',
            text: ' $@var $!@text'
          }]
        }])('$caseName', _ref3 => {
          let {
            text,
            searchStr,
            caseSensitive,
            result
          } = _ref3;
          const textParts = (0, _utils.splitHighlightedText)(text, {
            enabled: true,
            searchStr,
            caseSensitive
          });
          (0, _globals.expect)(textParts).toStrictEqual(result);
        });
      });
    });
  });
});
(0, _globals.describe)('allowSearch', () => {
  _globals.it.each([{
    caseName: 'Disallow search in a column with default settings',
    column: _options.defaultColumnProperties,
    searchVisibleColumnsOnly: false,
    expectedResult: false
  }, {
    caseName: 'Allow search in a column with default settings and with dataField',
    column: _extends({}, _options.defaultColumnProperties, {
      dataField: 'ID'
    }),
    searchVisibleColumnsOnly: false,
    expectedResult: true
  }, {
    caseName: 'Allow search in invisible column with default settings if searchVisibleColumnsOnly=false',
    column: _extends({}, _options.defaultColumnProperties, {
      dataField: 'ID',
      visible: false
    }),
    searchVisibleColumnsOnly: false,
    expectedResult: true
  }, {
    caseName: 'Disallow search in invisible column with default settings if searchVisibleColumnsOnly=true',
    column: _extends({}, _options.defaultColumnProperties, {
      dataField: 'ID',
      visible: false
    }),
    searchVisibleColumnsOnly: true,
    expectedResult: false
  }, {
    caseName: 'Disallow search in a column with default settings if allowSearch=false',
    column: _extends({}, _options.defaultColumnProperties, {
      dataField: 'ID',
      allowSearch: false
    }),
    searchVisibleColumnsOnly: false,
    expectedResult: false
  }])('$caseName', _ref4 => {
    let {
      column,
      searchVisibleColumnsOnly,
      expectedResult
    } = _ref4;
    const result = (0, _utils.allowSearch)((0, _columns_controller.normalizeColumn)(column), searchVisibleColumnsOnly);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
});
(0, _globals.describe)('createFilterExpression', () => {
  (0, _globals.describe)('targe=search and selectedFilterOperation=undefined', () => {
    _globals.it.each([{
      caseName: 'Column with default settings',
      column: _extends({}, _options.defaultColumnProperties, {
        dataField: 'ID'
      }),
      filterValue: 'a',
      expectedResult: ['ID', 'contains', 'a']
    }, {
      caseName: 'Column with number type',
      column: _extends({}, _options.defaultColumnProperties, {
        dataField: 'ID',
        dataType: 'number'
      }),
      filterValue: '1',
      expectedResult: ['ID', '=', '1']
    }, {
      caseName: 'Column with calculateFilterExpression function',
      column: _extends({}, _options.defaultColumnProperties, {
        dataField: 'ID',
        dataType: 'number',
        calculateFilterExpression: () => ['ID', '=', '5']
      }),
      filterValue: '1',
      expectedResult: ['ID', '=', '5']
    }])('$caseName', _ref5 => {
      let {
        column,
        filterValue,
        expectedResult
      } = _ref5;
      const result = (0, _utils.createFilterExpression)(column, filterValue, undefined, 'search');
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
  });
});
(0, _globals.describe)('calculateSearchFilter', () => {
  _globals.it.each([{
    caseName: 'Text is empty',
    text: '',
    columns: [],
    searchVisibleColumnsOnly: false,
    expectedResult: null
  }, {
    caseName: 'Two visible columns',
    text: 'A',
    columns: [_extends({}, _options.defaultColumnProperties, {
      dataField: 'ID1'
    }), _extends({}, _options.defaultColumnProperties, {
      dataField: 'ID2'
    })],
    searchVisibleColumnsOnly: false,
    expectedResult: [['ID1', 'contains', 'A'], 'or', ['ID2', 'contains', 'A']]
  }, {
    caseName: 'Two visible columns with number format',
    text: '3',
    columns: [_extends({}, _options.defaultColumnProperties, {
      dataField: 'ID1',
      dataType: 'number'
    }), _extends({}, _options.defaultColumnProperties, {
      dataField: 'ID2',
      dataType: 'number'
    })],
    searchVisibleColumnsOnly: false,
    expectedResult: [['ID1', '=', 3], 'or', ['ID2', '=', 3]]
  }, {
    caseName: 'One visible and invisible column and searchVisibleColumnsOnly=true',
    text: 'A',
    columns: [_extends({}, _options.defaultColumnProperties, {
      dataField: 'ID1',
      visible: false
    }), _extends({}, _options.defaultColumnProperties, {
      dataField: 'ID2'
    })],
    searchVisibleColumnsOnly: true,
    expectedResult: ['ID2', 'contains', 'A']
  }])('$caseName', _ref6 => {
    let {
      text,
      columns,
      searchVisibleColumnsOnly,
      expectedResult
    } = _ref6;
    const result = (0, _utils.calculateSearchFilter)(text, columns.map(_columns_controller.normalizeColumn), searchVisibleColumnsOnly);
    (0, _globals.expect)(result).toEqual(expectedResult);
  });
});