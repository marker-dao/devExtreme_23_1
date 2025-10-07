/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtering/utils/get_appointment_filter/is_appointment_matched_resources.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _resource_loader = require("../../../../utils/loader/resource_loader");
var _is_appointment_matched_resources = require("./is_appointment_matched_resources");
const assignee = new _resource_loader.ResourceLoader({
  fieldExpr: 'assigneeId',
  allowMultiple: true,
  dataSource: [{
    id: 2
  }]
});
(0, _globals.describe)('isAppointmentMatchedResources', () => {
  (0, _globals.it)('should compare appointment with zero resources', async () => {
    await assignee.load();
    (0, _globals.expect)((0, _is_appointment_matched_resources.isAppointmentMatchedResources)({
      some: [2, 6]
    }, [])).toBe(true);
  });
  (0, _globals.it)('should compare appointment with one of the values in multi-resource', async () => {
    await assignee.load();
    (0, _globals.expect)((0, _is_appointment_matched_resources.isAppointmentMatchedResources)({
      [assignee.resourceIndex]: [2, 6]
    }, [assignee])).toBe(true);
  });
  (0, _globals.it)('should compare appointment without correct values in multi-resource', async () => {
    await assignee.load();
    (0, _globals.expect)((0, _is_appointment_matched_resources.isAppointmentMatchedResources)({
      [assignee.resourceIndex]: [4, 6]
    }, [assignee])).toBe(false);
  });
  (0, _globals.it)('should compare appointment with correct value', async () => {
    await assignee.load();
    (0, _globals.expect)((0, _is_appointment_matched_resources.isAppointmentMatchedResources)({
      [assignee.resourceIndex]: 2
    }, [assignee])).toBe(true);
  });
  (0, _globals.it)('should compare appointment without correct value', async () => {
    await assignee.load();
    (0, _globals.expect)((0, _is_appointment_matched_resources.isAppointmentMatchedResources)({
      [assignee.resourceIndex]: 6
    }, [assignee])).toBe(false);
  });
  (0, _globals.it)('should compare appointment without value', async () => {
    await assignee.load();
    (0, _globals.expect)((0, _is_appointment_matched_resources.isAppointmentMatchedResources)({}, [assignee])).toBe(false);
  });
});
