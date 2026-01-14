/**
* DevExtreme (cjs/localization/ldml/date.formatter.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _date = require("../../__internal/core/localization/ldml/date.formatter");
Object.keys(_date).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _date[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _date[key];
    }
  });
});
