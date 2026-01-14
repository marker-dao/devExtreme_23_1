"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _cover = require("./cover");
(0, _globals.describe)('Cover', () => {
  (0, _globals.it)('should render the image correctly', () => {
    const container = document.createElement('div');
    const props = {
      imageSrc: 'https://www.devexpress.com/support/demos/i/demo-thumbs/aspnetcore-grid.png',
      alt: 'Card Cover',
      className: 'cover-image'
    };
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _cover.Cover, Object.assign({
      "card": {}
    }, props))), container);
    const image = container.querySelector('img');
    (0, _globals.expect)(image).not.toBeNull();
    (0, _globals.expect)(image === null || image === void 0 ? void 0 : image.src).toBe(props.imageSrc);
    (0, _globals.expect)(image === null || image === void 0 ? void 0 : image.alt).toBe(props.alt);
    (0, _globals.expect)(image === null || image === void 0 ? void 0 : image.className).toContain(props.className);
  });
  (0, _globals.describe)('when there is no image', () => {
    (0, _globals.it)('should render image thumbnail', () => {
      const container = document.createElement('div');
      const props = {};
      (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _cover.Cover, Object.assign({
        "card": {}
      }, props))), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
  });
});