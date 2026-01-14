"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideCallback = exports.fireCallback = void 0;
// eslint-disable-next-line func-names
const hideCallback = exports.hideCallback = function () {
  let callbacks = [];
  return {
    add(callback) {
      if (!callbacks.includes(callback)) {
        callbacks.push(callback);
      }
    },
    remove(callback) {
      const indexOfCallback = callbacks.indexOf(callback);
      if (indexOfCallback !== -1) {
        callbacks.splice(indexOfCallback, 1);
      }
    },
    fire() {
      const callback = callbacks.pop();
      const result = !!callback;
      if (result) {
        callback();
      }
      return result;
    },
    hasCallback() {
      return callbacks.length > 0;
    }
  };
}();
const fireCallback = () => hideCallback.fire();
exports.fireCallback = fireCallback;