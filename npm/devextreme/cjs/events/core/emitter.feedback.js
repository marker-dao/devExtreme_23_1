/**
* DevExtreme (cjs/events/core/emitter.feedback.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _emitter = require("../../common/core/events/core/emitter.feedback");
Object.keys(_emitter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _emitter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _emitter[key];
    }
  });
});
