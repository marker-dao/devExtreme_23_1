/**
* DevExtreme (cjs/localization/cldr-data/en.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _en = require("../../__internal/core/localization/cldr-data/en");
Object.keys(_en).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _en[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _en[key];
    }
  });
});
