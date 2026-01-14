/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/options/option_manager.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Cache } from '../../../global_cache';
import { getGroupSize } from './get_group_size';
import { getMonthIntervals } from './get_month_intervals';
import { getPanelCollectorOptions } from './get_panel_collector_options';
import { getViewModelOptions } from './get_view_model_options';
import { getWeekIntervals } from './get_week_intervals';
const getLayoutIntervals = (compareOptions, cellDurationMinutes, viewOffset, isTimeline, isMonthView, panelName) => {
  switch (true) {
    case isMonthView:
      return getMonthIntervals(compareOptions, viewOffset, isTimeline);
    case panelName === 'allDayPanel':
      return getMonthIntervals(compareOptions, viewOffset, true);
    default:
      return getWeekIntervals(compareOptions, cellDurationMinutes, viewOffset, isTimeline);
  }
};
export class OptionManager {
  constructor(schedulerStore) {
    this.schedulerStore = schedulerStore;
    this.cache = new Cache();
    this.options = getViewModelOptions(schedulerStore);
  }
  getPanelOptions(panelName) {
    const workspace = this.schedulerStore.getWorkSpace();
    const panelDOMSize = workspace.getPanelDOMSize(this.options.groupOrientation === 'vertical' ? 'regularPanel' : panelName);
    return this.cache.memo(`${panelDOMSize.width}.${panelDOMSize.height}.${panelName}`, () => {
      const {
        type,
        viewOffset,
        groupOrientation,
        viewOrientation: nativeViewOrientation,
        isGroupByDate,
        groupCount,
        compareOptions,
        isMonthView,
        isRTLEnabled,
        isAdaptivityEnabled,
        cellDurationMinutes,
        isTimelineView,
        hasAllDayPanel
      } = this.options;
      const viewOrientation = panelName === 'allDayPanel' ? 'horizontal' : nativeViewOrientation;
      const isCompactCollector = isAdaptivityEnabled || viewOrientation === 'vertical';
      const collectorCSS = workspace.getCollectorDimension(isCompactCollector, panelName);
      const {
        allDayPanelCellSize,
        cellSize,
        collectorSizes,
        maxLevel,
        minLevel
      } = getPanelCollectorOptions(this.schedulerStore, {
        alwaysReserveSpaceForCollector: type === 'month',
        isTimelineView,
        viewOrientation,
        isAdaptivityEnabled,
        collectorCSS,
        DOMMetaData: workspace.getDOMElementsMetaData(),
        panelName
      });
      const {
        cells,
        dayIntervals,
        intervals
      } = getLayoutIntervals(compareOptions, cellDurationMinutes, viewOffset, isTimelineView || panelName === 'allDayPanel', isMonthView, panelName);
      const groupByDateSplitIntervals = viewOrientation === 'vertical' ? dayIntervals : cells;
      const splitIntervals = isGroupByDate ? groupByDateSplitIntervals : intervals;
      const geometryOptions = Object.assign({
        intervals,
        cells,
        maxAppointmentsPerCell: maxLevel,
        hasAllDayPanel,
        viewOrientation,
        groupOrientation,
        isGroupByDate,
        isTimelineView,
        isRTLEnabled,
        isAdaptivityEnabled,
        allDayPanelCellSize,
        cellSize,
        collectorPosition: viewOrientation === 'vertical' ? 'end' : 'start'
      }, collectorSizes, {
        groupCount,
        groupSize: getGroupSize(Object.assign({}, compareOptions, {
          cellSize,
          cellDurationMinutes,
          intervals,
          cells,
          viewType: type,
          isAllDayPanel: panelName === 'allDayPanel'
        })),
        panelSize: panelDOMSize
      });
      const collectorOptions = {
        cells,
        minLevel,
        maxLevel,
        collectBy: viewOrientation === 'horizontal' ? 'byOccupation' : 'byStartDate',
        isCompact: isCompactCollector
      };
      return {
        splitIntervals,
        cells,
        collectorOptions,
        geometryOptions
      };
    });
  }
  getSplitIntervals(panelName) {
    return this.getPanelOptions(panelName).splitIntervals;
  }
  getCells(panelName) {
    return this.getPanelOptions(panelName).cells;
  }
  getCollectorOptions(panelName) {
    return this.getPanelOptions(panelName).collectorOptions;
  }
  getGeometryOptions(panelName) {
    return this.getPanelOptions(panelName).geometryOptions;
  }
  getVirtualCropOptions() {
    const {
      cellSize,
      panelSize
    } = this.getPanelOptions('regularPanel').geometryOptions;
    const {
      positionHelper,
      virtualScrollingDispatcher
    } = this.schedulerStore.getWorkSpace();
    const {
      hasAllDayPanel,
      groupCount,
      groupOrientation,
      isVirtualScrolling,
      isRTLEnabled
    } = this.options;
    const {
      cellCountInsideLeftVirtualCell,
      cellCountInsideRightVirtualCell,
      cellCountInsideTopVirtualRow
    } = virtualScrollingDispatcher;
    const hVirtualItemsCount = isRTLEnabled ? cellCountInsideRightVirtualCell : cellCountInsideLeftVirtualCell;
    const isVerticalGrouping = groupCount > 0 && groupOrientation === 'vertical';
    const isGroupedAllDayPanel = isVerticalGrouping && hasAllDayPanel;
    return {
      isVirtualScrolling,
      getVirtualScreen: groupIndex => this.cache.memo(`virtualScreen${groupIndex}`, () => {
        const left = hVirtualItemsCount * cellSize.width;
        const top = cellCountInsideTopVirtualRow * cellSize.height;
        const right = Math.round(positionHelper.getHorizontalMax(groupIndex)) || Infinity;
        const bottom = positionHelper.getVerticalMax({
          groupIndex,
          isVirtualScrolling,
          showAllDayPanel: hasAllDayPanel,
          supportAllDayRow: hasAllDayPanel,
          isGroupedAllDayPanel,
          isVerticalGrouping
        });
        return {
          left: isRTLEnabled ? panelSize.width - right : left,
          right: isRTLEnabled ? panelSize.width - left : right,
          top,
          bottom
        };
      })
    };
  }
}
