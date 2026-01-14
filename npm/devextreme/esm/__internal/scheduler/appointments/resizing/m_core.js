/**
* DevExtreme (esm/__internal/scheduler/appointments/resizing/m_core.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { dateUtilsTs } from '../../../core/utils/date';
import { dateUtils } from '../../../core/utils/m_date';
const toMs = dateUtils.dateToMilliseconds;
// NOTE: View data generator shifts all day cell dates by offset
// and return equal start and end dates.
const getCellData = function (_ref, cellRowIndex, cellColumnIndex, isOccupiedAllDay) {
  let {
    viewDataProvider
  } = _ref;
  let isAllDay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  let rtlEnabled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  const cellData = viewDataProvider.getCellData(cellRowIndex, cellColumnIndex, isOccupiedAllDay, rtlEnabled);
  // NOTE: All day appointments occupy day if they start at the beginning of the day,
  // but long appointments are not. So for all day appointments endDate === startDate,
  // for long appointments endDate = startDate + 1 day.
  if (!isAllDay) {
    cellData.endDate = dateUtilsTs.addOffsets(cellData.startDate, toMs('day'));
  }
  return cellData;
};
const getAppointmentLeftCell = options => {
  const {
    cellHeight,
    cellWidth,
    relativeAppointmentRect,
    appointment,
    rtlEnabled
  } = options;
  const cellRowIndex = Math.floor(relativeAppointmentRect.top / cellHeight);
  const cellColumnIndex = Math.round(relativeAppointmentRect.left / cellWidth);
  return getCellData(options, cellRowIndex, cellColumnIndex, appointment.isOccupiedAllDay, appointment.isAllDay, rtlEnabled);
};
const getDateRangeHorizontal = options => {
  const {
    cellWidth,
    cellCountInRow,
    relativeAppointmentRect,
    appointment,
    handles
  } = options;
  const appointmentFirstCell = getAppointmentLeftCell(options);
  const appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
  const appointmentLastCellIndex = appointmentFirstCell.index + (appointmentCellsAmount - 1);
  if (handles.left) {
    return {
      startDate: appointmentFirstCell.startDate,
      endDate: appointmentFirstCell.startDate > appointment.endDate ? appointmentFirstCell.startDate : appointment.endDate
    };
  }
  const appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
  const appointmentColumnIndex = appointmentLastCellIndex % cellCountInRow;
  const appointmentLastCell = getCellData(options, appointmentRowIndex, appointmentColumnIndex, appointment.isOccupiedAllDay, appointment.isAllDay);
  const {
    endDate
  } = appointmentLastCell;
  return {
    startDate: endDate < appointment.startDate ? endDate : appointment.startDate,
    endDate
  };
};
const getDateRangeHorizontalRTL = options => {
  const {
    cellCountInRow,
    appointment,
    handles,
    cellWidth,
    relativeAppointmentRect
  } = options;
  const appointmentLastCell = getAppointmentLeftCell(options);
  if (handles.right) {
    const appointmentLastCellIndex = appointmentLastCell.index;
    const appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
    const appointmentFirstCellIndex = appointmentLastCellIndex - appointmentCellsAmount + 1;
    const appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
    const appointmentFirstCell = getCellData(options, appointmentRowIndex, appointmentFirstCellIndex, appointment.isOccupiedAllDay, appointment.isAllDay);
    return {
      startDate: appointmentFirstCell.startDate,
      endDate: appointmentFirstCell.startDate > appointment.endDate ? appointmentFirstCell.startDate : appointment.endDate
    };
  }
  const {
    endDate
  } = appointmentLastCell;
  return {
    startDate: endDate < appointment.startDate ? endDate : appointment.startDate,
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
    height: cellHeight,
    width: cellWidth
  } = DOMMetaTable[appointmentSettings.rowIndex][appointmentSettings.columnIndex];
  const cellCountInRow = DOMMetaTable[appointmentSettings.rowIndex].length;
  return {
    cellWidth,
    cellHeight,
    cellCountInRow
  };
};
export const getAppointmentDateRange = options => {
  const {
    appointmentSettings
  } = options;
  const relativeAppointmentRect = getRelativeAppointmentRect(options.appointmentRect, options.parentAppointmentRect);
  const cellInfo = getAppointmentCellsInfo(options);
  const appointment = {
    startDate: appointmentSettings.info.sourceAppointment.startDate,
    endDate: appointmentSettings.info.sourceAppointment.endDate,
    isAllDay: Boolean(appointmentSettings.info.appointment.allDay),
    isOccupiedAllDay: Boolean(appointmentSettings.allDay)
  };
  const extendedOptions = Object.assign({}, options, cellInfo, {
    appointment,
    relativeAppointmentRect
  });
  return !options.rtlEnabled ? getDateRangeHorizontal(extendedOptions) : getDateRangeHorizontalRTL(extendedOptions);
};
