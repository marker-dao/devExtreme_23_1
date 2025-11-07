/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_emptiness.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getMinAppointmentSize } from '../options/get_min_appointment_size';
export const addEmptiness = (entities, options) => {
  const minSize = getMinAppointmentSize(options);
  return entities.map(entity => _extends({}, entity, {
    empty: !entity.isAllDayPanelOccupied && (entity.height < minSize.height || entity.width < minSize.width)
  }));
};
