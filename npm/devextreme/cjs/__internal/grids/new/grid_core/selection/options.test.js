/**
* DevExtreme (cjs/__internal/grids/new/grid_core/selection/options.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _di = require("../di.test_utils");
var _items_controller = require("../items_controller/items_controller");
var _controller = require("../toolbar/controller");
var _controller2 = require("./controller");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const setup = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = (0, _di.getContext)(_extends({
    selection: {
      mode: 'single'
    }
  }, config));
  return {
    selectionController: context.get(_controller2.SelectionController),
    itemsController: context.get(_items_controller.ItemsController),
    toolbarController: context.get(_controller.ToolbarController)
  };
};
(0, _globals.describe)('Options', () => {
  (0, _globals.describe)('selectedCardKeys', () => {
    (0, _globals.describe)('when given', () => {
      (0, _globals.it)('should set the select state of the item', () => {
        const {
          itemsController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selectedCardKeys: [1]
        });
        (0, _globals.expect)(itemsController.items).toMatchSnapshot();
      });
    });
  });
  (0, _globals.describe)('selection', () => {
    (0, _globals.describe)('mode', () => {
      (0, _globals.describe)('when it is \'none\'', () => {
        (0, _globals.it)('selection should not work', () => {
          const {
            itemsController,
            selectionController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selection: {
              mode: 'none'
            }
          });
          selectionController.selectCards([1]);
          (0, _globals.expect)(itemsController.items).toMatchSnapshot();
        });
      });
      (0, _globals.describe)('when it is \'none\' and the selectedCardKeys is specified', () => {
        (0, _globals.it)('selection should not apply', () => {
          const {
            itemsController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selectedCardKeys: [1],
            selection: {
              mode: 'none'
            }
          });
          (0, _globals.expect)(itemsController.items).toMatchSnapshot();
        });
      });
    });
    (0, _globals.describe)('allowSelectAll', () => {
      (0, _globals.describe)('when it is true and selection mode is \'multiple\'', () => {
        (0, _globals.it)('selection should not work', () => {
          const {
            toolbarController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selection: {
              mode: 'multiple',
              allowSelectAll: true
            }
          });
          (0, _globals.expect)(toolbarController.items.peek()).toMatchSnapshot();
        });
      });
      (0, _globals.describe)('when it is false and selection mode is \'multiple\'', () => {
        (0, _globals.it)('selection should not work', () => {
          const {
            toolbarController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selection: {
              mode: 'multiple',
              allowSelectAll: false
            }
          });
          (0, _globals.expect)(toolbarController.items.peek()).toMatchSnapshot();
        });
      });
      (0, _globals.describe)('when it is true and selection mode isn\'t \'multiple\'', () => {
        (0, _globals.it)('selection should not work', () => {
          const {
            toolbarController
          } = setup({
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              value: 'test'
            }],
            selection: {
              mode: 'single',
              allowSelectAll: true
            }
          });
          (0, _globals.expect)(toolbarController.items.peek()).toMatchSnapshot();
        });
      });
    });
  });
});
