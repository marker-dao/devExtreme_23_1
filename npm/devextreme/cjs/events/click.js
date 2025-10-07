/**
* DevExtreme (cjs/events/click.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _click = require("../common/core/events/click");
Object.keys(_click).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _click[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _click[key];
    }
  });
});
