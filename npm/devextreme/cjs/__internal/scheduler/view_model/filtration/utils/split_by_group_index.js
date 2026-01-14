/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/split_by_group_index.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitByGroupIndex = void 0;
var _appointment_groups_utils = require("../../../utils/resource_manager/appointment_groups_utils");
const splitByGroupIndex = (entities, _ref) => {
  let {
    resourceManager
  } = _ref;
  return entities.reduce((result, entity) => {
    if (resourceManager.groupsLeafs.length === 0) {
      result.push(Object.assign({}, entity, {
        groupIndex: 0
      }));
      return result;
    }
    const groupValues = (0, _appointment_groups_utils.getAppointmentGroupValues)(entity.itemData, resourceManager.resources);
    const groupIndexes = (0, _appointment_groups_utils.getAppointmentGroupIndex)(groupValues, resourceManager.groupsLeafs);
    groupIndexes.forEach(groupIndex => {
      result.push(Object.assign({}, entity, {
        groupIndex
      }));
    });
    return result;
  }, []);
};
exports.splitByGroupIndex = splitByGroupIndex;
