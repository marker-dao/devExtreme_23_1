"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _columns_controller = require("../../grid_core/columns_controller/columns_controller.mock");
var _item = require("./item");
const setup = props => {
  const rootElement = document.createElement('div');
  (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _item.Item, Object.assign({}, props))), rootElement);
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