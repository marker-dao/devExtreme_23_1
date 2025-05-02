"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _controller = require("./controller");
Object.keys(_controller).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _controller[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _controller[key];
    }
  });
});
var _view = require("./view");
Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _view[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _view[key];
    }
  });
});