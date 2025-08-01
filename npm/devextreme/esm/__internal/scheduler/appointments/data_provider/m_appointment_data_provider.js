/**
* DevExtreme (esm/__internal/scheduler/appointments/data_provider/m_appointment_data_provider.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import config from '../../../../core/config';
import { combineRemoteFilter } from '../../r1/filterting/index';
import { AppointmentDataSource } from './m_appointment_data_source';
import { AppointmentFilterBaseStrategy } from './m_appointment_filter';
import { AppointmentFilterVirtualStrategy } from './m_appointment_filter_virtual';
const FilterStrategyMap = {
  [AppointmentFilterVirtualStrategy.strategyName]: AppointmentFilterVirtualStrategy,
  [AppointmentFilterBaseStrategy.strategyName]: AppointmentFilterBaseStrategy
};
export class AppointmentDataProvider {
  constructor(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.dataAccessors;
    this.timeZoneCalculator = this.options.timeZoneCalculator;
    this.appointmentDataSource = new AppointmentDataSource(this.dataSource);
    this.initFilterStrategy();
  }
  get keyName() {
    return this.appointmentDataSource.keyName;
  }
  get isDataSourceInit() {
    return !!this.dataSource;
  }
  get filterStrategyName() {
    return this.options.getIsVirtualScrolling() ? AppointmentFilterVirtualStrategy.strategyName : AppointmentFilterBaseStrategy.strategyName;
  }
  getFilterStrategy() {
    if (!this.filterStrategy || this.filterStrategy.constructor.strategyName !== this.filterStrategyName) {
      this.initFilterStrategy();
    }
    return this.filterStrategy;
  }
  initFilterStrategy() {
    const filterOptions = {
      resources: this.options.resources,
      getResourceManager: this.options.getResourceManager,
      dataAccessors: this.dataAccessors,
      startDayHour: this.options.startDayHour,
      endDayHour: this.options.endDayHour,
      viewOffset: this.options.viewOffset,
      showAllDayPanel: this.options.showAllDayPanel,
      timeZoneCalculator: this.options.timeZoneCalculator,
      //
      supportAllDayRow: this.options.getSupportAllDayRow,
      viewType: this.options.getViewType,
      viewDirection: this.options.getViewDirection,
      dateRange: this.options.getDateRange,
      groupCount: this.options.getGroupCount,
      viewDataProvider: this.options.getViewDataProvider,
      allDayPanelMode: this.options.allDayPanelMode
    };
    const strategy = new FilterStrategyMap[this.filterStrategyName](filterOptions);
    this.filterStrategy = strategy;
  }
  setDataSource(dataSource) {
    this.dataSource = dataSource;
    this.initFilterStrategy();
    this.appointmentDataSource.setDataSource(this.dataSource);
  }
  updateDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
    this.initFilterStrategy();
  }
  // Filter mapping
  filter(preparedItems) {
    return this.getFilterStrategy().filter(preparedItems);
  }
  // TODO rename to the setRemoteFilter
  filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    if (!this.dataSource || !remoteFiltering) {
      return;
    }
    const dataSourceFilter = this.dataSource.filter();
    const filter = combineRemoteFilter({
      dataSourceFilter,
      dataAccessors: this.dataAccessors,
      min,
      max,
      dateSerializationFormat,
      forceIsoDateParsing: config().forceIsoDateParsing
    });
    this.dataSource.filter(filter);
  }
  hasAllDayAppointments(filteredItems, preparedItems) {
    return this.getFilterStrategy().hasAllDayAppointments(filteredItems, preparedItems);
  }
  // Appointment data source mappings
  cleanState() {
    this.appointmentDataSource.cleanState();
  }
  getUpdatedAppointment() {
    return this.appointmentDataSource._updatedAppointment;
  }
  getUpdatedAppointmentKeys() {
    return this.appointmentDataSource._updatedAppointmentKeys;
  }
  add(rawAppointment) {
    return this.appointmentDataSource.add(rawAppointment);
  }
  update(target, rawAppointment) {
    return this.appointmentDataSource.update(target, rawAppointment);
  }
  remove(rawAppointment) {
    return this.appointmentDataSource.remove(rawAppointment);
  }
  destroy() {
    this.appointmentDataSource.destroy();
  }
}
