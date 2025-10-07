/**
* DevExtreme (cjs/common/core/events/core/emitter.feedback.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_emitter = require("../../../../__internal/events/core/m_emitter.feedback");
Object.keys(_m_emitter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_emitter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_emitter[key];
    }
  });
});
