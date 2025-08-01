/**
* DevExtreme (esm/__internal/scheduler/utils/appointment_adapter/appointment_adapter.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { mockFieldExpressions } from '../../../scheduler/__mock__/appointment_data_accessor.mock';
import { createTimeZoneCalculator } from '../../r1/timezone_calculator';
import { AppointmentDataAccessor } from '../data_accessor/appointment_data_accessor';
import { AppointmentAdapter } from './appointment_adapter';
const mockCalculator = createTimeZoneCalculator('America/Los_Angeles');
const mockAppointmentDataAccessor = new AppointmentDataAccessor(mockFieldExpressions, true, 'yyyy/MM/dd HH:mm:ss');
describe('AppointmentAdapter', () => {
  describe('duration', () => {
    it('should return duration between startDate and endDate', () => {
      const now = Date.now();
      const adapter = new AppointmentAdapter({
        startDate: now,
        endDate: now + 3600000
      }, mockAppointmentDataAccessor);
      expect(adapter.duration).toBe(3600000);
    });
    it('should return 0 if endDate unavailable', () => {
      const adapter = new AppointmentAdapter({
        startDate: new Date()
      }, mockAppointmentDataAccessor);
      expect(adapter.duration).toBe(0);
    });
  });
  describe('isRecurrent', () => {
    it('should return true if recurrence rule is correct', () => {
      const adapter = new AppointmentAdapter({
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,SA'
      }, mockAppointmentDataAccessor);
      expect(adapter.isRecurrent).toBe(true);
    });
    it('should return false if recurrence rule is incorrect', () => {
      const adapter = new AppointmentAdapter({
        recurrenceRule: 'Broken'
      }, mockAppointmentDataAccessor);
      expect(adapter.isRecurrent).toBe(false);
    });
    it('should return true if recurrence rule is not defined', () => {
      const adapter = new AppointmentAdapter({}, mockAppointmentDataAccessor);
      expect(adapter.isRecurrent).toBe(false);
    });
  });
  describe('clone', () => {
    it('should clone appointment', () => {
      const appointment = {};
      const adapter = new AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      const nextAdapter = adapter.clone();
      nextAdapter.allDay = true;
      nextAdapter.text = 'Text';
      expect(appointment).toBe(appointment);
      expect(nextAdapter.source).toEqual({
        allDay: true,
        text: 'Text'
      });
    });
  });
  describe('serialize', () => {
    it('should serialize appointment dates', () => {
      const appointment = {
        startDate: new Date(2000, 0, 5).getTime(),
        endDate: new Date(2000, 0, 7).getTime()
      };
      const adapter = new AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      adapter.serialize();
      expect(adapter.source).toEqual({
        startDate: '2000/01/05 00:00:00',
        endDate: '2000/01/07 00:00:00'
      });
      expect(appointment).toBe(adapter.source);
    });
  });
  describe('getCalculatedDates', () => {
    it('should return calculate dates', () => {
      const appointment = {
        startDate: Date.UTC(2000, 1, 5, 12),
        endDate: Date.UTC(2000, 1, 7, 9)
      };
      const adapter = new AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      expect(adapter.getCalculatedDates(mockCalculator, 'toGrid')).toEqual({
        startDate: new Date(2000, 1, 5, 4),
        endDate: new Date(2000, 1, 7, 1)
      });
    });
    it('should return calculate dates of different timezones', () => {
      const appointment = {
        startDate: Date.UTC(2020, 1, 4, 5),
        startDateTimeZone: 'Europe/Moscow',
        endDateTimeZone: 'Asia/Yekaterinburg',
        endDate: Date.UTC(2020, 1, 4, 6)
      };
      const adapter = new AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      expect(adapter.getCalculatedDates(mockCalculator, 'toGrid')).toEqual({
        startDate: new Date(2020, 1, 3, 21),
        endDate: new Date(2020, 1, 3, 22)
      });
    });
  });
  describe('calculateDates', () => {
    it('should calculate dates', () => {
      const appointment = {
        startDate: Date.UTC(2000, 1, 5, 12),
        endDate: Date.UTC(2000, 1, 7, 9)
      };
      const adapter = new AppointmentAdapter(appointment, mockAppointmentDataAccessor);
      adapter.calculateDates(mockCalculator, 'toGrid');
      expect(adapter.source).toEqual({
        startDate: '2000/02/05 04:00:00',
        endDate: '2000/02/07 01:00:00'
      });
      expect(appointment).toBe(adapter.source);
    });
  });
});
