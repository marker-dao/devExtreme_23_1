/**
* DevExtreme (esm/__internal/scheduler/utils/resource_manager/appointment_color_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { describe, expect, it } from '@jest/globals';
import { complexIdResourceMock, getResourceManagerMock, resourceConfigMock, resourceIndexesMock, resourceItemsByIdMock } from '../../../scheduler/__mock__/resourceManager.mock';
import { getAppointmentColor, getPaintedResource } from './appointment_color_utils';
const ownerFirstColor = '#cb2824';
const ownerSecondColor = '#cb7d7b';
const customResourceConfig = [{
  field: 'roomId',
  allowMultiple: true,
  dataSource: [{
    id: 1,
    text: 'Room 1',
    color: '#ff0000'
  }, {
    id: 2,
    text: 'Room 2',
    color: '#0000ff'
  }]
}, {
  fieldExpr: 'ownerId',
  allowMultiple: true,
  dataSource: [{
    id: 1,
    text: 'John',
    color: ownerFirstColor
  }, {
    id: 2,
    text: 'Mike',
    color: ownerSecondColor
  }]
}, {
  field: 'managerId',
  dataSource: [{
    id: 1,
    text: 'mr. Smith',
    color: '#CB6BB2'
  }, {
    id: 2,
    text: 'mr. Bale',
    color: '#CB289F'
  }]
}];
describe('appointment color utils', () => {
  describe('getPaintedResources', () => {
    it('should return useColorAsDefault resource', () => {
      const manager = getResourceManagerMock([_extends({}, resourceConfigMock[0]), _extends({}, resourceConfigMock[1], {
        useColorAsDefault: true
      }), _extends({}, resourceConfigMock[2])]);
      expect(getPaintedResource(manager.resources, resourceIndexesMock, resourceIndexesMock)).toEqual(manager.resources[1]);
    });
    it('should return last resource', () => {
      const manager = getResourceManagerMock();
      expect(getPaintedResource(manager.resources, resourceIndexesMock, resourceIndexesMock)).toEqual(manager.resources[2]);
    });
    it('should return last resource filtered by groups', () => {
      const manager = getResourceManagerMock();
      expect(getPaintedResource(manager.resources, resourceIndexesMock, [resourceIndexesMock[0], resourceIndexesMock[1]])).toEqual(manager.resources[1]);
    });
    it('should return last resource filtered by appointment groups', () => {
      const manager = getResourceManagerMock();
      expect(getPaintedResource(manager.resources, [resourceIndexesMock[0], resourceIndexesMock[1]], resourceIndexesMock)).toEqual(manager.resources[1]);
    });
    it('should return last resource filtered by appointment groups that exclude useColorAsDefault resource', () => {
      const manager = getResourceManagerMock([_extends({}, resourceConfigMock[0]), _extends({}, resourceConfigMock[1], {
        useColorAsDefault: true
      }), _extends({}, resourceConfigMock[2])]);
      expect(getPaintedResource(manager.resources, [resourceIndexesMock[0]], resourceIndexesMock)).toEqual(manager.resources[0]);
    });
    it('should return undefined for empty groups', () => {
      const manager = getResourceManagerMock();
      expect(getPaintedResource(manager.resources, [], [])).toEqual(undefined);
    });
    it('should return undefined for resource out of groups', () => {
      const manager = getResourceManagerMock();
      expect(getPaintedResource(manager.resources, ['unknown'], [])).toEqual(undefined);
    });
    it('should return ungrouped resource with complex id', () => {
      const manager = getResourceManagerMock(complexIdResourceMock);
      expect(getPaintedResource(manager.resources, ['ownerId'], [])).toEqual(manager.resources[0]);
    });
  });
  describe('getAppointmentColor', () => {
    it('should return color of resource by groupIndex', async () => {
      const manager = getResourceManagerMock();
      await manager.loadGroupResources(['nested.priorityId', 'roomId']);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: [0, 1],
          nested: {
            priorityId: 1
          }
        },
        groupIndex: 1
      })).toEqual(resourceItemsByIdMock.roomId[1].color);
    });
    it('should return color of default resource', async () => {
      const manager = getResourceManagerMock([_extends({}, resourceConfigMock[0]), _extends({}, resourceConfigMock[1], {
        useColorAsDefault: true
      }), _extends({}, resourceConfigMock[2])]);
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          assigneeId: 1,
          roomId: [0, 1],
          nested: {
            priorityId: 1
          }
        },
        groupIndex: 0
      })).toEqual(resourceItemsByIdMock.assigneeId[0].mainColor);
    });
    it('should load unloaded resource and return color', async () => {
      const manager = getResourceManagerMock();
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          assigneeId: 1
        },
        groupIndex: 0
      })).toEqual('#727bd2');
    });
    it('should return undefined for not available resources', async () => {
      const manager = getResourceManagerMock();
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          unknown: 1
        },
        groupIndex: 0
      })).toEqual(undefined);
    });
    it('should return color of the last grouped resource (multiple)', async () => {
      const manager = getResourceManagerMock(customResourceConfig);
      await manager.loadGroupResources(['roomId', 'ownerId']);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: [1, 2],
          ownerId: [1, 2],
          managerId: 1
        },
        groupIndex: 0
      })).toEqual(ownerFirstColor);
    });
    it('should return color of the last grouped resource (single)', async () => {
      const manager = getResourceManagerMock(customResourceConfig);
      await manager.loadGroupResources(['roomId', 'ownerId']);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: 1,
          ownerId: 2,
          managerId: 1
        },
        groupIndex: 1
      })).toEqual(ownerSecondColor);
    });
    it('should return color of the last grouped resource (multiple, wrong groupIndex)', async () => {
      const manager = getResourceManagerMock(customResourceConfig);
      await manager.loadGroupResources(['roomId', 'ownerId']);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: [2],
          ownerId: [1, 2],
          managerId: 1
        },
        groupIndex: 0
      })).toEqual(ownerFirstColor);
    });
    it('should return color of the last grouped resource (single, wrong groupIndex)', async () => {
      const manager = getResourceManagerMock(customResourceConfig);
      await manager.loadGroupResources(['roomId', 'ownerId']);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: 1,
          ownerId: 2,
          managerId: 1
        },
        groupIndex: 3
      })).toEqual(ownerSecondColor);
    });
    it('should return color of ungrouped resource with complex id', async () => {
      const manager = getResourceManagerMock(complexIdResourceMock);
      const {
        dataSource
      } = complexIdResourceMock[0];
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          ownerId: {
            _value: 'guid-1'
          },
          groupIndex: 0
        }
      })).toEqual(dataSource[0].color);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          ownerId: {
            _value: 'guid-2'
          },
          groupIndex: 0
        }
      })).toEqual(dataSource[1].color);
      expect(await getAppointmentColor(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          ownerId: {
            _value: 'guid-3'
          },
          groupIndex: 0
        }
      })).toEqual(dataSource[2].color);
    });
  });
});
