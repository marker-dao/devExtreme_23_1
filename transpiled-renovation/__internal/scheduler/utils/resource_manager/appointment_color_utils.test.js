"use strict";

var _globals = require("@jest/globals");
var _resource_manager = require("../../../scheduler/__mock__/resource_manager.mock");
var _appointment_color_utils = require("./appointment_color_utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
(0, _globals.describe)('appointment color utils', () => {
  (0, _globals.describe)('getPaintedResources', () => {
    (0, _globals.it)('should return useColorAsDefault resource', () => {
      const manager = (0, _resource_manager.getResourceManagerMock)([_extends({}, _resource_manager.resourceConfigMock[0]), _extends({}, _resource_manager.resourceConfigMock[1], {
        useColorAsDefault: true
      }), _extends({}, _resource_manager.resourceConfigMock[2])]);
      (0, _globals.expect)((0, _appointment_color_utils.getPaintedResource)(manager.resources, _resource_manager.resourceIndexesMock, _resource_manager.resourceIndexesMock)).toEqual(manager.resources[1]);
    });
    (0, _globals.it)('should return last resource', () => {
      const manager = (0, _resource_manager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_color_utils.getPaintedResource)(manager.resources, _resource_manager.resourceIndexesMock, _resource_manager.resourceIndexesMock)).toEqual(manager.resources[2]);
    });
    (0, _globals.it)('should return last resource filtered by groups', () => {
      const manager = (0, _resource_manager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_color_utils.getPaintedResource)(manager.resources, _resource_manager.resourceIndexesMock, [_resource_manager.resourceIndexesMock[0], _resource_manager.resourceIndexesMock[1]])).toEqual(manager.resources[1]);
    });
    (0, _globals.it)('should return last resource filtered by appointment groups', () => {
      const manager = (0, _resource_manager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_color_utils.getPaintedResource)(manager.resources, [_resource_manager.resourceIndexesMock[0], _resource_manager.resourceIndexesMock[1]], _resource_manager.resourceIndexesMock)).toEqual(manager.resources[1]);
    });
    (0, _globals.it)('should return last resource filtered by appointment groups that exclude useColorAsDefault resource', () => {
      const manager = (0, _resource_manager.getResourceManagerMock)([_extends({}, _resource_manager.resourceConfigMock[0]), _extends({}, _resource_manager.resourceConfigMock[1], {
        useColorAsDefault: true
      }), _extends({}, _resource_manager.resourceConfigMock[2])]);
      (0, _globals.expect)((0, _appointment_color_utils.getPaintedResource)(manager.resources, [_resource_manager.resourceIndexesMock[0]], _resource_manager.resourceIndexesMock)).toEqual(manager.resources[0]);
    });
    (0, _globals.it)('should return undefined for empty groups', () => {
      const manager = (0, _resource_manager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_color_utils.getPaintedResource)(manager.resources, [], [])).toEqual(undefined);
    });
    (0, _globals.it)('should return undefined for resource out of groups', () => {
      const manager = (0, _resource_manager.getResourceManagerMock)();
      (0, _globals.expect)((0, _appointment_color_utils.getPaintedResource)(manager.resources, ['unknown'], [])).toEqual(undefined);
    });
    (0, _globals.it)('should return ungrouped resource with complex id', () => {
      const manager = (0, _resource_manager.getResourceManagerMock)(_resource_manager.complexIdResourceMock);
      (0, _globals.expect)((0, _appointment_color_utils.getPaintedResource)(manager.resources, ['ownerId'], [])).toEqual(manager.resources[0]);
    });
  });
  (0, _globals.describe)('getAppointmentColor', () => {
    (0, _globals.it)('should return color of resource by groupIndex', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)();
      await manager.loadGroupResources(['nested.priorityId', 'roomId']);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: [0, 1],
          nested: {
            priorityId: 1
          }
        },
        groupIndex: 1
      })).toEqual(_resource_manager.resourceItemsByIdMock.roomId[1].color);
    });
    (0, _globals.it)('should return color of default resource', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)([_extends({}, _resource_manager.resourceConfigMock[0]), _extends({}, _resource_manager.resourceConfigMock[1], {
        useColorAsDefault: true
      }), _extends({}, _resource_manager.resourceConfigMock[2])]);
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          assigneeId: 1,
          roomId: [0, 1],
          nested: {
            priorityId: 1
          }
        },
        groupIndex: 0
      })).toEqual(_resource_manager.resourceItemsByIdMock.assigneeId[0].mainColor);
    });
    (0, _globals.it)('should load unloaded resource and return color', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)();
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          assigneeId: 1
        },
        groupIndex: 0
      })).toEqual('#727bd2');
    });
    (0, _globals.it)('should return undefined for not available resources', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)();
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          unknown: 1
        },
        groupIndex: 0
      })).toEqual(undefined);
    });
    (0, _globals.it)('should return color of the last grouped resource (multiple)', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)(customResourceConfig);
      await manager.loadGroupResources(['roomId', 'ownerId']);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: [1, 2],
          ownerId: [1, 2],
          managerId: 1
        },
        groupIndex: 0
      })).toEqual(ownerFirstColor);
    });
    (0, _globals.it)('should return color of the last grouped resource (single)', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)(customResourceConfig);
      await manager.loadGroupResources(['roomId', 'ownerId']);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: 1,
          ownerId: 2,
          managerId: 1
        },
        groupIndex: 1
      })).toEqual(ownerSecondColor);
    });
    (0, _globals.it)('should return color of the last grouped resource (multiple, wrong groupIndex)', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)(customResourceConfig);
      await manager.loadGroupResources(['roomId', 'ownerId']);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: [2],
          ownerId: [1, 2],
          managerId: 1
        },
        groupIndex: 0
      })).toEqual(ownerFirstColor);
    });
    (0, _globals.it)('should return color of the last grouped resource (single, wrong groupIndex)', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)(customResourceConfig);
      await manager.loadGroupResources(['roomId', 'ownerId']);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          roomId: 1,
          ownerId: 2,
          managerId: 1
        },
        groupIndex: 3
      })).toEqual(ownerSecondColor);
    });
    (0, _globals.it)('should return color of ungrouped resource with complex id', async () => {
      const manager = (0, _resource_manager.getResourceManagerMock)(_resource_manager.complexIdResourceMock);
      const {
        dataSource
      } = _resource_manager.complexIdResourceMock[0];
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          ownerId: {
            _value: 'guid-1'
          },
          groupIndex: 0
        }
      })).toEqual(dataSource[0].color);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
        itemData: {
          ownerId: {
            _value: 'guid-2'
          },
          groupIndex: 0
        }
      })).toEqual(dataSource[1].color);
      (0, _globals.expect)(await (0, _appointment_color_utils.getAppointmentColor)(manager.resources, manager.groupsLeafs, manager.groups, {
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