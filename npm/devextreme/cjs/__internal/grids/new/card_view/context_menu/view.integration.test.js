/**
* DevExtreme (cjs/__internal/grids/new/card_view/context_menu/view.integration.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../../../grids/new/card_view/widget"));
var _inferno = require("inferno");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

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
const SELECTORS = {
  cardView: '.dx-widget.dx-cardview',
  contextMenu: '.dx-widget.dx-context-menu',
  contextMenuContent: '.dx-context-menu.dx-overlay-content',
  toolbar: '.dx-widget.dx-toolbar',
  headerPanel: '.dx-cardview-headerpanel-content',
  contentView: '.dx-gridcore-contentview',
  headerItem: '.dx-cardview-header-item',
  card: '.dx-cardview-card',
  menuItem: '.dx-menu-item'
};
const WIDGET_CONTAINER_CLASS = 'dx-cardview-container';
const rootQuerySelector = selector => document.body.querySelector(selector);
const getContextMenuInstance = () => {
  const contextMenuElement = rootQuerySelector(SELECTORS.contextMenu);
  if (!contextMenuElement) {
    throw new Error('ContextMenu element not found');
  }
  // @ts-expect-error
  const contextMenu = (0, _renderer.default)(contextMenuElement).dxContextMenu('instance');
  return contextMenu;
};
const getContextMenuElement = () => {
  const contextMenuElement = rootQuerySelector(SELECTORS.contextMenuContent);
  if (!contextMenuElement) {
    throw new Error('ContextMenu content element not present in the DOM');
  }
  return contextMenuElement;
};
const openContextMenu = (cardView, selector) => {
  let itemsPreparingEvent = null;
  cardView.on('contextMenuPreparing', e => {
    itemsPreparingEvent = e;
  });
  const eventElement = rootQuerySelector(selector);
  const contextMenuEvent = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  eventElement === null || eventElement === void 0 || eventElement.dispatchEvent(contextMenuEvent);
  (0, _inferno.rerender)();
  if (itemsPreparingEvent === null) {
    throw new Error('contextMenuPreparing event was not fired');
  }
  return itemsPreparingEvent;
};
(0, _globals.describe)('ContextMenu', () => {
  (0, _globals.describe)('View', () => {
    (0, _globals.afterEach)(() => {
      var _$;
      const cardView = rootQuerySelector(SELECTORS.cardView);
      // @ts-expect-error bad typed renderer
      (_$ = (0, _renderer.default)(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
    });
    (0, _globals.it)('contextMenu.onPositioning event is correct', () => {
      var _positioningEvent;
      const cardView = setup({
        columns: ['Column 1']
      });
      const contextMenu = getContextMenuInstance();
      (0, _globals.expect)(contextMenu.option('target')).toBe(undefined);
      (0, _globals.expect)(contextMenu.option('showEvent')).toBe(undefined);
      let invokesCount = 0;
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let positioningEvent;
      contextMenu.on('positioning', e => {
        invokesCount += 1;
        positioningEvent = e;
      });
      openContextMenu(cardView, SELECTORS.headerItem);
      (0, _globals.expect)(invokesCount).toEqual(1);
      (0, _globals.expect)((_positioningEvent = positioningEvent) === null || _positioningEvent === void 0 ? void 0 : _positioningEvent.event).toBeUndefined();
    });
    (0, _globals.it)('contextMenu has class', () => {
      const cardView = setup({
        columns: ['Column 1']
      });
      openContextMenu(cardView, SELECTORS.headerItem);
      const contextMenuElement = getContextMenuElement();
      (0, _globals.expect)(contextMenuElement.classList).toContain(WIDGET_CONTAINER_CLASS);
    });
    _globals.it.each([{
      targetView: 'toolbar',
      selector: SELECTORS.toolbar
    }, {
      targetView: 'headerPanel',
      selector: SELECTORS.headerPanel
    }, {
      targetView: 'content',
      selector: SELECTORS.contentView
    }])('onContextMenuPreparing fired on $targetView', _ref => {
      let {
        targetView,
        selector
      } = _ref;
      const cardView = setup({
        columns: ['Column 1'],
        toolbar: {
          items: [{
            text: 'a'
          }]
        }
      });
      const event = openContextMenu(cardView, selector);
      (0, _globals.expect)(event.card).toBeUndefined();
      (0, _globals.expect)(event.cardIndex).toBeUndefined();
      (0, _globals.expect)(event.column).toBeUndefined();
      (0, _globals.expect)(event.columnIndex).toBeUndefined();
      (0, _globals.expect)(event.component).toBe(cardView);
      (0, _globals.expect)(event.element).toBe(cardView.element());
      (0, _globals.expect)(event.target).toEqual(targetView);
      (0, _globals.expect)(event.targetElement).toBe(rootQuerySelector(selector));
      (0, _globals.expect)(event.items).toBeUndefined();
    });
    (0, _globals.it)('onContextMenuPreparing fired on headerItem', () => {
      var _event$column;
      const cardView = setup({
        columns: ['Column 1']
      });
      const event = openContextMenu(cardView, SELECTORS.headerItem);
      (0, _globals.expect)(event.card).toBeUndefined();
      (0, _globals.expect)(event.cardIndex).toBeUndefined();
      (0, _globals.expect)(event.column).toBeDefined();
      (0, _globals.expect)((_event$column = event.column) === null || _event$column === void 0 ? void 0 : _event$column.name).toEqual('Column 1');
      (0, _globals.expect)(event.columnIndex).toEqual(0);
      (0, _globals.expect)(event.component).toBe(cardView);
      (0, _globals.expect)(event.element).toBe(cardView.element());
      (0, _globals.expect)(event.target).toEqual('headerPanel');
      (0, _globals.expect)(event.targetElement).toBe(rootQuerySelector(SELECTORS.headerItem));
      (0, _globals.expect)(event.items).toHaveLength(3);
      (0, _globals.expect)(event.items).toMatchObject([{
        value: 'asc',
        icon: 'sortuptext'
      }, {
        value: 'desc',
        icon: 'sortdowntext'
      }, {
        value: undefined,
        icon: 'none'
      }]);
    });
    (0, _globals.it)('onContextMenuPreparing fired on contentView card', () => {
      const cardView = setup({
        columns: [{
          dataField: 'test'
        }],
        keyExpr: 'id',
        dataSource: [{
          id: 10,
          test: 'some value 1'
        }, {
          id: 11,
          test: 'some value 2'
        }]
      });
      const event = openContextMenu(cardView, SELECTORS.card);
      (0, _globals.expect)(event.card).toMatchObject({
        key: 10,
        index: 0,
        data: {
          id: 10,
          test: 'some value 1'
        },
        fields: [{
          value: 'some value 1'
        }]
      });
      (0, _globals.expect)(event.cardIndex).toEqual(0);
      (0, _globals.expect)(event.column).toBeUndefined();
      (0, _globals.expect)(event.columnIndex).toBeUndefined();
      (0, _globals.expect)(event.component).toBe(cardView);
      (0, _globals.expect)(event.element).toBe(cardView.element());
      (0, _globals.expect)(event.target).toEqual('content');
      (0, _globals.expect)(event.targetElement).toBe(rootQuerySelector(SELECTORS.card));
      (0, _globals.expect)(event.items).toBeUndefined();
    });
    (0, _globals.it)('columns have customized context menu items sorting text', () => {
      const cardView = setup({
        columns: [{
          dataField: 'column1'
        }],
        sorting: {
          ascendingText: 'custom text 1',
          descendingText: 'custom text 2',
          clearText: 'custom text 3'
        }
      });
      const event = openContextMenu(cardView, SELECTORS.headerItem);
      (0, _globals.expect)(event.items).toHaveLength(3);
      (0, _globals.expect)(event.items).toMatchObject([{
        text: 'custom text 1'
      }, {
        text: 'custom text 2'
      }, {
        text: 'custom text 3'
      }]);
    });
    _globals.it.each([{
      sortOrder: 'asc'
    }, {
      sortOrder: 'desc'
    }, {
      sortOrder: undefined
    }])('context menu items disabled state when column sortOrder: $sortOrder', _ref2 => {
      var _event$items;
      let {
        sortOrder
      } = _ref2;
      const cardView = setup({
        columns: [{
          dataField: 'column1',
          sortOrder
        }]
      });
      const event = openContextMenu(cardView, SELECTORS.headerItem);
      (0, _globals.expect)(event.items).toHaveLength(3);
      (_event$items = event.items) === null || _event$items === void 0 || _event$items.forEach(item => {
        (0, _globals.expect)(item.disabled).toBe(sortOrder === item.value);
      });
    });
    (0, _globals.it)('items set in onContextMenuPreparing are displayed', () => {
      const cardView = setup({});
      let itemClickFired = false;
      cardView.on('contextMenuPreparing', e => {
        e.items = [{
          text: 'custom item',
          onItemClick: () => {
            itemClickFired = true;
          }
        }];
      });
      openContextMenu(cardView, SELECTORS.contentView);
      const contextMenu = getContextMenuInstance();
      const contextMenuElement = getContextMenuElement();
      const contextMenuItems = contextMenu.option('items');
      (0, _globals.expect)(contextMenuItems).toHaveLength(1);
      (0, _globals.expect)(contextMenuItems).toMatchObject([{
        text: 'custom item'
      }]);
      const firstItemElement = contextMenuElement.querySelector(SELECTORS.menuItem);
      firstItemElement.click();
      (0, _globals.expect)(itemClickFired).toBeTruthy();
    });
    (0, _globals.it)('onContextMenuPreparing event.column is correct when first column is invisible', () => {
      var _event$column2;
      const cardView = setup({
        columns: [{
          dataField: 'column1',
          visible: false
        }, {
          dataField: 'column2'
        }]
      });
      const event = openContextMenu(cardView, `${SELECTORS.headerItem}`);
      (0, _globals.expect)(event.columnIndex).toEqual(0);
      (0, _globals.expect)((_event$column2 = event.column) === null || _event$column2 === void 0 ? void 0 : _event$column2.name).toEqual('column2');
    });
  });
});
