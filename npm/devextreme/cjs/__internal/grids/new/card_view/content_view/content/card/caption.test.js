/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/caption.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _caption = require("./caption");
(0, _globals.describe)('Content View', () => {
  (0, _globals.describe)('Caption', () => {
    (0, _globals.it)('should render title', () => {
      const container = document.createElement('div');
      const field = {
        column: {
          caption: 'TEST_TITLE'
        }
      };
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _caption.Caption, {
        "field": field
      }), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
    (0, _globals.it)('should render template with title', () => {
      const container = document.createElement('div');
      const field = {
        column: {
          caption: 'TEST_TITLE'
        }
      };
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _caption.Caption, {
        "field": field,
        "template": _ref => {
          let {
            field
          } = _ref;
          return (0, _inferno.createVNode)(1, "div", null, field.column.caption, 0, {
            "test-template": "true"
          });
        }
      }), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
  });
});
