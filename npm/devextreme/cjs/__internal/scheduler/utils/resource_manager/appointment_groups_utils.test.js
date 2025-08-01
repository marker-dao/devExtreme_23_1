/**
* DevExtreme (cjs/__internal/scheduler/utils/resource_manager/appointment_groups_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _resourceManager = require("../../../scheduler/__mock__/resourceManager.mock");
var _appointment_groups_utils = require("./appointment_groups_utils");
(0, _globals.describe)('appointment groups utils', () => {
  (0, _globals.describe)('getResourceItemById', () => {
    (0, _globals.it)('should return resource item by id', () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_groups_utils.getResourceItemById)(manager.resourceById.assigneeId, 1)).toEqual(manager.resourceById.assigneeId.items[0]);
    });
    (0, _globals.it)('should return undefined for unreached item', () => {
      const manager = (0, _resourceManager.getResourceManagerMock)(_resourceManager.complexIdResourceMock);
      (0, _globals.expect)((0, _appointment_groups_utils.getResourceItemById)(manager.resources[0], {
        _value: 'guid-2'
      })).toEqual(manager.resources[0].items[1]);
    });
    (0, _globals.it)('should return resource item by complex id', () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_groups_utils.getResourceItemById)(manager.resourceById.assigneeId, 10)).toEqual(undefined);
    });
  });
  (0, _globals.describe)('getAppointmentGroupValues', () => {
    (0, _globals.it)('should return appointment group array values', () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_groups_utils.getAppointmentGroupValues)({
        assigneeId: [1, 2],
        roomId: 3,
        nested: {
          priorityId: 1
        }
      }, manager.resources)).toEqual({
        assigneeId: [1, 2],
        roomId: [3],
        'nested.priorityId': [1]
      });
    });
  });
  (0, _globals.describe)('getRawAppointmentGroupValues', () => {
    (0, _globals.it)('should return appointment group initial values', () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_groups_utils.getRawAppointmentGroupValues)({
        assigneeId: [1, 2],
        roomId: 3,
        nested: {
          priorityId: 1
        }
      }, manager.resources)).toEqual({
        assigneeId: [1, 2],
        roomId: 3,
        'nested.priorityId': 1
      });
    });
  });
  (0, _globals.describe)('getSafeGroupValues', () => {
    (0, _globals.it)('should return appointment group array values', () => {
      (0, _globals.expect)((0, _appointment_groups_utils.getSafeGroupValues)({
        assigneeId: [1, 2],
        roomId: 3,
        'nested.priorityId': 1
      })).toEqual({
        assigneeId: [1, 2],
        roomId: [3],
        'nested.priorityId': [1]
      });
    });
  });
  (0, _globals.describe)('getAppointmentResources', () => {
    (0, _globals.it)('should return appointment resource texts in order as in appointment', async () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      await manager.loadGroupResources(_resourceManager.resourceIndexesMock);
      (0, _globals.expect)((0, _appointment_groups_utils.getAppointmentResources)({
        assigneeId: [4, 1, 2],
        roomId: [2],
        'nested.priorityId': [1]
      }, manager.resourceById)).toEqual([{
        label: 'Assignee',
        values: ['Sandra Johnson', 'Samantha Bright', 'John Heart']
      }, {
        label: 'Room',
        values: ['Room 3']
      }, {
        label: 'Priority',
        values: ['Low Priority']
      }]);
    });
    (0, _globals.it)('label can be undefined if not specified', async () => {
      const manager = (0, _resourceManager.getResourceManagerMock)([{
        field: 'roomId',
        dataSource: _resourceManager.resourceItemsByIdMock.roomId,
        allowMultiple: true
      }]);
      await manager.loadGroupResources(_resourceManager.resourceIndexesMock);
      (0, _globals.expect)((0, _appointment_groups_utils.getAppointmentResources)({
        roomId: [2, 0]
      }, manager.resourceById)).toEqual([{
        label: undefined,
        values: ['Room 3', 'Room 1']
      }]);
    });
    (0, _globals.it)('should return appointment resource texts with complex ids', async () => {
      const manager = (0, _resourceManager.getResourceManagerMock)(_resourceManager.complexIdResourceMock);
      await manager.loadGroupResources(['ownerId']);
      (0, _globals.expect)((0, _appointment_groups_utils.getAppointmentResources)({
        ownerId: [{
          _value: 'guid-2'
        }, {
          _value: 'guid-3'
        }, {
          _value: 'guid-1'
        }]
      }, manager.resourceById)).toEqual([{
        label: undefined,
        values: ['two', 'three', 'one']
      }]);
    });
  });
  (0, _globals.describe)('setAppointmentGroupValues', () => {
    (0, _globals.it)('should set nothing', () => {
      const appointment = {
        something: 1
      };
      const manager = (0, _resourceManager.getResourceManagerMock)();
      (0, _appointment_groups_utils.setAppointmentGroupValues)(appointment, manager.resourceById, undefined);
      (0, _globals.expect)(appointment).toEqual(appointment);
    });
    (0, _globals.it)('should set appointment group values', () => {
      const appointment = {};
      const manager = (0, _resourceManager.getResourceManagerMock)();
      (0, _appointment_groups_utils.setAppointmentGroupValues)(appointment, manager.resourceById, {
        assigneeId: 1,
        roomId: 2,
        'nested.priorityId': 1
      });
      (0, _globals.expect)(appointment).toEqual({
        assigneeId: [1],
        roomId: 2,
        nested: {
          priorityId: 1
        }
      });
    });
  });
  (0, _globals.describe)('getAppointmentGroupIndex', () => {
    (0, _globals.it)('should return appointment group indexes', async () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      await manager.loadGroupResources(_resourceManager.resourceIndexesMock);
      (0, _globals.expect)((0, _appointment_groups_utils.getAppointmentGroupIndex)({
        assigneeId: [1, 2],
        roomId: [2],
        'nested.priorityId': [1]
      }, manager.groupsLeafs)).toEqual([2, 5]);
    });
  });
  (0, _globals.describe)('groupAppointmentsByGroupLeafs', () => {
    (0, _globals.it)('should return appointment grouped by leafs (rare appointments)', async () => {
      const appointments = [{
        assigneeId: [1],
        nested: {
          priorityId: 1
        }
      }];
      const manager = (0, _resourceManager.getResourceManagerMock)();
      await manager.loadGroupResources(['assigneeId', 'nested.priorityId']);
      (0, _globals.expect)((0, _appointment_groups_utils.groupAppointmentsByGroupLeafs)(manager.resourceById, manager.groupsLeafs, appointments)).toEqual([[appointments[0]], [], [], [], [], [], [], []]);
    });
    (0, _globals.it)('should return appointment grouped by leafs', async () => {
      const appointments = [{
        assigneeId: [1, 2],
        nested: {
          priorityId: 1
        }
      }, {
        assigneeId: [2],
        nested: {
          priorityId: 1
        }
      }, {
        assigneeId: [3, 4],
        nested: {
          priorityId: 2
        }
      }];
      const manager = (0, _resourceManager.getResourceManagerMock)();
      await manager.loadGroupResources(['assigneeId', 'nested.priorityId']);
      (0, _globals.expect)((0, _appointment_groups_utils.groupAppointmentsByGroupLeafs)(manager.resourceById, manager.groupsLeafs, appointments)).toEqual([[appointments[0]], [], [appointments[0], appointments[1]], [], [], [appointments[2]], [], [appointments[2]]]);
    });
    (0, _globals.it)('should return appointments for no grouping', () => {
      const appointments = [{
        assigneeId: [1, 2],
        nested: {
          priorityId: 1
        }
      }, {
        assigneeId: [2],
        nested: {
          priorityId: 1
        }
      }, {
        assigneeId: [3, 4],
        nested: {
          priorityId: 2
        }
      }];
      const manager = (0, _resourceManager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_groups_utils.groupAppointmentsByGroupLeafs)(manager.resourceById, manager.groupsLeafs, appointments)).toEqual([appointments]);
    });
  });
});
