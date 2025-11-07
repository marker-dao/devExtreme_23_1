/**
* DevExtreme (esm/__internal/scheduler/view_model/appointments_layout_manager.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { filterAppointments } from './filtration/filter_appointments';
import { generateAgendaViewModel } from './generate_view_model/generate_agenda_view_model';
import { generateGridViewModel } from './generate_view_model/generate_grid_view_model';
import { getAgendaAppointmentInfo, getAppointmentInfo } from './get_appointment_info';
import { prepareAppointments } from './preparation/prepare_appointments';
class AppointmentLayoutManager {
  // NOTE: Here we should pass global store. But right now scheduler component is global store
  constructor(schedulerStore) {
    this.schedulerStore = schedulerStore;
    this.preparedItems = [];
    this.filteredItems = [];
  }
  prepareAppointments(items) {
    this.preparedItems = prepareAppointments(this.schedulerStore, items);
  }
  filterAppointments() {
    this.filteredItems = filterAppointments(this.schedulerStore, this.preparedItems);
  }
  hasAllDayAppointments() {
    return this.filteredItems.filter(item => item.isAllDayPanelOccupied).length > 0;
  }
  generateViewModel() {
    const viewType = this.schedulerStore.currentView.type;
    if (viewType === 'agenda') {
      const viewModel = generateAgendaViewModel(this.schedulerStore, this.filteredItems);
      return viewModel.map(item => _extends({}, item, {
        isAgendaModel: true,
        info: getAgendaAppointmentInfo(item)
      }));
    }
    const isSkipResizing = appointment => appointment.isAllDayPanelOccupied && viewType === 'day' && this.schedulerStore.currentView.intervalCount === 1;
    const viewModel = generateGridViewModel(this.schedulerStore, this.filteredItems);
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
      info: getAppointmentInfo(item)
    });
    const toCollectedItem = item => ({
      itemData: item.itemData,
      allDay: item.isAllDayPanelOccupied,
      groupIndex: item.groupIndex,
      width: item.width,
      height: item.height,
      info: getAppointmentInfo(item)
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
export default AppointmentLayoutManager;
