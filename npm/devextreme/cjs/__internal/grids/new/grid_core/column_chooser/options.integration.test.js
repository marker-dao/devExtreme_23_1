/**
* DevExtreme (cjs/__internal/grids/new/grid_core/column_chooser/options.integration.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../../../grids/new/card_view/widget"));
var _inferno = require("inferno");
var _options = require("./options");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const SELECTORS = {
  cardView: '.dx-cardview',
  columnChooserBtn: '.dx-cardview-column-chooser-button',
  popup: '.dx-popup',
  treeView: '.dx-treeview'
};
const defaultOptions = _options.defaultOptions.columnChooser;
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
const setupOpened = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const cardView = setup(options);
  cardView.showColumnChooser();
  (0, _inferno.rerender)();
  return cardView;
};
const getPopupInstance = () => {
  (0, _inferno.rerender)();
  const popupElement = rootQuerySelector(SELECTORS.popup);
  const instance = (0, _renderer.default)(popupElement ?? undefined).dxPopup('instance');
  return instance;
};
const getTreeViewInstance = () => {
  const treeViewElement = rootQuerySelector(SELECTORS.treeView);
  const instance = (0, _renderer.default)(treeViewElement ?? undefined).dxTreeView('instance');
  return instance;
};
(0, _globals.describe)('Options', () => {
  (0, _globals.afterEach)(() => {
    var _$;
    const cardView = rootQuerySelector(SELECTORS.cardView);
    // @ts-expect-error bad typed renderer
    (_$ = (0, _renderer.default)(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
  });
  (0, _globals.describe)('ColumnChooser', () => {
    _globals.it.each([{
      value: true,
      result: true
    }, {
      value: false,
      result: false
    }, {
      value: undefined,
      result: defaultOptions.enabled
    }])('enabled: %s', _ref => {
      let {
        value,
        result
      } = _ref;
      setup({
        columnChooser: {
          enabled: value
        }
      });
      const button = rootQuerySelector(SELECTORS.columnChooserBtn);
      (0, _globals.expect)(!!button).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.width
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('width: $value', _ref2 => {
      let {
        value,
        result
      } = _ref2;
      setupOpened({
        columnChooser: {
          enabled: true,
          width: value
        }
      });
      const popup = getPopupInstance();
      (0, _globals.expect)(popup.option('width')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.height
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('height: $value', _ref3 => {
      let {
        value,
        result
      } = _ref3;
      setupOpened({
        columnChooser: {
          enabled: true,
          height: value
        }
      });
      const popup = getPopupInstance();
      (0, _globals.expect)(popup.option('height')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.container
    }, {
      value: '#custom',
      result: '#custom'
    }])('container: $value', _ref4 => {
      let {
        value,
        result
      } = _ref4;
      setupOpened({
        columnChooser: {
          enabled: true,
          container: value
        }
      });
      const popup = getPopupInstance();
      (0, _globals.expect)(popup.option('container')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: {
        my: 'right top',
        at: 'right bottom',
        of: '.dx-cardview-column-chooser-button',
        collision: 'fit',
        offset: '-2 -2',
        boundaryOffset: '2 2'
      }
    }, {
      value: {
        my: 'right top',
        at: 'right bottom',
        of: '.dx-cardview-column-chooser-button'
      },
      result: {
        my: 'right top',
        at: 'right bottom',
        of: '.dx-cardview-column-chooser-button'
      }
    }])('position: $value', _ref5 => {
      let {
        value,
        result
      } = _ref5;
      setupOpened({
        columnChooser: {
          enabled: true,
          position: value
        }
      });
      const popup = getPopupInstance();
      (0, _globals.expect)(popup.option('position')).toMatchObject(result);
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.emptyPanelText
    }, {
      value: 'custom value',
      result: 'custom value'
    }])('emptyPanelText: $value', _ref6 => {
      let {
        value,
        result
      } = _ref6;
      setupOpened({
        columnChooser: {
          enabled: true,
          emptyPanelText: value
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.option('noDataText')).toEqual(result);
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.title
    }, {
      value: 'custom value',
      result: 'custom value'
    }])('title: $value', _ref7 => {
      let {
        value,
        result
      } = _ref7;
      setupOpened({
        columnChooser: {
          enabled: true,
          title: value
        }
      });
      const popup = getPopupInstance();
      (0, _globals.expect)(popup.option('toolbarItems[0].text')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.search.enabled
    }, {
      value: true,
      result: true
    }, {
      value: false,
      result: false
    }])('search.enabled: $value', _ref8 => {
      let {
        value,
        result
      } = _ref8;
      setupOpened({
        columnChooser: {
          enabled: true,
          search: {
            enabled: value
          }
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.option('searchEnabled')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.search.timeout
    }, {
      value: 100,
      result: 100
    }, {
      value: 1000,
      result: 1000
    }])('search.timeout: $value', _ref9 => {
      let {
        value,
        result
      } = _ref9;
      setupOpened({
        columnChooser: {
          enabled: true,
          search: {
            enabled: true,
            timeout: value
          }
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.option('searchTimeout')).toBe(result);
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
    }])('search.editorOptions: $value', _ref10 => {
      let {
        value,
        result
      } = _ref10;
      setupOpened({
        columnChooser: {
          enabled: true,
          search: {
            enabled: true,
            editorOptions: value
          }
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.option('searchEditorOptions')).toMatchObject(result);
    });
    _globals.it.each([{
      mode: undefined
    }, {
      mode: 'select'
    }, {
      mode: 'dragAndDrop'
    }])('mode: $value', _ref11 => {
      let {
        mode
      } = _ref11;
      setupOpened({
        columnChooser: {
          enabled: true,
          mode
        }
      });
      const treeView = getTreeViewInstance();
      if (mode === 'select') {
        (0, _globals.expect)(['selectAll', 'normal']).toContain(treeView.option('showCheckBoxesMode'));
      } else {
        (0, _globals.expect)(['none']).toContain(treeView.option('showCheckBoxesMode'));
      }
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.selection.allowSelectAll ? 'selectAll' : 'normal'
    }, {
      value: true,
      result: 'selectAll'
    }, {
      value: false,
      result: 'normal'
    }])('selection.allowSelectAll: $value', _ref12 => {
      let {
        value,
        result
      } = _ref12;
      setupOpened({
        columnChooser: {
          enabled: true,
          mode: 'select',
          selection: {
            allowSelectAll: value
          }
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.option('showCheckBoxesMode')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: defaultOptions.selection.selectByClick
    }, {
      value: true,
      result: true
    }, {
      value: false,
      result: false
    }])('selection.selectByClick: $value', _ref13 => {
      let {
        value,
        result
      } = _ref13;
      setupOpened({
        columnChooser: {
          enabled: true,
          mode: 'select',
          selection: {
            selectByClick: value
          }
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.option('selectByClick')).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: ['B Column', 'C Column', 'A Column']
    }, {
      value: 'asc',
      result: ['A Column', 'B Column', 'C Column']
    }, {
      value: 'desc',
      result: ['C Column', 'B Column', 'A Column']
    }])('sortOrder: $value', _ref14 => {
      let {
        value,
        result
      } = _ref14;
      setupOpened({
        columns: ['B Column', 'C Column', 'A Column'],
        columnChooser: {
          enabled: true,
          sortOrder: value,
          mode: 'select'
        }
      });
      const treeView = getTreeViewInstance();
      const items = (treeView.option('items') ?? []).map(item => item.text);
      (0, _globals.expect)(items).toEqual(result);
    });
  });
  (0, _globals.describe)('Column options related to ColumnChooser', () => {
    _globals.it.each([{
      value: true,
      result: true
    }, {
      value: false,
      result: false
    }])('column.visible: $value', _ref15 => {
      let {
        value,
        result
      } = _ref15;
      setupOpened({
        columns: [{
          dataField: 'column',
          visible: value
        }],
        columnChooser: {
          enabled: true,
          mode: 'select'
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.getNodes()[0].selected).toBe(result);
    });
    _globals.it.each([{
      value: undefined,
      result: 'Test'
    }, {
      value: 'custom caption',
      result: 'custom caption'
    }])('column.caption: $value', _ref16 => {
      let {
        value,
        result
      } = _ref16;
      setupOpened({
        columns: [{
          dataField: 'Test',
          caption: value
        }],
        columnChooser: {
          enabled: true,
          mode: 'select'
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.getNodes()[0].text).toBe(result);
    });
    _globals.it.each([{
      value: false,
      result: true
    }, {
      value: true,
      result: false
    }])('column.allowHiding: $value', _ref17 => {
      let {
        value,
        result
      } = _ref17;
      setupOpened({
        columns: [{
          dataField: 'test column',
          allowHiding: value
        }],
        columnChooser: {
          enabled: true,
          mode: 'select'
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.getNodes()[0].disabled).toBe(result);
    });
    _globals.it.each([{
      value: false,
      result: 0
    }, {
      value: true,
      result: 1
    }])('column.showInColumnChooser: $value', _ref18 => {
      let {
        value,
        result
      } = _ref18;
      setupOpened({
        columns: [{
          dataField: 'test column',
          showInColumnChooser: value
        }],
        columnChooser: {
          enabled: true,
          mode: 'select'
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)(treeView.getNodes()).toHaveLength(result);
    });
    _globals.it.each([{
      value: undefined,
      result: 'test'
    }, {
      value: 'custom_name',
      result: 'custom_name'
    }])('column.name: $value', _ref19 => {
      var _treeView$getNodes$0$;
      let {
        value,
        result
      } = _ref19;
      setupOpened({
        columns: [{
          dataField: 'test',
          name: value
        }],
        columnChooser: {
          enabled: true,
          mode: 'select'
        }
      });
      const treeView = getTreeViewInstance();
      (0, _globals.expect)((_treeView$getNodes$0$ = treeView.getNodes()[0].itemData) === null || _treeView$getNodes$0$ === void 0 ? void 0 : _treeView$getNodes$0$.columnName).toEqual(result);
    });
  });
});
