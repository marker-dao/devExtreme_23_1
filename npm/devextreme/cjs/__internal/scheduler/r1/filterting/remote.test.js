/**
* DevExtreme (cjs/__internal/scheduler/r1/filterting/remote.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _remote = require("./remote");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(0, _globals.describe)('Remote filtering', () => {
  (0, _globals.describe)('combineRemoteFilter', () => {
    const FilterPosition = {
      dateFilter: 0,
      userFilter: 1
    };
    const defaultDataAccessors = {
      expr: {
        startDateExpr: 'startDate',
        endDateExpr: 'endDate'
      }
    };
    const dateFilter = [[['endDate', '>=', new Date(2021, 10, 23)], ['startDate', '<', new Date(2021, 10, 24)]], 'or', [['endDate', new Date(2021, 10, 23)], ['startDate', new Date(2021, 10, 23)]]];
    const userFilter = ['startDate', '>', new Date(2021, 10, 23, 15, 25)];
    (0, _globals.it)('should return correct filter', () => {
      const combinedFilter = (0, _remote.combineRemoteFilter)({
        dataAccessors: defaultDataAccessors,
        dateSerializationFormat: '',
        min: new Date(2021, 10, 23, 15, 15),
        max: new Date(2021, 10, 23, 16, 16)
      });
      (0, _globals.expect)(combinedFilter).toHaveLength(1);
      (0, _globals.expect)(combinedFilter[FilterPosition.dateFilter]).toEqual(dateFilter);
    });
    (0, _globals.it)('should return correct filter if recurrenceRuleExpr', () => {
      const combinedFilter = (0, _remote.combineRemoteFilter)({
        dataAccessors: {
          expr: _extends({}, defaultDataAccessors.expr, {
            recurrenceRuleExpr: 'recurrenceRule'
          })
        },
        dateSerializationFormat: '',
        min: new Date(2021, 10, 23, 15, 15),
        max: new Date(2021, 10, 23, 16, 16)
      });
      (0, _globals.expect)(combinedFilter).toHaveLength(1);
      (0, _globals.expect)(combinedFilter[FilterPosition.dateFilter]).toEqual([[['endDate', '>=', new Date(2021, 10, 23)], ['startDate', '<', new Date(2021, 10, 24)]], 'or', ['recurrenceRule', 'startswith', 'freq'], 'or', [['endDate', new Date(2021, 10, 23)], ['startDate', new Date(2021, 10, 23)]]]);
    });
    (0, _globals.describe)('userFilter', () => {
      (0, _globals.it)('should return correct filter if userFilter is present', () => {
        const combinedFilter = (0, _remote.combineRemoteFilter)({
          dataAccessors: defaultDataAccessors,
          dataSourceFilter: ['startDate', '>', new Date(2021, 10, 23, 15, 25)],
          dateSerializationFormat: '',
          min: new Date(2021, 10, 23, 15, 15),
          max: new Date(2021, 10, 23, 16, 16)
        });
        (0, _globals.expect)(combinedFilter).toHaveLength(2);
        (0, _globals.expect)(combinedFilter[FilterPosition.dateFilter]).toEqual(dateFilter);
        (0, _globals.expect)(combinedFilter[FilterPosition.userFilter]).toEqual(userFilter);
      });
      (0, _globals.it)('should return correct filter if userFilter is present and dateSerializationFormat', () => {
        const combinedFilter = (0, _remote.combineRemoteFilter)({
          dataAccessors: defaultDataAccessors,
          dataSourceFilter: ['startDate', '>', new Date(2021, 10, 23, 15, 25)],
          dateSerializationFormat: 'yyyy',
          min: new Date(2021, 10, 23, 15, 15),
          max: new Date(2021, 10, 23, 16, 16)
        });
        (0, _globals.expect)(combinedFilter).toHaveLength(2);
        (0, _globals.expect)(combinedFilter[FilterPosition.dateFilter]).toEqual([[['endDate', '>=', '2021'], ['startDate', '<', '2021']], 'or', [['endDate', '2021'], ['startDate', '2021']]]);
        (0, _globals.expect)(combinedFilter[FilterPosition.userFilter]).toEqual(['startDate', '>', '2021']);
      });
      (0, _globals.it)('should return correct filter if userFilter is present and dateSerializationFormat and forceIsoDateString is false', () => {
        const combinedFilter = (0, _remote.combineRemoteFilter)({
          dataAccessors: defaultDataAccessors,
          dataSourceFilter: ['startDate', '>', new Date(2021, 10, 23, 15, 25)],
          min: new Date(2021, 10, 23, 15, 15),
          max: new Date(2021, 10, 23, 16, 16),
          dateSerializationFormat: 'yyyy-MM-dd',
          forceIsoDateParsing: false
        });
        (0, _globals.expect)(combinedFilter).toHaveLength(2);
        (0, _globals.expect)(combinedFilter[FilterPosition.dateFilter]).toEqual(dateFilter);
        (0, _globals.expect)(combinedFilter[FilterPosition.userFilter]).toEqual(userFilter);
      });
    });
    (0, _globals.describe)('dateFilter present', () => {
      (0, _globals.it)('should return correct filter if dateFilter is a part of the dataSourceFilter', () => {
        const combinedFilter = (0, _remote.combineRemoteFilter)({
          dataAccessors: defaultDataAccessors,
          dataSourceFilter: [dateFilter],
          dateSerializationFormat: '',
          min: new Date(2021, 10, 23, 15, 15),
          max: new Date(2021, 10, 23, 16, 16)
        });
        (0, _globals.expect)(combinedFilter).toHaveLength(1);
        (0, _globals.expect)(combinedFilter[FilterPosition.dateFilter]).toEqual(dateFilter);
      });
      (0, _globals.it)('should return correct filter if dataSourceFilter is equals to the dateFilter', () => {
        const combinedFilter = (0, _remote.combineRemoteFilter)({
          dataAccessors: defaultDataAccessors,
          dataSourceFilter: dateFilter,
          dateSerializationFormat: '',
          min: new Date(2021, 10, 23, 15, 15),
          max: new Date(2021, 10, 23, 16, 16)
        });
        (0, _globals.expect)(combinedFilter).toEqual([dateFilter]);
      });
    });
  });
});
