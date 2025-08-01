/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/card.events.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _card = require("./card");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
