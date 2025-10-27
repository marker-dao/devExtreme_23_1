/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/split_by_recurrence/get_date_information.test.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _global_cache = require("../../../../global_cache");
var _get_date_information = require("./get_date_information");
const HOUR_MS = 3600000;
(0, _globals.describe)('findDSTOfDay', () => {
  (0, _globals.afterAll)(() => {
    _global_cache.globalCache.DST.clear();
  });
  (0, _globals.it)('should return no DST if interval has no DST', () => {
    (0, _globals.expect)((0, _get_date_information.findDSTOfDay)(Date.UTC(2025, 0, 1), 'America/Santiago')).toEqual([-Date.UTC(2025, 0, 1), -3 * HOUR_MS, -3 * HOUR_MS]);
  });
  (0, _globals.it)('should return summer DST in America/Santiago', () => {
    (0, _globals.expect)((0, _get_date_information.findDSTOfDay)(Date.UTC(2025, 3, 6), 'America/Santiago')).toEqual([Date.UTC(2025, 3, 6, 3), -3 * HOUR_MS, -4 * HOUR_MS]);
  });
  (0, _globals.it)('should return winter DST in America/Santiago', () => {
    (0, _globals.expect)((0, _get_date_information.findDSTOfDay)(Date.UTC(2025, 8, 7), 'America/Santiago')).toEqual([Date.UTC(2025, 8, 7, 4), -4 * HOUR_MS, -3 * HOUR_MS]);
  });
  (0, _globals.it)('should return summer DST in Canada/Pacific', () => {
    (0, _globals.expect)((0, _get_date_information.findDSTOfDay)(Date.UTC(2025, 2, 9, 10), 'Canada/Pacific')).toEqual([Date.UTC(2025, 2, 9, 10), -8 * HOUR_MS, -7 * HOUR_MS]);
  });
  (0, _globals.it)('should return winter DST in Canada/Pacific', () => {
    (0, _globals.expect)((0, _get_date_information.findDSTOfDay)(Date.UTC(2025, 10, 2), 'Canada/Pacific')).toEqual([Date.UTC(2025, 10, 2, 2) + 7 * HOUR_MS, -7 * HOUR_MS, -8 * HOUR_MS]);
  });
});
