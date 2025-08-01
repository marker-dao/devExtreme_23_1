/**
* DevExtreme (esm/__internal/grids/new/grid_core/data_controller/deferred_cache.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it, jest } from '@jest/globals';
import { Deferred } from '../../../../../core/utils/deferred';
import { deferredCache } from './deferred_cache';
// @ts-expect-error bad deferred ctor type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createDeferred = () => new Deferred();
describe('DataController', () => {
  describe('DeferredCache', () => {
    it('should call origin fn on the first call', async () => {
      const originFn = jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = deferredCache(originFn);
      await decoratedFn();
      expect(originFn).toHaveBeenCalledTimes(1);
    });
    it('should pass arguments to origin fn', async () => {
      const originFnArgs = ['A', 1, true];
      const originFn = jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = deferredCache(originFn);
      await decoratedFn(...originFnArgs);
      expect(originFn).toHaveBeenCalledTimes(1);
      expect(originFn).toHaveBeenCalledWith(...originFnArgs);
    });
    it('should not call origin fn and return cached result if origin args is void', async () => {
      const originFn = jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = deferredCache(originFn);
      await decoratedFn();
      await decoratedFn();
      await decoratedFn();
      expect(originFn).toHaveBeenCalledTimes(1);
    });
    it('should not call origin fn and return cached result if origin args the same', async () => {
      const originFnArgs = ['A', 1, true];
      const originFn = jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = deferredCache(originFn);
      await decoratedFn(...originFnArgs);
      await decoratedFn(...originFnArgs);
      await decoratedFn(...originFnArgs);
      expect(originFn).toHaveBeenCalledTimes(1);
    });
    it('should call origin fn if origin args changed', async () => {
      const firstArgs = ['A', 1, true];
      const secondArgs = ['B', 2, false];
      const originFn = jest.fn().mockImplementation(() => createDeferred().resolve());
      const decoratedFn = deferredCache(originFn);
      await decoratedFn(...firstArgs);
      await decoratedFn(...secondArgs);
      expect(originFn).toHaveBeenCalledTimes(2);
    });
    it('should return result from origin fn', async () => {
      const expectedResult = {
        a: 'A'
      };
      const originFn = jest.fn().mockImplementation(() => createDeferred().resolve(expectedResult));
      const decoratedFn = deferredCache(originFn);
      const result = await decoratedFn();
      expect(result).toBe(expectedResult);
    });
    it('should return cached result if arguments is void', async () => {
      const expectedResult = {
        a: 'A'
      };
      const originFn = jest.fn().mockImplementation(() => createDeferred().resolve(expectedResult));
      const decoratedFn = deferredCache(originFn);
      await decoratedFn();
      await decoratedFn();
      const result = await decoratedFn();
      expect(result).toBe(expectedResult);
    });
    it('should return cached result if arguments the same', async () => {
      const expectedResult = {
        a: 'A'
      };
      const originFnArgs = ['A', 1, true];
      const originFn = jest.fn().mockImplementation(() => createDeferred().resolve(expectedResult));
      const decoratedFn = deferredCache(originFn);
      await decoratedFn(...originFnArgs);
      await decoratedFn(...originFnArgs);
      const result = await decoratedFn(...originFnArgs);
      expect(result).toBe(expectedResult);
    });
    it('should update cache value on each origin fn call', async () => {
      let callCounter = 0;
      const firstExpectedResult = {
        a: 'A'
      };
      const secondExpectedResult = {
        a: 'B'
      };
      const firstFnArgs = ['A', 1, true];
      const secondFnArgs = ['B', 2, false];
      const originFn = jest.fn().mockImplementation(() => {
        const result = callCounter === 0 ? firstExpectedResult : secondExpectedResult;
        callCounter += 1;
        return createDeferred().resolve(result);
      });
      const decoratedFn = deferredCache(originFn);
      await decoratedFn(...firstFnArgs);
      const firstResult = await decoratedFn(...firstFnArgs);
      await decoratedFn(...secondFnArgs);
      const secondResult = await decoratedFn(...secondFnArgs);
      expect(originFn).toHaveBeenCalledTimes(2);
      expect(firstResult).toBe(firstExpectedResult);
      expect(secondResult).toBe(secondExpectedResult);
    });
  });
});
