/**
* DevExtreme (esm/__internal/scheduler/view_model/filtration/utils/split_by_group_index.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getAppointmentGroupIndex, getAppointmentGroupValues } from '../../../utils/resource_manager/appointment_groups_utils';
export const splitByGroupIndex = (entities, _ref) => {
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
    const groupValues = getAppointmentGroupValues(entity.itemData, resourceManager.resources);
    const groupIndexes = getAppointmentGroupIndex(groupValues, resourceManager.groupsLeafs);
    groupIndexes.forEach(groupIndex => {
      result.push(Object.assign({}, entity, {
        groupIndex
      }));
    });
    return result;
  }, []);
};
