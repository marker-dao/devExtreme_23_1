/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/options/option_manager.js)
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
exports.OptionManager = void 0;
var _global_cache = require("../../../global_cache");
var _get_group_size = require("./get_group_size");
var _get_month_intervals = require("./get_month_intervals");
var _get_panel_collector_options = require("./get_panel_collector_options");
var _get_view_model_options = require("./get_view_model_options");
var _get_week_intervals = require("./get_week_intervals");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const getLayoutIntervals = (compareOptions, cellDurationMinutes, viewOffset, isTimeline, isMonthView, panelName) => {
  switch (true) {
    case isMonthView:
      return (0, _get_month_intervals.getMonthIntervals)(compareOptions, viewOffset, isTimeline);
    case panelName === 'allDayPanel':
      return (0, _get_month_intervals.getMonthIntervals)(compareOptions, viewOffset, true);
    default:
      return (0, _get_week_intervals.getWeekIntervals)(compareOptions, cellDurationMinutes, viewOffset, isTimeline);
  }
};
class OptionManager {
  constructor(schedulerStore) {
    this.schedulerStore = schedulerStore;
    this.cache = new _global_cache.Cache();
    this.options = (0, _get_view_model_options.getViewModelOptions)(schedulerStore);
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
      } = (0, _get_panel_collector_options.getPanelCollectorOptions)(this.schedulerStore, {
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
      const geometryOptions = _extends({
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
        groupSize: (0, _get_group_size.getGroupSize)(_extends({}, compareOptions, {
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
exports.OptionManager = OptionManager;
