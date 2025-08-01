/**
* DevExtreme (cjs/__internal/scheduler/utils/resource_manager/group_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _resourceManager = require("../../../scheduler/__mock__/resourceManager.mock");
var _group_utils = require("./group_utils");
const groupsLeafs = [{
  groupIndex: 0,
  grouped: {
    assigneeId: 1,
    roomId: 3
  }
}, {
  groupIndex: 1,
  grouped: {
    assigneeId: 3,
    roomId: 4
  }
}, {
  groupIndex: 2,
  grouped: {
    roomId: 0
  }
}, {
  groupIndex: 3,
  grouped: {
    assigneeId: 0,
    roomId: 0
  }
}];
const resourceById = {
  assigneeId: {
    resourceIndex: 'assigneeId',
    items: [{
      id: 0,
      text: 'Samantha Bright'
    }, {
      id: 1,
      text: 'John Heart'
    }]
  },
  roomId: {
    resourceIndex: 'roomId',
    items: [{
      id: 0,
      text: 'Room 1'
    }, {
      id: 1,
      text: 'Room 2'
    }]
  }
};
(0, _globals.describe)('groups utils', () => {
  (0, _globals.describe)('groupResources', () => {
    (0, _globals.it)('should return empty tree for empty groups', () => {
      (0, _globals.expect)((0, _group_utils.groupResources)(resourceById, [])).toEqual({
        groupTree: [],
        groupLeafs: []
      });
    });
    (0, _globals.it)('should return empty tree for empty resources', () => {
      (0, _globals.expect)((0, _group_utils.groupResources)({}, ['roomId', 'assigneeId'])).toEqual({
        groupTree: [],
        groupLeafs: []
      });
    });
    (0, _globals.it)('should group by one group', () => {
      (0, _globals.expect)((0, _group_utils.groupResources)(resourceById, ['roomId'])).toEqual({
        groupTree: [{
          children: [],
          grouped: {
            roomId: 0
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 1'
        }, {
          children: [],
          grouped: {
            roomId: 1
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 2'
        }],
        groupLeafs: [{
          children: [],
          groupIndex: 0,
          grouped: {
            roomId: 0
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 1'
        }, {
          children: [],
          groupIndex: 1,
          grouped: {
            roomId: 1
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 2'
        }]
      });
    });
    (0, _globals.it)('should ignore missed resources and group by one group', () => {
      (0, _globals.expect)((0, _group_utils.groupResources)({
        roomId: resourceById.roomId
      }, ['roomId', 'assigneeId'])).toEqual({
        groupTree: [{
          children: [],
          grouped: {
            roomId: 0
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 1'
        }, {
          children: [],
          grouped: {
            roomId: 1
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 2'
        }],
        groupLeafs: [{
          children: [],
          groupIndex: 0,
          grouped: {
            roomId: 0
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 1'
        }, {
          children: [],
          groupIndex: 1,
          grouped: {
            roomId: 1
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 2'
        }]
      });
    });
    (0, _globals.it)('should group by multiple groups with correct order', () => {
      (0, _globals.expect)((0, _group_utils.groupResources)(resourceById, ['roomId', 'assigneeId'])).toEqual({
        groupTree: [{
          children: [{
            children: [],
            grouped: {
              assigneeId: 0,
              roomId: 0
            },
            resourceIndex: 'assigneeId',
            resourceText: 'Samantha Bright'
          }, {
            children: [],
            grouped: {
              assigneeId: 1,
              roomId: 0
            },
            resourceIndex: 'assigneeId',
            resourceText: 'John Heart'
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
              assigneeId: 0,
              roomId: 1
            },
            resourceIndex: 'assigneeId',
            resourceText: 'Samantha Bright'
          }, {
            children: [],
            grouped: {
              assigneeId: 1,
              roomId: 1
            },
            resourceIndex: 'assigneeId',
            resourceText: 'John Heart'
          }],
          grouped: {
            roomId: 1
          },
          resourceIndex: 'roomId',
          resourceText: 'Room 2'
        }],
        groupLeafs: [{
          children: [],
          groupIndex: 0,
          grouped: {
            assigneeId: 0,
            roomId: 0
          },
          resourceIndex: 'assigneeId',
          resourceText: 'Samantha Bright'
        }, {
          children: [],
          groupIndex: 1,
          grouped: {
            assigneeId: 1,
            roomId: 0
          },
          resourceIndex: 'assigneeId',
          resourceText: 'John Heart'
        }, {
          children: [],
          groupIndex: 2,
          grouped: {
            assigneeId: 0,
            roomId: 1
          },
          resourceIndex: 'assigneeId',
          resourceText: 'Samantha Bright'
        }, {
          children: [],
          groupIndex: 3,
          grouped: {
            assigneeId: 1,
            roomId: 1
          },
          resourceIndex: 'assigneeId',
          resourceText: 'John Heart'
        }]
      });
    });
  });
  (0, _globals.describe)('getAllGroupValues', () => {
    (0, _globals.it)('should return all group values', () => {
      (0, _globals.expect)((0, _group_utils.getAllGroupValues)(groupsLeafs)).toEqual([{
        assigneeId: 1,
        roomId: 3
      }, {
        assigneeId: 3,
        roomId: 4
      }, {
        roomId: 0
      }, {
        assigneeId: 0,
        roomId: 0
      }]);
    });
  });
  (0, _globals.describe)('getLeafGroupValues', () => {
    (0, _globals.it)('should return {} if nothing has found', () => {
      (0, _globals.expect)((0, _group_utils.getLeafGroupValues)(groupsLeafs, 10)).toEqual({});
    });
    (0, _globals.it)('should return group values of passed index', () => {
      (0, _globals.expect)((0, _group_utils.getLeafGroupValues)(groupsLeafs, 1)).toEqual({
        assigneeId: 3,
        roomId: 4
      });
    });
  });
  (0, _globals.describe)('getGroupTexts', () => {
    (0, _globals.it)('should return empty array if there is no leaf with groupIndex', () => {
      (0, _globals.expect)((0, _group_utils.getGroupTexts)(['roomId'], groupsLeafs, resourceById, 20)).toEqual([]);
    });
    (0, _globals.it)('should return groups for single grouping', () => {
      (0, _globals.expect)((0, _group_utils.getGroupTexts)(['roomId'], groupsLeafs, resourceById, 2)).toEqual(['Room 1']);
    });
    (0, _globals.it)('should return groups for multiple grouping', () => {
      (0, _globals.expect)((0, _group_utils.getGroupTexts)(['assigneeId', 'roomId'], groupsLeafs, resourceById, 3)).toEqual(['Samantha Bright', 'Room 1']);
    });
    (0, _globals.it)('should return empty array for empty resources', () => {
      (0, _globals.expect)((0, _group_utils.getGroupTexts)(['assigneeId', 'roomId'], [], {}, 3)).toEqual([]);
    });
    (0, _globals.it)('should return groups in order of groups declared', async () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      await manager.loadGroupResources(['assigneeId', 'nested.priorityId', 'roomId']);
      (0, _globals.expect)((0, _group_utils.getGroupTexts)(manager.groups, manager.groupsLeafs, manager.resourceById, 3)).toEqual(['Samantha Bright', 'High Priority', 'Room 1']);
    });
  });
  (0, _globals.describe)('getResourcesByGroupIndex', () => {
    (0, _globals.it)('should return empty array if there is no leaf with groupIndex', () => {
      (0, _globals.expect)((0, _group_utils.getResourcesByGroupIndex)(groupsLeafs, resourceById, 30)).toEqual([]);
    });
    (0, _globals.it)('should return resources of groupIndex', () => {
      (0, _globals.expect)((0, _group_utils.getResourcesByGroupIndex)(groupsLeafs, resourceById, 3)).toEqual([{
        items: [{
          id: 0,
          text: 'Samantha Bright'
        }],
        resourceIndex: 'assigneeId'
      }, {
        items: [{
          id: 0,
          text: 'Room 1'
        }],
        resourceIndex: 'roomId'
      }]);
    });
  });
});
