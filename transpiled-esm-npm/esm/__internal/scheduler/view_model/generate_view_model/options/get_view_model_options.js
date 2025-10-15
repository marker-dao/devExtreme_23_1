import { getCompareOptions } from '../../common/get_compare_options';
const configByView = {
  day: {
    isTimelineView: false,
    isMonthView: false,
    viewOrientation: 'vertical'
  },
  week: {
    isTimelineView: false,
    isMonthView: false,
    viewOrientation: 'vertical'
  },
  workWeek: {
    isTimelineView: false,
    isMonthView: false,
    viewOrientation: 'vertical'
  },
  month: {
    isTimelineView: false,
    isMonthView: true,
    viewOrientation: 'horizontal'
  },
  timelineDay: {
    isTimelineView: true,
    isMonthView: false,
    viewOrientation: 'horizontal'
  },
  timelineWeek: {
    isTimelineView: true,
    isMonthView: false,
    viewOrientation: 'horizontal'
  },
  timelineWorkWeek: {
    isTimelineView: true,
    isMonthView: false,
    viewOrientation: 'horizontal'
  },
  timelineMonth: {
    isTimelineView: true,
    isMonthView: true,
    viewOrientation: 'horizontal'
  }
};
export const getViewModelOptions = schedulerStore => {
  const viewOffset = schedulerStore.getViewOffsetMs();
  const {
    groupOrientation,
    type
  } = schedulerStore.currentView;
  const groupCount = schedulerStore.resourceManager.groupCount();
  const isGroupByDate = Boolean(groupCount && groupOrientation === 'horizontal' && schedulerStore.getViewOption('groupByDate'));
  const compareOptions = getCompareOptions(schedulerStore);
  const {
    isTimelineView,
    isMonthView,
    viewOrientation
  } = configByView[type];
  const isRTLEnabled = Boolean(schedulerStore.option('rtlEnabled'));
  const isAdaptivityEnabled = Boolean(schedulerStore.option('adaptivityEnabled'));
  const cellDurationMinutes = schedulerStore.getViewOption('cellDuration');
  const allDayPanelMode = schedulerStore.getViewOption('allDayPanelMode');
  const showAllDayPanel = schedulerStore.getViewOption('showAllDayPanel');
  const isVirtualScrolling = schedulerStore.isVirtualScrolling();
  return {
    type,
    viewOffset,
    groupOrientation,
    isGroupByDate,
    groupCount,
    compareOptions,
    isTimelineView,
    isMonthView,
    viewOrientation,
    isRTLEnabled,
    isAdaptivityEnabled,
    cellDurationMinutes,
    hasAllDayPanel: showAllDayPanel && allDayPanelMode !== 'hidden' && viewOrientation === 'vertical',
    isVirtualScrolling
  };
};