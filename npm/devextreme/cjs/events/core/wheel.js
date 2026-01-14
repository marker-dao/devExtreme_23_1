/**
* DevExtreme (cjs/events/core/wheel.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _wheel = require("../../common/core/events/core/wheel");
Object.keys(_wheel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _wheel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wheel[key];
    }
  });
});
