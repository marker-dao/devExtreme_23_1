/**
* DevExtreme (cjs/events/index.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "off", {
  enumerable: true,
  get: function () {
    return _events.off;
  }
});
Object.defineProperty(exports, "on", {
  enumerable: true,
  get: function () {
    return _events.on;
  }
});
Object.defineProperty(exports, "one", {
  enumerable: true,
  get: function () {
    return _events.one;
  }
});
Object.defineProperty(exports, "trigger", {
  enumerable: true,
  get: function () {
    return _events.trigger;
  }
});
Object.defineProperty(exports, "triggerHandler", {
  enumerable: true,
  get: function () {
    return _events2.triggerHandler;
  }
});
var _events = require("../common/core/events");
var _events2 = require("./events.types");
