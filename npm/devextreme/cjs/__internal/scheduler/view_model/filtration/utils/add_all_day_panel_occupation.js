/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtration/utils/add_all_day_panel_occupation.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAllDayPanelOccupation = void 0;
var _base = require("../../../r1/utils/base");
const addAllDayPanelOccupation = (entities, _ref) => {
  let {
    supportAllDayPanel,
    allDayPanelMode
  } = _ref;
  return entities.map(entity => {
    const isAllDayPanelOccupied = supportAllDayPanel && (0, _base.isAppointmentTakesAllDay)({
      allDay: entity.allDay,
      startDate: new Date(entity.source.startDate),
      endDate: new Date(entity.source.endDate)
    }, allDayPanelMode);
    return Object.assign({}, entity, {
      isAllDayPanelOccupied
    });
  });
};
exports.addAllDayPanelOccupation = addAllDayPanelOccupation;
