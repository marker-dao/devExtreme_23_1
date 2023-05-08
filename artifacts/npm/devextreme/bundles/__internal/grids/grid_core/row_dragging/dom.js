/**
* DevExtreme (bundles/__internal/grids/grid_core/row_dragging/dom.js)
* Version: 23.1.1
* Build date: Mon May 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreRowDraggingDom = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _module_utils = _interopRequireDefault(require("../module_utils"));
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-restricted-imports

var createHandleTemplateFunc = function createHandleTemplateFunc(addWidgetPrefix) {
  return function (container, options) {
    var $container = (0, _renderer.default)(container);
    $container.attr(_const.ATTRIBUTES.dragCell, '');
    if (options.rowType === 'data') {
      $container.addClass(_const.CLASSES.cellFocusDisabled);
      return (0, _renderer.default)('<span>').addClass(addWidgetPrefix(_const.CLASSES.handleIcon));
    }
    _module_utils.default.setEmptyText($container);
    return undefined;
  };
};
var GridCoreRowDraggingDom = {
  createHandleTemplateFunc: createHandleTemplateFunc
};
exports.GridCoreRowDraggingDom = GridCoreRowDraggingDom;
