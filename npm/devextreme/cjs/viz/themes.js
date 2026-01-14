/**
* DevExtreme (cjs/viz/themes.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _themes = require("../__internal/viz/themes");
Object.keys(_themes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _themes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _themes[key];
    }
  });
});
