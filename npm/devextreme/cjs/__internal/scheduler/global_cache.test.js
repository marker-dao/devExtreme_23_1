/**
* DevExtreme (cjs/__internal/scheduler/global_cache.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _global_cache = require("./global_cache");
(0, _globals.describe)('global cache', () => {
  (0, _globals.it)('should be empty at initialization', () => {
    const cache = new _global_cache.Cache();
    (0, _globals.expect)(cache.size).toBe(0);
  });
  (0, _globals.it)('should get non-existed value', () => {
    const cache = new _global_cache.Cache();
    (0, _globals.expect)(cache.get('test0')).toBe(undefined);
  });
  (0, _globals.it)('should get existed value', () => {
    const cache = new _global_cache.Cache();
    cache.memo('test0', () => 'callbackValue');
    (0, _globals.expect)(cache.get('test0')).toBe('callbackValue');
  });
  (0, _globals.it)('should memo value', () => {
    const cache = new _global_cache.Cache();
    const valueCallback = _globals.jest.fn().mockReturnValue(1).mockReturnValueOnce(2);
    const memoValue = cache.memo('test', valueCallback);
    (0, _globals.expect)(cache.get('test')).toBe(memoValue);
    (0, _globals.expect)(cache.size).toBe(1);
  });
  (0, _globals.it)('should memo twice for deleted value', () => {
    const cache = new _global_cache.Cache();
    const valueCallback1 = _globals.jest.fn().mockReturnValue(1).mockReturnValueOnce(2);
    const valueCallback2 = _globals.jest.fn().mockReturnValue(1).mockReturnValueOnce(2);
    const memoValue1 = cache.memo('test1', valueCallback1);
    const memoValue2 = cache.memo('test2', valueCallback2);
    cache.delete('test1');
    (0, _globals.expect)(cache.size).toBe(1);
    (0, _globals.expect)(cache.memo('test1', valueCallback1)).not.toBe(memoValue1);
    (0, _globals.expect)(cache.memo('test2', valueCallback2)).toBe(memoValue2);
    (0, _globals.expect)(cache.size).toBe(2);
  });
  (0, _globals.it)('should delete existed value', () => {
    const cache = new _global_cache.Cache();
    cache.memo('test1', () => 'callbackValue1');
    cache.delete('test1');
    (0, _globals.expect)(cache.get('test1')).toBe(undefined);
    (0, _globals.expect)(cache.size).toBe(0);
  });
  (0, _globals.it)('should delete non-existed value', () => {
    const cache = new _global_cache.Cache();
    cache.memo('test1', () => 'callbackValue1');
    cache.memo('test2', () => 'callbackValue2');
    cache.delete('non-existed');
    (0, _globals.expect)(cache.size).toBe(2);
  });
  (0, _globals.it)('should clear all values', () => {
    const cache = new _global_cache.Cache();
    cache.memo('test0', () => 'callbackValue');
    cache.memo('test1', () => 'callbackValue');
    cache.clear();
    (0, _globals.expect)(cache.size).toBe(0);
  });
});
