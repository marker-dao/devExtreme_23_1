import { AppointmentFilterBaseStrategy } from './m_appointment_filter';
import { AppointmentFilterVirtualStrategy } from './m_appointment_filter_virtual';
const FilterStrategyMap = {
  [AppointmentFilterVirtualStrategy.strategyName]: AppointmentFilterVirtualStrategy,
  [AppointmentFilterBaseStrategy.strategyName]: AppointmentFilterBaseStrategy
};
export const createAppointmentFilter = scheduler => {
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
  const filterStrategyName = scheduler.isVirtualScrolling() ? AppointmentFilterVirtualStrategy.strategyName : AppointmentFilterBaseStrategy.strategyName;
  const strategy = new FilterStrategyMap[filterStrategyName](filterOptions);
  return strategy;
};