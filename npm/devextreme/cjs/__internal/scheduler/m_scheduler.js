/**
* DevExtreme (cjs/__internal/scheduler/m_scheduler.js)
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
exports.default = exports.POPUP_DIALOG_CLASS = void 0;
var _visibility_change = require("../../common/core/events/visibility_change");
var _date = _interopRequireDefault(require("../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _config = _interopRequireDefault(require("../../core/config"));
var _element = require("../../core/element");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _bindable_template = require("../../core/templates/bindable_template");
var _empty_template = require("../../core/templates/empty_template");
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _common = require("../../core/utils/common");
var _data = require("../../core/utils/data");
var _date2 = _interopRequireDefault(require("../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _position = require("../../core/utils/position");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _data_helper = _interopRequireDefault(require("../../data_helper"));
var _dialog = require("../../ui/dialog");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
var _date3 = require("../core/utils/date");
var _a11y_status_render = require("./a11y_status/a11y_status_render");
var _a11y_status_text = require("./a11y_status/a11y_status_text");
var _m_form = require("./appointment_popup/m_form");
var _m_legacy_form = require("./appointment_popup/m_legacy_form");
var _m_legacy_popup = require("./appointment_popup/m_legacy_popup");
var _m_popup = require("./appointment_popup/m_popup");
var _m_appointment_collection = _interopRequireDefault(require("./appointments/m_appointment_collection"));
var _m_widget_notify_scheduler = _interopRequireDefault(require("./base/m_widget_notify_scheduler"));
var _m_header = require("./header/m_header");
var _m_compact_appointments_helper = require("./m_compact_appointments_helper");
var _m_loading = require("./m_loading");
var _m_subscribes = _interopRequireDefault(require("./m_subscribes"));
var _m_utils = require("./m_utils");
var _m_utils_time_zone = _interopRequireDefault(require("./m_utils_time_zone"));
var _remote = require("./r1/filterting/remote");
var _index = require("./r1/timezone_calculator/index");
var _index2 = require("./r1/utils/index");
var _validate_rule = require("./recurrence/validate_rule");
var _scheduler_options_base_widget = require("./scheduler_options_base_widget");
var _m_desktop_tooltip_strategy = require("./tooltip_strategies/m_desktop_tooltip_strategy");
var _m_mobile_tooltip_strategy = require("./tooltip_strategies/m_mobile_tooltip_strategy");
var _appointment_adapter = require("./utils/appointment_adapter/appointment_adapter");
var _appointment_data_accessor = require("./utils/data_accessor/appointment_data_accessor");
var _get_targeted_appointment = require("./utils/get_targeted_appointment");
var _index3 = require("./utils/index");
var _is_agenda_workpace_component = require("./utils/is_agenda_workpace_component");
var _constants_view = require("./utils/options/constants_view");
var _appointment_groups_utils = require("./utils/resource_manager/appointment_groups_utils");
var _popup_utils = require("./utils/resource_manager/popup_utils");
var _resource_manager = require("./utils/resource_manager/resource_manager");
var _m_appointment_data_source = require("./view_model/generate_view_model/data_provider/m_appointment_data_source");
var _m_appointments_layout_manager = _interopRequireDefault(require("./view_model/m_appointments_layout_manager"));
var _m_agenda = _interopRequireDefault(require("./workspaces/m_agenda"));
var _m_timeline_day = _interopRequireDefault(require("./workspaces/m_timeline_day"));
var _m_timeline_month = _interopRequireDefault(require("./workspaces/m_timeline_month"));
var _m_timeline_week = _interopRequireDefault(require("./workspaces/m_timeline_week"));
var _m_timeline_work_week = _interopRequireDefault(require("./workspaces/m_timeline_work_week"));
var _m_work_space_day = _interopRequireDefault(require("./workspaces/m_work_space_day"));
var _m_work_space_month = _interopRequireDefault(require("./workspaces/m_work_space_month"));
var _m_work_space_week = _interopRequireDefault(require("./workspaces/m_work_space_week"));
var _m_work_space_work_week = _interopRequireDefault(require("./workspaces/m_work_space_work_week"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error
const toMs = _date2.default.dateToMilliseconds;
const WIDGET_CLASS = 'dx-scheduler';
const WIDGET_SMALL_CLASS = `${WIDGET_CLASS}-small`;
const WIDGET_ADAPTIVE_CLASS = `${WIDGET_CLASS}-adaptive`;
const WIDGET_READONLY_CLASS = `${WIDGET_CLASS}-readonly`;
const POPUP_DIALOG_CLASS = exports.POPUP_DIALOG_CLASS = 'dx-dialog';
const WIDGET_SMALL_WIDTH = 400;
const FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
const UTC_FULL_DATE_FORMAT = `${FULL_DATE_FORMAT}Z`;
const VIEWS_CONFIG = {
  day: {
    workSpace: _m_work_space_day.default,
    renderingStrategy: 'vertical'
  },
  week: {
    workSpace: _m_work_space_week.default,
    renderingStrategy: 'vertical'
  },
  workWeek: {
    workSpace: _m_work_space_work_week.default,
    renderingStrategy: 'vertical'
  },
  month: {
    workSpace: _m_work_space_month.default,
    renderingStrategy: 'horizontalMonth'
  },
  timelineDay: {
    workSpace: _m_timeline_day.default,
    renderingStrategy: 'horizontal'
  },
  timelineWeek: {
    workSpace: _m_timeline_week.default,
    renderingStrategy: 'horizontal'
  },
  timelineWorkWeek: {
    workSpace: _m_timeline_work_week.default,
    renderingStrategy: 'horizontal'
  },
  timelineMonth: {
    workSpace: _m_timeline_month.default,
    renderingStrategy: 'horizontalMonthLine'
  },
  agenda: {
    workSpace: _m_agenda.default,
    renderingStrategy: 'agenda'
  }
};
const StoreEventNames = {
  ADDING: 'onAppointmentAdding',
  ADDED: 'onAppointmentAdded',
  DELETING: 'onAppointmentDeleting',
  DELETED: 'onAppointmentDeleted',
  UPDATING: 'onAppointmentUpdating',
  UPDATED: 'onAppointmentUpdated'
};
const RECURRENCE_EDITING_MODE = {
  SERIES: 'editSeries',
  OCCURRENCE: 'editOccurrence',
  CANCEL: 'cancel'
};
class Scheduler extends _scheduler_options_base_widget.SchedulerOptionsBaseWidget {
  get timeZoneCalculator() {
    if (!this._timeZoneCalculator) {
      this._timeZoneCalculator = (0, _index.createTimeZoneCalculator)(this.option('timeZone'));
    }
    return this._timeZoneCalculator;
  }
  _postponeDataSourceLoading(promise) {
    this.postponedOperations.add('_reloadDataSource', this._reloadDataSource.bind(this), promise);
  }
  _postponeResourceLoading() {
    let forceReload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const whenLoaded = this.postponedOperations.add('loadResources', () => {
      const groups = this.getViewOption('groups');
      return (0, _deferred.fromPromise)(this.resourceManager.loadGroupResources(groups, forceReload));
    });
    // @ts-expect-error
    const resolveCallbacks = new _deferred.Deferred();
    whenLoaded.done(() => {
      resolveCallbacks.resolve();
    });
    this._postponeDataSourceLoading(whenLoaded);
    return resolveCallbacks.promise();
  }
  _optionChanged(args) {
    var _this$resourceManager;
    this.schedulerOptionChanged(args);
    const {
      value,
      name
    } = args;
    switch (args.name) {
      case 'customizeDateNavigatorText':
        this._updateOption('header', name, value);
        break;
      case 'firstDayOfWeek':
        this._updateOption('workSpace', name, value);
        this._updateOption('header', name, value);
        break;
      case 'currentDate':
        {
          const dateValue = this.getViewOption(name);
          this.option('selectedCellData', []);
          this._updateOption('workSpace', name, dateValue);
          this._updateOption('header', name, dateValue);
          this._updateOption('header', 'startViewDate', this.getStartViewDate());
          this._appointments.option('items', []);
          this._filterAppointmentsByDate();
          this._postponeDataSourceLoading();
          break;
        }
      case 'dataSource':
        // @ts-expect-error
        this._initDataSource();
        this._postponeResourceLoading().done(() => {
          this.appointmentDataSource.setDataSource(this._dataSource);
          this._filterAppointmentsByDate();
          this._updateOption('workSpace', 'showAllDayPanel', this.option('showAllDayPanel'));
        });
        break;
      case 'min':
      case 'max':
        {
          const value = this.getViewOption(name);
          this._updateOption('header', name, value);
          this._updateOption('workSpace', name, value);
          break;
        }
      case 'views':
        if (this.currentView) {
          this.repaint();
        } else {
          this._updateOption('header', 'views', this.views);
        }
        break;
      case 'useDropDownViewSwitcher':
        this._updateOption('header', name, value);
        break;
      case 'currentView':
        this._appointments.option({
          items: [],
          allowDrag: this._allowDragging(),
          allowResize: this._allowResizing(),
          itemTemplate: this._getAppointmentTemplate('appointmentTemplate')
        });
        this._postponeResourceLoading().done(() => {
          var _this$_header;
          this._refreshWorkSpace();
          (_this$_header = this._header) === null || _this$_header === void 0 || _this$_header.option(this._headerConfig());
          this._filterAppointmentsByDate();
          this._appointments.option('allowAllDayResize', value !== 'day');
        });
        // NOTE:
        // Calling postponed operations (promises) here, because when we update options with
        // usage of the beginUpdate / endUpdate methods, other option changes
        // may try to access not initialized values inside the scheduler component.
        this.postponedOperations.callPostponedOperations();
        break;
      case 'appointmentTemplate':
        this._appointments.option('itemTemplate', value);
        break;
      case 'dateCellTemplate':
      case 'resourceCellTemplate':
      case 'dataCellTemplate':
      case 'timeCellTemplate':
        this.repaint();
        break;
      case 'groups':
        this._postponeResourceLoading().done(() => {
          this._refreshWorkSpace();
          this._filterAppointmentsByDate();
        });
        break;
      case 'resources':
        (_this$resourceManager = this.resourceManager) === null || _this$resourceManager === void 0 || _this$resourceManager.dispose();
        this.resourceManager = new _resource_manager.ResourceManager(this.option('resources'));
        this.updateAppointmentDataSource();
        this._postponeResourceLoading().done(() => {
          this._appointments.option('items', []);
          this._refreshWorkSpace();
          this._filterAppointmentsByDate();
          this._createAppointmentPopupForm();
        });
        break;
      case 'startDayHour':
      case 'endDayHour':
        this.updateAppointmentDataSource();
        this._appointments.option('items', []);
        this._updateOption('workSpace', name, value);
        this._appointments.repaint();
        this._filterAppointmentsByDate();
        this._postponeDataSourceLoading();
        break;
      // TODO Vinogradov refactoring: merge it with startDayHour / endDayHour
      case 'offset':
        this.updateAppointmentDataSource();
        this._appointments.option('items', []);
        this._updateOption('workSpace', 'viewOffset', this.normalizeViewOffsetValue(value));
        this._appointments.repaint();
        this._filterAppointmentsByDate();
        this._postponeDataSourceLoading();
        break;
      case StoreEventNames.ADDING:
      case StoreEventNames.ADDED:
      case StoreEventNames.UPDATING:
      case StoreEventNames.UPDATED:
      case StoreEventNames.DELETING:
      case StoreEventNames.DELETED:
      case 'onAppointmentFormOpening':
      case 'onAppointmentTooltipShowing':
        this._actions[name] = this._createActionByOption(name);
        break;
      case 'onAppointmentRendered':
        this._appointments.option('onItemRendered', this._getAppointmentRenderedAction());
        break;
      case 'onAppointmentClick':
        this._appointments.option('onItemClick', this._createActionByOption(name));
        break;
      case 'onAppointmentDblClick':
        this._appointments.option(name, this._createActionByOption(name));
        break;
      case 'onAppointmentContextMenu':
        this._appointments.option('onItemContextMenu', this._createActionByOption(name));
        this._appointmentTooltip._options.onItemContextMenu = this._createActionByOption(name);
        break;
      case 'noDataText':
      case 'allowMultipleCellSelection':
      case 'selectedCellData':
      case 'accessKey':
      case 'onCellClick':
        this._updateOption('workSpace', name, value);
        break;
      case 'onCellContextMenu':
        this._updateOption('workSpace', name, value);
        break;
      case 'crossScrollingEnabled':
        this._postponeResourceLoading().done(() => {
          this._appointments.option('items', []);
          this._refreshWorkSpace();
          if (this._readyToRenderAppointments) {
            this._appointments.option('items', this._getAppointmentsToRepaint());
          }
        });
        break;
      case 'cellDuration':
        this._updateOption('workSpace', name, value);
        this._appointments.option('items', []);
        if (this._readyToRenderAppointments) {
          this._updateOption('workSpace', 'hoursInterval', value / 60);
          this._appointments.option('items', this._getAppointmentsToRepaint());
        }
        break;
      case 'tabIndex':
      case 'focusStateEnabled':
        this._updateOption('header', name, value);
        this._updateOption('workSpace', name, value);
        this._appointments.option(name, value);
        // @ts-expect-error
        super._optionChanged(args);
        break;
      case 'width':
        // TODO: replace with css
        this._updateOption('header', name, value);
        if (this.option('crossScrollingEnabled')) {
          this._updateOption('workSpace', 'width', value);
        }
        this._updateOption('workSpace', 'schedulerWidth', value);
        // @ts-expect-error
        super._optionChanged(args);
        this._dimensionChanged(null, true);
        break;
      case 'height':
        // @ts-expect-error
        super._optionChanged(args);
        this._dimensionChanged(null, true);
        this._updateOption('workSpace', 'schedulerHeight', value);
        break;
      case 'editing':
        {
          this._initEditing();
          const editing = this._editing;
          this._bringEditingModeToAppointments(editing);
          this.hideAppointmentTooltip();
          this._cleanPopup();
          break;
        }
      case 'showAllDayPanel':
        this.updateAppointmentDataSource();
        this.repaint();
        break;
      case 'showCurrentTimeIndicator':
      case 'indicatorUpdateInterval':
      case 'shadeUntilCurrentTime':
      case 'groupByDate':
        this._updateOption('workSpace', name, value);
        this.repaint();
        break;
      case 'indicatorTime':
        this._updateOption('workSpace', name, value);
        this._updateOption('header', name, value);
        this.repaint();
        break;
      case 'appointmentDragging':
      case 'appointmentTooltipTemplate':
      case 'appointmentPopupTemplate':
      case 'recurrenceEditMode':
      case 'remoteFiltering':
      case 'timeZone':
        this.updateAppointmentDataSource();
        this.repaint();
        break;
      case 'dropDownAppointmentTemplate':
      case 'appointmentCollectorTemplate':
      case '_appointmentTooltipOffset':
      case '_appointmentCountPerCell':
      case '_collectorOffset':
      case '_appointmentOffset':
        this.repaint();
        break;
      case 'dateSerializationFormat':
        break;
      case 'maxAppointmentsPerCell':
        break;
      case 'startDateExpr':
      case 'endDateExpr':
      case 'startDateTimeZoneExpr':
      case 'endDateTimeZoneExpr':
      case 'textExpr':
      case 'descriptionExpr':
      case 'allDayExpr':
      case 'recurrenceRuleExpr':
      case 'recurrenceExceptionExpr':
      case 'disabledExpr':
        this._updateExpression(name, value);
        this._initAppointmentTemplate();
        this.repaint();
        break;
      case 'adaptivityEnabled':
        this._toggleAdaptiveClass();
        this.repaint();
        break;
      case 'scrolling':
        this.option('crossScrollingEnabled', this._isHorizontalVirtualScrolling() || this.option('crossScrollingEnabled'));
        this._updateOption('workSpace', args.fullName, value);
        break;
      case 'allDayPanelMode':
        this.updateAppointmentDataSource();
        this._updateOption('workSpace', args.fullName, value);
        break;
      case 'renovateRender':
        this._updateOption('workSpace', name, value);
        break;
      case '_draggingMode':
        this._updateOption('workSpace', 'draggingMode', value);
        break;
      case 'toolbar':
        this._header ? this._header.onToolbarOptionChanged(args.fullName, value) : this.repaint();
        break;
      default:
        // @ts-expect-error
        super._optionChanged(args);
    }
  }
  _bringEditingModeToAppointments(editing) {
    const editingConfig = {
      allowDelete: editing.allowUpdating && editing.allowDeleting
    };
    if (!this._isAgenda()) {
      editingConfig.allowDrag = editing.allowDragging;
      editingConfig.allowResize = editing.allowResizing;
      editingConfig.allowAllDayResize = editing.allowResizing && this._supportAllDayResizing();
    }
    this._appointments.option(editingConfig);
    this.repaint();
  }
  _isAgenda() {
    return this._layoutManager.appointmentRenderingStrategyName === 'agenda';
  }
  _allowDragging() {
    return this._editing.allowDragging && !this._isAgenda();
  }
  _allowResizing() {
    return this._editing.allowResizing && !this._isAgenda();
  }
  _allowAllDayResizing() {
    return this._editing.allowResizing && this._supportAllDayResizing();
  }
  _supportAllDayResizing() {
    return this.currentView.type !== 'day' || this.currentView.intervalCount > 1;
  }
  _isAllDayExpanded() {
    return this.option('showAllDayPanel') && this._layoutManager.hasAllDayAppointments();
  }
  _filterAppointmentsByDate() {
    if (!this._workSpace) {
      return;
    }
    const dateRange = this._workSpace.getDateRange();
    const startDate = this.timeZoneCalculator.createDate(dateRange[0], 'fromGrid');
    const endDate = this.timeZoneCalculator.createDate(dateRange[1], 'fromGrid');
    this.setRemoteFilter(startDate, endDate, this.option('remoteFiltering'), this.option('dateSerializationFormat'));
  }
  setRemoteFilter(min, max) {
    let remoteFiltering = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let dateSerializationFormat = arguments.length > 3 ? arguments[3] : undefined;
    const dataSource = this._dataSource;
    const dataAccessors = this._dataAccessors;
    if (!dataSource || !remoteFiltering) {
      return;
    }
    const dataSourceFilter = dataSource.filter();
    const filter = (0, _remote.combineRemoteFilter)({
      dataSourceFilter,
      dataAccessors,
      min,
      max,
      dateSerializationFormat,
      forceIsoDateParsing: (0, _config.default)().forceIsoDateParsing
    });
    dataSource.filter(filter);
  }
  _reloadDataSource() {
    // @ts-expect-error
    const result = new _deferred.Deferred();
    if (this._dataSource) {
      this._dataSource.load().done(() => {
        (0, _m_loading.hide)();
        this._fireContentReadyAction(result);
      }).fail(() => {
        (0, _m_loading.hide)();
        result.reject();
      });
      this._dataSource.isLoading() && (0, _m_loading.show)({
        container: this.$element(),
        position: {
          of: this.$element()
        }
      });
    } else {
      this._fireContentReadyAction(result);
    }
    return result.promise();
  }
  _fireContentReadyAction(result) {
    // @ts-expect-error
    const contentReadyBase = super._fireContentReadyAction.bind(this);
    const fireContentReady = () => {
      contentReadyBase();
      result === null || result === void 0 || result.resolve();
    };
    if (this._workSpaceRecalculation) {
      var _this$_workSpaceRecal;
      (_this$_workSpaceRecal = this._workSpaceRecalculation) === null || _this$_workSpaceRecal === void 0 || _this$_workSpaceRecal.done(() => {
        fireContentReady();
      });
    } else {
      fireContentReady();
    }
  }
  _dimensionChanged(value) {
    let isForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const isFixedHeight = typeof this.option('height') === 'number';
    const isFixedWidth = typeof this.option('width') === 'number';
    // @ts-expect-error
    if (!this._isVisible()) {
      return;
    }
    this._toggleSmallClass();
    const workspace = this.getWorkSpace();
    if (!this._isAgenda() && this._layoutManager && workspace && !(0, _is_agenda_workpace_component.isAgendaWorkspaceComponent)(workspace)) {
      if (isForce || !isFixedHeight || !isFixedWidth) {
        workspace.option('allDayExpanded', this._isAllDayExpanded());
        workspace._dimensionChanged();
        const appointments = this._layoutManager.createAppointmentsMap();
        this._appointments.option('items', appointments);
      }
    }
    this.hideAppointmentTooltip();
    // TODO popup
    this._appointmentPopup.triggerResize();
    this._appointmentPopup.updatePopupFullScreenMode();
  }
  _clean() {
    this._cleanPopup();
    // @ts-expect-error
    super._clean();
  }
  _toggleSmallClass() {
    const {
      width
    } = (0, _position.getBoundingRect)(this.$element().get(0));
    this.$element().toggleClass(WIDGET_SMALL_CLASS, width < WIDGET_SMALL_WIDTH);
  }
  _toggleAdaptiveClass() {
    this.$element().toggleClass(WIDGET_ADAPTIVE_CLASS, this.option('adaptivityEnabled'));
  }
  _visibilityChanged(visible) {
    visible && this._dimensionChanged(null, true);
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _initAllDayPanel() {
    if (this.option('allDayPanelMode') === 'hidden') {
      this.option('showAllDayPanel', false);
    }
  }
  _init() {
    this._timeZonesPromise = _m_utils_time_zone.default.cacheTimeZones();
    this._initExpressions({
      startDateExpr: this.option('startDateExpr'),
      endDateExpr: this.option('endDateExpr'),
      startDateTimeZoneExpr: this.option('startDateTimeZoneExpr'),
      endDateTimeZoneExpr: this.option('endDateTimeZoneExpr'),
      allDayExpr: this.option('allDayExpr'),
      textExpr: this.option('textExpr'),
      descriptionExpr: this.option('descriptionExpr'),
      recurrenceRuleExpr: this.option('recurrenceRuleExpr'),
      recurrenceExceptionExpr: this.option('recurrenceExceptionExpr'),
      disabledExpr: this.option('disabledExpr')
    });
    super._init();
    this._initAllDayPanel();
    // @ts-expect-error
    this._initDataSource();
    this._customizeDataSourceLoadOptions();
    this.$element().addClass(WIDGET_CLASS);
    this._initEditing();
    this.updateAppointmentDataSource();
    this._initActions();
    this._compactAppointmentsHelper = new _m_compact_appointments_helper.CompactAppointmentsHelper(this);
    this._asyncTemplatesTimers = [];
    this._dataSourceLoadedCallback = (0, _callbacks.default)();
    this._subscribes = _m_subscribes.default;
    this.resourceManager = new _resource_manager.ResourceManager(this.option('resources'));
    this._notifyScheduler = new _m_widget_notify_scheduler.default({
      scheduler: this
    });
  }
  createAppointmentDataSource() {
    var _this$appointmentData;
    (_this$appointmentData = this.appointmentDataSource) === null || _this$appointmentData === void 0 || _this$appointmentData.destroy();
    this.appointmentDataSource = new _m_appointment_data_source.AppointmentDataSource(this._dataSource);
  }
  updateAppointmentDataSource() {
    this._timeZoneCalculator = null;
    if (this.getWorkSpace()) {
      this.createAppointmentDataSource();
    }
  }
  _customizeDataSourceLoadOptions() {
    var _this$_dataSource;
    (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 || _this$_dataSource.on('customizeStoreLoadOptions', _ref => {
      let {
        storeLoadOptions
      } = _ref;
      storeLoadOptions.startDate = this.getStartViewDate();
      storeLoadOptions.endDate = this.getEndViewDate();
    });
  }
  _initTemplates() {
    this._initAppointmentTemplate();
    this._templateManager.addDefaultTemplates({
      appointmentTooltip: new _empty_template.EmptyTemplate(),
      dropDownAppointment: new _empty_template.EmptyTemplate()
    });
    // @ts-expect-error
    super._initTemplates();
  }
  _initAppointmentTemplate() {
    const {
      expr
    } = this._dataAccessors;
    const createGetter = property => (0, _data.compileGetter)(`appointmentData.${property}`);
    const getDate = getter => data => {
      const value = getter(data);
      if (value instanceof Date) {
        return value.valueOf();
      }
      return value;
    };
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(($container, data, model) => this.getAppointmentsInstance()._renderAppointmentTemplate($container, data, model), ['html', 'text', 'startDate', 'endDate', 'allDay', 'description', 'recurrenceRule', 'recurrenceException', 'startDateTimeZone', 'endDateTimeZone'], this.option('integrationOptions.watchMethod'), {
        text: createGetter(expr.textExpr),
        startDate: getDate(createGetter(expr.startDateExpr)),
        endDate: getDate(createGetter(expr.endDateExpr)),
        startDateTimeZone: createGetter(expr.startDateTimeZoneExpr),
        endDateTimeZone: createGetter(expr.endDateTimeZoneExpr),
        allDay: createGetter(expr.allDayExpr),
        recurrenceRule: createGetter(expr.recurrenceRuleExpr)
      })
    });
  }
  _renderContent() {
    // @ts-expect-error
    this._renderContentImpl();
  }
  _dataSourceChangedHandler(result) {
    if (this._readyToRenderAppointments) {
      this._workSpaceRecalculation.done(() => {
        this._layoutManager.prepareItems(result);
        this._renderAppointments();
        this._updateA11yStatus();
        this.getWorkSpace().onDataSourceChanged(this._layoutManager.filteredItems);
      });
    }
  }
  isVirtualScrolling() {
    const workspace = this.getWorkSpace();
    if (workspace) {
      return workspace.isVirtualScrolling();
    }
    const scrolling = this.getViewOption('scrolling');
    return (scrolling === null || scrolling === void 0 ? void 0 : scrolling.mode) === 'virtual';
  }
  _renderAppointments() {
    const workspace = this.getWorkSpace();
    this._layoutManager.filterAppointments();
    workspace.option('allDayExpanded', this._isAllDayExpanded());
    // @ts-expect-error
    const viewModel = this._isVisible() ? this._getAppointmentsToRepaint() : [];
    this._appointments.option('items', viewModel);
    this.appointmentDataSource.cleanState();
  }
  _getAppointmentsToRepaint() {
    const appointmentsMap = this._layoutManager.createAppointmentsMap();
    return appointmentsMap;
  }
  _initExpressions(fields) {
    this._dataAccessors = new _appointment_data_accessor.AppointmentDataAccessor(fields, Boolean((0, _config.default)().forceIsoDateParsing), this.option('dateSerializationFormat'));
  }
  _updateExpression(name, value) {
    this._dataAccessors.updateExpression(name, value);
  }
  _initEditing() {
    const editing = this.option('editing');
    this._editing = {
      allowAdding: Boolean(editing),
      allowUpdating: Boolean(editing),
      allowDeleting: Boolean(editing),
      allowResizing: Boolean(editing),
      allowDragging: Boolean(editing),
      legacyForm: false
    };
    if ((0, _type.isObject)(editing)) {
      this._editing = (0, _extend.extend)(this._editing, editing);
    }
    this._editing.allowDragging = this._editing.allowDragging && this._editing.allowUpdating;
    this._editing.allowResizing = this._editing.allowResizing && this._editing.allowUpdating;
    const isReadOnly = Object.values(this._editing).every(value => !value);
    this.$element().toggleClass(WIDGET_READONLY_CLASS, isReadOnly);
  }
  _dispose() {
    var _this$resourceManager2, _this$_appointmentToo, _this$_recurrenceDial;
    (_this$resourceManager2 = this.resourceManager) === null || _this$resourceManager2 === void 0 || _this$resourceManager2.dispose();
    (_this$_appointmentToo = this._appointmentTooltip) === null || _this$_appointmentToo === void 0 || _this$_appointmentToo.dispose();
    (_this$_recurrenceDial = this._recurrenceDialog) === null || _this$_recurrenceDial === void 0 || _this$_recurrenceDial.hide(RECURRENCE_EDITING_MODE.CANCEL);
    this.hideAppointmentPopup();
    this.hideAppointmentTooltip();
    this._asyncTemplatesTimers.forEach(clearTimeout);
    this._asyncTemplatesTimers = [];
    // NOTE: Stop all scheduled macro tasks
    _index3.macroTaskArray.dispose();
    // @ts-expect-error
    super._dispose();
  }
  _initActions() {
    this._actions = {
      onAppointmentAdding: this._createActionByOption(StoreEventNames.ADDING),
      onAppointmentAdded: this._createActionByOption(StoreEventNames.ADDED),
      onAppointmentUpdating: this._createActionByOption(StoreEventNames.UPDATING),
      onAppointmentUpdated: this._createActionByOption(StoreEventNames.UPDATED),
      onAppointmentDeleting: this._createActionByOption(StoreEventNames.DELETING),
      onAppointmentDeleted: this._createActionByOption(StoreEventNames.DELETED),
      onAppointmentFormOpening: this._createActionByOption('onAppointmentFormOpening'),
      onAppointmentTooltipShowing: this._createActionByOption('onAppointmentTooltipShowing')
    };
  }
  _getAppointmentRenderedAction() {
    return this._createActionByOption('onAppointmentRendered', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _renderFocusTarget() {
    return (0, _common.noop)();
  }
  _updateA11yStatus() {
    const dateRange = this._workSpace.getDateRange();
    const indicatorTime = this.option('showCurrentTimeIndicator') ? (0, _index2.getToday)(this.option('indicatorTime'), this.timeZoneCalculator) : undefined;
    const label = (0, _a11y_status_text.getA11yStatusText)(this.currentView, dateRange[0], dateRange[1], this._appointments.appointmentsCount, indicatorTime);
    // @ts-expect-error
    this.setAria({
      label
    });
    this._a11yStatus.text(label);
  }
  _renderA11yStatus() {
    this._a11yStatus = (0, _a11y_status_render.createA11yStatusContainer)();
    this._a11yStatus.prependTo(this.$element());
    // @ts-expect-error
    this.setAria({
      role: 'group'
    });
  }
  _initMarkupOnResourceLoaded() {
    if (!this._disposed) {
      this._initMarkupCore();
      this._reloadDataSource();
    }
  }
  _initMarkup() {
    super._initMarkup();
    this._renderA11yStatus();
    this._renderMainContainer();
    this._renderHeader();
    this._layoutManager = new _m_appointments_layout_manager.default(this);
    // @ts-expect-error
    this._appointments = this._createComponent('<div>', _m_appointment_collection.default, this._appointmentsConfig());
    this._appointments.option('itemTemplate', this._getAppointmentTemplate('appointmentTemplate'));
    this._appointmentTooltip = new (this.option('adaptivityEnabled') ? _m_mobile_tooltip_strategy.MobileTooltipStrategy : _m_desktop_tooltip_strategy.DesktopTooltipStrategy)(this._getAppointmentTooltipOptions());
    this._createAppointmentPopupForm();
    // @ts-expect-error
    if (this._isDataSourceLoaded() || this._isDataSourceLoading()) {
      this._initMarkupCore();
      this._dataSourceChangedHandler(this._dataSource.items());
      this._fireContentReadyAction();
    } else {
      const groups = this.getViewOption('groups');
      if (groups !== null && groups !== void 0 && groups.length) {
        this.resourceManager.loadGroupResources(groups, true).then(() => this._initMarkupOnResourceLoaded());
      } else {
        this._initMarkupOnResourceLoaded();
      }
    }
  }
  _createAppointmentPopupForm() {
    var _this$_appointmentPop;
    if (this._appointmentForm) {
      var _this$_appointmentFor;
      (_this$_appointmentFor = this._appointmentForm.form) === null || _this$_appointmentFor === void 0 || _this$_appointmentFor.dispose();
    }
    this._appointmentForm = this.createAppointmentForm();
    (_this$_appointmentPop = this._appointmentPopup) === null || _this$_appointmentPop === void 0 || _this$_appointmentPop.dispose();
    this._appointmentPopup = this.createAppointmentPopup(this._appointmentForm);
  }
  _renderMainContainer() {
    this._mainContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-container');
    this.$element().append(this._mainContainer);
  }
  createAppointmentForm() {
    const scheduler = {
      createResourceEditorModel: () => (0, _popup_utils.createResourceEditorModel)(this.resourceManager.resourceById),
      getDataAccessors: () => this._dataAccessors,
      // @ts-expect-error
      createComponent: (element, component, options) => this._createComponent(element, component, options),
      getEditingConfig: () => this._editing,
      getFirstDayOfWeek: () => this.option('firstDayOfWeek'),
      getStartDayHour: () => this.option('startDayHour'),
      getCalculatedEndDate: startDateWithStartHour => this._workSpace.calculateEndDate(startDateWithStartHour),
      getTimeZoneCalculator: () => this.timeZoneCalculator
    };
    return this._editing.legacyForm ? new _m_legacy_form.AppointmentForm(scheduler) : new _m_form.AppointmentForm(scheduler);
  }
  createAppointmentPopup(form) {
    const scheduler = {
      getElement: () => this.$element(),
      // @ts-expect-error
      createComponent: (element, component, options) => this._createComponent(element, component, options),
      focus: () => this.focus(),
      getResourceManager: () => this.resourceManager,
      getEditingConfig: () => this._editing,
      getTimeZoneCalculator: () => this.timeZoneCalculator,
      getDataAccessors: () => this._dataAccessors,
      getAppointmentFormOpening: () => this._actions.onAppointmentFormOpening,
      processActionResult: (arg, canceled) => this._processActionResult(arg, canceled),
      addAppointment: appointment => this.addAppointment(appointment),
      updateAppointment: (sourceAppointment, updatedAppointment) => this.updateAppointment(sourceAppointment, updatedAppointment),
      updateScrollPosition: (startDate, appointmentGroupValues, inAllDayRow) => {
        this._workSpace.updateScrollPosition(startDate, appointmentGroupValues, inAllDayRow);
      }
    };
    return this._editing.legacyForm ? new _m_legacy_popup.AppointmentPopup(scheduler, form) : new _m_popup.AppointmentPopup(scheduler, form);
  }
  _getAppointmentTooltipOptions() {
    const that = this;
    return {
      // @ts-expect-error
      createComponent: that._createComponent.bind(that),
      container: that.$element(),
      getScrollableContainer: that.getWorkSpaceScrollableContainer.bind(that),
      addDefaultTemplates: that._templateManager.addDefaultTemplates.bind(that._templateManager),
      getAppointmentTemplate: that._getAppointmentTemplate.bind(that),
      showAppointmentPopup: that.showAppointmentPopup.bind(that),
      checkAndDeleteAppointment: that.checkAndDeleteAppointment.bind(that),
      isAppointmentInAllDayPanel: that.isAppointmentInAllDayPanel.bind(that),
      createFormattedDateText: (appointment, targetedAppointment, format) => this.fire('createFormattedDateText', appointment, targetedAppointment, format),
      getAppointmentDisabled: appointment => this._dataAccessors.get('disabled', appointment),
      onItemContextMenu: that._createActionByOption('onAppointmentContextMenu'),
      createEventArgs: that._createEventArgs.bind(that)
    };
  }
  _createEventArgs(e) {
    const config = {
      itemData: e.itemData.appointment,
      itemElement: e.itemElement,
      targetedAppointment: e.itemData.targetedAppointment
    };
    return (0, _extend.extend)({}, this.fire('mapAppointmentFields', config), {
      component: e.component,
      element: e.element,
      event: e.event,
      model: e.model
    });
  }
  checkAndDeleteAppointment(appointment, targetedAppointment) {
    const targetedAdapter = new _appointment_adapter.AppointmentAdapter(targetedAppointment, this._dataAccessors);
    const deletingOptions = this.fireOnAppointmentDeleting(appointment, targetedAdapter);
    this._checkRecurringAppointment(appointment, targetedAppointment, targetedAdapter.startDate, () => {
      this.processDeleteAppointment(appointment, deletingOptions);
    }, true);
  }
  _getExtraAppointmentTooltipOptions() {
    return {
      rtlEnabled: this.option('rtlEnabled'),
      focusStateEnabled: this.option('focusStateEnabled'),
      editing: this.option('editing'),
      offset: this.option('_appointmentTooltipOffset')
    };
  }
  isAppointmentInAllDayPanel(appointmentData) {
    const workSpace = this._workSpace;
    const itTakesAllDay = this.appointmentTakesAllDay(appointmentData);
    return itTakesAllDay && workSpace.supportAllDayRow() && workSpace.option('showAllDayPanel');
  }
  _initMarkupCore() {
    this._readyToRenderAppointments = (0, _window.hasWindow)();
    this._workSpace && this._cleanWorkspace();
    this._renderWorkSpace();
    this._appointments.option({
      fixedContainer: this._workSpace.getFixedContainer(),
      allDayContainer: this._workSpace.getAllDayContainer()
    });
    this._waitAsyncTemplate(() => {
      var _this$_workSpaceRecal2;
      return (_this$_workSpaceRecal2 = this._workSpaceRecalculation) === null || _this$_workSpaceRecal2 === void 0 ? void 0 : _this$_workSpaceRecal2.resolve();
    });
    this.createAppointmentDataSource();
    this._filterAppointmentsByDate();
    this._validateKeyFieldIfAgendaExist();
    this._updateA11yStatus();
  }
  _isDataSourceLoaded() {
    var _this$_dataSource2;
    return (_this$_dataSource2 = this._dataSource) === null || _this$_dataSource2 === void 0 ? void 0 : _this$_dataSource2.isLoaded();
  }
  _render() {
    var _this$getWorkSpace;
    this._toggleAdaptiveClass();
    (_this$getWorkSpace = this.getWorkSpace()) === null || _this$getWorkSpace === void 0 || _this$getWorkSpace.updateHeaderEmptyCellWidth();
    // @ts-expect-error
    super._render();
  }
  _renderHeader() {
    var _toolbarOptions$items;
    const toolbarOptions = this.option('toolbar');
    const isHeaderShown = Boolean(toolbarOptions.visible ?? ((_toolbarOptions$items = toolbarOptions.items) === null || _toolbarOptions$items === void 0 ? void 0 : _toolbarOptions$items.length));
    if (isHeaderShown) {
      const $header = (0, _renderer.default)('<div>').appendTo(this._mainContainer);
      const headerOptions = this._headerConfig();
      // @ts-expect-error
      this._header = this._createComponent($header, _m_header.SchedulerHeader, headerOptions);
    }
  }
  _headerConfig() {
    return {
      currentView: this.currentView,
      views: this.views,
      currentDate: this.getViewOption('currentDate'),
      min: this.getViewOption('min'),
      max: this.getViewOption('max'),
      indicatorTime: this.option('indicatorTime'),
      startViewDate: this.getStartViewDate(),
      tabIndex: this.option('tabIndex'),
      focusStateEnabled: this.option('focusStateEnabled'),
      useDropDownViewSwitcher: this.option('useDropDownViewSwitcher'),
      firstDayOfWeek: this.getFirstDayOfWeek(),
      toolbar: this.option('toolbar'),
      customizeDateNavigatorText: this.option('customizeDateNavigatorText'),
      onCurrentViewChange: name => {
        this.option('currentView', name);
      },
      onCurrentDateChange: date => {
        this.option('currentDate', date);
      }
    };
  }
  _appointmentsConfig() {
    const config = {
      getResourceManager: () => this.resourceManager,
      getAppointmentDataSource: () => this.appointmentDataSource,
      dataAccessors: this._dataAccessors,
      notifyScheduler: this._notifyScheduler,
      onItemRendered: this._getAppointmentRenderedAction(),
      onItemClick: this._createActionByOption('onAppointmentClick'),
      onItemContextMenu: this._createActionByOption('onAppointmentContextMenu'),
      onAppointmentDblClick: this._createActionByOption('onAppointmentDblClick'),
      tabIndex: this.option('tabIndex'),
      focusStateEnabled: this.option('focusStateEnabled'),
      allowDrag: this._allowDragging(),
      allowDelete: this._editing.allowUpdating && this._editing.allowDeleting,
      allowResize: this._allowResizing(),
      allowAllDayResize: this._allowAllDayResizing(),
      rtlEnabled: this.option('rtlEnabled'),
      groups: this.getViewOption('groups'),
      timeZoneCalculator: this.timeZoneCalculator,
      getResizableStep: () => this._workSpace ? this._workSpace.positionHelper.getResizableStep() : 0,
      getDOMElementsMetaData: () => {
        var _this$_workSpace;
        return (_this$_workSpace = this._workSpace) === null || _this$_workSpace === void 0 ? void 0 : _this$_workSpace.getDOMElementsMetaData();
      },
      getViewDataProvider: () => {
        var _this$_workSpace2;
        return (_this$_workSpace2 = this._workSpace) === null || _this$_workSpace2 === void 0 ? void 0 : _this$_workSpace2.viewDataProvider;
      },
      isVerticalGroupedWorkSpace: () => this._workSpace._isVerticalGroupedWorkSpace(),
      isDateAndTimeView: () => (0, _index2.isDateAndTimeView)(this._workSpace.type),
      onContentReady: () => {
        var _this$_workSpace3;
        (_this$_workSpace3 = this._workSpace) === null || _this$_workSpace3 === void 0 || _this$_workSpace3.option('allDayExpanded', this._isAllDayExpanded());
      }
    };
    return config;
  }
  getCollectorOffset() {
    if (this._workSpace.needApplyCollectorOffset() && !this.option('adaptivityEnabled')) {
      return this.option('_collectorOffset');
    }
    return 0;
  }
  getAppointmentDurationInMinutes() {
    return this.getViewOption('cellDuration');
  }
  _renderWorkSpace() {
    const currentViewOptions = this.currentView;
    if (!currentViewOptions) {
      return;
    }
    if (this._readyToRenderAppointments) {
      this._toggleSmallClass();
      // TODO(9): Get rid of it as soon as you can. Workspace didn't render
      Promise.resolve().then(() => {
        var _this$_workSpace4;
        this._toggleSmallClass();
        (_this$_workSpace4 = this._workSpace) === null || _this$_workSpace4 === void 0 || _this$_workSpace4.updateHeaderEmptyCellWidth();
      });
    }
    const $workSpace = (0, _renderer.default)('<div>').appendTo(this._mainContainer);
    const currentViewType = currentViewOptions.type;
    const workSpaceComponent = VIEWS_CONFIG[currentViewType].workSpace;
    const workSpaceConfig = this._workSpaceConfig(currentViewOptions);
    // @ts-expect-error
    this._workSpace = this._createComponent($workSpace, workSpaceComponent, workSpaceConfig);
    this._allowDragging() && this._workSpace.initDragBehavior(this, this._all);
    this._workSpace._attachTablesEvents();
    this._workSpace.getWorkArea().append(this._appointments.$element());
    this._recalculateWorkspace();
    if (currentViewOptions.startDate) {
      this._updateOption('header', 'currentDate', this._workSpace._getHeaderDate());
    }
  }
  _recalculateWorkspace() {
    // @ts-expect-error
    this._workSpaceRecalculation = new _deferred.Deferred();
    this._waitAsyncTemplate(() => {
      (0, _visibility_change.triggerResizeEvent)(this._workSpace.$element());
      this._workSpace.renderCurrentDateTimeLineAndShader();
    });
  }
  _workSpaceConfig(currentViewOptions) {
    const scrolling = this.getViewOption('scrolling');
    const isVirtualScrolling = scrolling.mode === 'virtual';
    const horizontalVirtualScrollingAllowed = isVirtualScrolling && (!(0, _type.isDefined)(scrolling.orientation) || ['horizontal', 'both'].includes(scrolling.orientation));
    const crossScrollingEnabled = this.option('crossScrollingEnabled') || horizontalVirtualScrollingAllowed || (0, _index2.isTimelineView)(currentViewOptions.type);
    const result = (0, _extend.extend)({
      resources: this.option('resources'),
      getResourceManager: () => this.resourceManager,
      getFilteredItems: () => this._layoutManager.filteredItems,
      noDataText: this.option('noDataText'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      startDayHour: this.option('startDayHour'),
      endDayHour: this.option('endDayHour'),
      viewOffset: this.getViewOffsetMs(),
      tabIndex: this.option('tabIndex'),
      accessKey: this.option('accessKey'),
      focusStateEnabled: this.option('focusStateEnabled'),
      cellDuration: this.option('cellDuration'),
      showAllDayPanel: this.option('showAllDayPanel'),
      showCurrentTimeIndicator: this.option('showCurrentTimeIndicator'),
      indicatorTime: this.option('indicatorTime'),
      indicatorUpdateInterval: this.option('indicatorUpdateInterval'),
      shadeUntilCurrentTime: this.option('shadeUntilCurrentTime'),
      crossScrollingEnabled,
      dataCellTemplate: this.option('dataCellTemplate'),
      timeCellTemplate: this.option('timeCellTemplate'),
      resourceCellTemplate: this.option('resourceCellTemplate'),
      dateCellTemplate: this.option('dateCellTemplate'),
      allowMultipleCellSelection: this.option('allowMultipleCellSelection'),
      selectedCellData: this.option('selectedCellData'),
      onSelectionChanged: args => {
        this.option('selectedCellData', args.selectedCellData);
      },
      groupByDate: this.getViewOption('groupByDate'),
      scrolling,
      draggingMode: this.option('_draggingMode'),
      timeZoneCalculator: this.timeZoneCalculator,
      schedulerHeight: this.option('height'),
      schedulerWidth: this.option('width'),
      allDayPanelMode: this.option('allDayPanelMode'),
      onSelectedCellsClick: this.showAddAppointmentPopup.bind(this),
      onRenderAppointments: this._renderAppointments.bind(this),
      onShowAllDayPanel: value => this.option('showAllDayPanel', value),
      getHeaderHeight: () => _m_utils.utils.DOM.getHeaderHeight(this._header),
      onScrollEnd: () => this._appointments.updateResizableArea(),
      // TODO: SSR does not work correctly with renovated render
      renovateRender: this._isRenovatedRender(isVirtualScrolling)
    }, currentViewOptions);
    result.notifyScheduler = this._notifyScheduler;
    result.groups = this.resourceManager.groupResources();
    result.onCellClick = this._createActionByOption('onCellClick');
    result.onCellContextMenu = this._createActionByOption('onCellContextMenu');
    result.currentDate = this.getViewOption('currentDate');
    result.hoursInterval = result.cellDuration / 60;
    result.allDayExpanded = false;
    result.dataCellTemplate = result.dataCellTemplate ? this._getTemplate(result.dataCellTemplate) : null;
    result.timeCellTemplate = result.timeCellTemplate ? this._getTemplate(result.timeCellTemplate) : null;
    result.resourceCellTemplate = result.resourceCellTemplate ? this._getTemplate(result.resourceCellTemplate) : null;
    result.dateCellTemplate = result.dateCellTemplate ? this._getTemplate(result.dateCellTemplate) : null;
    return result;
  }
  _isRenovatedRender(isVirtualScrolling) {
    return this.option('renovateRender') && (0, _window.hasWindow)() || isVirtualScrolling;
  }
  _waitAsyncTemplate(callback) {
    if (this._options.silent('templatesRenderAsynchronously')) {
      const timer = setTimeout(() => {
        callback();
        clearTimeout(timer);
      });
      this._asyncTemplatesTimers.push(timer);
    } else {
      callback();
    }
  }
  _getAppointmentTemplate(optionName) {
    var _this$currentView;
    if ((_this$currentView = this.currentView) !== null && _this$currentView !== void 0 && _this$currentView[optionName]) {
      return this._getTemplate(this.currentView[optionName]);
    }
    // @ts-expect-error
    return this._getTemplateByOption(optionName);
  }
  _updateOption(viewName, optionName, value) {
    var _this;
    (_this = this[`_${viewName}`]) === null || _this === void 0 || _this.option(optionName, value);
  }
  _refreshWorkSpace() {
    this._cleanWorkspace();
    delete this._workSpace;
    this._renderWorkSpace();
    if (this._readyToRenderAppointments) {
      this._appointments.option({
        fixedContainer: this._workSpace.getFixedContainer(),
        allDayContainer: this._workSpace.getAllDayContainer()
      });
      this._waitAsyncTemplate(() => this._workSpaceRecalculation.resolve());
    }
  }
  _cleanWorkspace() {
    this._appointments.$element().detach();
    this._workSpace._dispose();
    this._workSpace.$element().remove();
    this.option('selectedCellData', []);
  }
  getWorkSpaceScrollable() {
    return this._workSpace.getScrollable();
  }
  getWorkSpaceScrollableContainer() {
    return this._workSpace.getScrollableContainer();
  }
  getWorkSpace() {
    return this._workSpace;
  }
  getHeader() {
    return this._header;
  }
  _cleanPopup() {
    var _this$_appointmentPop2;
    (_this$_appointmentPop2 = this._appointmentPopup) === null || _this$_appointmentPop2 === void 0 || _this$_appointmentPop2.dispose();
  }
  _checkRecurringAppointment(rawAppointment, singleAppointment, exceptionDate, callback, isDeleted, isPopupEditing, dragEvent, recurrenceEditMode) {
    const recurrenceRule = this._dataAccessors.get('recurrenceRule', rawAppointment);
    if (!(0, _validate_rule.validateRRule)(recurrenceRule) || !this._editing.allowUpdating) {
      callback();
      return;
    }
    const editMode = recurrenceEditMode || this.option('recurrenceEditMode');
    switch (editMode) {
      case 'series':
        callback();
        break;
      case 'occurrence':
        this._excludeAppointmentFromSeries(rawAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);
        break;
      default:
        if (dragEvent) {
          // @ts-expect-error
          dragEvent.cancel = new _deferred.Deferred();
        }
        this._showRecurrenceChangeConfirm(isDeleted).done(editingMode => {
          editingMode === RECURRENCE_EDITING_MODE.SERIES && callback();
          editingMode === RECURRENCE_EDITING_MODE.OCCURRENCE && this._excludeAppointmentFromSeries(rawAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);
        }).fail(() => this._appointments.moveAppointmentBack(dragEvent));
    }
  }
  _excludeAppointmentFromSeries(rawAppointment, newRawAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent) {
    const appointment = (0, _index2.excludeFromRecurrence)(rawAppointment, exceptionDate, this._dataAccessors);
    const singleRawAppointment = _extends({}, newRawAppointment);
    /* eslint-disable @typescript-eslint/no-dynamic-delete */
    delete singleRawAppointment[this._dataAccessors.expr.recurrenceExceptionExpr];
    delete singleRawAppointment[this._dataAccessors.expr.recurrenceRuleExpr];
    const keyPropertyName = this.appointmentDataSource.keyName;
    delete singleRawAppointment[keyPropertyName];
    /* eslint-enable @typescript-eslint/no-dynamic-delete */
    const canCreateNewAppointment = !isDeleted && !isPopupEditing;
    if (canCreateNewAppointment) {
      this.addAppointment(singleRawAppointment);
    }
    if (isPopupEditing) {
      this._appointmentPopup.show(singleRawAppointment, {
        isToolbarVisible: true,
        action: _m_legacy_popup.ACTION_TO_APPOINTMENT.EXCLUDE_FROM_SERIES,
        excludeInfo: {
          sourceAppointment: rawAppointment,
          updatedAppointment: appointment.source
        }
      });
      this._editAppointmentData = rawAppointment;
    } else {
      this._updateAppointment(rawAppointment, appointment.source, () => {
        this._appointments.moveAppointmentBack(dragEvent);
      }, dragEvent);
    }
  }
  _createRecurrenceException(appointment, exceptionDate) {
    const result = [];
    if (appointment.recurrenceException) {
      result.push(appointment.recurrenceException);
    }
    result.push(this._getSerializedDate(exceptionDate, appointment.startDate, appointment.allDay));
    return result.join();
  }
  _getSerializedDate(date, startDate, isAllDay) {
    isAllDay && date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
    return _date_serialization.default.serializeDate(date, UTC_FULL_DATE_FORMAT);
  }
  _showRecurrenceChangeConfirm(isDeleted) {
    const title = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteTitle' : 'dxScheduler-confirmRecurrenceEditTitle');
    const message = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteMessage' : 'dxScheduler-confirmRecurrenceEditMessage');
    const seriesText = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteSeries' : 'dxScheduler-confirmRecurrenceEditSeries');
    const occurrenceText = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteOccurrence' : 'dxScheduler-confirmRecurrenceEditOccurrence');
    this._recurrenceDialog = (0, _dialog.custom)({
      title,
      messageHtml: message,
      showCloseButton: true,
      showTitle: true,
      buttons: [{
        text: seriesText,
        onClick() {
          return RECURRENCE_EDITING_MODE.SERIES;
        }
      }, {
        text: occurrenceText,
        onClick() {
          return RECURRENCE_EDITING_MODE.OCCURRENCE;
        }
      }],
      popupOptions: {
        wrapperAttr: {
          class: POPUP_DIALOG_CLASS
        }
      }
    });
    return this._recurrenceDialog.show();
  }
  _getUpdatedData(rawAppointment) {
    const viewOffset = this.getViewOffsetMs();
    const getConvertedFromGrid = date => {
      if (!date) {
        return undefined;
      }
      const result = this.timeZoneCalculator.createDate(date, 'fromGrid');
      return _date3.dateUtilsTs.addOffsets(result, -viewOffset);
    };
    const targetCell = this.getTargetCellData();
    const appointment = new _appointment_adapter.AppointmentAdapter(rawAppointment, this._dataAccessors);
    const cellStartDate = getConvertedFromGrid(targetCell.startDate);
    const cellEndDate = getConvertedFromGrid(targetCell.endDate);
    let appointmentStartDate = new Date(appointment.startDate);
    appointmentStartDate = _date3.dateUtilsTs.addOffsets(appointmentStartDate, -viewOffset);
    let appointmentEndDate = new Date(appointment.endDate);
    appointmentEndDate = _date3.dateUtilsTs.addOffsets(appointmentEndDate, -viewOffset);
    let resultedStartDate = cellStartDate ?? appointmentStartDate;
    if (!_date3.dateUtilsTs.isValidDate(appointmentStartDate)) {
      appointmentStartDate = resultedStartDate;
    }
    if (!_date3.dateUtilsTs.isValidDate(appointmentEndDate)) {
      appointmentEndDate = cellEndDate;
    }
    const duration = appointmentEndDate.getTime() - appointmentStartDate.getTime();
    const isKeepAppointmentHours = this._workSpace.keepOriginalHours() && _date3.dateUtilsTs.isValidDate(appointment.startDate) && _date3.dateUtilsTs.isValidDate(cellStartDate);
    if (isKeepAppointmentHours) {
      const startDate = this.timeZoneCalculator.createDate(appointmentStartDate, 'toGrid');
      const timeInMs = startDate.getTime() - _date2.default.trimTime(startDate).getTime();
      const targetCellStartDate = _date3.dateUtilsTs.addOffsets(targetCell.startDate, -viewOffset);
      resultedStartDate = new Date(_date2.default.trimTime(targetCellStartDate).getTime() + timeInMs);
      resultedStartDate = this.timeZoneCalculator.createDate(resultedStartDate, 'fromGrid');
    }
    const result = new _appointment_adapter.AppointmentAdapter({}, this._dataAccessors);
    if (targetCell.allDay !== undefined) {
      result.allDay = targetCell.allDay;
    }
    result.startDate = resultedStartDate;
    let resultedEndDate = new Date(resultedStartDate.getTime() + duration);
    if (this.appointmentTakesAllDay(rawAppointment) && !result.allDay && this._workSpace.supportAllDayRow()) {
      resultedEndDate = this._workSpace.calculateEndDate(resultedStartDate);
    }
    if (appointment.allDay && !this._workSpace.supportAllDayRow() && !this._workSpace.keepOriginalHours()) {
      const dateCopy = new Date(resultedStartDate);
      dateCopy.setHours(0);
      resultedEndDate = new Date(dateCopy.getTime() + duration);
      if (resultedEndDate.getHours() !== 0) {
        resultedEndDate.setHours(this.getViewOption('endDayHour'));
      }
    }
    result.startDate = _date3.dateUtilsTs.addOffsets(result.startDate, viewOffset);
    result.endDate = _date3.dateUtilsTs.addOffsets(resultedEndDate, viewOffset);
    const rawResult = result.source;
    (0, _appointment_groups_utils.setAppointmentGroupValues)(rawResult, this.resourceManager.resourceById, targetCell.groups);
    return rawResult;
  }
  getTargetedAppointment(appointment, element) {
    const settings = _m_utils.utils.dataAccessors.getAppointmentSettings(element);
    return (0, _get_targeted_appointment.getTargetedAppointment)(appointment, settings, this._dataAccessors, this.timeZoneCalculator, this.resourceManager);
  }
  subscribe(subject, action) {
    this._subscribes[subject] = _m_subscribes.default[subject] = action;
  }
  fire(subject) {
    const callback = this._subscribes[subject];
    if (!(0, _type.isFunction)(callback)) {
      throw _ui.default.Error('E1031', subject);
    }
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return callback.call(this, ...args);
  }
  getTargetCellData() {
    return this._workSpace.getDataByDroppableCell();
  }
  _updateAppointment(target, rawAppointment, onUpdatePrevented, dragEvent) {
    const updatingOptions = {
      newData: rawAppointment,
      oldData: (0, _extend.extend)({}, target),
      cancel: false
    };
    const performFailAction = function (err) {
      if (onUpdatePrevented) {
        onUpdatePrevented.call(this);
      }
      if (err && err.name === 'Error') {
        throw err;
      }
    }.bind(this);
    this._actions[StoreEventNames.UPDATING](updatingOptions);
    if (dragEvent && !(0, _type.isDeferred)(dragEvent.cancel)) {
      // @ts-expect-error
      dragEvent.cancel = new _deferred.Deferred();
    }
    return this._processActionResult(updatingOptions, function (canceled) {
      // @ts-expect-error
      let deferred = new _deferred.Deferred();
      if (!canceled) {
        this._expandAllDayPanel(rawAppointment);
        try {
          deferred = this.appointmentDataSource.update(target, rawAppointment).done(() => {
            dragEvent === null || dragEvent === void 0 || dragEvent.cancel.resolve(false);
          }).always(storeAppointment => this._onDataPromiseCompleted(StoreEventNames.UPDATED, storeAppointment)).fail(() => performFailAction());
        } catch (err) {
          performFailAction(err);
          deferred.resolve();
        }
      } else {
        performFailAction();
        deferred.resolve();
      }
      return deferred.promise();
    });
  }
  _processActionResult(actionOptions, callback) {
    // @ts-expect-error
    const deferred = new _deferred.Deferred();
    const resolveCallback = callbackResult => {
      (0, _deferred.when)((0, _deferred.fromPromise)(callbackResult)).always(deferred.resolve);
    };
    if ((0, _type.isPromise)(actionOptions.cancel)) {
      (0, _deferred.when)((0, _deferred.fromPromise)(actionOptions.cancel)).always(cancel => {
        if (!(0, _type.isDefined)(cancel)) {
          cancel = actionOptions.cancel.state() === 'rejected';
        }
        resolveCallback(callback.call(this, cancel));
      });
    } else {
      resolveCallback(callback.call(this, actionOptions.cancel));
    }
    return deferred.promise();
  }
  _expandAllDayPanel(appointment) {
    if (!this._isAllDayExpanded() && this.appointmentTakesAllDay(appointment)) {
      this._updateOption('workSpace', 'allDayExpanded', true);
    }
  }
  _onDataPromiseCompleted(handlerName, storeAppointment, appointment) {
    const args = {
      appointmentData: appointment || storeAppointment
    };
    if (storeAppointment instanceof Error) {
      args.error = storeAppointment;
    } else {
      this._appointmentPopup.visible && this._appointmentPopup.hide();
    }
    this._actions[handlerName](args);
    this._fireContentReadyAction();
  }
  getAppointmentsInstance() {
    return this._appointments;
  }
  getLayoutManager() {
    return this._layoutManager;
  }
  getActions() {
    return this._actions;
  }
  appointmentTakesAllDay(rawAppointment) {
    const appointment = new _appointment_adapter.AppointmentAdapter(rawAppointment, this._dataAccessors);
    return (0, _index2.isAppointmentTakesAllDay)(appointment, this.getViewOption('allDayPanelMode'));
  }
  dayHasAppointment(day, rawAppointment, trimTime) {
    const getConvertedToTimeZone = date => this.timeZoneCalculator.createDate(date, 'toGrid');
    const appointment = new _appointment_adapter.AppointmentAdapter(rawAppointment, this._dataAccessors);
    let startDate = new Date(appointment.startDate);
    let endDate = new Date(appointment.endDate);
    startDate = getConvertedToTimeZone(startDate);
    endDate = getConvertedToTimeZone(endDate);
    if (day.getTime() === endDate.getTime()) {
      return startDate.getTime() === endDate.getTime();
    }
    if (trimTime) {
      day = _date2.default.trimTime(day);
      startDate = _date2.default.trimTime(startDate);
      endDate = _date2.default.trimTime(endDate);
    }
    const dayTimeStamp = day.getTime();
    const startDateTimeStamp = startDate.getTime();
    const endDateTimeStamp = endDate.getTime();
    return startDateTimeStamp <= dayTimeStamp && dayTimeStamp <= endDateTimeStamp;
  }
  getStartViewDate() {
    var _this$_workSpace5;
    return (_this$_workSpace5 = this._workSpace) === null || _this$_workSpace5 === void 0 ? void 0 : _this$_workSpace5.getStartViewDate();
  }
  getEndViewDate() {
    return this._workSpace.getEndViewDate();
  }
  showAddAppointmentPopup(cellData, cellGroups) {
    const appointmentAdapter = new _appointment_adapter.AppointmentAdapter({}, this._dataAccessors);
    appointmentAdapter.allDay = Boolean(cellData.allDay);
    appointmentAdapter.startDate = cellData.startDateUTC;
    appointmentAdapter.endDate = cellData.endDateUTC;
    const resultAppointment = (0, _extend.extend)(appointmentAdapter.source, cellGroups);
    this.showAppointmentPopup(resultAppointment, true);
  }
  showAppointmentPopup(rawAppointment, createNewAppointment, rawTargetedAppointment) {
    const newRawTargetedAppointment = _extends({}, rawTargetedAppointment);
    if (newRawTargetedAppointment) {
      delete newRawTargetedAppointment.displayStartDate;
      delete newRawTargetedAppointment.displayEndDate;
    }
    const newTargetedAppointment = (0, _extend.extend)({}, rawAppointment, newRawTargetedAppointment);
    const isCreateAppointment = createNewAppointment ?? (0, _type.isEmptyObject)(rawAppointment);
    if ((0, _type.isEmptyObject)(rawAppointment)) {
      rawAppointment = this.createPopupAppointment();
    }
    if (isCreateAppointment) {
      delete this._editAppointmentData; // TODO
      this._editing.allowAdding && this._appointmentPopup.show(rawAppointment, {
        isToolbarVisible: true,
        action: _m_legacy_popup.ACTION_TO_APPOINTMENT.CREATE
      });
    } else {
      const startDate = this._dataAccessors.get('startDate', newRawTargetedAppointment || rawAppointment);
      this._checkRecurringAppointment(rawAppointment, newTargetedAppointment, startDate, () => {
        this._editAppointmentData = rawAppointment; // TODO
        this._appointmentPopup.show(rawAppointment, {
          isToolbarVisible: this._editing.allowUpdating,
          action: _m_legacy_popup.ACTION_TO_APPOINTMENT.UPDATE
        });
      }, false, true);
    }
  }
  createPopupAppointment() {
    const result = {};
    const toMs = _date2.default.dateToMilliseconds;
    const startDate = new Date(this.option('currentDate'));
    const endDate = new Date(startDate.getTime() + this.option('cellDuration') * toMs('minute'));
    this._dataAccessors.set('startDate', result, startDate);
    this._dataAccessors.set('endDate', result, endDate);
    return result;
  }
  hideAppointmentPopup(saveChanges) {
    var _this$_appointmentPop3;
    if ((_this$_appointmentPop3 = this._appointmentPopup) !== null && _this$_appointmentPop3 !== void 0 && _this$_appointmentPop3.visible) {
      saveChanges && this._appointmentPopup.saveChangesAsync();
      this._appointmentPopup.hide();
    }
  }
  // NOTE: public API
  showAppointmentTooltip(appointment, element, targetedAppointment) {
    if (appointment) {
      const settings = _m_utils.utils.dataAccessors.getAppointmentSettings(element);
      const appointmentConfig = {
        itemData: targetedAppointment ?? appointment,
        groupIndex: settings === null || settings === void 0 ? void 0 : settings.groupIndex
      };
      const info = {
        appointment,
        targetedAppointment,
        color: this.resourceManager.getAppointmentColor(appointmentConfig)
      };
      this.showAppointmentTooltipCore(element, [info]);
    }
  }
  showAppointmentTooltipCore(target, data, options) {
    const arg = {
      cancel: false,
      appointments: data.map(item => ({
        appointmentData: item.appointment,
        currentAppointmentData: _extends({}, item.targetedAppointment),
        color: item.color
      })),
      targetElement: (0, _element.getPublicElement)(target)
    };
    this._createActionByOption('onAppointmentTooltipShowing')(arg);
    if (this._appointmentTooltip.isAlreadyShown(target)) {
      this.hideAppointmentTooltip();
    } else {
      this._processActionResult(arg, canceled => {
        !canceled && this._appointmentTooltip.show(target, data, _extends({}, this._getExtraAppointmentTooltipOptions(), options));
      });
    }
  }
  hideAppointmentTooltip() {
    var _this$_appointmentToo2;
    (_this$_appointmentToo2 = this._appointmentTooltip) === null || _this$_appointmentToo2 === void 0 || _this$_appointmentToo2.hide();
  }
  scrollToTime(hours, minutes, date) {
    _ui.default.log('W0002', 'dxScheduler', 'scrollToTime', '21.1', 'Use the "scrollTo" method instead');
    this._workSpace.scrollToTime(hours, minutes, date);
  }
  scrollTo(date, groupValues, allDay) {
    this._workSpace.scrollTo(date, groupValues, allDay);
  }
  _isHorizontalVirtualScrolling() {
    const scrolling = this.option('scrolling');
    const {
      orientation,
      mode
    } = scrolling;
    const isVirtualScrolling = mode === 'virtual';
    return isVirtualScrolling && (orientation === 'horizontal' || orientation === 'both');
  }
  addAppointment(rawAppointment) {
    // NOTE: mutation of raw appointment
    const appointment = new _appointment_adapter.AppointmentAdapter(rawAppointment, this._dataAccessors);
    appointment.text = appointment.text || '';
    const serializedAppointment = appointment.serialize().source;
    const addingOptions = {
      appointmentData: serializedAppointment,
      cancel: false
    };
    this._actions[StoreEventNames.ADDING](addingOptions);
    return this._processActionResult(addingOptions, canceled => {
      if (canceled) {
        // @ts-expect-error
        return new _deferred.Deferred().resolve();
      }
      this._expandAllDayPanel(serializedAppointment);
      return this.appointmentDataSource.add(serializedAppointment).always(storeAppointment => this._onDataPromiseCompleted(StoreEventNames.ADDED, storeAppointment));
    });
  }
  updateAppointment(target, appointment) {
    return this._updateAppointment(target, appointment);
  }
  deleteAppointment(rawAppointment) {
    const deletingOptions = this.fireOnAppointmentDeleting(rawAppointment);
    this.processDeleteAppointment(rawAppointment, deletingOptions);
  }
  fireOnAppointmentDeleting(rawAppointment, targetedAppointmentData) {
    const deletingOptions = {
      appointmentData: rawAppointment,
      targetedAppointmentData,
      cancel: false
    };
    this._actions[StoreEventNames.DELETING](deletingOptions);
    return deletingOptions;
  }
  processDeleteAppointment(rawAppointment, deletingOptions) {
    this._processActionResult(deletingOptions, function (canceled) {
      if (!canceled) {
        this.appointmentDataSource.remove(rawAppointment).always(storeAppointment => this._onDataPromiseCompleted(StoreEventNames.DELETED, storeAppointment, rawAppointment));
      }
    });
  }
  deleteRecurrence(appointment, date, recurrenceEditMode) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    this._checkRecurringAppointment(appointment, {}, date, () => {
      this.processDeleteAppointment(appointment, {
        cancel: false
      });
    }, true, false, null, recurrenceEditMode);
  }
  focus() {
    if (this._editAppointmentData) {
      this._appointments.focus();
    } else {
      this._workSpace.focus();
    }
  }
  getFirstDayOfWeek() {
    return (0, _type.isDefined)(this.getViewOption('firstDayOfWeek')) ? this.getViewOption('firstDayOfWeek') : _date.default.firstDayOfWeekIndex();
  }
  _validateKeyFieldIfAgendaExist() {
    if (!this.appointmentDataSource.isDataSourceInit) {
      return;
    }
    const hasAgendaView = this.hasAgendaView();
    const isKeyNotExist = !this.appointmentDataSource.keyName;
    if (hasAgendaView && isKeyNotExist) {
      _ui.default.log('W1023');
    }
  }
  _getDragBehavior() {
    return this._workSpace.dragBehavior;
  }
  getViewOffsetMs() {
    const offsetFromOptions = this.getViewOption('offset');
    return this.normalizeViewOffsetValue(offsetFromOptions);
  }
  normalizeViewOffsetValue(viewOffset) {
    var _this$currentView2;
    if (!(0, _type.isDefined)(viewOffset) || ((_this$currentView2 = this.currentView) === null || _this$currentView2 === void 0 ? void 0 : _this$currentView2.type) === _constants_view.VIEWS.AGENDA) {
      return 0;
    }
    return viewOffset * toMs('minute');
  }
}
Scheduler.include(_data_helper.default);
// @ts-ignore
(0, _component_registrator.default)('dxScheduler', Scheduler);
var _default = exports.default = Scheduler;
