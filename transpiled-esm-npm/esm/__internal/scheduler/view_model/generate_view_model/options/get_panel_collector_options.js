import { getCollectorSize } from './get_collector_size';
import { getMaxLevel } from './get_max_level';
const UNLIMITED_COLLECTOR_SIZES = {
  collectorSize: {
    width: 0,
    height: 0
  },
  collectorWithMarginsSize: {
    width: 0,
    height: 0
  }
};
const ALL_DAY_COLLECTOR_WIDTH_FACTOR = 0.75;
const MIN_LEVEL_VERTICAL_VIEW = 1;
export const getPanelCollectorOptions = (schedulerStore, _ref) => {
  var _DOMMetaData$dateTabl;
  let {
    alwaysReserveSpaceForCollector,
    isTimelineView,
    viewOrientation,
    isAdaptivityEnabled,
    collectorCSS,
    DOMMetaData,
    panelName
  } = _ref;
  // vertical grouping has only regular panel with all day appointments and regular appointments
  const allDayPanelCellDOM = DOMMetaData.allDayPanelCellsMeta[0] || DOMMetaData.dateTableCellsMeta[0][0];
  const regularPanelCellDOM = ((_DOMMetaData$dateTabl = DOMMetaData.dateTableCellsMeta[1]) === null || _DOMMetaData$dateTabl === void 0 ? void 0 : _DOMMetaData$dateTabl[0]) || DOMMetaData.dateTableCellsMeta[0][0];
  const cellDOM = panelName === 'allDayPanel' ? allDayPanelCellDOM : regularPanelCellDOM;
  const allDayPanelCellSize = {
    width: allDayPanelCellDOM.width ?? 0,
    height: allDayPanelCellDOM.height ?? 0
  };
  const cellSize = {
    width: cellDOM.width ?? 0,
    height: cellDOM.height ?? 0
  };
  const maxAppointmentsPerCell = schedulerStore.getViewOption('maxAppointmentsPerCell');
  const collectorSizes = maxAppointmentsPerCell === 'unlimited' && !alwaysReserveSpaceForCollector ? UNLIMITED_COLLECTOR_SIZES : getCollectorSize(cellSize, collectorCSS, !isAdaptivityEnabled && panelName === 'allDayPanel' ? cellSize.width * ALL_DAY_COLLECTOR_WIDTH_FACTOR : 0);
  const maxLevel = getMaxLevel({
    maxAppointmentsPerCell,
    cellSize,
    collectorSize: collectorSizes.collectorWithMarginsSize,
    viewOrientation,
    isTimelineView,
    isAdaptivityEnabled
  });
  const minLevel = viewOrientation === 'vertical' ? MIN_LEVEL_VERTICAL_VIEW : getMaxLevel({
    maxAppointmentsPerCell: 'auto',
    cellSize,
    collectorSize: collectorSizes.collectorWithMarginsSize,
    viewOrientation,
    isTimelineView,
    isAdaptivityEnabled
  });
  return {
    allDayPanelCellSize,
    cellSize,
    collectorSizes,
    maxLevel,
    minLevel
  };
};