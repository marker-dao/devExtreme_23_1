/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/card.events.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode, normalizeProps } from "inferno";
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/init-declarations */
import { describe, expect, it } from '@jest/globals';
import { createRef, render } from 'inferno';
import { Card, CLASSES } from './card';
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
describe('Events', () => {
  let container;
  // @ts-expect-error
  beforeEach(() => {
    container = document.createElement('div');
    // @ts-expect-error
    render(normalizeProps(createComponentVNode(2, Card, _extends({}, _extends({}, props, {
      elementRef: createRef()
    })))), container);
  });
  it('should trigger onClick event', () => {
    const cardElement = container.querySelector(`.${CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('click'));
    expect(mockOnClick.called).toBe(true);
  });
  it.skip('should trigger onDblClick event', () => {
    const cardElement = container.querySelector(`.${CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('dblclick'));
    expect(mockOnDblClick.called).toBe(true);
  });
  it('should trigger onHold event', () => {
    const cardElement = container.querySelector(`.${CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('dxhold'));
    expect(mockOnHold.called).toBe(true);
  });
  it('should trigger onHoverChanged event on mouse enter', () => {
    const mockHover = {
      called: false,
      fn: _ref => {
        let {
          isHovered
        } = _ref;
        mockHover.called = true;
        expect(isHovered).toBe(true);
      }
    };
    const newProps = _extends({}, props, {
      hoverStateEnabled: true,
      onHoverChanged: mockHover.fn
    });
    // @ts-expect-error
    render(normalizeProps(createComponentVNode(2, Card, _extends({}, newProps))), container);
    const cardElement = container.querySelector(`.${CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('mouseenter'));
    expect(mockHover.called).toBe(true);
  });
  it('should trigger onHoverChanged event on mouse leave', () => {
    const mockHover = {
      called: false,
      fn: _ref2 => {
        let {
          isHovered
        } = _ref2;
        mockHover.called = true;
        expect(isHovered).toBe(false);
      }
    };
    const newProps = _extends({}, props, {
      hoverStateEnabled: true,
      onHoverChanged: mockHover.fn
    });
    // @ts-expect-error
    render(normalizeProps(createComponentVNode(2, Card, _extends({}, newProps))), container);
    const cardElement = container.querySelector(`.${CLASSES.card}`);
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('mouseleave'));
    expect(mockHover.called).toBe(true);
  });
  it('should handle hoverStateEnabled prop correctly', () => {
    const cardElement = container.querySelector('.dx-cardview-card');
    cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('mouseenter'));
    const classList = (cardElement === null || cardElement === void 0 ? void 0 : cardElement.getAttribute('class')) || '';
    expect(classList).toContain('dx-cardview-card-hover');
  });
  it('should render field template correctly', () => {
    const fieldName = container.querySelector('.dx-cardview-field-caption');
    const fieldValue = container.querySelector('.dx-cardview-field-value');
    expect(fieldName === null || fieldName === void 0 ? void 0 : fieldName.textContent).toBe('Field:');
    expect(fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.textContent).toBe('devextreme');
  });
});
describe('Callbacks', () => {
  describe('selectCard', () => {
    // @ts-expect-errors
    beforeEach(() => {
      mockSelectCard.called = false;
    });
    describe('when allowSelectOnClick = true', () => {
      it('should rise it', () => {
        const container = document.createElement('div');
        const newProps = _extends({}, props, {
          elementRef: createRef(),
          allowSelectOnClick: true
        });
        // @ts-expect-error
        render(normalizeProps(createComponentVNode(2, Card, _extends({}, newProps))), container);
        const cardElement = container.querySelector(`.${CLASSES.card}`);
        cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('click'));
        expect(mockSelectCard.called).toBe(true);
      });
    });
    describe('when allowSelectOnClick = false', () => {
      it('should not rise it', () => {
        const container = document.createElement('div');
        const newProps = _extends({}, props, {
          elementRef: createRef(),
          allowSelectOnClick: false
        });
        // @ts-expect-error
        render(normalizeProps(createComponentVNode(2, Card, _extends({}, newProps))), container);
        const cardElement = container.querySelector(`.${CLASSES.card}`);
        cardElement === null || cardElement === void 0 || cardElement.dispatchEvent(new MouseEvent('click'));
        expect(mockSelectCard.called).toBe(false);
      });
    });
  });
});
