"use strict";

Object.defineProperty(exports, "Event", {
  enumerable: true,
  get: function () {
    return _events.Event;
  }
});
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
var _events = require("../../__internal/events/core/events");