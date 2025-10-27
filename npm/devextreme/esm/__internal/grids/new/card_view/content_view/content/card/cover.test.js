/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/cover.test.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode, normalizeProps } from "inferno";
import { describe, expect, it } from '@jest/globals';
import { render } from 'inferno';
import { Cover } from './cover';
describe('Cover', () => {
  it('should render the image correctly', () => {
    const container = document.createElement('div');
    const props = {
      imageSrc: 'https://www.devexpress.com/support/demos/i/demo-thumbs/aspnetcore-grid.png',
      alt: 'Card Cover',
      className: 'cover-image'
    };
    render(normalizeProps(createComponentVNode(2, Cover, _extends({
      "card": {}
    }, props))), container);
    const image = container.querySelector('img');
    expect(image).not.toBeNull();
    expect(image === null || image === void 0 ? void 0 : image.src).toBe(props.imageSrc);
    expect(image === null || image === void 0 ? void 0 : image.alt).toBe(props.alt);
    expect(image === null || image === void 0 ? void 0 : image.className).toContain(props.className);
  });
  describe('when there is no image', () => {
    it('should render image thumbnail', () => {
      const container = document.createElement('div');
      const props = {};
      render(normalizeProps(createComponentVNode(2, Cover, _extends({
        "card": {}
      }, props))), container);
      expect(container).toMatchSnapshot();
    });
  });
});
