/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_direction.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
export const addDirection = (entities, allDayPanelDirection, regularPanelDirection) => entities.map(entity => _extends({}, entity, {
  direction: entity.isAllDayPanelOccupied ? allDayPanelDirection : regularPanelDirection
}));
