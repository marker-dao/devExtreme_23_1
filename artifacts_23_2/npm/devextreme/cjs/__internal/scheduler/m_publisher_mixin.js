/**
* DevExtreme (cjs/__internal/scheduler/m_publisher_mixin.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const publisherMixin = {
  notifyObserver(subject, args) {
    const observer = this.option('observer');
    if (observer) {
      observer.fire(subject, args);
    }
  },
  invoke() {
    const observer = this.option('observer');
    if (observer) {
      return observer.fire.apply(observer, arguments);
    }
  }
};
var _default = publisherMixin;
exports.default = _default;