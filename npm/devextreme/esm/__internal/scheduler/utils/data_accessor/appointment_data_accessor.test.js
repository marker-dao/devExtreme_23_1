/**
* DevExtreme (esm/__internal/scheduler/utils/data_accessor/appointment_data_accessor.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { AppointmentDataAccessor } from './appointment_data_accessor';
describe('AppointmentDataAccessor', () => {
  it('should get custom property', () => {
    const dataAccessor = new AppointmentDataAccessor({
      propExpr: 'prop'
    }, false);
    expect(dataAccessor.get('prop', {
      prop: 1
    })).toBe(1);
  });
  it('should set custom property', () => {
    const dataAccessor = new AppointmentDataAccessor({
      propExpr: 'prop'
    }, false);
    const obj = {
      prop: 1
    };
    dataAccessor.set('prop', obj, 2);
    expect(obj.prop).toBe(2);
  });
  it('should get custom property by alias', () => {
    const dataAccessor = new AppointmentDataAccessor({
      propExpr: 'alias'
    }, false);
    expect(dataAccessor.get('prop', {
      alias: 1
    })).toBe(1);
  });
  it('should set custom property by alias', () => {
    const dataAccessor = new AppointmentDataAccessor({
      propExpr: 'alias'
    }, false);
    const obj = {
      alias: 1
    };
    dataAccessor.set('prop', obj, 2);
    expect(obj.alias).toBe(2);
  });
  it('should get custom property by nested alias', () => {
    const dataAccessor = new AppointmentDataAccessor({
      propExpr: 'nested.alias'
    }, false);
    expect(dataAccessor.get('prop', {
      nested: {
        alias: 1
      }
    })).toBe(1);
  });
  it('should set custom property by nested alias', () => {
    const dataAccessor = new AppointmentDataAccessor({
      propExpr: 'nested.alias'
    }, false);
    const obj = {
      nested: {
        alias: 1
      }
    };
    dataAccessor.set('prop', obj, 2);
    expect(obj.nested.alias).toBe(2);
  });
  it('should get serialized date property', () => {
    const dataAccessor = new AppointmentDataAccessor({
      startDateExpr: 'startDate'
    }, true);
    expect(dataAccessor.get('startDate', {
      startDate: '2025/04/29'
    })).toEqual(new Date(2025, 3, 29));
  });
  it('should set serialized date as number', () => {
    const dataAccessor = new AppointmentDataAccessor({
      startDateExpr: 'startDate'
    }, true, 'number');
    const obj = {
      startDate: '2025-04-30T15:00:00.000Z'
    };
    dataAccessor.set('startDate', obj, new Date('2025-05-30T15:00:00.000Z'));
    expect(obj.startDate).toBe(1748617200000);
  });
  it('should set serialized date as in initial object', () => {
    const dataAccessor = new AppointmentDataAccessor({
      startDateExpr: 'startDate'
    }, true);
    const obj = {
      startDate: '2025/04/29'
    };
    dataAccessor.set('startDate', obj, new Date('2025-05-30T15:00:00.000Z'));
    expect(obj.startDate).toBe('2025/05/30');
  });
  it('should return correct access expression existence', () => {
    const dataAccessor = new AppointmentDataAccessor({
      startDateExpr: 'startDate'
    }, true);
    expect(dataAccessor.has('startDate')).toBe(true);
    expect(dataAccessor.has('endDate')).toBe(false);
  });
  it('should return date', () => {
    const dataAccessor = new AppointmentDataAccessor({
      startDateExpr: 'startDate',
      endDateExpr: 'endDate'
    }, true);
    const obj = {
      startDate: '2025-05-30T15:00:00.000Z',
      endDate: '2025-05-30T15:00:00.000Z'
    };
    expect(dataAccessor.get('startDate', obj)).toEqual(new Date('2025-05-30T15:00:00.000Z'));
    expect(dataAccessor.get('endDate', obj)).toEqual(new Date('2025-05-30T15:00:00.000Z'));
  });
  it('should return undefined for date fields', () => {
    const dataAccessor = new AppointmentDataAccessor({
      startDateExpr: 'startDate',
      endDateExpr: 'endDate'
    }, true);
    const obj = {};
    expect(dataAccessor.get('startDate', obj)).toBe(undefined);
    expect(dataAccessor.get('endDate', obj)).toBe(undefined);
  });
  it('should return boolean', () => {
    const dataAccessor = new AppointmentDataAccessor({
      disabledExpr: 'disabled',
      allDayExpr: 'allDay'
    }, true);
    const obj = {};
    expect(dataAccessor.get('disabled', obj)).toBe(false);
    expect(dataAccessor.get('allDay', obj)).toBe(false);
  });
});
