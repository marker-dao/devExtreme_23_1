/**
* DevExtreme (cjs/events/swipe.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _swipe = require("../common/core/events/swipe");
Object.keys(_swipe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _swipe[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swipe[key];
    }
  });
});
