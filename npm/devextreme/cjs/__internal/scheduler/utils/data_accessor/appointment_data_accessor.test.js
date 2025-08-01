/**
* DevExtreme (cjs/__internal/scheduler/utils/data_accessor/appointment_data_accessor.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _appointment_data_accessor = require("./appointment_data_accessor");
(0, _globals.describe)('AppointmentDataAccessor', () => {
  (0, _globals.it)('should get custom property', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      propExpr: 'prop'
    }, false);
    (0, _globals.expect)(dataAccessor.get('prop', {
      prop: 1
    })).toBe(1);
  });
  (0, _globals.it)('should set custom property', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      propExpr: 'prop'
    }, false);
    const obj = {
      prop: 1
    };
    dataAccessor.set('prop', obj, 2);
    (0, _globals.expect)(obj.prop).toBe(2);
  });
  (0, _globals.it)('should get custom property by alias', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      propExpr: 'alias'
    }, false);
    (0, _globals.expect)(dataAccessor.get('prop', {
      alias: 1
    })).toBe(1);
  });
  (0, _globals.it)('should set custom property by alias', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      propExpr: 'alias'
    }, false);
    const obj = {
      alias: 1
    };
    dataAccessor.set('prop', obj, 2);
    (0, _globals.expect)(obj.alias).toBe(2);
  });
  (0, _globals.it)('should get custom property by nested alias', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      propExpr: 'nested.alias'
    }, false);
    (0, _globals.expect)(dataAccessor.get('prop', {
      nested: {
        alias: 1
      }
    })).toBe(1);
  });
  (0, _globals.it)('should set custom property by nested alias', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      propExpr: 'nested.alias'
    }, false);
    const obj = {
      nested: {
        alias: 1
      }
    };
    dataAccessor.set('prop', obj, 2);
    (0, _globals.expect)(obj.nested.alias).toBe(2);
  });
  (0, _globals.it)('should get serialized date property', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      startDateExpr: 'startDate'
    }, true);
    (0, _globals.expect)(dataAccessor.get('startDate', {
      startDate: '2025/04/29'
    })).toEqual(new Date(2025, 3, 29));
  });
  (0, _globals.it)('should set serialized date as number', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      startDateExpr: 'startDate'
    }, true, 'number');
    const obj = {
      startDate: '2025-04-30T15:00:00.000Z'
    };
    dataAccessor.set('startDate', obj, new Date('2025-05-30T15:00:00.000Z'));
    (0, _globals.expect)(obj.startDate).toBe(1748617200000);
  });
  (0, _globals.it)('should set serialized date as in initial object', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      startDateExpr: 'startDate'
    }, true);
    const obj = {
      startDate: '2025/04/29'
    };
    dataAccessor.set('startDate', obj, new Date('2025-05-30T15:00:00.000Z'));
    (0, _globals.expect)(obj.startDate).toBe('2025/05/30');
  });
  (0, _globals.it)('should return correct access expression existence', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      startDateExpr: 'startDate'
    }, true);
    (0, _globals.expect)(dataAccessor.has('startDate')).toBe(true);
    (0, _globals.expect)(dataAccessor.has('endDate')).toBe(false);
  });
  (0, _globals.it)('should return date', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      startDateExpr: 'startDate',
      endDateExpr: 'endDate'
    }, true);
    const obj = {
      startDate: '2025-05-30T15:00:00.000Z',
      endDate: '2025-05-30T15:00:00.000Z'
    };
    (0, _globals.expect)(dataAccessor.get('startDate', obj)).toEqual(new Date('2025-05-30T15:00:00.000Z'));
    (0, _globals.expect)(dataAccessor.get('endDate', obj)).toEqual(new Date('2025-05-30T15:00:00.000Z'));
  });
  (0, _globals.it)('should return undefined for date fields', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      startDateExpr: 'startDate',
      endDateExpr: 'endDate'
    }, true);
    const obj = {};
    (0, _globals.expect)(dataAccessor.get('startDate', obj)).toBe(undefined);
    (0, _globals.expect)(dataAccessor.get('endDate', obj)).toBe(undefined);
  });
  (0, _globals.it)('should return boolean', () => {
    const dataAccessor = new _appointment_data_accessor.AppointmentDataAccessor({
      disabledExpr: 'disabled',
      allDayExpr: 'allDay'
    }, true);
    const obj = {};
    (0, _globals.expect)(dataAccessor.get('disabled', obj)).toBe(false);
    (0, _globals.expect)(dataAccessor.get('allDay', obj)).toBe(false);
  });
});
