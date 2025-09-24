"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class NotifyScheduler {
  constructor(_ref) {
    let {
      scheduler
    } = _ref;
    this.scheduler = scheduler;
  }
  invoke(funcName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return this.scheduler.fire(funcName, ...args);
  }
}
var _default = exports.default = NotifyScheduler;