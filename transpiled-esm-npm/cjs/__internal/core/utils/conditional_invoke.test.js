"use strict";

var _globals = require("@jest/globals");
var _conditional_invoke = require("./conditional_invoke");
(0, _globals.describe)('invokeConditionally', () => {
  [false, true].forEach(isPromise => {
    [{
      cancelResult: false,
      expectedCallback: 'callback'
    }, {
      cancelResult: true,
      expectedCallback: 'cancelCallback'
    }].forEach(_ref => {
      let {
        cancelResult,
        expectedCallback
      } = _ref;
      (0, _globals.it)(`should invoke ${expectedCallback} (isPromise=${isPromise}, cancelResult=${cancelResult})`, async () => {
        const callback = _globals.jest.fn();
        const cancelCallback = _globals.jest.fn();
        (0, _conditional_invoke.invokeConditionally)(isPromise ? Promise.resolve(cancelResult) : cancelResult, callback, cancelCallback);
        await new Promise(process.nextTick);
        if (expectedCallback === 'callback') {
          (0, _globals.expect)(callback).toHaveBeenCalled();
          (0, _globals.expect)(cancelCallback).not.toHaveBeenCalled();
        } else {
          (0, _globals.expect)(cancelCallback).toHaveBeenCalled();
          (0, _globals.expect)(callback).not.toHaveBeenCalled();
        }
      });
    });
  });
  (0, _globals.it)('should invoke the callback when cancelResult is a rejected promise', async () => {
    const callback = _globals.jest.fn();
    const cancelCallback = _globals.jest.fn();
    (0, _conditional_invoke.invokeConditionally)(Promise.reject(new Error('test error')), callback, cancelCallback);
    await new Promise(process.nextTick);
    (0, _globals.expect)(cancelCallback).not.toHaveBeenCalled();
    (0, _globals.expect)(callback).toHaveBeenCalled();
  });
  (0, _globals.it)('should not throw when cancelCallback is undefined and cancelResult is true', () => {
    const callback = _globals.jest.fn();
    (0, _globals.expect)(() => (0, _conditional_invoke.invokeConditionally)(true, callback)).not.toThrow();
  });
});