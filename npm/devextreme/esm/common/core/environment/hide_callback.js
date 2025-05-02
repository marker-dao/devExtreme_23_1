/**
* DevExtreme (esm/common/core/environment/hide_callback.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const hideCallback = function () {
  let callbacks = [];
  return {
    add: function (callback) {
      if (!callbacks.includes(callback)) {
        callbacks.push(callback);
      }
    },
    remove: function (callback) {
      const indexOfCallback = callbacks.indexOf(callback);
      if (indexOfCallback !== -1) {
        callbacks.splice(indexOfCallback, 1);
      }
    },
    fire: function () {
      const callback = callbacks.pop();
      const result = !!callback;
      if (result) {
        callback();
      }
      return result;
    },
    hasCallback: function () {
      return callbacks.length > 0;
    }
  };
}();
