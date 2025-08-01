/**
* DevExtreme (cjs/__internal/grids/new/grid_core/keyboard_navigation/index.js)
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
var _exportNames = {
  KeyboardNavigationController: true,
  KbnFocusTrap: true,
  KbnNavigationContainer: true,
  defaultOptions: true,
  withKeyDownHandler: true,
  withKbnNavigationItem: true
};
Object.defineProperty(exports, "KbnFocusTrap", {
  enumerable: true,
  get: function () {
    return _kbn_focus_trap.KbnFocusTrap;
  }
});
Object.defineProperty(exports, "KbnNavigationContainer", {
  enumerable: true,
  get: function () {
    return _kbn_navigation_container.KbnNavigationContainer;
  }
});
Object.defineProperty(exports, "KeyboardNavigationController", {
  enumerable: true,
  get: function () {
    return _controller.KeyboardNavigationController;
  }
});
Object.defineProperty(exports, "defaultOptions", {
  enumerable: true,
  get: function () {
    return _options.defaultOptions;
  }
});
Object.defineProperty(exports, "withKbnNavigationItem", {
  enumerable: true,
  get: function () {
    return _with_navigation_item.withKbnNavigationItem;
  }
});
Object.defineProperty(exports, "withKeyDownHandler", {
  enumerable: true,
  get: function () {
    return _with_key_down_handler.withKeyDownHandler;
  }
});
var _controller = require("./controller");
var _kbn_focus_trap = require("./kbn_focus_trap");
var _kbn_navigation_container = require("./kbn_navigation_container");
var _index = require("./navigation_strategy/index");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
var _options = require("./options");
var _with_key_down_handler = require("./with_key_down_handler");
var _with_navigation_item = require("./with_navigation_item");
