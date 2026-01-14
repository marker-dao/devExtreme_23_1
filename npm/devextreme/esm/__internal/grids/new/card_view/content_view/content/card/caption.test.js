/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/caption.test.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { describe, expect, it } from '@jest/globals';
import { render } from 'inferno';
import { Caption } from './caption';
describe('Content View', () => {
  describe('Caption', () => {
    it('should render title', () => {
      const container = document.createElement('div');
      const field = {
        column: {
          caption: 'TEST_TITLE'
        }
      };
      render(createComponentVNode(2, Caption, {
        "field": field
      }), container);
      expect(container).toMatchSnapshot();
    });
    it('should render template with title', () => {
      const container = document.createElement('div');
      const field = {
        column: {
          caption: 'TEST_TITLE'
        }
      };
      render(createComponentVNode(2, Caption, {
        "field": field,
        "template": _ref => {
          let {
            field
          } = _ref;
          return createVNode(1, "div", null, field.column.caption, 0, {
            "test-template": "true"
          });
        }
      }), container);
      expect(container).toMatchSnapshot();
    });
  });
});
