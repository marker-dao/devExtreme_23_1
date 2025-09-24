/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/options.integration.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker, no-spaced-func */
import { afterEach, describe, expect, it } from '@jest/globals';
import $ from '../../../../../../core/renderer';
import CardView from '../../../../../grids/new/card_view/widget';
import { rerender } from 'inferno';
import { defaultOptions } from './options';
import { HeaderFilterViewController } from './view_controller';
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
  const cardView = new CardView(container, options);
  rerender();
  return cardView;
};
const openHeaderFilterPopup = cardView => {
  const popupContainer = document.createElement('div');
  // @ts-expect-error get protected property
  const viewController = cardView.diContext.get(HeaderFilterViewController);
  const column = cardView.getVisibleColumns()[0];
  viewController.openPopup(popupContainer, column);
  rerender();
  return popupContainer;
};
const getPopup = () => {
  const popupElement = rootQuerySelector(SELECTORS.popup);
  const realPopupContentElement = rootQuerySelector(SELECTORS.popupContent);
  const instance = $(popupElement ?? undefined).dxPopup('instance');
  return {
    element: realPopupContentElement,
    instance
  };
};
const getPopupList = popupContentElement => {
  const listElement = popupContentElement === null || popupContentElement === void 0 ? void 0 : popupContentElement.querySelector(SELECTORS.list);
  const instance = $(listElement ?? undefined).dxList('instance');
  return {
    element: listElement,
    instance
  };
};
describe('Options', () => {
  afterEach(() => {
    var _$;
    const cardView = rootQuerySelector(SELECTORS.cardView);
    // @ts-expect-error bad typed renderer
    (_$ = $(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
  });
  describe('HeaderFilter', () => {
    var _defaultOptions$heade, _defaultOptions$heade2;
    it.each([true, false, undefined])('visible: %s', () => {
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
      expect(headerPanel).toMatchSnapshot();
    });
    it.each([{
      value: undefined,
      result: (_defaultOptions$heade = defaultOptions.headerFilter) === null || _defaultOptions$heade === void 0 ? void 0 : _defaultOptions$heade.width
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
      expect(popupInstance.option('width')).toBe(result);
    });
    it.each([{
      value: undefined,
      result: (_defaultOptions$heade2 = defaultOptions.headerFilter) === null || _defaultOptions$heade2 === void 0 ? void 0 : _defaultOptions$heade2.height
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
      expect(popupInstance.option('height')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('selectionMode')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('searchEnabled')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('searchTimeout')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('searchMode')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('searchEditorOptions')).toMatchObject(result);
    });
    it.each([{
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
      expect(popupContentElement).toMatchSnapshot();
    });
    // NOTE: Skip test because FilterSync feature disabled
    it.skip.each([{
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
      expect(listCount).toStrictEqual(result);
    });
  });
  describe('Column.HeaderFilter', () => {
    it.each([{
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
      expect(popupInstance.option('width')).toBe(result);
    });
    it.each([{
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
      expect(popupInstance.option('height')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('selectionMode')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('searchEnabled')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('searchTimeout')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('searchMode')).toBe(result);
    });
    it.each([{
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
      expect(instance.option('searchEditorOptions')).toMatchObject(result);
    });
    it('search.searchExpr: undefined', () => {
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
      expect(typeof searchExpr).toBe('function');
    });
    it.each([{
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
          expect(typeof expr).toBe('function');
        } else {
          expect(expr).toEqual(result[idx]);
        }
      });
    });
    it.each([{
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
      expect(popupContentElement).toMatchSnapshot();
    });
    it.each([{
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
      expect(popupContentElement).toMatchSnapshot();
    });
  });
});
