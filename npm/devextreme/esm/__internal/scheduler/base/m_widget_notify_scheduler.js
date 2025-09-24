/**
* DevExtreme (esm/__internal/scheduler/base/m_widget_notify_scheduler.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
export default NotifyScheduler;
