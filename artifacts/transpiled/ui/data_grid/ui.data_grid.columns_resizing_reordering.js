"use strict";

var _columns_resizing_reordering = require("../../__internal/grids/data_grid/module_not_extended/columns_resizing_reordering");
Object.keys(_columns_resizing_reordering).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _columns_resizing_reordering[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _columns_resizing_reordering[key];
    }
  });
});