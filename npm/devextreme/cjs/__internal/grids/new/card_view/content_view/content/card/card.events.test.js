/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/card.events.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _card = require("./card");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */ /* eslint-disable @typescript-eslint/init-declarations */
const createMockCallback = () => ({
  called: false,
  call() {
    this.called = true;
  }
});
const mockSelectCard = createMockCallback();
const mockOnDblClick = createMockCallback();
const mockOnClick = createMockCallback();
const mockOnHold = createMockCallback();
const props = {
  card: {
    fields: [{
      column: {
        dataField: 'Name',
        name: 'Field',
        caption: 'Field'
      },
      value: 'devextreme',
      text: 'devextreme'
    }],
    key: 0
  },
  toolbar: [{
    location: 'before',
    widget: 'dxCheckBox'
  }, {
    location: 'before',
    text: 'Card Header'
  }, {
    location: 'after',
    widget: 'dxButton',
    options: {
      icon: 'edit',
      stylingMode: 'text'
    }
  }, {
    location: 'after',
    widget: 'dxButton',
    options: {
      icon: 'trash',
      stylingMode: 'text'
    }
  }],
  cover: {
    src: 'https://www.devexpress.com/support/demos/i/demo-thumbs/aspnetcore-grid.png',
    alt: 'Card Cover',
    className: 'card-cover'
  },
  hoverStateEnabled: true,
  maxWidth: 300,
  width: 300,
  minWidth: 300,
  selectCard: mockSelectCard.call.bind(mockSelectCard),
  onDblClick: mockOnDblClick.call.bind(mockOnDblClick),
  onClick: mockOnClick.call.bind(mockOnClick),
  onHold: mockOnHold.call.bind(mockOnHold)
};
(0, _globals.describe)('Events', () => {
  let container;
  // @ts-expect-error
  beforeEach(() => {
    container = document.createElement('div');
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, _extends({}, props, {
      elementRef: (0, _inferno.createRef)()
    })))), container);
  });
  (0, _globals.it)('should trigger onClick event', () => {
    const cardElement = container.querySelector(`.${_card.CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('click'));
    (0, _globals.expect)(mockOnClick.called).toBe(true);
  });
  _globals.it.skip('should trigger onDblClick event', () => {
    const cardElement = container.querySelector(`.${_card.CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('dblclick'));
    (0, _globals.expect)(mockOnDblClick.called).toBe(true);
  });
  (0, _globals.it)('should trigger onHold event', () => {
    const cardElement = container.querySelector(`.${_card.CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('dxhold'));
    (0, _globals.expect)(mockOnHold.called).toBe(true);
  });
  (0, _globals.it)('should trigger onHoverChanged event on mouse enter', () => {
    const mockHover = {
      called: false,
      fn: _ref => {
        let {
          isHovered
        } = _ref;
        mockHover.called = true;
        (0, _globals.expect)(isHovered).toBe(true);
      }
    };
    const newProps = _extends({}, props, {
      hoverStateEnabled: true,
      onHoverChanged: mockHover.fn
    });
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, newProps))), container);
    const cardElement = container.querySelector(`.${_card.CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('mouseenter'));
    (0, _globals.expect)(mockHover.called).toBe(true);
  });
  (0, _globals.it)('should trigger onHoverChanged event on mouse leave', () => {
    const mockHover = {
      called: false,
      fn: _ref2 => {
        let {
          isHovered
        } = _ref2;
        mockHover.called = true;
        (0, _globals.expect)(isHovered).toBe(false);
      }
    };
    const newProps = _extends({}, props, {
      hoverStateEnabled: true,
      onHoverChanged: mockHover.fn
    });
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, newProps))), container);
    const cardElement = container.querySelector(`.${_card.CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('mouseleave'));
    (0, _globals.expect)(mockHover.called).toBe(true);
  });
  (0, _globals.it)('should handle hoverStateEnabled prop correctly', () => {
    const cardElement = container.querySelector('.dx-cardview-card');
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('mouseenter'));
    const classList = (cardElement === null || cardElement === void 0 ? void 0 : cardElement.getAttribute('class')) || '';
    (0, _globals.expect)(classList).toContain('dx-cardview-card-hover');
  });
  (0, _globals.it)('should render field template correctly', () => {
    const fieldName = container.querySelector('.dx-cardview-field-caption');
    const fieldValue = container.querySelector('.dx-cardview-field-value');
    (0, _globals.expect)(fieldName === null || fieldName === void 0 ? void 0 : fieldName.textContent).toBe('Field:');
    (0, _globals.expect)(fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.textContent).toBe('devextreme');
  });
});
(0, _globals.describe)('Callbacks', () => {
  (0, _globals.describe)('selectCard', () => {
    // @ts-expect-errors
    beforeEach(() => {
      mockSelectCard.called = false;
    });
    (0, _globals.describe)('when allowSelectOnClick = true', () => {
      (0, _globals.it)('should rise it', () => {
        const container = document.createElement('div');
        const newProps = _extends({}, props, {
          elementRef: (0, _inferno.createRef)(),
          allowSelectOnClick: true
        });
        // @ts-expect-error
        (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, newProps))), container);
        const cardElement = container.querySelector(`.${_card.CLASSES.card}`);
        cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('click'));
        (0, _globals.expect)(mockSelectCard.called).toBe(true);
      });
    });
    (0, _globals.describe)('when allowSelectOnClick = false', () => {
      (0, _globals.it)('should not rise it', () => {
        const container = document.createElement('div');
        const newProps = _extends({}, props, {
          elementRef: (0, _inferno.createRef)(),
          allowSelectOnClick: false
        });
        // @ts-expect-error
        (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, newProps))), container);
        const cardElement = container.querySelector(`.${_card.CLASSES.card}`);
        cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('click'));
        (0, _globals.expect)(mockSelectCard.called).toBe(false);
      });
    });
  });
});
