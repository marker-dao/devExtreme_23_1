/**
* DevExtreme (cjs/__internal/scheduler/m_utils_time_zone.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _index = require("../scheduler/utils/index");
var _global_cache = require("./global_cache");
var _m_utils_time_zone = _interopRequireDefault(require("./m_utils_time_zone"));
var _timezone_list = _interopRequireDefault(require("./timezones/timezone_list"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultTimeZones = _timezone_list.default.value;
(0, _globals.describe)('timezone utils', () => {
  (0, _globals.beforeAll)(() => {
    _global_cache.globalCache.timezones.clear();
  });
  (0, _globals.describe)('calculateTimezoneByValue', () => {
    (0, _globals.it)('should cache the results', () => {
      _timezone_list.default.value.forEach(timezone => {
        _m_utils_time_zone.default.calculateTimezoneByValue(timezone);
      });
      _globals.jest.spyOn(Intl, 'DateTimeFormat');
      _timezone_list.default.value.forEach(timezone => {
        _m_utils_time_zone.default.calculateTimezoneByValue(timezone);
      });
      (0, _globals.expect)(_global_cache.globalCache.timezones.size).toBe(_timezone_list.default.value.length);
      (0, _globals.expect)(Intl.DateTimeFormat).toHaveBeenCalledTimes(0);
    });
  });
  (0, _globals.describe)('cacheTimeZones / getTimeZonesCache', () => {
    (0, _globals.beforeAll)(() => {
      _timezone_list.default.value = ['Etc/GMT+12', 'Etc/GMT+11'];
    });
    (0, _globals.afterAll)(() => {
      _timezone_list.default.value = defaultTimeZones;
    });
    (0, _globals.it)('should cache timezones only once and save into global variable', async () => {
      const mock = _globals.jest.spyOn(_index.macroTaskArray, 'map');
      (0, _globals.expect)(_m_utils_time_zone.default.getTimeZonesCache()).toEqual([]);
      await _m_utils_time_zone.default.cacheTimeZones();
      (0, _globals.expect)(_m_utils_time_zone.default.getTimeZonesCache()).toEqual([{
        id: 'Etc/GMT+12',
        title: '(GMT -12:00) Etc - GMT+12'
      }, {
        id: 'Etc/GMT+11',
        title: '(GMT -11:00) Etc - GMT+11'
      }]);
      await _m_utils_time_zone.default.cacheTimeZones();
      await _m_utils_time_zone.default.cacheTimeZones();
      (0, _globals.expect)(mock).toHaveBeenCalledTimes(1);
    });
  });
  (0, _globals.describe)('getTimeZones', () => {
    (0, _globals.it)('should return timezones with offsets of default timezones list', () => {
      _timezone_list.default.value = ['Etc/GMT+12', 'Etc/GMT+11'];
      (0, _globals.expect)(_m_utils_time_zone.default.getTimeZones(new Date('2025-04-23T10:00:00Z'))).toEqual([{
        id: 'Etc/GMT+12',
        title: '(GMT -12:00) Etc - GMT+12',
        offset: -12
      }, {
        id: 'Etc/GMT+11',
        title: '(GMT -11:00) Etc - GMT+11',
        offset: -11
      }]);
      _timezone_list.default.value = defaultTimeZones;
    });
    (0, _globals.it)('should return timezones with offsets of custom timezones list', () => {
      (0, _globals.expect)(_m_utils_time_zone.default.getTimeZones(new Date('2025-04-23T10:00:00Z'), ['Canada/Pacific'])).toEqual([{
        id: 'Canada/Pacific',
        title: '(GMT -07:00) Canada - Pacific',
        offset: -7
      }]);
    });
  });
});
