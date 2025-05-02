/**
* DevExtreme (cjs/__internal/grids/new/grid_core/core/events/native_event_listener.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeEventListener = void 0;
class NativeEventListener {
  constructor() {
    this.unsubscribeArray = [];
  }
  add(elementRef, eventName, eventHandler) {
    var _elementRef$current;
    (_elementRef$current = elementRef.current) === null || _elementRef$current === void 0 || _elementRef$current.addEventListener(eventName, eventHandler);
    this.unsubscribeArray.push(() => {
      var _elementRef$current2;
      (_elementRef$current2 = elementRef.current) === null || _elementRef$current2 === void 0 || _elementRef$current2.removeEventListener(eventName, eventHandler);
    });
    return this;
  }
  unsubscribe() {
    this.unsubscribeArray.forEach(fn => fn());
  }
}
exports.NativeEventListener = NativeEventListener;
