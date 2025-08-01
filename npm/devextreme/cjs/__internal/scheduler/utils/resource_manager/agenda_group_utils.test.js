/**
* DevExtreme (cjs/__internal/scheduler/utils/resource_manager/agenda_group_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _resourceManager = require("../../../scheduler/__mock__/resourceManager.mock");
var _agenda_group_utils = require("./agenda_group_utils");
(0, _globals.describe)('agenda group utils', () => {
  (0, _globals.describe)('reduceResourcesTree', () => {
    (0, _globals.it)('should reduce tree by appointments resources', async () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      (0, _globals.expect)((0, _agenda_group_utils.reduceResourcesTree)(manager.resourceById, manager.groupsTree, [{
        roomId: 0,
        nested: {
          priorityId: [1, 2]
        }
      }, {
        roomId: 1,
        nested: {
          priorityId: 2
        }
      }])).toEqual([{
        children: [{
          children: [],
          grouped: {
            'nested.priorityId': 1,
            roomId: 0
          },
          resourceIndex: 'nested.priorityId',
          resourceText: 'Low Priority'
        }, {
          children: [],
          grouped: {
            'nested.priorityId': 2,
            roomId: 0
          },
          resourceIndex: 'nested.priorityId',
          resourceText: 'High Priority'
        }],
        grouped: {
          roomId: 0
        },
        resourceIndex: 'roomId',
        resourceText: 'Room 1'
      }, {
        children: [{
          children: [],
          grouped: {
            'nested.priorityId': 1,
            roomId: 1
          },
          resourceIndex: 'nested.priorityId',
          resourceText: 'Low Priority'
        }, {
          children: [],
          grouped: {
            'nested.priorityId': 2,
            roomId: 1
          },
          resourceIndex: 'nested.priorityId',
          resourceText: 'High Priority'
        }],
        grouped: {
          roomId: 1
        },
        resourceIndex: 'roomId',
        resourceText: 'Room 2'
      }]);
    });
    (0, _globals.it)('should reduce tree by zero appointments', async () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      (0, _globals.expect)((0, _agenda_group_utils.reduceResourcesTree)(manager.resourceById, manager.groupsTree, [])).toEqual([]);
    });
  });
  (0, _globals.describe)('convertToOldTree', () => {
    (0, _globals.it)('should convert to old tree structure', async () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      await manager.loadGroupResources(['roomId', 'nested.priorityId']);
      (0, _globals.expect)((0, _agenda_group_utils.convertToOldTree)(manager.resourceById, manager.groupsTree)).toEqual([{
        children: [{
          children: [],
          name: 'nested.priorityId',
          title: 'Low Priority',
          color: '#1e90ff',
          data: _resourceManager.resourceItemsByIdMock['nested.priorityId'][0],
          value: 1
        }, {
          children: [],
          name: 'nested.priorityId',
          title: 'High Priority',
          color: '#ff9747',
          data: _resourceManager.resourceItemsByIdMock['nested.priorityId'][1],
          value: 2
        }],
        name: 'roomId',
        title: 'Room 1',
        color: '#aaa',
        data: _resourceManager.resourceItemsByIdMock.roomId[0],
        value: 0
      }, {
        children: [{
          children: [],
          name: 'nested.priorityId',
          title: 'Low Priority',
          color: '#1e90ff',
          data: _resourceManager.resourceItemsByIdMock['nested.priorityId'][0],
          value: 1
        }, {
          children: [],
          name: 'nested.priorityId',
          title: 'High Priority',
          color: '#ff9747',
          data: _resourceManager.resourceItemsByIdMock['nested.priorityId'][1],
          value: 2
        }],
        name: 'roomId',
        title: 'Room 2',
        color: '#ccc',
        data: _resourceManager.resourceItemsByIdMock.roomId[1],
        value: 1
      }, {
        children: [{
          children: [],
          name: 'nested.priorityId',
          title: 'Low Priority',
          color: '#1e90ff',
          data: _resourceManager.resourceItemsByIdMock['nested.priorityId'][0],
          value: 1
        }, {
          children: [],
          name: 'nested.priorityId',
          title: 'High Priority',
          color: '#ff9747',
          data: _resourceManager.resourceItemsByIdMock['nested.priorityId'][1],
          value: 2
        }],
        name: 'roomId',
        title: 'Room 3',
        color: '#777',
        data: _resourceManager.resourceItemsByIdMock.roomId[2],
        value: 2
      }]);
    });
  });
});
