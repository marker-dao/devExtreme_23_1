/**
* DevExtreme (bundles/__internal/grids/pivot_grid/remote_store/m_remote_store_utils.js)
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
var _default = {
  forEachGroup
};
exports.default = _default;