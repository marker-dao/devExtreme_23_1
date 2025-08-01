/**
* DevExtreme (esm/__internal/scheduler/utils/data_accessor/appointment_resource_data_accessor.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { getAppointmentResourceAccessor, getResourceIndex } from './appointment_resource_data_accessor';
describe('appointment resource data accessor', () => {
  describe('getResourceIndex', () => {
    it('should return resource index', () => {
      expect(getResourceIndex({
        fieldExpr: 'roomId'
      })).toBe('roomId');
      expect(getResourceIndex({
        field: 'roomId'
      })).toBe('roomId');
      expect(getResourceIndex({})).toBe('');
    });
  });
  describe('getAppointmentResourceAccessor', () => {
    const accessor = getAppointmentResourceAccessor({
      fieldExpr: 'roomId'
    });
    it('should get single ids', () => {
      expect(accessor.idsGetter({
        roomId: 1
      })).toEqual([1]);
    });
    it('should get multiple ids', () => {
      expect(accessor.idsGetter({
        roomId: [1, 2]
      })).toEqual([1, 2]);
    });
    it('should set ids', () => {
      const obj = {
        roomId: 1
      };
      accessor.idsSetter(obj, [1, 2]);
      expect(obj).toEqual({
        roomId: [1, 2]
      });
    });
  });
});
