/**
* DevExtreme (bundles/__internal/grids/data_grid/m_utils.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGroupFilter = createGroupFilter;
var _utils = require("../../../data/utils");
var _m_utils = _interopRequireDefault(require("../../grids/grid_core/m_utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error

function createGroupFilter(path, storeLoadOptions) {
  const groups = (0, _utils.normalizeSortingInfo)(storeLoadOptions.group);
  const filter = [];
  for (let i = 0; i < path.length; i++) {
    filter.push([groups[i].selector, '=', path[i]]);
  }
  if (storeLoadOptions.filter) {
    filter.push(storeLoadOptions.filter);
  }
  return _m_utils.default.combineFilters(filter);
}