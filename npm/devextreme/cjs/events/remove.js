/**
* DevExtreme (cjs/events/remove.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _remove = require("../common/core/events/remove");
Object.keys(_remove).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _remove[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _remove[key];
    }
  });
});
