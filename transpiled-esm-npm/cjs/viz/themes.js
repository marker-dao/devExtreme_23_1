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