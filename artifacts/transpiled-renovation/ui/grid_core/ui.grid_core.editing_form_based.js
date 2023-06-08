"use strict";

var _module_form_based = require("../../__internal/grids/grid_core/editing/module_form_based");
Object.keys(_module_form_based).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module_form_based[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module_form_based[key];
    }
  });
});