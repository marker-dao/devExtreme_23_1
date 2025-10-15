import _extends from "@babel/runtime/helpers/esm/extends";
import { getAppointmentGroupIndex, getAppointmentGroupValues } from '../../../utils/resource_manager/appointment_groups_utils';
export const splitByGroupIndex = (entities, _ref) => {
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
    const groupValues = getAppointmentGroupValues(entity.itemData, resourceManager.resources);
    const groupIndexes = getAppointmentGroupIndex(groupValues, resourceManager.groupsLeafs);
    groupIndexes.forEach(groupIndex => {
      result.push(_extends({}, entity, {
        groupIndex
      }));
    });
    return result;
  }, []);
};