"use strict";

var _exportNames = {
  FormatterConfig: true
};
Object.defineProperty(exports, "FormatterConfig", {
  enumerable: true,
  get: function () {
    return _number2.FormatterConfig;
  }
});
var _number = require("../../__internal/core/localization/ldml/number");
Object.keys(_number).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _number[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _number[key];
    }
  });
});
var _number2 = require("../../__internal/core/localization/number");