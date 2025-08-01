/**
* DevExtreme (esm/__internal/grids/new/card_view/context_menu/view.integration.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { afterEach, describe, expect, it } from '@jest/globals';
import $ from '../../../../../core/renderer';
import CardView from '../../../../grids/new/card_view/widget';
import { rerender } from 'inferno';
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
  const contextMenu = $(contextMenuElement).dxContextMenu('instance');
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
  rerender();
  if (itemsPreparingEvent === null) {
    throw new Error('contextMenuPreparing event was not fired');
  }
  return itemsPreparingEvent;
};
describe('ContextMenu', () => {
  describe('View', () => {
    afterEach(() => {
      var _$;
      const cardView = rootQuerySelector(SELECTORS.cardView);
      // @ts-expect-error bad typed renderer
      (_$ = $(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
    });
    it('contextMenu.onPositioning event is correct', () => {
      var _positioningEvent;
      const cardView = setup({
        columns: ['Column 1']
      });
      const contextMenu = getContextMenuInstance();
      expect(contextMenu.option('target')).toBe(undefined);
      expect(contextMenu.option('showEvent')).toBe(undefined);
      let invokesCount = 0;
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let positioningEvent;
      contextMenu.on('positioning', e => {
        invokesCount += 1;
        positioningEvent = e;
      });
      openContextMenu(cardView, SELECTORS.headerItem);
      expect(invokesCount).toEqual(1);
      expect((_positioningEvent = positioningEvent) === null || _positioningEvent === void 0 ? void 0 : _positioningEvent.event).toBeUndefined();
    });
    it('contextMenu has class', () => {
      const cardView = setup({
        columns: ['Column 1']
      });
      openContextMenu(cardView, SELECTORS.headerItem);
      const contextMenuElement = getContextMenuElement();
      expect(contextMenuElement.classList).toContain(WIDGET_CONTAINER_CLASS);
    });
    it.each([{
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
      expect(event.card).toBeUndefined();
      expect(event.cardIndex).toBeUndefined();
      expect(event.column).toBeUndefined();
      expect(event.columnIndex).toBeUndefined();
      expect(event.component).toBe(cardView);
      expect(event.element).toBe(cardView.element());
      expect(event.target).toEqual(targetView);
      expect(event.targetElement).toBe(rootQuerySelector(selector));
      expect(event.items).toBeUndefined();
    });
    it('onContextMenuPreparing fired on headerItem', () => {
      var _event$column;
      const cardView = setup({
        columns: ['Column 1']
      });
      const event = openContextMenu(cardView, SELECTORS.headerItem);
      expect(event.card).toBeUndefined();
      expect(event.cardIndex).toBeUndefined();
      expect(event.column).toBeDefined();
      expect((_event$column = event.column) === null || _event$column === void 0 ? void 0 : _event$column.name).toEqual('Column 1');
      expect(event.columnIndex).toEqual(0);
      expect(event.component).toBe(cardView);
      expect(event.element).toBe(cardView.element());
      expect(event.target).toEqual('headerPanel');
      expect(event.targetElement).toBe(rootQuerySelector(SELECTORS.headerItem));
      expect(event.items).toHaveLength(3);
      expect(event.items).toMatchObject([{
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
    it('onContextMenuPreparing fired on contentView card', () => {
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
      expect(event.card).toMatchObject({
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
      expect(event.cardIndex).toEqual(0);
      expect(event.column).toBeUndefined();
      expect(event.columnIndex).toBeUndefined();
      expect(event.component).toBe(cardView);
      expect(event.element).toBe(cardView.element());
      expect(event.target).toEqual('content');
      expect(event.targetElement).toBe(rootQuerySelector(SELECTORS.card));
      expect(event.items).toBeUndefined();
    });
    it('columns have customized context menu items sorting text', () => {
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
      expect(event.items).toHaveLength(3);
      expect(event.items).toMatchObject([{
        text: 'custom text 1'
      }, {
        text: 'custom text 2'
      }, {
        text: 'custom text 3'
      }]);
    });
    it.each([{
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
      expect(event.items).toHaveLength(3);
      (_event$items = event.items) === null || _event$items === void 0 || _event$items.forEach(item => {
        expect(item.disabled).toBe(sortOrder === item.value);
      });
    });
    it('items set in onContextMenuPreparing are displayed', () => {
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
      expect(contextMenuItems).toHaveLength(1);
      expect(contextMenuItems).toMatchObject([{
        text: 'custom item'
      }]);
      const firstItemElement = contextMenuElement.querySelector(SELECTORS.menuItem);
      firstItemElement.click();
      expect(itemClickFired).toBeTruthy();
    });
    it('onContextMenuPreparing event.column is correct when first column is invisible', () => {
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
      expect(event.columnIndex).toEqual(0);
      expect((_event$column2 = event.column) === null || _event$column2 === void 0 ? void 0 : _event$column2.name).toEqual('column2');
    });
  });
});
