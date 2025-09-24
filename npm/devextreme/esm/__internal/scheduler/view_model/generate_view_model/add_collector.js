/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/add_collector.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isDefined } from '../../../../core/utils/type';
import { plainViewModel } from './plain_view_model';
const cropSettingsProps = setting => ({
  itemData: setting.itemData,
  allDay: Boolean(setting.allDay),
  direction: setting.direction,
  groupIndex: setting.groupIndex,
  sortedIndex: setting.sortedIndex,
  skipResizing: setting.skipResizing,
  level: setting.index,
  maxLevel: setting.count,
  info: {
    sourceAppointment: setting.info.sourceAppointment,
    appointment: setting.info.appointment
  },
  empty: setting.geometry.empty,
  left: setting.geometry.left,
  top: setting.geometry.top,
  height: setting.geometry.height,
  width: setting.geometry.width,
  isCompact: setting.isCompact,
  reduced: setting.appointmentReduced,
  partIndex: setting.partIndex,
  partTotalCount: setting.partTotalCount,
  rowIndex: setting.positionByMap.rowIndex,
  columnIndex: setting.positionByMap.columnIndex
});
const processVirtualAppointment = (virtualAppointments, internalViewModelItem) => {
  if (!internalViewModelItem.virtual) {
    return;
  }
  const virtualAppointment = internalViewModelItem.virtual;
  const virtualGroupIndex = virtualAppointment.index;
  if (!isDefined(virtualAppointments[virtualGroupIndex])) {
    virtualAppointments[virtualGroupIndex] = {
      itemData: internalViewModelItem.itemData,
      allDay: Boolean(virtualAppointment.isAllDay),
      groupIndex: internalViewModelItem.groupIndex,
      sortedIndex: internalViewModelItem.sortedIndex,
      top: virtualAppointment.top,
      left: virtualAppointment.left,
      width: virtualAppointment.width,
      height: virtualAppointment.height,
      isCompact: virtualAppointment.isCompact,
      items: []
    };
  }
  virtualAppointments[virtualGroupIndex].items.push(cropSettingsProps(internalViewModelItem));
};
export const addCollector = (viewModel, timeZoneCalculator) => {
  const internalViewModelItems = plainViewModel(viewModel);
  const result = [];
  const virtualAppointments = {};
  internalViewModelItems.map(item => _extends({}, item, {
    info: {
      sourceAppointment: item.info.sourceAppointment,
      appointment: _extends({}, item.info.appointment, {
        startDate: timeZoneCalculator.createDate(item.info.sourceAppointment.startDate, 'toGrid'),
        endDate: timeZoneCalculator.createDate(item.info.sourceAppointment.endDate, 'toGrid')
      })
    }
  })).forEach(item => {
    switch (true) {
      case Boolean(item.virtual):
        processVirtualAppointment(virtualAppointments, item);
        break;
      default:
        result.push(cropSettingsProps(item));
    }
  });
  const combined = [...result, ...Object.values(virtualAppointments)];
  return combined.sort((a, b) => a.sortedIndex - b.sortedIndex).map((item, sortedIndex) => _extends({}, item, {
    sortedIndex
  }));
};
