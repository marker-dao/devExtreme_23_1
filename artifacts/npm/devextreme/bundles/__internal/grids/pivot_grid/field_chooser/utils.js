/**
* DevExtreme (bundles/__internal/grids/pivot_grid/field_chooser/utils.js)
* Version: 23.2.0
* Build date: Thu Sep 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseSortOrder = void 0;
var _const = require("./const");
var reverseSortOrder = function reverseSortOrder(sortOrder) {
  return sortOrder === _const.SORT_ORDER.descending ? _const.SORT_ORDER.ascending : _const.SORT_ORDER.descending;
};
exports.reverseSortOrder = reverseSortOrder;
