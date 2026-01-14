/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/header.test.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _header = require("./header");
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

(0, _globals.describe)('CardHeader', () => {
  (0, _globals.it)('should render with default properties', () => {
    const container = document.createElement('div');
    (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _header.CardHeader, {
      "card": {},
      "visible": true,
      "items": [{
        location: 'before',
        text: 'Test Header'
      }]
    }), container);
    // Verify the rendered element
    const header = container.querySelector(`.${_header.CLASSES.cardHeader}`);
    (0, _globals.expect)(header).not.toBeNull();
    // Verify the item text
    const headerItem = container.querySelector('.dx-toolbar-item');
    (0, _globals.expect)(headerItem).not.toBeNull();
    (0, _globals.expect)(headerItem === null || headerItem === void 0 ? void 0 : headerItem.textContent).toBe('Test Header');
  });
  (0, _globals.it)('should not render when visible is false', () => {
    const container = document.createElement('div');
    (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _header.CardHeader, {
      "card": {},
      "visible": false
    }), container);
    // Verify the header is not rendered
    const header = container.querySelector(_header.CLASSES.cardHeader);
    (0, _globals.expect)(header).toBeNull();
  });
  (0, _globals.it)('should render with caption from captionExpr', () => {
    const container = document.createElement('div');
    (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _header.CardHeader, {
      "visible": true,
      "captionExpr": "name",
      "card": {
        name: 'Card Title'
      }
    }), container);
    // Verify the caption text
    const captionItem = container.querySelector('.dx-toolbar-item');
    (0, _globals.expect)(captionItem).not.toBeNull();
    (0, _globals.expect)(captionItem === null || captionItem === void 0 ? void 0 : captionItem.textContent).toBe('Card Title');
  });
  (0, _globals.it)('should render with a custom template', () => {
    const container = document.createElement('div');
    const CustomTemplate = () => (0, _inferno.createVNode)(1, "div", "custom-header", "Custom Header", 16);
    (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _header.CardHeader, {
      "visible": true,
      "card": {},
      "template": CustomTemplate
    }), container);
    // Verify the custom template
    const customHeader = container.querySelector('.custom-header');
    (0, _globals.expect)(customHeader).not.toBeNull();
    (0, _globals.expect)(customHeader === null || customHeader === void 0 ? void 0 : customHeader.textContent).toBe('Custom Header');
  });
  (0, _globals.it)('should render a selection checkbox', () => {
    const container = document.createElement('div');
    (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _header.CardHeader, {
      "visible": true,
      "isCheckBoxesRendered": true,
      "card": {
        name: 'Card Title'
      }
    }), container);
    const checkboxItem = container.querySelector('.dx-cardview-select-checkbox');
    (0, _globals.expect)(checkboxItem).not.toBeNull();
  });
});
