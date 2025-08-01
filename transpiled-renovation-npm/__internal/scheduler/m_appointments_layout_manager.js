"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../core/utils/common");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _index = require("../scheduler/r1/utils/index");
var _m_view_model_generator = require("./appointments/m_view_model_generator");
var _m_position_helper = require("./workspaces/helpers/m_position_helper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    this.appointmentViewModel = new _m_view_model_generator.AppointmentViewModelGenerator();
  }
  get appointmentRenderingStrategyName() {
    return appointmentRenderingStrategyMap[this.instance.currentView.type];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCellDimensions(options) {
    if (this.instance._workSpace) {
      return {
        width: this.instance._workSpace.getCellWidth(),
        height: this.instance._workSpace.getCellHeight(),
        allDayHeight: this.instance._workSpace.getAllDayHeight()
      };
    }
    return undefined;
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
      loadedResources: this.instance.option('loadedResources'),
      getResourceManager: () => this.instance.resourceManager,
      getAppointmentColor: this.instance.createGetAppointmentColor(),
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
      DOMMetaData,
      // agenda only
      instance: this.instance,
      agendaDuration: workspace.option('agendaDuration')
    };
  }
  createAppointmentsMap(items) {
    const renderingStrategyOptions = this._getRenderingStrategyOptions();
    const {
      viewModel,
      positionMap
    } = this.appointmentViewModel.generate(items, renderingStrategyOptions);
    this._positionMap = positionMap; // TODO get rid of this after remove old render
    return viewModel;
  }
  _isDataChanged(data) {
    const {
      appointmentDataProvider
    } = this.instance;
    const updatedData = appointmentDataProvider.getUpdatedAppointment();
    return updatedData === data || appointmentDataProvider.getUpdatedAppointmentKeys().some(item => data[item.key] === item.value);
  }
  _isAppointmentShouldAppear(currentAppointment, sourceAppointment) {
    return currentAppointment.needRepaint && sourceAppointment.needRemove;
  }
  _isSettingChanged(settings, sourceSetting) {
    if (settings.length !== sourceSetting.length) {
      return true;
    }
    const createSettingsToCompare = currentSetting => {
      const leftVirtualCellCount = currentSetting.leftVirtualCellCount || 0;
      const topVirtualCellCount = currentSetting.topVirtualCellCount || 0;
      const columnIndex = currentSetting.columnIndex + leftVirtualCellCount;
      const rowIndex = currentSetting.rowIndex + topVirtualCellCount;
      const hMax = currentSetting.reduced ? currentSetting.hMax : undefined;
      const vMax = currentSetting.reduced ? currentSetting.vMax : undefined;
      return _extends({}, currentSetting, {
        columnIndex,
        rowIndex,
        positionByMap: undefined,
        topVirtualCellCount: undefined,
        leftVirtualCellCount: undefined,
        leftVirtualWidth: undefined,
        topVirtualHeight: undefined,
        hMax,
        vMax,
        info: {}
      });
    };
    for (let i = 0; i < settings.length; i++) {
      const newSettings = createSettingsToCompare(settings[i]);
      const oldSettings = createSettingsToCompare(sourceSetting[i]);
      if (oldSettings) {
        // exclude sortedIndex property for comparison in commonUtils.equalByValue
        oldSettings.sortedIndex = newSettings.sortedIndex;
      }
      if (!(0, _common.equalByValue)(newSettings, oldSettings)) {
        return true;
      }
    }
    return false;
  }
  _getAssociatedSourceAppointment(currentAppointment, sourceAppointments) {
    for (let i = 0; i < sourceAppointments.length; i++) {
      const item = sourceAppointments[i];
      if (item.itemData === currentAppointment.itemData) {
        return item;
      }
    }
    return null;
  }
  _getDeletedAppointments(currentAppointments, sourceAppointments) {
    const result = [];
    for (let i = 0; i < sourceAppointments.length; i++) {
      const sourceAppointment = sourceAppointments[i];
      const currentAppointment = this._getAssociatedSourceAppointment(sourceAppointment, currentAppointments);
      if (!currentAppointment) {
        sourceAppointment.needRemove = true;
        result.push(sourceAppointment);
      }
    }
    return result;
  }
  getRepaintedAppointments(currentAppointments, sourceAppointments) {
    if (sourceAppointments.length === 0 || this.appointmentRenderingStrategyName === 'agenda') {
      return currentAppointments;
    }
    currentAppointments.forEach(appointment => {
      const sourceAppointment = this._getAssociatedSourceAppointment(appointment, sourceAppointments);
      if (sourceAppointment) {
        const isDataChanged = this._isDataChanged(appointment.itemData);
        const isSettingChanged = this._isSettingChanged(appointment.settings, sourceAppointment.settings);
        const isAppointmentShouldAppear = this._isAppointmentShouldAppear(appointment, sourceAppointment);
        appointment.needRepaint = isDataChanged || isSettingChanged || isAppointmentShouldAppear;
      }
    });
    return currentAppointments.concat(this._getDeletedAppointments(currentAppointments, sourceAppointments));
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