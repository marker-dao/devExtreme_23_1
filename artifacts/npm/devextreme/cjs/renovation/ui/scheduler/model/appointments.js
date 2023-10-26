/**
* DevExtreme (cjs/renovation/ui/scheduler/model/appointments.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getAppointmentsModel = exports.getAppointmentsConfig = void 0;
var _m_position_helper = require("../../../../__internal/scheduler/workspaces/helpers/m_position_helper");
var _m_utils = require("../../../../__internal/scheduler/resources/m_utils");
var _utils = require("../workspaces/utils");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _base = require("../view_model/to_test/views/utils/base");
var _utils2 = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const toMs = name => _date.default.dateToMilliseconds(name);
const getAppointmentsConfig = (schedulerConfig, viewConfig, loadedResources, viewDataProvider, isAllDayPanelSupported) => {
  const groupCount = (0, _m_utils.getGroupCount)(loadedResources);
  const startViewDate = viewDataProvider.getStartViewDate();
  const dateRange = [startViewDate, viewDataProvider.getLastViewDateByEndDayHour(viewConfig.endDayHour)];
  return {
    adaptivityEnabled: schedulerConfig.adaptivityEnabled,
    rtlEnabled: schedulerConfig.rtlEnabled,
    resources: schedulerConfig.resources,
    timeZone: schedulerConfig.timeZone,
    groups: schedulerConfig.groups,
    startDayHour: viewConfig.startDayHour,
    viewStartDayHour: viewConfig.startDayHour,
    endDayHour: viewConfig.endDayHour,
    viewEndDayHour: viewConfig.endDayHour,
    currentDate: viewConfig.currentDate,
    isVirtualScrolling: viewConfig.scrolling.mode === 'virtual',
    intervalCount: viewConfig.intervalCount,
    hoursInterval: viewConfig.hoursInterval,
    showAllDayPanel: viewConfig.showAllDayPanel,
    allDayPanelMode: viewConfig.allDayPanelMode,
    supportAllDayRow: isAllDayPanelSupported,
    groupOrientation: viewDataProvider.getViewOptions().groupOrientation,
    firstDayOfWeek: viewConfig.firstDayOfWeek,
    viewType: viewConfig.type,
    cellDurationInMinutes: viewConfig.cellDuration,
    maxAppointmentsPerCell: viewConfig.maxAppointmentsPerCell,
    isVerticalGroupOrientation: viewDataProvider.getViewOptions().isVerticalGrouping,
    groupByDate: viewDataProvider.getViewOptions().isGroupedByDate,
    startViewDate,
    loadedResources,
    appointmentCountPerCell: 2,
    appointmentOffset: 26,
    allowResizing: false,
    allowAllDayResizing: false,
    dateTableOffset: 0,
    groupCount,
    dateRange
  };
};
exports.getAppointmentsConfig = getAppointmentsConfig;
const getAppointmentsModel = (appointmentsConfig, viewDataProvider, timeZoneCalculator, dataAccessors, cellsMetaData) => {
  const groupedByDate = (0, _utils.isGroupingByDate)(appointmentsConfig.groups, appointmentsConfig.groupOrientation, appointmentsConfig.groupByDate);
  const {
    groupCount,
    isVerticalGroupOrientation
  } = appointmentsConfig;
  const positionHelper = new _m_position_helper.PositionHelper({
    viewDataProvider,
    groupedByDate,
    rtlEnabled: appointmentsConfig.rtlEnabled,
    groupCount,
    isVerticalGrouping: groupCount && isVerticalGroupOrientation,
    getDOMMetaDataCallback: () => cellsMetaData
  });
  const isGroupedAllDayPanel = (0, _base.calculateIsGroupedAllDayPanel)(appointmentsConfig.loadedResources, appointmentsConfig.groupOrientation, appointmentsConfig.showAllDayPanel);
  const rowCount = viewDataProvider.getRowCount({
    intervalCount: appointmentsConfig.intervalCount,
    currentDate: appointmentsConfig.currentDate,
    viewType: appointmentsConfig.viewType,
    hoursInterval: appointmentsConfig.hoursInterval,
    startDayHour: appointmentsConfig.startDayHour,
    endDayHour: appointmentsConfig.endDayHour
  });
  const allDayHeight = (0, _m_position_helper.getAllDayHeight)(appointmentsConfig.showAllDayPanel, appointmentsConfig.isVerticalGroupOrientation, cellsMetaData);
  const endViewDate = viewDataProvider.getLastCellEndDate();
  const visibleDayDuration = viewDataProvider.getVisibleDayDuration(appointmentsConfig.startDayHour, appointmentsConfig.endDayHour, appointmentsConfig.hoursInterval);
  const {
    startCellIndex: leftVirtualCellCount,
    startRowIndex: topVirtualRowCount
  } = viewDataProvider.getViewOptions();
  const cellDuration = (0, _base.getCellDuration)(appointmentsConfig.viewType, appointmentsConfig.startDayHour, appointmentsConfig.endDayHour, appointmentsConfig.hoursInterval);
  const appointmentRenderingStrategyName = (0, _utils2.getAppointmentRenderingStrategyName)(appointmentsConfig.viewType);
  return _extends({}, appointmentsConfig, {
    appointmentRenderingStrategyName,
    loadedResources: appointmentsConfig.loadedResources,
    dataAccessors,
    timeZoneCalculator,
    viewDataProvider,
    positionHelper,
    isGroupedAllDayPanel,
    rowCount,
    cellWidth: (0, _m_position_helper.getCellWidth)(cellsMetaData),
    cellHeight: (0, _m_position_helper.getCellHeight)(cellsMetaData),
    allDayHeight,
    isGroupedByDate: groupedByDate,
    endViewDate,
    visibleDayDuration,
    intervalDuration: cellDuration,
    allDayIntervalDuration: toMs('day'),
    leftVirtualCellCount,
    topVirtualCellCount: topVirtualRowCount,
    cellDuration,
    resizableStep: positionHelper.getResizableStep(),
    DOMMetaData: cellsMetaData
  });
};
exports.getAppointmentsModel = getAppointmentsModel;
