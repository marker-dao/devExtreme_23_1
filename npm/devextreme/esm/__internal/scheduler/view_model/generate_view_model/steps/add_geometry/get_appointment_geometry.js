/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/get_appointment_geometry.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getAppointmentX, getAppointmentY } from './get_appointment_abstract_geometry';
import { getAbstractSizeByViewOrientation, getRealSizeByViewOrientation } from './swap_by_view_orientation';
export const getAppointmentGeometry = (entity, _ref) => {
  let {
    collectorPosition,
    cellSize,
    collectorWithMarginsSize,
    viewOrientation,
    cells
  } = _ref;
  const cellAbstractSize = getAbstractSizeByViewOrientation(cellSize, viewOrientation);
  const collectorFullAbstractSize = getAbstractSizeByViewOrientation(collectorWithMarginsSize, viewOrientation);
  const abstractGeometry = _extends({}, getAppointmentX(entity, cellAbstractSize, cells), getAppointmentY(entity, cellAbstractSize, collectorFullAbstractSize.sizeY, collectorPosition));
  const entityGeometry = getRealSizeByViewOrientation(abstractGeometry, viewOrientation);
  return entityGeometry;
};
