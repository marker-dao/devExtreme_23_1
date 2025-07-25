/**
* DevExtreme (cjs/__internal/scheduler/appointments/resizing/m_core.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppointmentDateRange = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getAppointmentLeftCell = options => {
  const {
    cellHeight,
    cellWidth,
    viewDataProvider,
    relativeAppointmentRect,
    appointmentSettings,
    rtlEnabled
  } = options;
  const cellRowIndex = Math.floor(relativeAppointmentRect.top / cellHeight);
  const cellColumnIndex = Math.round(relativeAppointmentRect.left / cellWidth);
  const leftCell = viewDataProvider.getCellData(cellRowIndex, cellColumnIndex, appointmentSettings.allDay, rtlEnabled);
  return leftCell;
};
const getDateRangeHorizontal = options => {
  const {
    cellWidth,
    cellCountInRow,
    relativeAppointmentRect,
    viewDataProvider,
    appointmentSettings,
    handles
  } = options;
  const appointmentFirstCell = getAppointmentLeftCell(options);
  const appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
  const appointmentLastCellIndex = appointmentFirstCell.index + (appointmentCellsAmount - 1);
  const {
    sourceAppointment
  } = appointmentSettings.info;
  const {
    allDay
  } = appointmentSettings.info.appointment;
  if (handles.left) {
    return {
      startDate: appointmentFirstCell.startDate,
      endDate: appointmentFirstCell.startDate > sourceAppointment.endDate ? appointmentFirstCell.startDate : sourceAppointment.endDate
    };
  }
  const appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
  const appointmentColumnIndex = appointmentLastCellIndex % cellCountInRow;
  const appointmentLastCell = viewDataProvider.getCellData(appointmentRowIndex, appointmentColumnIndex, allDay);
  const endDate = !options.considerTime ? appointmentLastCell.endDate : appointmentLastCell.startDate;
  return {
    startDate: endDate < sourceAppointment.startDate ? endDate : sourceAppointment.startDate,
    endDate
  };
};
const getDateRangeHorizontalRTL = options => {
  const {
    viewDataProvider,
    cellCountInRow,
    appointmentSettings,
    handles,
    cellWidth,
    relativeAppointmentRect
  } = options;
  const appointmentLastCell = getAppointmentLeftCell(options);
  const {
    sourceAppointment
  } = appointmentSettings.info;
  const {
    allDay
  } = appointmentSettings.info.appointment;
  if (handles.right) {
    const appointmentLastCellIndex = appointmentLastCell.index;
    const appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
    const appointmentFirstCellIndex = appointmentLastCellIndex - appointmentCellsAmount + 1;
    const appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
    const appointmentFirstCell = viewDataProvider.getCellData(appointmentRowIndex, appointmentFirstCellIndex, allDay, true);
    return {
      startDate: appointmentFirstCell.startDate,
      endDate: appointmentFirstCell.startDate > sourceAppointment.endDate ? appointmentFirstCell.startDate : sourceAppointment.endDate
    };
  }
  const endDate = !options.considerTime ? appointmentLastCell.endDate : appointmentLastCell.startDate;
  return {
    startDate: endDate < sourceAppointment.startDate ? endDate : sourceAppointment.startDate,
    endDate
  };
};
const getRelativeAppointmentRect = (appointmentRect, parentAppointmentRect) => {
  const left = appointmentRect.left - parentAppointmentRect.left;
  const top = appointmentRect.top - parentAppointmentRect.top;
  const width = left < 0 ? appointmentRect.width + left : appointmentRect.width;
  const height = top < 0 ? appointmentRect.height + top : appointmentRect.height;
  return {
    left: Math.max(0, left),
    top: Math.max(0, top),
    width,
    height
  };
};
const getAppointmentCellsInfo = options => {
  const {
    appointmentSettings,
    isVerticalGroupedWorkSpace,
    DOMMetaData
  } = options;
  const DOMMetaTable = appointmentSettings.allDay && !isVerticalGroupedWorkSpace ? [DOMMetaData.allDayPanelCellsMeta] : DOMMetaData.dateTableCellsMeta;
  const {
    positionByMap
  } = appointmentSettings;
  const {
    height: cellHeight,
    width: cellWidth
  } = DOMMetaTable[positionByMap.rowIndex][positionByMap.columnIndex];
  const cellCountInRow = DOMMetaTable[positionByMap.rowIndex].length;
  return {
    cellWidth,
    cellHeight,
    cellCountInRow
  };
};
const getAppointmentDateRange = options => {
  const {
    appointmentSettings
  } = options;
  const relativeAppointmentRect = getRelativeAppointmentRect(options.appointmentRect, options.parentAppointmentRect);
  const cellInfo = getAppointmentCellsInfo(options);
  const considerTime = !options.isDateAndTimeView || appointmentSettings.allDay;
  const extendedOptions = _extends({}, options, cellInfo, {
    considerTime,
    relativeAppointmentRect
  });
  return !options.rtlEnabled ? getDateRangeHorizontal(extendedOptions) : getDateRangeHorizontalRTL(extendedOptions);
};
exports.getAppointmentDateRange = getAppointmentDateRange;
