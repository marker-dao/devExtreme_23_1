/**
* DevExtreme (cjs/__internal/grids/new/card_view/header_panel/item.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _columns_controller = require("../../grid_core/columns_controller/columns_controller.mock");
var _item = require("./item");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const setup = props => {
  const rootElement = document.createElement('div');
  (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _item.Item, _extends({}, props))), rootElement);
  return rootElement;
};
(0, _globals.describe)('Item', () => {
  (0, _globals.it)('should use column caption as text', () => {
    const el = setup({
      column: (0, _columns_controller.normalizeColumn)({
        dataField: 'my column data field',
        caption: 'my column caption'
      })
    });
    (0, _globals.expect)(el).toMatchSnapshot();
  });
  (0, _globals.it)('should render sort icons', () => {
    const el = setup({
      column: (0, _columns_controller.normalizeColumn)({
        dataField: 'column1',
        sortIndex: 0,
        sortOrder: 'asc'
      })
    });
    (0, _globals.expect)(el).toMatchSnapshot();
  });
  (0, _globals.it)('should render headerFilter icons if enabled', () => {
    const el = setup({
      column: (0, _columns_controller.normalizeColumn)({
        dataField: 'column1',
        allowHeaderFiltering: true
      })
    });
    (0, _globals.expect)(el).toMatchSnapshot();
  });
});
