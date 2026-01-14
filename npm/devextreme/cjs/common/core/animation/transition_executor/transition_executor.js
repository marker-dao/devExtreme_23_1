/**
* DevExtreme (cjs/common/core/animation/transition_executor/transition_executor.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _transition_executor = require("../../../../__internal/common/core/animation/transition_executor/transition_executor");
Object.keys(_transition_executor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transition_executor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transition_executor[key];
    }
  });
});
