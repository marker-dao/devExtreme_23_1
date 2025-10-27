/**
* DevExtreme (cjs/__internal/scheduler/view_model/appointments_layout_manager.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _filter_appointments = require("./filtration/filter_appointments");
var _generate_agenda_view_model = require("./generate_view_model/generate_agenda_view_model");
var _generate_grid_view_model = require("./generate_view_model/generate_grid_view_model");
var _get_appointment_info = require("./get_appointment_info");
var _prepare_appointments = require("./preparation/prepare_appointments");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class AppointmentLayoutManager {
  // NOTE: Here we should pass global store. But right now scheduler component is global store
  constructor(schedulerStore) {
    this.schedulerStore = schedulerStore;
    this.preparedItems = [];
    this.filteredItems = [];
  }
  prepareAppointments(items) {
    this.preparedItems = (0, _prepare_appointments.prepareAppointments)(this.schedulerStore, items);
  }
  filterAppointments() {
    this.filteredItems = (0, _filter_appointments.filterAppointments)(this.schedulerStore, this.preparedItems);
  }
  hasAllDayAppointments() {
    return this.filteredItems.filter(item => item.isAllDayPanelOccupied).length > 0;
  }
  generateViewModel() {
    const viewType = this.schedulerStore.currentView.type;
    if (viewType === 'agenda') {
      const viewModel = (0, _generate_agenda_view_model.generateAgendaViewModel)(this.schedulerStore, this.filteredItems);
      return viewModel.map(item => _extends({}, item, {
        isAgendaModel: true,
        info: (0, _get_appointment_info.getAgendaAppointmentInfo)(item)
      }));
    }
    const isSkipResizing = appointment => appointment.isAllDayPanelOccupied && viewType === 'day' && this.schedulerStore.currentView.intervalCount === 1;
    const viewModel = (0, _generate_grid_view_model.generateGridViewModel)(this.schedulerStore, this.filteredItems);
    const toItem = item => ({
      itemData: item.itemData,
      allDay: item.isAllDayPanelOccupied,
      groupIndex: item.groupIndex,
      sortedIndex: item.sortedIndex,
      direction: item.direction,
      level: item.level,
      maxLevel: item.maxLevel,
      empty: item.empty,
      top: item.top,
      left: item.left,
      height: item.height,
      width: item.width,
      reduced: item.reduced,
      partIndex: item.partIndex,
      partTotalCount: item.partCount,
      rowIndex: item.rowIndex,
      columnIndex: item.columnIndex,
      skipResizing: isSkipResizing(item),
      info: (0, _get_appointment_info.getAppointmentInfo)(item)
    });
    const toCollectedItem = item => ({
      itemData: item.itemData,
      allDay: item.isAllDayPanelOccupied,
      groupIndex: item.groupIndex,
      width: item.width,
      height: item.height,
      info: (0, _get_appointment_info.getAppointmentInfo)(item)
    });
    return viewModel.map(item => {
      if (item.items.length) {
        return {
          itemData: item.itemData,
          allDay: item.isAllDayPanelOccupied,
          groupIndex: item.groupIndex,
          sortedIndex: item.sortedIndex,
          top: item.top,
          left: item.left,
          width: item.width,
          height: item.height,
          isCompact: item.isCompact,
          items: item.items.map(toCollectedItem)
        };
      }
      return toItem(item);
    });
  }
}
var _default = exports.default = AppointmentLayoutManager;
