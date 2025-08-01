/**
* DevExtreme (cjs/__internal/grids/new/grid_core/data_controller/deferred_cache.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _deferred = require("../../../../../core/utils/deferred");
var _deferred_cache = require("./deferred_cache");
// @ts-expect-error bad deferred ctor type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createDeferred = () => new _deferred.Deferred();
(0, _globals.describe)('DataController', () => {
  (0, _globals.describe)('DeferredCache', () => {
    (0, _globals.it)('should call origin fn on the first call', async () => {
      const originFn = _globals.jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      await decoratedFn();
      (0, _globals.expect)(originFn).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should pass arguments to origin fn', async () => {
      const originFnArgs = ['A', 1, true];
      const originFn = _globals.jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      await decoratedFn(...originFnArgs);
      (0, _globals.expect)(originFn).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(originFn).toHaveBeenCalledWith(...originFnArgs);
    });
    (0, _globals.it)('should not call origin fn and return cached result if origin args is void', async () => {
      const originFn = _globals.jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      await decoratedFn();
      await decoratedFn();
      await decoratedFn();
      (0, _globals.expect)(originFn).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should not call origin fn and return cached result if origin args the same', async () => {
      const originFnArgs = ['A', 1, true];
      const originFn = _globals.jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      await decoratedFn(...originFnArgs);
      await decoratedFn(...originFnArgs);
      await decoratedFn(...originFnArgs);
      (0, _globals.expect)(originFn).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should call origin fn if origin args changed', async () => {
      const firstArgs = ['A', 1, true];
      const secondArgs = ['B', 2, false];
      const originFn = _globals.jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      await decoratedFn(...firstArgs);
      await decoratedFn(...secondArgs);
      (0, _globals.expect)(originFn).toHaveBeenCalledTimes(2);
    });
    (0, _globals.it)('should return result from origin fn', async () => {
      const expectedResult = {
        a: 'A'
      };
      const originFn = _globals.jest.fn().mockImplementation(() => createDeferred().resolve(expectedResult));
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      const result = await decoratedFn();
      (0, _globals.expect)(result).toBe(expectedResult);
    });
    (0, _globals.it)('should return cached result if arguments is void', async () => {
      const expectedResult = {
        a: 'A'
      };
      const originFn = _globals.jest.fn().mockImplementation(() => createDeferred().resolve(expectedResult));
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      await decoratedFn();
      await decoratedFn();
      const result = await decoratedFn();
      (0, _globals.expect)(result).toBe(expectedResult);
    });
    (0, _globals.it)('should return cached result if arguments the same', async () => {
      const expectedResult = {
        a: 'A'
      };
      const originFnArgs = ['A', 1, true];
      const originFn = _globals.jest.fn().mockImplementation(() => createDeferred().resolve(expectedResult));
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      await decoratedFn(...originFnArgs);
      await decoratedFn(...originFnArgs);
      const result = await decoratedFn(...originFnArgs);
      (0, _globals.expect)(result).toBe(expectedResult);
    });
    (0, _globals.it)('should update cache value on each origin fn call', async () => {
      let callCounter = 0;
      const firstExpectedResult = {
        a: 'A'
      };
      const secondExpectedResult = {
        a: 'B'
      };
      const firstFnArgs = ['A', 1, true];
      const secondFnArgs = ['B', 2, false];
      const originFn = _globals.jest.fn().mockImplementation(() => {
        const result = callCounter === 0 ? firstExpectedResult : secondExpectedResult;
        callCounter += 1;
        return createDeferred().resolve(result);
      });
      const decoratedFn = (0, _deferred_cache.deferredCache)(originFn);
      await decoratedFn(...firstFnArgs);
      const firstResult = await decoratedFn(...firstFnArgs);
      await decoratedFn(...secondFnArgs);
      const secondResult = await decoratedFn(...secondFnArgs);
      (0, _globals.expect)(originFn).toHaveBeenCalledTimes(2);
      (0, _globals.expect)(firstResult).toBe(firstExpectedResult);
      (0, _globals.expect)(secondResult).toBe(secondExpectedResult);
    });
  });
});
