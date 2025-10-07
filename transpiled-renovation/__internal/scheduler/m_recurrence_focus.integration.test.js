"use strict";

var _globals = require("@jest/globals");
var _create_scheduler = require("./__tests__/__mock__/create_scheduler");
var _m_mock_scheduler = require("./__tests__/__mock__/m_mock_scheduler");
(0, _globals.describe)('Recurrence focus restore', () => {
  (0, _globals.afterEach)(() => {
    _globals.jest.useRealTimers();
  });
  (0, _globals.it)('should restore focus on appointment after closing recurrence dialog and allow reopening with Enter', async () => {
    (0, _m_mock_scheduler.setupSchedulerTestEnvironment)();
    const {
      POM,
      keydown
    } = await (0, _create_scheduler.createScheduler)({
      timeZone: 'Etc/UTC',
      dataSource: [{
        text: 'Recurring meeting',
        startDate: new Date('2021-02-02T09:00:00.000Z'),
        endDate: new Date('2021-02-02T10:00:00.000Z'),
        recurrenceRule: 'FREQ=DAILY'
      }],
      currentDate: new Date('2021-02-02T10:00:00.000Z')
    });
    _globals.jest.useFakeTimers();
    const appointment = POM.getAppointment('Recurring meeting');
    const appointmentEl = appointment.element;
    appointmentEl.focus();
    keydown(appointmentEl, 'Enter');
    POM.popup.getCloseButton().click();
    _globals.jest.runAllTimers();
    (0, _globals.expect)(appointmentEl.classList.contains('dx-state-focused')).toBe(true);
  });
});