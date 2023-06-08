/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.column_headers.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _column_headers = require("../../__internal/grids/data_grid/module_not_extended/column_headers");
Object.keys(_column_headers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _column_headers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _column_headers[key];
    }
  });
});
