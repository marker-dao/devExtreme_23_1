/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.filter_sync.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _filter_sync = require("../../__internal/grids/data_grid/module_not_extended/filter_sync");
Object.keys(_filter_sync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _filter_sync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filter_sync[key];
    }
  });
});
