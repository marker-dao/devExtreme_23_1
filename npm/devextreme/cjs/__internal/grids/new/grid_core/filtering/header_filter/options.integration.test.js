/**
* DevExtreme (cjs/__internal/grids/new/grid_core/filtering/header_filter/options.integration.test.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../../../../grids/new/card_view/widget"));
var _inferno = require("inferno");
var _options = require("./options");
var _view_controller = require("./view_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker, no-spaced-func */

const SELECTORS = {
  cardView: '.dx-cardview',
  headers: '.dx-cardview-headers',
  popup: '.dx-popup',
  popupContent: '.dx-popup-wrapper.dx-header-filter-menu',
  list: '.dx-list'
};
const rootQuerySelector = selector => document.body.querySelector(selector);
const setup = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const container = document.createElement('div');
  const {
    body
  } = document;
  body.append(container);
  const cardView = new _widget.default(container, options);
  (0, _inferno.rerender)();
  return cardView;
};
const openHeaderFilterPopup = cardView => {
  const popupContainer = document.createElement('div');
  // @ts-expect-error get protected property
  const viewController = cardView.diContext.get(_view_controller.HeaderFilterViewController);
  const column = cardView.getVisibleColumns()[0];
  viewController.openPopup(popupContainer, column);
  (0, _inferno.rerender)();
  return popupContainer;
};
const getPopup = () => {
  const popupElement = rootQuerySelector(SELECTORS.popup);
  const realPopupContentElement = rootQuerySelector(SELECTORS.popupContent);
  const instance = (0, _renderer.default)(popupElement ?? undefined).dxPopup('instance');
  return {
    element: realPopupContentElement,
    instance
  };
};
const getPopupList = popupContentElement => {
  const listElement = popupContentElement === null || popupContentElement === void 0 ? void 0 : popupContentElement.querySelector(SELECTORS.list);
  const instance = (0, _renderer.default)(listElement ?? undefined).dxList('instance');
  return {
    element: listElement,
    instance
  };
};
(0, _globals.describe)('Options', () => {
  (0, _globals.afterEach)(() => {
    var _$;
    const cardView = rootQuerySelector(SELECTORS.cardView);
    // @ts-expect-error bad typed renderer
    (_$ = (0, _renderer.default)(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
  });
  (0, _globals.describe)('HeaderFilter', () => {
    var _defaultOptions$heade, _defaultOptions$heade2;
    _globals.it.each([true, false, undefined])('visible: %s', () => {
      setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true
        }
      });
      const headerPanel = rootQuerySelector(SELECTORS.headers);
      // NOTE: Check that headerPanel has (or not) filter icon
      (0, _globals.expect)(headerPanel).toMatchSnapshot();
    });
    _globals.it.each([{
      value: undefined,
      result: (_defaultOptions$heade = _options.defaultOptions.headerFilter) === null || _defaultOptions$heade === void 0 ? void 0 : _defaultOptions$heade.width
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('width: $value', _ref => {
      let {
        value,
        result
      } = _ref;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true,
          width: value
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        instance: popupInstance
      } = getPopup();
      (0, _globals.expect)(popupInstance.option('width')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: (_defaultOptions$heade2 = _options.defaultOptions.headerFilter) === null || _defaultOptions$heade2 === void 0 ? void 0 : _defaultOptions$heade2.height
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('height: $value', _ref2 => {
      let {
        value,
        result
      } = _ref2;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true,
          height: value
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        instance: popupInstance
      } = getPopup();
      (0, _globals.expect)(popupInstance.option('height')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: 'all'
    }, {
      value: true,
      result: 'all'
    }, {
      value: false,
      result: 'multiple'
    }])('allowSelectAll: $value', _ref3 => {
      let {
        value,
        result
      } = _ref3;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true,
          allowSelectAll: value
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('selectionMode')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: false
    }, {
      value: true,
      result: true
    }, {
      value: false,
      result: false
    }])('search.enabled: $value', _ref4 => {
      let {
        value,
        result
      } = _ref4;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true,
          search: {
            enabled: value
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('searchEnabled')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: 500
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('search.timeout: $value', _ref5 => {
      let {
        value,
        result
      } = _ref5;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true,
          search: {
            enabled: true,
            timeout: value
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('searchTimeout')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: 'contains'
    }, {
      value: 'contains',
      result: 'contains'
    }, {
      value: 'equals',
      result: 'equals'
    }, {
      value: 'startswith',
      result: 'startswith'
    }])('search.mode: $value', _ref6 => {
      let {
        value,
        result
      } = _ref6;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true,
          search: {
            enabled: true,
            mode: value
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('searchMode')).toBe(result);
    });
    _globals.it.each([{
      result: {}
    }, {
      value: {
        disabled: true
      },
      result: {
        disabled: true
      }
    }, {
      value: {
        height: 999
      },
      result: {
        height: 999
      }
    }])('search.editorOptions: $value', _ref7 => {
      let {
        value,
        result
      } = _ref7;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true,
          search: {
            enabled: true,
            editorOptions: value
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('searchEditorOptions')).toMatchObject(result);
    });
    _globals.it.each([{
      caseName: 'default translation'
    }, {
      caseName: 'custom translations',
      texts: {
        ok: 'TEST_OK',
        cancel: 'TEST_CANCEL',
        emptyValue: 'TEST_EMTPY'
      }
    }])('texts: $caseName', _ref8 => {
      let {
        texts
      } = _ref8;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          // NOTE: WA for check "emptyValue" translation
          calculateFieldValue: () => null
        }],
        headerFilter: {
          visible: true,
          texts
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      (0, _globals.expect)(popupContentElement).toMatchSnapshot();
    });
    // NOTE: Skip test because FilterSync feature disabled
    _globals.it.skip.each([{
      filterValue: ['!', [['A', '=', 'A_0']]],
      result: 4
    }])('should render correct list total count if filterValue has negation', _ref9 => {
      let {
        filterValue,
        result
      } = _ref9;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A'
        }],
        filterValue,
        headerFilter: {
          visible: true
        },
        _filterSyncEnabled: true,
        filterPanel: {
          visible: true
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      const listCount = instance._selection.options.totalCount();
      (0, _globals.expect)(listCount).toStrictEqual(result);
    });
  });
  (0, _globals.describe)('Column.HeaderFilter', () => {
    _globals.it.each([{
      value: undefined,
      result: -999
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('width: $value', _ref10 => {
      let {
        value,
        result
      } = _ref10;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            width: value
          }
        }],
        headerFilter: {
          visible: true,
          width: -999
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        instance: popupInstance
      } = getPopup();
      (0, _globals.expect)(popupInstance.option('width')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: -999
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('height: $value', _ref11 => {
      let {
        value,
        result
      } = _ref11;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            height: value
          }
        }],
        headerFilter: {
          visible: true,
          height: -999
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        instance: popupInstance
      } = getPopup();
      (0, _globals.expect)(popupInstance.option('height')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: 'all'
    }, {
      value: true,
      result: 'all'
    }, {
      value: false,
      result: 'multiple'
    }])('allowSelectAll: $value', _ref12 => {
      let {
        value,
        result
      } = _ref12;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            allowSelectAll: value
          }
        }],
        headerFilter: {
          visible: true,
          allowSelectAll: !value
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('selectionMode')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: true
    }, {
      value: true,
      result: true
    }, {
      value: false,
      result: false
    }])('search.enabled: $value', _ref13 => {
      let {
        value,
        result
      } = _ref13;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            search: {
              enabled: value
            }
          }
        }],
        headerFilter: {
          visible: true,
          search: {
            enabled: true
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('searchEnabled')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: 1
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('search.timeout: $value', _ref14 => {
      let {
        value,
        result
      } = _ref14;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            search: {
              timeout: value
            }
          }
        }],
        headerFilter: {
          visible: true,
          search: {
            enabled: true,
            timeout: 1
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('searchTimeout')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: 'contains'
    }, {
      value: 'contains',
      result: 'contains'
    }, {
      value: 'equals',
      result: 'equals'
    }, {
      value: 'startswith',
      result: 'startswith'
    }])('search.mode: $value', _ref15 => {
      let {
        value,
        result
      } = _ref15;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            search: {
              mode: value
            }
          }
        }],
        headerFilter: {
          visible: true,
          search: {
            enabled: true
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('searchMode')).toBe(result);
    });
    _globals.it.each([{
      result: {}
    }, {
      value: {
        disabled: true
      },
      result: {
        disabled: true
      }
    }, {
      value: {
        height: 999
      },
      result: {
        height: 999
      }
    }])('search.editorOptions: $value', _ref16 => {
      let {
        value,
        result
      } = _ref16;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            search: {
              editorOptions: value
            }
          }
        }],
        headerFilter: {
          visible: true,
          search: {
            enabled: true,
            editorOptions: {
              disabled: false,
              height: 10
            }
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      (0, _globals.expect)(instance.option('searchEditorOptions')).toMatchObject(result);
    });
    (0, _globals.it)('search.searchExpr: undefined', () => {
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            search: {
              searchExpr: undefined
            }
          }
        }],
        headerFilter: {
          visible: true,
          search: {
            enabled: true
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      const searchExpr = instance.option('searchExpr');
      (0, _globals.expect)(typeof searchExpr).toBe('function');
    });
    _globals.it.each([{
      value: ['B'],
      result: ['B']
    }, {
      value: ['B', 'C', 'D'],
      result: ['B', 'C', 'D']
    }, {
      value: [() => {}],
      result: [() => {}]
    }, {
      value: ['B', () => {}, 'D'],
      result: ['B', () => {}, 'D']
    }])('search.searchExpr: $value', _ref17 => {
      let {
        value,
        result
      } = _ref17;
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            search: {
              searchExpr: value
            }
          }
        }],
        headerFilter: {
          visible: true,
          search: {
            enabled: true
          }
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      const {
        instance
      } = getPopupList(popupContentElement);
      const searchExpr = instance.option('searchExpr');
      searchExpr.forEach((expr, idx) => {
        if (typeof result[idx] === 'function') {
          // NOTE: We cannot test custom selector fn here.
          (0, _globals.expect)(typeof expr).toBe('function');
        } else {
          (0, _globals.expect)(expr).toEqual(result[idx]);
        }
      });
    });
    _globals.it.each([{
      caseName: 'exclude filter',
      filterType: 'exclude'
    }, {
      caseName: 'filter values',
      filterValues: ['B']
    }, {
      caseName: 'exclude filter with values',
      filterType: 'exclude',
      filterValues: ['B']
    }])('filterType + values: $caseName', _ref18 => {
      let {
        filterType,
        filterValues
      } = _ref18;
      const cardView = setup({
        dataSource: [{
          A: 'A_0',
          B: 'B_0'
        }, {
          A: 'A_1',
          B: 'B_1'
        }, {
          A: 'A_2',
          B: 'B_2'
        }, {
          A: 'A_3',
          B: 'B_3'
        }, {
          A: 'A_4',
          B: 'B_4'
        }],
        columns: [{
          dataField: 'A',
          filterValues,
          filterType
        }],
        headerFilter: {
          visible: true
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      (0, _globals.expect)(popupContentElement).toMatchSnapshot();
    });
    _globals.it.each([{
      caseName: 'custom dataSource',
      dataSource: [{
        text: 'A',
        value: 'A'
      }, {
        text: 'B',
        value: 'B'
      }],
      filterType: undefined,
      filterValues: undefined
    }, {
      caseName: 'custom dataSource with exclude filter',
      dataSource: [{
        text: 'A',
        value: 'A'
      }, {
        text: 'B',
        value: 'B'
      }],
      filterType: 'exclude',
      filterValues: undefined
    }, {
      caseName: 'custom dataSource with filter values',
      dataSource: [{
        text: 'A',
        value: 'A'
      }, {
        text: 'B',
        value: 'B'
      }],
      filterValues: ['B']
    }, {
      caseName: 'custom dataSource with exclude filter and values',
      dataSource: [{
        text: 'A',
        value: 'A'
      }, {
        text: 'B',
        value: 'B'
      }],
      filterType: 'exclude',
      filterValues: ['B']
    }])('dataSource: $caseName', _ref19 => {
      let {
        dataSource,
        filterType,
        filterValues
      } = _ref19;
      const cardView = setup({
        dataSource: [{
          A: 'A_0',
          B: 'B_0'
        }, {
          A: 'A_1',
          B: 'B_1'
        }, {
          A: 'A_2',
          B: 'B_2'
        }, {
          A: 'A_3',
          B: 'B_3'
        }, {
          A: 'A_4',
          B: 'B_4'
        }],
        columns: [{
          dataField: 'A',
          headerFilter: {
            dataSource
          },
          filterValues,
          filterType
        }],
        headerFilter: {
          visible: true
        }
      });
      openHeaderFilterPopup(cardView);
      const {
        element: popupContentElement
      } = getPopup();
      (0, _globals.expect)(popupContentElement).toMatchSnapshot();
    });
  });
});
