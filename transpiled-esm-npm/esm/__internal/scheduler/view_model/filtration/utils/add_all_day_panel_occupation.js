import _extends from "@babel/runtime/helpers/esm/extends";
import { isAppointmentTakesAllDay } from '../../../r1/utils/base';
export const addAllDayPanelOccupation = (entities, _ref) => {
  let {
    supportAllDayPanel,
    allDayPanelMode
  } = _ref;
  return entities.map(entity => {
    const isAllDayPanelOccupied = supportAllDayPanel && isAppointmentTakesAllDay({
      allDay: entity.allDay,
      startDate: new Date(entity.source.startDate),
      endDate: new Date(entity.source.endDate)
    }, allDayPanelMode);
    return _extends({}, entity, {
      isAllDayPanelOccupied
    });
  });
};