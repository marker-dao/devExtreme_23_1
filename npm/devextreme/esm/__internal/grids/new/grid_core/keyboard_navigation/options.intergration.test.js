/**
* DevExtreme (esm/__internal/grids/new/grid_core/keyboard_navigation/options.intergration.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable spellcheck/spell-checker */
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import $ from '../../../../../core/renderer';
import CardView from '../../../../grids/new/card_view/widget';
import { rerender } from 'inferno';
const SELECTORS = {
  cardView: '.dx-cardview',
  headerPanelContent: '.dx-cardview-headerpanel-content',
  headerItem: '.dx-cardview-header-item',
  cardContainer: '.dx-cardview-content',
  card: '.dx-cardview-card',
  cardContent: '.dx-cardview-card-content'
};
const ATTRS = {
  focusDecoy: 'data-dx-focus-decoy',
  focusTrapContent: 'data-dx-focus-trap-content'
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
  return {
    container,
    cardView
  };
};
const baseConfig = {
  dataSource: new Array(6).fill(null).map((_, idx) => ({
    id: idx
  })),
  keyExpr: 'id',
  columns: ['id']
};
describe('Options', () => {
  afterEach(() => {
    var _$;
    const cardView = rootQuerySelector(SELECTORS.cardView);
    // @ts-expect-error bad typed renderer
    (_$ = $(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
  });
  describe('KeyboardNavigation', () => {
    describe('enabled: true', () => {
      it('header items should contain tabindex=0', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const headerItem = container.querySelector(SELECTORS.headerItem);
        expect(headerItem === null || headerItem === void 0 ? void 0 : headerItem.getAttribute('tabindex')).toBe('0');
      });
      it('header items container should render focus decoys', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const headerPanelContent = container.querySelector(SELECTORS.headerPanelContent);
        const parentContainer = headerPanelContent === null || headerPanelContent === void 0 ? void 0 : headerPanelContent.parentElement;
        const firstDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.firstElementChild;
        const lastDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.lastElementChild;
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe('0');
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute(ATTRS.focusDecoy)).toBe('true');
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe('0');
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute(ATTRS.focusDecoy)).toBe('true');
      });
      it('cards should contain tabindex=0', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const card = container.querySelector(SELECTORS.card);
        expect(card === null || card === void 0 ? void 0 : card.getAttribute('tabindex')).toBe('0');
      });
      it('card content should render focus trap container', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const cardContent = container.querySelector(SELECTORS.cardContent);
        const focusTrapNode = cardContent === null || cardContent === void 0 ? void 0 : cardContent.parentElement;
        expect(focusTrapNode === null || focusTrapNode === void 0 ? void 0 : focusTrapNode.getAttribute(ATTRS.focusTrapContent)).toBe('true');
      });
      it('card content should render focus decoys', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const cardContent = container.querySelector(SELECTORS.cardContent);
        const parentContainer = cardContent === null || cardContent === void 0 ? void 0 : cardContent.parentElement;
        const firstDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.firstElementChild;
        const lastDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.lastElementChild;
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe('0');
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute(ATTRS.focusDecoy)).toBe('true');
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe('0');
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute(ATTRS.focusDecoy)).toBe('true');
      });
      it('cards container should render focus decoys', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const cardsContainer = container.querySelector(SELECTORS.cardContainer);
        const parentContainer = cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.parentNode;
        const firstDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.firstElementChild;
        const lastDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.lastElementChild;
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe('0');
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe('0');
      });
    });
    describe('enabled: false', () => {
      it('header items should not contain tabindex', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const headerItem = container.querySelector(SELECTORS.headerItem);
        expect(headerItem === null || headerItem === void 0 ? void 0 : headerItem.getAttribute('tabindex')).toBe(null);
      });
      it('header items container should not has active focus decoys', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const headerPanelContent = container.querySelector(SELECTORS.headerPanelContent);
        const parentContainer = headerPanelContent === null || headerPanelContent === void 0 ? void 0 : headerPanelContent.parentElement;
        const firstDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.firstElementChild;
        const lastDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.lastElementChild;
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe(null);
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute(ATTRS.focusDecoy)).toBe('false');
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe(null);
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute(ATTRS.focusDecoy)).toBe('false');
      });
      it('cards should not contain tabindex', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const card = container.querySelector(SELECTORS.card);
        expect(card === null || card === void 0 ? void 0 : card.getAttribute('tabindex')).toBe(null);
      });
      it('card content should render focus trap container', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const cardContent = container.querySelector(SELECTORS.cardContent);
        const focusTrapNode = cardContent === null || cardContent === void 0 ? void 0 : cardContent.parentElement;
        expect(focusTrapNode === null || focusTrapNode === void 0 ? void 0 : focusTrapNode.getAttribute(ATTRS.focusTrapContent)).toBe('false');
      });
      it('card content should not has active focus decoys', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const cardContent = container.querySelector(SELECTORS.cardContent);
        const parentContainer = cardContent === null || cardContent === void 0 ? void 0 : cardContent.parentElement;
        const firstDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.firstElementChild;
        const lastDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.lastElementChild;
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe(null);
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute(ATTRS.focusDecoy)).toBe('false');
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe(null);
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute(ATTRS.focusDecoy)).toBe('false');
      });
      it('cards container should not render focus decoys', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const cardsContainer = container.querySelector(SELECTORS.cardContainer);
        const parentContainer = cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.parentNode;
        const firstDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.firstElementChild;
        const lastDecoy = parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.lastElementChild;
        expect(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe(null);
        expect(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe(null);
      });
    });
    describe('onKeyDown', () => {
      it('common API contract test', () => {
        const callbackMock = jest.fn();
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          },
          onKeyDown: callbackMock
        }));
        const headerItem = container.querySelector(SELECTORS.headerItem);
        headerItem === null || headerItem === void 0 || headerItem.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'a',
          bubbles: true
        }));
        expect(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event,
          element,
          component
        }]] = callbackMock.mock.calls;
        expect(handled).toBe(false);
        expect(event).toStrictEqual(expect.any(KeyboardEvent));
        expect(element).toStrictEqual(expect.any(HTMLDivElement));
        expect(component).toStrictEqual(expect.any(CardView));
      });
      it.each(['Escape', ' ', 'ArrowDown', 'ArrowUp', 'B'])('should be called with unhandled events on header item: "%s"', key => {
        const callbackMock = jest.fn();
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          },
          onKeyDown: callbackMock
        }));
        const headerItem = container.querySelector(SELECTORS.headerItem);
        headerItem === null || headerItem === void 0 || headerItem.dispatchEvent(new KeyboardEvent('keydown', {
          key,
          bubbles: true
        }));
        expect(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event: {
            key: eventKey
          }
        }]] = callbackMock.mock.calls;
        expect(handled).toBe(false);
        expect(eventKey).toBe(key);
      });
      it.each(['ArrowRight', 'ArrowLeft', 'Enter'])('should be called with handled events on header item: "%s"', key => {
        const callbackMock = jest.fn();
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          },
          onKeyDown: callbackMock
        }));
        const headerItem = container.querySelector(SELECTORS.headerItem);
        headerItem === null || headerItem === void 0 || headerItem.dispatchEvent(new KeyboardEvent('keydown', {
          key,
          bubbles: true
        }));
        expect(callbackMock).toHaveBeenCalledTimes(1);
        expect(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event: {
            key: eventKey
          }
        }]] = callbackMock.mock.calls;
        expect(handled).toBe(true);
        expect(eventKey).toBe(key);
      });
      it.each(['a', ' '])('should be called with unhandled events on card: "%s"', key => {
        const callbackMock = jest.fn();
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          },
          onKeyDown: callbackMock
        }));
        const card = container.querySelector(SELECTORS.headerItem);
        card === null || card === void 0 || card.dispatchEvent(new KeyboardEvent('keydown', {
          key,
          bubbles: true
        }));
        expect(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event: {
            key: eventKey
          }
        }]] = callbackMock.mock.calls;
        expect(handled).toBe(false);
        expect(eventKey).toBe(key);
      });
      it.each(['ArrowRight', 'ArrowLeft', 'Enter'])('should be called with handled events on card: "%s"', key => {
        const callbackMock = jest.fn();
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          },
          onKeyDown: callbackMock
        }));
        const card = container.querySelector(SELECTORS.headerItem);
        card === null || card === void 0 || card.dispatchEvent(new KeyboardEvent('keydown', {
          key,
          bubbles: true
        }));
        expect(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event: {
            key: eventKey
          }
        }]] = callbackMock.mock.calls;
        expect(handled).toBe(true);
        expect(eventKey).toBe(key);
      });
    });
    describe('onFocusedCardChanged', () => {
      it('common API contract test', () => {
        const callbackMock = jest.fn();
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          },
          onFocusedCardChanged: callbackMock
        }));
        const cardElement = container.querySelector(SELECTORS.card);
        cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true
        }));
        expect(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          cardIndex,
          card,
          element,
          component
        }]] = callbackMock.mock.calls;
        expect(cardIndex).toEqual(1);
        expect(card).toMatchSnapshot();
        expect(element).toStrictEqual(expect.any(HTMLDivElement));
        expect(component).toStrictEqual(expect.any(CardView));
      });
      it.each([{
        idx: 0,
        keys: ['ArrowRight', 'ArrowRight'],
        path: [1, 2]
      }, {
        idx: 1,
        keys: ['ArrowRight', 'ArrowLeft'],
        path: [1, 0]
      }, {
        idx: 2,
        keys: ['ArrowRight', 'ArrowLeft'],
        path: [1, 0]
      }, {
        idx: 3,
        keys: ['ArrowDown', 'ArrowRight'],
        path: [3, 4]
      }, {
        idx: 4,
        keys: ['ArrowDown', 'ArrowUp'],
        path: [3, 0]
      }, {
        idx: 4,
        keys: ['ArrowDown', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
        path: [3, 4, 7, 6]
      }, {
        idx: 4,
        keys: ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight'],
        path: [1, 2]
      }, {
        idx: 4,
        keys: ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'],
        path: []
      }, {
        idx: 4,
        keys: ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown'],
        path: [3, 6]
      }, {
        idx: 4,
        keys: ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp'],
        path: []
      }])('should fire event after each card focus change -> case #$idx', _ref => {
        let {
          keys,
          path
        } = _ref;
        const callbackMock = jest.fn();
        const {
          container
        } = setup({
          dataSource: new Array(9).fill(null).map((_, idx) => ({
            id: idx
          })),
          keyExpr: 'id',
          columns: ['id'],
          keyboardNavigation: {
            enabled: true
          },
          paging: {
            pageSize: 9
          },
          onFocusedCardChanged: callbackMock
        });
        const cardElement = container.querySelector(SELECTORS.card);
        keys.forEach(key => {
          cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new KeyboardEvent('keydown', {
            key,
            bubbles: true
          }));
        });
        const result = callbackMock.mock.calls.flat().map(_ref2 => {
          let {
            cardIndex
          } = _ref2;
          return cardIndex;
        });
        expect(result).toStrictEqual(path);
      });
    });
  });
});
