/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/add_collector.js)
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
exports.addCollector = void 0;
var _type = require("../../../../core/utils/type");
var _plain_view_model = require("./plain_view_model");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  if (!(0, _type.isDefined)(virtualAppointments[virtualGroupIndex])) {
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
const addCollector = (viewModel, timeZoneCalculator) => {
  const internalViewModelItems = (0, _plain_view_model.plainViewModel)(viewModel);
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
exports.addCollector = addCollector;
