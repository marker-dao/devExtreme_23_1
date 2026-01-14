/**
* DevExtreme (esm/__internal/core/environment/hide_callback.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line func-names
export const hideCallback = function () {
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
export const fireCallback = () => hideCallback.fire();
