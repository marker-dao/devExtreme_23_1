/**
* DevExtreme (cjs/localization/ldml/number.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _number = require("../../common/core/localization/ldml/number");
Object.keys(_number).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _number[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _number[key];
    }
  });
});
