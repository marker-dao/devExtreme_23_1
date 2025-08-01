/**
* DevExtreme (cjs/common/core/environment.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "devices", {
  enumerable: true,
  get: function () {
    return _devices.default;
  }
});
Object.defineProperty(exports, "getTimeZones", {
  enumerable: true,
  get: function () {
    return _time_zone_utils.getTimeZones;
  }
});
Object.defineProperty(exports, "hideTopOverlay", {
  enumerable: true,
  get: function () {
    return _hide_top_overlay.default;
  }
});
Object.defineProperty(exports, "initMobileViewport", {
  enumerable: true,
  get: function () {
    return _init_mobile_viewport.default;
  }
});
var _devices = _interopRequireDefault(require("./environment/devices"));
var _hide_top_overlay = _interopRequireDefault(require("./environment/hide_top_overlay"));
var _init_mobile_viewport = _interopRequireDefault(require("./environment/init_mobile_viewport"));
var _time_zone_utils = require("./environment/time_zone_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
