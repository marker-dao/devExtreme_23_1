/**
* DevExtreme (esm/__internal/scheduler/appointments/data_provider/utils/get_appointment_filter/is_appointment_matched_resources.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { ResourceLoader } from '../../../../utils/loader/resource_loader';
import { isAppointmentMatchedResources } from './is_appointment_matched_resources';
const assignee = new ResourceLoader({
  fieldExpr: 'assigneeId',
  allowMultiple: true,
  dataSource: [{
    id: 2
  }]
});
describe('isAppointmentMatchedResources', () => {
  it('should compare appointment with zero resources', async () => {
    await assignee.load();
    expect(isAppointmentMatchedResources({
      some: [2, 6]
    }, [])).toBe(true);
  });
  it('should compare appointment with one of the values in multi-resource', async () => {
    await assignee.load();
    expect(isAppointmentMatchedResources({
      [assignee.resourceIndex]: [2, 6]
    }, [assignee])).toBe(true);
  });
  it('should compare appointment without correct values in multi-resource', async () => {
    await assignee.load();
    expect(isAppointmentMatchedResources({
      [assignee.resourceIndex]: [4, 6]
    }, [assignee])).toBe(false);
  });
  it('should compare appointment with correct value', async () => {
    await assignee.load();
    expect(isAppointmentMatchedResources({
      [assignee.resourceIndex]: 2
    }, [assignee])).toBe(true);
  });
  it('should compare appointment without correct value', async () => {
    await assignee.load();
    expect(isAppointmentMatchedResources({
      [assignee.resourceIndex]: 6
    }, [assignee])).toBe(false);
  });
  it('should compare appointment without value', async () => {
    await assignee.load();
    expect(isAppointmentMatchedResources({}, [assignee])).toBe(false);
  });
});
