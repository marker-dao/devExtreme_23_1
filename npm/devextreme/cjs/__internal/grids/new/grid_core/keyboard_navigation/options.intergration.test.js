/**
* DevExtreme (cjs/__internal/grids/new/grid_core/keyboard_navigation/options.intergration.test.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable spellcheck/spell-checker */
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
  const cardView = new _widget.default(container, options);
  (0, _inferno.rerender)();
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
(0, _globals.describe)('Options', () => {
  (0, _globals.afterEach)(() => {
    var _$;
    const cardView = rootQuerySelector(SELECTORS.cardView);
    // @ts-expect-error bad typed renderer
    (_$ = (0, _renderer.default)(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
  });
  (0, _globals.describe)('KeyboardNavigation', () => {
    (0, _globals.describe)('enabled: true', () => {
      (0, _globals.it)('header items should contain tabindex=0', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const headerItem = container.querySelector(SELECTORS.headerItem);
        (0, _globals.expect)(headerItem === null || headerItem === void 0 ? void 0 : headerItem.getAttribute('tabindex')).toBe('0');
      });
      (0, _globals.it)('header items container should render focus decoys', () => {
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
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe('0');
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute(ATTRS.focusDecoy)).toBe('true');
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe('0');
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute(ATTRS.focusDecoy)).toBe('true');
      });
      (0, _globals.it)('cards should contain tabindex=0', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const card = container.querySelector(SELECTORS.card);
        (0, _globals.expect)(card === null || card === void 0 ? void 0 : card.getAttribute('tabindex')).toBe('0');
      });
      (0, _globals.it)('card content should render focus trap container', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: true
          }
        }));
        const cardContent = container.querySelector(SELECTORS.cardContent);
        const focusTrapNode = cardContent === null || cardContent === void 0 ? void 0 : cardContent.parentElement;
        (0, _globals.expect)(focusTrapNode === null || focusTrapNode === void 0 ? void 0 : focusTrapNode.getAttribute(ATTRS.focusTrapContent)).toBe('true');
      });
      (0, _globals.it)('card content should render focus decoys', () => {
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
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe('0');
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute(ATTRS.focusDecoy)).toBe('true');
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe('0');
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute(ATTRS.focusDecoy)).toBe('true');
      });
      (0, _globals.it)('cards container should render focus decoys', () => {
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
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe('0');
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe('0');
      });
    });
    (0, _globals.describe)('enabled: false', () => {
      (0, _globals.it)('header items should not contain tabindex', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const headerItem = container.querySelector(SELECTORS.headerItem);
        (0, _globals.expect)(headerItem === null || headerItem === void 0 ? void 0 : headerItem.getAttribute('tabindex')).toBe(null);
      });
      (0, _globals.it)('header items container should not has active focus decoys', () => {
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
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe(null);
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute(ATTRS.focusDecoy)).toBe('false');
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe(null);
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute(ATTRS.focusDecoy)).toBe('false');
      });
      (0, _globals.it)('cards should not contain tabindex', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const card = container.querySelector(SELECTORS.card);
        (0, _globals.expect)(card === null || card === void 0 ? void 0 : card.getAttribute('tabindex')).toBe(null);
      });
      (0, _globals.it)('card content should render focus trap container', () => {
        const {
          container
        } = setup(_extends({}, baseConfig, {
          keyboardNavigation: {
            enabled: false
          }
        }));
        const cardContent = container.querySelector(SELECTORS.cardContent);
        const focusTrapNode = cardContent === null || cardContent === void 0 ? void 0 : cardContent.parentElement;
        (0, _globals.expect)(focusTrapNode === null || focusTrapNode === void 0 ? void 0 : focusTrapNode.getAttribute(ATTRS.focusTrapContent)).toBe('false');
      });
      (0, _globals.it)('card content should not has active focus decoys', () => {
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
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe(null);
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute(ATTRS.focusDecoy)).toBe('false');
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe(null);
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute(ATTRS.focusDecoy)).toBe('false');
      });
      (0, _globals.it)('cards container should not render focus decoys', () => {
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
        (0, _globals.expect)(firstDecoy === null || firstDecoy === void 0 ? void 0 : firstDecoy.getAttribute('tabindex')).toBe(null);
        (0, _globals.expect)(lastDecoy === null || lastDecoy === void 0 ? void 0 : lastDecoy.getAttribute('tabindex')).toBe(null);
      });
    });
    (0, _globals.describe)('onKeyDown', () => {
      (0, _globals.it)('common API contract test', () => {
        const callbackMock = _globals.jest.fn();
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
        (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event,
          element,
          component
        }]] = callbackMock.mock.calls;
        (0, _globals.expect)(handled).toBe(false);
        (0, _globals.expect)(event).toStrictEqual(_globals.expect.any(KeyboardEvent));
        (0, _globals.expect)(element).toStrictEqual(_globals.expect.any(HTMLDivElement));
        (0, _globals.expect)(component).toStrictEqual(_globals.expect.any(_widget.default));
      });
      _globals.it.each(['Escape', ' ', 'ArrowDown', 'ArrowUp', 'B'])('should be called with unhandled events on header item: "%s"', key => {
        const callbackMock = _globals.jest.fn();
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
        (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event: {
            key: eventKey
          }
        }]] = callbackMock.mock.calls;
        (0, _globals.expect)(handled).toBe(false);
        (0, _globals.expect)(eventKey).toBe(key);
      });
      _globals.it.each(['ArrowRight', 'ArrowLeft', 'Enter'])('should be called with handled events on header item: "%s"', key => {
        const callbackMock = _globals.jest.fn();
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
        (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event: {
            key: eventKey
          }
        }]] = callbackMock.mock.calls;
        (0, _globals.expect)(handled).toBe(true);
        (0, _globals.expect)(eventKey).toBe(key);
      });
      _globals.it.each(['a', ' '])('should be called with unhandled events on card: "%s"', key => {
        const callbackMock = _globals.jest.fn();
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
        (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event: {
            key: eventKey
          }
        }]] = callbackMock.mock.calls;
        (0, _globals.expect)(handled).toBe(false);
        (0, _globals.expect)(eventKey).toBe(key);
      });
      _globals.it.each(['ArrowRight', 'ArrowLeft', 'Enter'])('should be called with handled events on card: "%s"', key => {
        const callbackMock = _globals.jest.fn();
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
        (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          handled,
          event: {
            key: eventKey
          }
        }]] = callbackMock.mock.calls;
        (0, _globals.expect)(handled).toBe(true);
        (0, _globals.expect)(eventKey).toBe(key);
      });
    });
    (0, _globals.describe)('onFocusedCardChanged', () => {
      (0, _globals.it)('common API contract test', () => {
        const callbackMock = _globals.jest.fn();
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
        (0, _globals.expect)(callbackMock).toHaveBeenCalledTimes(1);
        const [[{
          cardIndex,
          card,
          element,
          component
        }]] = callbackMock.mock.calls;
        (0, _globals.expect)(cardIndex).toEqual(1);
        (0, _globals.expect)(card).toMatchSnapshot();
        (0, _globals.expect)(element).toStrictEqual(_globals.expect.any(HTMLDivElement));
        (0, _globals.expect)(component).toStrictEqual(_globals.expect.any(_widget.default));
      });
      _globals.it.each([{
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
        const callbackMock = _globals.jest.fn();
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
        (0, _globals.expect)(result).toStrictEqual(path);
      });
    });
  });
});
