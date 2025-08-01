/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _promise = require("../../../../core/utils/promise");
var _utils = require("./utils");
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

(0, _globals.describe)('defaultSetFieldValue', () => {
  (0, _globals.it)('should set value to dataField', () => {
    const newData = {};
    const value = 'some_value';
    const column = {
      dataField: 'some_field'
    };
    _utils.defaultSetFieldValue.call(column, newData, value, {});
    (0, _globals.expect)(newData).toEqual({
      some_field: 'some_value'
    });
  });
  (0, _globals.describe)('when column does not have dataField', () => {
    (0, _globals.it)('should not set change data', () => {
      const newData = {};
      const value = 'some_value';
      const column = {};
      _utils.defaultSetFieldValue.call(column, newData, value, {});
      (0, _globals.expect)(newData).toEqual({});
    });
  });
});
(0, _globals.describe)('PendingPromises', () => {
  (0, _globals.it)('should wait for all added promises', async () => {
    _globals.jest.useFakeTimers();
    const promises = new _utils.PendingPromises();
    const p1 = (0, _promise.createPromise)();
    const p2 = (0, _promise.createPromise)();
    const p3 = (0, _promise.createPromise)();
    promises.add(p1.promise);
    promises.add(p2.promise);
    promises.add(p3.promise);
    const overallPromise = promises.waitForAll();
    let flag = false;
    overallPromise.then(() => {
      flag = true;
    });
    p1.resolve();
    await _globals.jest.runAllTimersAsync();
    (0, _globals.expect)(flag).toBe(false);
    p2.resolve();
    await _globals.jest.runAllTimersAsync();
    (0, _globals.expect)(flag).toBe(false);
    p3.resolve();
    await _globals.jest.runAllTimersAsync();
    (0, _globals.expect)(flag).toBe(true);
  });
  _globals.it.skip('should not wait for promised added after waiting', async () => {
    // TODO: write test
  });
});
