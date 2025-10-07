/**
* DevExtreme (cjs/__internal/scheduler/appointments/utils/get_view_model_diff.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getViewModelDiff = void 0;
var _common = require("../../../../core/utils/common");
var _get_arrays_diff = require("./get_arrays_diff");
const getObjectToCompare = item => {
  if ('isAgendaModel' in item) {
    return {};
  }
  if ('items' in item) {
    return {
      allDay: item.allDay,
      groupIndex: item.groupIndex,
      top: item.top,
      left: item.left,
      items: item.items.length
    };
  }
  return {
    allDay: item.allDay,
    groupIndex: item.groupIndex,
    direction: item.direction,
    left: item.left,
    top: item.top,
    height: item.height,
    width: item.width,
    reduced: item.reduced,
    partIndex: item.partIndex,
    partTotalCount: item.partTotalCount,
    rowIndex: item.rowIndex,
    columnIndex: item.columnIndex
  };
};
const isDataChanged = (data, appointmentDataSource) => {
  const updatedData = appointmentDataSource.getUpdatedAppointment();
  return updatedData === data || appointmentDataSource.getUpdatedAppointmentKeys().some(item => data[item.key] === item.value);
};
const compareViewModel = appointmentDataSource => (viewModelOld, viewModelNext) => viewModelOld.itemData === viewModelNext.itemData && !isDataChanged(viewModelNext.itemData, appointmentDataSource) && (0, _common.equalByValue)(getObjectToCompare(viewModelOld), getObjectToCompare(viewModelNext));
const getViewModelDiff = (viewModelOld, viewModelNext, appointmentDataSource) => (0, _get_arrays_diff.getArraysDiff)(viewModelOld, viewModelNext, compareViewModel(appointmentDataSource));
exports.getViewModelDiff = getViewModelDiff;
