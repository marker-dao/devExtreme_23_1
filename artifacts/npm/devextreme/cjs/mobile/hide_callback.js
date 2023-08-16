/**
* DevExtreme (cjs/mobile/hide_callback.js)
* Version: 23.2.0
* Build date: Wed Aug 16 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.hideCallback = void 0;
var hideCallback = function () {
  var callbacks = [];
  return {
    add: function add(callback) {
      if (!callbacks.includes(callback)) {
        callbacks.push(callback);
      }
    },
    remove: function remove(callback) {
      var indexOfCallback = callbacks.indexOf(callback);
      if (indexOfCallback !== -1) {
        callbacks.splice(indexOfCallback, 1);
      }
    },
    fire: function fire() {
      var callback = callbacks.pop();
      var result = !!callback;
      if (result) {
        callback();
      }
      return result;
    },
    hasCallback: function hasCallback() {
      return callbacks.length > 0;
    }
  };
}();
exports.hideCallback = hideCallback;
