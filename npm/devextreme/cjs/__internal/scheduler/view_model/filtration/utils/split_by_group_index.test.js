/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/split_by_group_index.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _resource_manager = require("../../../utils/resource_manager/resource_manager");
var _split_by_group_index = require("./split_by_group_index");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const items = [{
  itemData: {
    roomId: 1,
    kind: 1
  }
}, {
  itemData: {
    roomId: 1,
    kind: [1, 2]
  }
}, {
  itemData: {
    roomId: 1,
    kind: [1, 2, 3]
  }
}];
const getFilterOptions = async configs => {
  const resourceManager = new _resource_manager.ResourceManager(configs);
  await resourceManager.loadGroupResources(configs.map(item => item.fieldExpr));
  return {
    resourceManager
  };
};
(0, _globals.describe)('splitByGroupIndex', () => {
  (0, _globals.it)('should add groupIndex for no grouping', async () => {
    const options = await getFilterOptions([]);
    (0, _globals.expect)((0, _split_by_group_index.splitByGroupIndex)(items, options)).toEqual([_extends({}, items[0], {
      groupIndex: 0
    }), _extends({}, items[1], {
      groupIndex: 0
    }), _extends({}, items[2], {
      groupIndex: 0
    })]);
  });
  (0, _globals.it)('should add groupIndex for one group with one option', async () => {
    const options = await getFilterOptions([{
      dataSource: [{
        id: 1
      }],
      fieldExpr: 'roomId'
    }]);
    (0, _globals.expect)((0, _split_by_group_index.splitByGroupIndex)(items, options)).toEqual([_extends({}, items[0], {
      groupIndex: 0
    }), _extends({}, items[1], {
      groupIndex: 0
    }), _extends({}, items[2], {
      groupIndex: 0
    })]);
  });
  (0, _globals.it)('should set correct groupIndex for one group', async () => {
    const options = await getFilterOptions([{
      dataSource: [{
        id: 0
      }, {
        id: 1
      }, {
        id: 2
      }],
      fieldExpr: 'roomId'
    }]);
    (0, _globals.expect)((0, _split_by_group_index.splitByGroupIndex)(items, options)).toEqual([_extends({}, items[0], {
      groupIndex: 1
    }), _extends({}, items[1], {
      groupIndex: 1
    }), _extends({}, items[2], {
      groupIndex: 1
    })]);
  });
  (0, _globals.it)('should set correct groupIndex for multiple groups', async () => {
    const options = await getFilterOptions([{
      dataSource: [{
        id: 0
      }, {
        id: 1
      }, {
        id: 2
      }],
      fieldExpr: 'roomId'
    }, {
      allowMultiple: true,
      dataSource: [{
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }],
      fieldExpr: 'kind'
    }]);
    (0, _globals.expect)((0, _split_by_group_index.splitByGroupIndex)(items, options)).toEqual([_extends({}, items[0], {
      groupIndex: 3
    }), _extends({}, items[1], {
      groupIndex: 3
    }), _extends({}, items[1], {
      groupIndex: 4
    }), _extends({}, items[2], {
      groupIndex: 3
    }), _extends({}, items[2], {
      groupIndex: 4
    }), _extends({}, items[2], {
      groupIndex: 5
    })]);
  });
});
