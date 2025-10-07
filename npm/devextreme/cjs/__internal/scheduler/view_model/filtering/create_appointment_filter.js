/**
* DevExtreme (cjs/__internal/scheduler/view_model/filtering/create_appointment_filter.js)
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
exports.createAppointmentFilter = void 0;
var _m_appointment_filter = require("./m_appointment_filter");
var _m_appointment_filter_virtual = require("./m_appointment_filter_virtual");
const FilterStrategyMap = {
  [_m_appointment_filter_virtual.AppointmentFilterVirtualStrategy.strategyName]: _m_appointment_filter_virtual.AppointmentFilterVirtualStrategy,
  [_m_appointment_filter.AppointmentFilterBaseStrategy.strategyName]: _m_appointment_filter.AppointmentFilterBaseStrategy
};
const createAppointmentFilter = scheduler => {
  const filterOptions = {
    resources: scheduler.option('resources'),
    getResourceManager: () => scheduler.resourceManager,
    dataAccessors: scheduler._dataAccessors,
    startDayHour: () => scheduler.getViewOption('startDayHour'),
    endDayHour: () => scheduler.getViewOption('endDayHour'),
    viewOffset: () => scheduler.getViewOffsetMs(),
    showAllDayPanel: () => scheduler.option('showAllDayPanel'),
    timeZoneCalculator: scheduler.timeZoneCalculator,
    //
    supportAllDayRow: scheduler._workSpace.supportAllDayRow(),
    viewType: () => scheduler._workSpace.type,
    viewDirection: () => scheduler._workSpace.viewDirection,
    dateRange: () => scheduler._workSpace.getDateRange(),
    groupCount: () => scheduler._workSpace._getGroupCount(),
    viewDataProvider: () => scheduler._workSpace.viewDataProvider,
    allDayPanelMode: () => scheduler.getViewOption('allDayPanelMode')
  };
  const filterStrategyName = scheduler.isVirtualScrolling() ? _m_appointment_filter_virtual.AppointmentFilterVirtualStrategy.strategyName : _m_appointment_filter.AppointmentFilterBaseStrategy.strategyName;
  const strategy = new FilterStrategyMap[filterStrategyName](filterOptions);
  return strategy;
};
exports.createAppointmentFilter = createAppointmentFilter;
