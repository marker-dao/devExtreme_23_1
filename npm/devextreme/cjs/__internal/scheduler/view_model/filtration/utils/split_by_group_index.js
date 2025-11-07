/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/split_by_group_index.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitByGroupIndex = void 0;
var _appointment_groups_utils = require("../../../utils/resource_manager/appointment_groups_utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const splitByGroupIndex = (entities, _ref) => {
  let {
    resourceManager
  } = _ref;
  return entities.reduce((result, entity) => {
    if (resourceManager.groupsLeafs.length === 0) {
      result.push(_extends({}, entity, {
        groupIndex: 0
      }));
      return result;
    }
    const groupValues = (0, _appointment_groups_utils.getAppointmentGroupValues)(entity.itemData, resourceManager.resources);
    const groupIndexes = (0, _appointment_groups_utils.getAppointmentGroupIndex)(groupValues, resourceManager.groupsLeafs);
    groupIndexes.forEach(groupIndex => {
      result.push(_extends({}, entity, {
        groupIndex
      }));
    });
    return result;
  }, []);
};
exports.splitByGroupIndex = splitByGroupIndex;
