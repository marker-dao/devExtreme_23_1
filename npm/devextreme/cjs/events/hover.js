/**
* DevExtreme (cjs/events/hover.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _hover = require("../common/core/events/hover");
Object.keys(_hover).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hover[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hover[key];
    }
  });
});
