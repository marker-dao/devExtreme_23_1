/**
* DevExtreme (cjs/__internal/grids/pivot_grid/remote_store/m_remote_store_utils.js)
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
exports.forEachGroup = exports.default = void 0;
const forEachGroup = function (data, callback, level) {
  data = data || [];
  level = level || 0;
  for (let i = 0; i < data.length; i += 1) {
    const group = data[i];
    callback(group, level);
    if (group && group.items && group.items.length) {
      forEachGroup(group.items, callback, level + 1);
    }
  }
};
exports.forEachGroup = forEachGroup;
var _default = exports.default = {
  forEachGroup
};
