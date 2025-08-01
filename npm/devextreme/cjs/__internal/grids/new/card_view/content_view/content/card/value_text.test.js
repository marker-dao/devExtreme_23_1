/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/value_text.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _value_text = require("./value_text");
(0, _globals.describe)('Content View', () => {
  (0, _globals.describe)('ValueText', () => {
    (0, _globals.it)('should set root classes', () => {
      const container = document.createElement('div');
      const field = {
        column: {
          alignment: 'center'
        },
        text: 'TEST',
        highlightedText: null
      };
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _value_text.ValueText, {
        "field": field
      }), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
    (0, _globals.it)('should add title attribute', () => {
      const container = document.createElement('div');
      const field = {
        column: {
          alignment: 'center'
        },
        text: 'TEST',
        highlightedText: null
      };
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _value_text.ValueText, {
        "field": field,
        "fieldHintEnabled": true
      }), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
    (0, _globals.it)('should render plain text if highlighted text is null', () => {
      const container = document.createElement('div');
      const field = {
        column: {
          alignment: 'center'
        },
        text: 'TEST_TEXT',
        highlightedText: null
      };
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _value_text.ValueText, {
        "field": field
      }), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
    (0, _globals.it)('should render highlighted text if passed', () => {
      const container = document.createElement('div');
      const field = {
        column: {
          alignment: 'center'
        },
        text: 'TEST_TEXT',
        highlightedText: [{
          type: 'usual',
          text: 'USUAL_PART '
        }, {
          type: 'highlighted',
          text: 'MATCH_PART'
        }, {
          type: 'usual',
          text: ' USUAL_PART'
        }]
      };
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _value_text.ValueText, {
        "field": field
      }), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
  });
});
