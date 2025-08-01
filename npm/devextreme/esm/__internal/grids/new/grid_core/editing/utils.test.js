/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { describe, expect, it, jest } from '@jest/globals';
import { createPromise } from '../../../../core/utils/promise';
import { defaultSetFieldValue, PendingPromises } from './utils';
describe('defaultSetFieldValue', () => {
  it('should set value to dataField', () => {
    const newData = {};
    const value = 'some_value';
    const column = {
      dataField: 'some_field'
    };
    defaultSetFieldValue.call(column, newData, value, {});
    expect(newData).toEqual({
      some_field: 'some_value'
    });
  });
  describe('when column does not have dataField', () => {
    it('should not set change data', () => {
      const newData = {};
      const value = 'some_value';
      const column = {};
      defaultSetFieldValue.call(column, newData, value, {});
      expect(newData).toEqual({});
    });
  });
});
describe('PendingPromises', () => {
  it('should wait for all added promises', async () => {
    jest.useFakeTimers();
    const promises = new PendingPromises();
    const p1 = createPromise();
    const p2 = createPromise();
    const p3 = createPromise();
    promises.add(p1.promise);
    promises.add(p2.promise);
    promises.add(p3.promise);
    const overallPromise = promises.waitForAll();
    let flag = false;
    overallPromise.then(() => {
      flag = true;
    });
    p1.resolve();
    await jest.runAllTimersAsync();
    expect(flag).toBe(false);
    p2.resolve();
    await jest.runAllTimersAsync();
    expect(flag).toBe(false);
    p3.resolve();
    await jest.runAllTimersAsync();
    expect(flag).toBe(true);
  });
  it.skip('should not wait for promised added after waiting', async () => {
    // TODO: write test
  });
});
