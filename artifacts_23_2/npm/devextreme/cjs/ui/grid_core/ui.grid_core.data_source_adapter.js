/**
* DevExtreme (cjs/ui/grid_core/ui.grid_core.data_source_adapter.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_data_source_adapter = require("../../__internal/grids/grid_core/data_source_adapter/m_data_source_adapter");
Object.keys(_m_data_source_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_data_source_adapter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_data_source_adapter[key];
    }
  });
});
