/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/header.test.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { describe, expect, it } from '@jest/globals';
import { render } from 'inferno';
import { CardHeader, CLASSES } from './header';
describe('CardHeader', () => {
  it('should render with default properties', () => {
    const container = document.createElement('div');
    render(createComponentVNode(2, CardHeader, {
      "card": {},
      "visible": true,
      "items": [{
        location: 'before',
        text: 'Test Header'
      }]
    }), container);
    // Verify the rendered element
    const header = container.querySelector(`.${CLASSES.cardHeader}`);
    expect(header).not.toBeNull();
    // Verify the item text
    const headerItem = container.querySelector('.dx-toolbar-item');
    expect(headerItem).not.toBeNull();
    expect(headerItem === null || headerItem === void 0 ? void 0 : headerItem.textContent).toBe('Test Header');
  });
  it('should not render when visible is false', () => {
    const container = document.createElement('div');
    render(createComponentVNode(2, CardHeader, {
      "card": {},
      "visible": false
    }), container);
    // Verify the header is not rendered
    const header = container.querySelector(CLASSES.cardHeader);
    expect(header).toBeNull();
  });
  it('should render with caption from captionExpr', () => {
    const container = document.createElement('div');
    render(createComponentVNode(2, CardHeader, {
      "visible": true,
      "captionExpr": "name",
      "card": {
        name: 'Card Title'
      }
    }), container);
    // Verify the caption text
    const captionItem = container.querySelector('.dx-toolbar-item');
    expect(captionItem).not.toBeNull();
    expect(captionItem === null || captionItem === void 0 ? void 0 : captionItem.textContent).toBe('Card Title');
  });
  it('should render with a custom template', () => {
    const container = document.createElement('div');
    const CustomTemplate = () => createVNode(1, "div", "custom-header", "Custom Header", 16);
    render(createComponentVNode(2, CardHeader, {
      "visible": true,
      "card": {},
      "template": CustomTemplate
    }), container);
    // Verify the custom template
    const customHeader = container.querySelector('.custom-header');
    expect(customHeader).not.toBeNull();
    expect(customHeader === null || customHeader === void 0 ? void 0 : customHeader.textContent).toBe('Custom Header');
  });
  it('should render a selection checkbox', () => {
    const container = document.createElement('div');
    render(createComponentVNode(2, CardHeader, {
      "visible": true,
      "isCheckBoxesRendered": true,
      "card": {
        name: 'Card Title'
      }
    }), container);
    const checkboxItem = container.querySelector('.dx-cardview-select-checkbox');
    expect(checkboxItem).not.toBeNull();
  });
});
