/**
* DevExtreme (cjs/localization/default_messages.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _default_messages = require("../__internal/core/localization/default_messages");
Object.keys(_default_messages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _default_messages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _default_messages[key];
    }
  });
});
