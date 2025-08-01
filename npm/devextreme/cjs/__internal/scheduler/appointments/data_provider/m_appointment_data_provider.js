/**
* DevExtreme (cjs/__internal/scheduler/appointments/data_provider/m_appointment_data_provider.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentDataProvider = void 0;
var _config = _interopRequireDefault(require("../../../../core/config"));
var _index = require("../../r1/filterting/index");
var _m_appointment_data_source = require("./m_appointment_data_source");
var _m_appointment_filter = require("./m_appointment_filter");
var _m_appointment_filter_virtual = require("./m_appointment_filter_virtual");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FilterStrategyMap = {
  [_m_appointment_filter_virtual.AppointmentFilterVirtualStrategy.strategyName]: _m_appointment_filter_virtual.AppointmentFilterVirtualStrategy,
  [_m_appointment_filter.AppointmentFilterBaseStrategy.strategyName]: _m_appointment_filter.AppointmentFilterBaseStrategy
};
class AppointmentDataProvider {
  constructor(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.dataAccessors;
    this.timeZoneCalculator = this.options.timeZoneCalculator;
    this.appointmentDataSource = new _m_appointment_data_source.AppointmentDataSource(this.dataSource);
    this.initFilterStrategy();
  }
  get keyName() {
    return this.appointmentDataSource.keyName;
  }
  get isDataSourceInit() {
    return !!this.dataSource;
  }
  get filterStrategyName() {
    return this.options.getIsVirtualScrolling() ? _m_appointment_filter_virtual.AppointmentFilterVirtualStrategy.strategyName : _m_appointment_filter.AppointmentFilterBaseStrategy.strategyName;
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
    const filter = (0, _index.combineRemoteFilter)({
      dataSourceFilter,
      dataAccessors: this.dataAccessors,
      min,
      max,
      dateSerializationFormat,
      forceIsoDateParsing: (0, _config.default)().forceIsoDateParsing
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
exports.AppointmentDataProvider = AppointmentDataProvider;
