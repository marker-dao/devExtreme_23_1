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