/**
* DevExtreme (cjs/data/query_implementation.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _query_implementation = require("../common/data/query_implementation");
Object.keys(_query_implementation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _query_implementation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _query_implementation[key];
    }
  });
});
