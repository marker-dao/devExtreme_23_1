/**
* DevExtreme (cjs/__internal/grids/new/grid_core/content_view/index.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  View: true
};
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function () {
    return _view.ContentView;
  }
});
var _options = require("./options");
Object.keys(_options).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _options[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _options[key];
    }
  });
});
var _view = require("./view");
