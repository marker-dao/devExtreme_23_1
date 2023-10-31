/**
* DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/dom.js)
* Version: 23.2.0
* Build date: Tue Oct 31 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreKeyboardNavigationDom = void 0;
var _const = require("./const");
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const isDragCell = $cell => $cell.attr(_const.ATTRIBUTES.dragCell) !== undefined;
const getCellToFocus = ($cellElements, columnIndex) => $cellElements.filter("[".concat(_const.ATTRIBUTES.ariaColIndex, "=\"").concat(columnIndex + 1, "\"]:not([").concat(_const.ATTRIBUTES.dragCell, "])")).first();
const GridCoreKeyboardNavigationDom = {
  isDragCell,
  getCellToFocus
};
exports.GridCoreKeyboardNavigationDom = GridCoreKeyboardNavigationDom;
