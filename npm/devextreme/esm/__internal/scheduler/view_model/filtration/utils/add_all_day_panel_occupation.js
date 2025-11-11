/**
* DevExtreme (esm/__internal/scheduler/view_model/filtration/utils/add_all_day_panel_occupation.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
