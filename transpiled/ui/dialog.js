"use strict";

Object.defineProperty(exports, "alert", {
  enumerable: true,
  get: function () {
    return _dialog.alert;
  }
});
Object.defineProperty(exports, "confirm", {
  enumerable: true,
  get: function () {
    return _dialog.confirm;
  }
});
Object.defineProperty(exports, "custom", {
  enumerable: true,
  get: function () {
    return _dialog.custom;
  }
});
var _dialog = require("../__internal/ui/dialog");