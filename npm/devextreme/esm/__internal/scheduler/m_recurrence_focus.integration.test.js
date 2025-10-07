/**
* DevExtreme (esm/__internal/scheduler/m_recurrence_focus.integration.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { createScheduler } from './__tests__/__mock__/create_scheduler';
import { setupSchedulerTestEnvironment } from './__tests__/__mock__/m_mock_scheduler';
describe('Recurrence focus restore', () => {
  afterEach(() => {
    jest.useRealTimers();
  });
  it('should restore focus on appointment after closing recurrence dialog and allow reopening with Enter', async () => {
    setupSchedulerTestEnvironment();
    const {
      POM,
      keydown
    } = await createScheduler({
      timeZone: 'Etc/UTC',
      dataSource: [{
        text: 'Recurring meeting',
        startDate: new Date('2021-02-02T09:00:00.000Z'),
        endDate: new Date('2021-02-02T10:00:00.000Z'),
        recurrenceRule: 'FREQ=DAILY'
      }],
      currentDate: new Date('2021-02-02T10:00:00.000Z')
    });
    jest.useFakeTimers();
    const appointment = POM.getAppointment('Recurring meeting');
    const appointmentEl = appointment.element;
    appointmentEl.focus();
    keydown(appointmentEl, 'Enter');
    POM.popup.getCloseButton().click();
    jest.runAllTimers();
    expect(appointmentEl.classList.contains('dx-state-focused')).toBe(true);
  });
});
