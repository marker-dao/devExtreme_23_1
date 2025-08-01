/**
* DevExtreme (cjs/__internal/grids/pivot_grid/field_chooser/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseSortOrder = void 0;
var _const = require("./const");
const reverseSortOrder = sortOrder => sortOrder === _const.SORT_ORDER.descending ? _const.SORT_ORDER.ascending : _const.SORT_ORDER.descending;
exports.reverseSortOrder = reverseSortOrder;
