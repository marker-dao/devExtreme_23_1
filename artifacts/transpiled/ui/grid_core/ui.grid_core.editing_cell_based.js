"use strict";

var _module_cell_based = require("../../__internal/grids/grid_core/editing/module_cell_based");
Object.keys(_module_cell_based).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module_cell_based[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module_cell_based[key];
    }
  });
});