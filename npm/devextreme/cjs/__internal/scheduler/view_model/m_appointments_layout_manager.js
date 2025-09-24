/**
* DevExtreme (cjs/__internal/scheduler/view_model/m_appointments_layout_manager.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _index = require("../r1/utils/index");
var _m_position_helper = require("../workspaces/helpers/m_position_helper");
var _create_appointment_filter = require("./filtering/create_appointment_filter");
var _m_view_model_generator = require("./generate_view_model/m_view_model_generator");
var _get_appointment_data_items = require("./preparation/get_appointment_data_items");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const toMs = _date.default.dateToMilliseconds;
const appointmentRenderingStrategyMap = {
  day: 'vertical',
  week: 'week',
  workWeek: 'week',
  month: 'horizontalMonth',
  timelineDay: 'horizontal',
  timelineWeek: 'horizontal',
  timelineWorkWeek: 'horizontal',
  timelineMonth: 'horizontalMonthLine',
  agenda: 'agenda'
};
class AppointmentLayoutManager {
  constructor(instance) {
    this.instance = instance;
    this.preparedItems = [];
    this.filteredItems = [];
    this.appointmentViewModel = new _m_view_model_generator.AppointmentViewModelGenerator();
  }
  get appointmentRenderingStrategyName() {
    return appointmentRenderingStrategyMap[this.instance.currentView.type];
  }
  prepareItems(items) {
    this.preparedItems = (0, _get_appointment_data_items.getAppointmentDataItems)(items, this.instance._dataAccessors, this.instance.getViewOption('cellDuration'), this.instance.timeZoneCalculator);
  }
  filterAppointments() {
    const strategy = (0, _create_appointment_filter.createAppointmentFilter)(this.instance);
    this.filteredItems = strategy.filter(this.preparedItems);
  }
  hasAllDayAppointments() {
    const strategy = (0, _create_appointment_filter.createAppointmentFilter)(this.instance);
    return strategy.hasAllDayAppointments(this.filteredItems, this.preparedItems);
  }
  _getRenderingStrategyOptions() {
    const workspace = this.instance.getWorkSpace();
    const {
      virtualScrollingDispatcher
    } = this.instance.getWorkSpace();
    const {
      cellCountInsideLeftVirtualCell,
      cellCountInsideTopVirtualRow
    } = virtualScrollingDispatcher;
    const groupCount = this.instance.resourceManager.groupCount();
    const DOMMetaData = workspace.getDOMElementsMetaData();
    const allDayHeight = (0, _m_position_helper.getAllDayHeight)(workspace.option('showAllDayPanel'), workspace._isVerticalGroupedWorkSpace(), DOMMetaData);
    const rowCount = workspace._getRowCount();
    const {
      positionHelper,
      viewDataProvider
    } = workspace;
    const visibleDayDuration = viewDataProvider.getVisibleDayDuration(workspace.option('startDayHour'), workspace.option('endDayHour'), workspace.option('hoursInterval'));
    const cellDuration = (0, _index.getCellDuration)(workspace.type, workspace.option('startDayHour'), workspace.option('endDayHour'), workspace.option('hoursInterval'));
    return {
      resources: this.instance.option('resources'),
      getResourceManager: () => this.instance.resourceManager,
      getAppointmentColor: config => this.instance.resourceManager.getAppointmentColor(config),
      dataAccessors: this.instance._dataAccessors,
      appointmentRenderingStrategyName: this.appointmentRenderingStrategyName,
      adaptivityEnabled: this.instance.option('adaptivityEnabled'),
      rtlEnabled: this.instance.option('rtlEnabled'),
      startDayHour: this.instance.getViewOption('startDayHour'),
      endDayHour: this.instance.getViewOption('endDayHour'),
      viewOffset: this.instance.getViewOption('offset') * toMs('minute'),
      maxAppointmentsPerCell: this.instance.getViewOption('maxAppointmentsPerCell'),
      currentDate: this.instance.option('currentDate'),
      isVirtualScrolling: this.instance.isVirtualScrolling(),
      leftVirtualCellCount: cellCountInsideLeftVirtualCell,
      topVirtualCellCount: cellCountInsideTopVirtualRow,
      intervalCount: workspace.option('intervalCount'),
      hoursInterval: workspace.option('hoursInterval'),
      showAllDayPanel: workspace.option('showAllDayPanel'),
      isGroupedAllDayPanel: workspace.isGroupedAllDayPanel(),
      groups: this.instance.getViewOption('groups'),
      groupCount,
      rowCount,
      appointmentCountPerCell: this.instance.option('_appointmentCountPerCell'),
      appointmentOffset: this.instance.option('_appointmentOffset'),
      allowResizing: this.instance._allowResizing(),
      allowAllDayResizing: this.instance._allowAllDayResizing(),
      startViewDate: workspace.getStartViewDate(),
      groupOrientation: workspace._getRealGroupOrientation(),
      cellWidth: (0, _m_position_helper.getCellWidth)(DOMMetaData),
      cellHeight: (0, _m_position_helper.getCellHeight)(DOMMetaData),
      allDayHeight,
      resizableStep: positionHelper.getResizableStep(),
      visibleDayDuration,
      allDayPanelMode: this.instance.getViewOption('allDayPanelMode'),
      // appointment settings
      timeZoneCalculator: this.instance.timeZoneCalculator,
      timeZone: this.instance.option('timeZone'),
      firstDayOfWeek: this.instance.getFirstDayOfWeek(),
      viewStartDayHour: this.instance.getViewOption('startDayHour'),
      viewEndDayHour: this.instance.getViewOption('endDayHour'),
      viewType: workspace.type,
      endViewDate: workspace.getEndViewDate(),
      positionHelper,
      isGroupedByDate: workspace.isGroupedByDate(),
      cellDuration,
      cellDurationInMinutes: workspace.option('cellDuration'),
      viewDataProvider: workspace.viewDataProvider,
      supportAllDayRow: workspace.supportAllDayRow(),
      dateRange: workspace.getDateRange(),
      intervalDuration: workspace.getIntervalDuration(),
      allDayIntervalDuration: workspace.getIntervalDuration(true),
      isVerticalGroupOrientation: workspace.isVerticalOrientation(),
      _collectorOffset: this.instance.getCollectorOffset(),
      DOMMetaData,
      // agenda only
      instance: this.instance,
      agendaDuration: workspace.option('agendaDuration')
    };
  }
  createAppointmentsMap() {
    const renderingStrategyOptions = this._getRenderingStrategyOptions();
    const {
      viewModel,
      positionMap
    } = this.appointmentViewModel.generate(this.filteredItems, renderingStrategyOptions);
    this._positionMap = positionMap;
    return viewModel;
  }
  getRenderingStrategyInstance() {
    const renderingStrategy = this.appointmentViewModel.getRenderingStrategy();
    if (!renderingStrategy) {
      const options = this._getRenderingStrategyOptions();
      this.appointmentViewModel.initRenderingStrategy(options);
    }
    return this.appointmentViewModel.getRenderingStrategy();
  }
}
var _default = exports.default = AppointmentLayoutManager;
