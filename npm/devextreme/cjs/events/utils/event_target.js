/**
* DevExtreme (cjs/events/utils/event_target.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _event_target = require("../../common/core/events/utils/event_target");
Object.keys(_event_target).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _event_target[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event_target[key];
    }
  });
});
