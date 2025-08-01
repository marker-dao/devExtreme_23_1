/**
* DevExtreme (cjs/common/data/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _exportNames = {
  compileGetter: true,
  compileSetter: true
};
Object.defineProperty(exports, "compileGetter", {
  enumerable: true,
  get: function () {
    return _data.compileGetter;
  }
});
Object.defineProperty(exports, "compileSetter", {
  enumerable: true,
  get: function () {
    return _data.compileSetter;
  }
});
var _data = require("../../core/utils/data");
var _m_utils = require("../../__internal/data/m_utils");
Object.keys(_m_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _m_utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_utils[key];
    }
  });
});
