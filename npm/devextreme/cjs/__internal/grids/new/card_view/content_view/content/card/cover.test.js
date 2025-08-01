/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/cover.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _cover = require("./cover");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(0, _globals.describe)('Cover', () => {
  (0, _globals.it)('should render the image correctly', () => {
    const container = document.createElement('div');
    const props = {
      imageSrc: 'https://www.devexpress.com/support/demos/i/demo-thumbs/aspnetcore-grid.png',
      alt: 'Card Cover',
      className: 'cover-image'
    };
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _cover.Cover, _extends({
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
      (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _cover.Cover, _extends({
        "card": {}
      }, props))), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
  });
});
