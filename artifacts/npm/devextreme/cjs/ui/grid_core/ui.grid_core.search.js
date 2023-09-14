/**
* DevExtreme (cjs/ui/grid_core/ui.grid_core.search.js)
* Version: 23.2.0
* Build date: Thu Sep 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_search = require("../../__internal/grids/grid_core/search/m_search");
Object.keys(_m_search).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_search[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _m_search[key];
    }
  });
});
