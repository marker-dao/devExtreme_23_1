/**
* DevExtreme (renovation/ui/scheduler/scheduler.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.Scheduler = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _props = require("./props");
var _widget = require("../common/widget");
var _data_source = _interopRequireDefault(require("../../../data/data_source"));
var _views = require("./model/views");
var _work_space = require("./workspaces/base/work_space");
var _header = require("./header/header");
var _m_utils = require("../../../__internal/scheduler/workspaces/view_model/m_utils");
var _common = require("./common");
var _createTimeZoneCalculator = require("./timeZoneCalculator/createTimeZoneCalculator");
var _m_utils2 = require("../../../__internal/scheduler/resources/m_utils");
var _appointments = require("./view_model/appointments/appointments");
var _appointments2 = require("./model/appointments");
var _appointment_tooltip = require("./appointment/tooltip/appointment_tooltip");
var _work_space_config = require("./workspaces/base/work_space_config");
var _data = require("./utils/data");
var _local = require("./utils/filtering/local");
var _remote = _interopRequireDefault(require("./utils/filtering/remote"));
var _layout = require("./appointment/reduced_icon_tooltip/layout");
var _appointments_context_provider = require("./appointments_context_provider");
var _combine_classes = require("../../utils/combine_classes");
var _layout2 = require("./appointment_edit_form/layout");
var _popup_config = require("./appointment_edit_form/popup_config");
var _form_context_provider = require("./form_context_provider");
var _formData = require("./utils/editing/formData");
const _excluded = ["accessKey", "activeStateEnabled", "adaptivityEnabled", "allDayExpr", "allDayPanelMode", "appointmentCollectorTemplate", "appointmentDragging", "appointmentTemplate", "appointmentTooltipTemplate", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "currentDateChange", "currentView", "currentViewChange", "customizeDateNavigatorText", "dataCellTemplate", "dataSource", "dateCellTemplate", "dateSerializationFormat", "defaultCurrentDate", "defaultCurrentView", "descriptionExpr", "disabled", "editing", "endDateExpr", "endDateTimeZoneExpr", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groups", "height", "hint", "hoverStateEnabled", "indicatorUpdateInterval", "max", "maxAppointmentsPerCell", "min", "noDataText", "onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "onClick", "onKeyDown", "recurrenceEditMode", "recurrenceExceptionExpr", "recurrenceRuleExpr", "remoteFiltering", "resourceCellTemplate", "resources", "rtlEnabled", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDateExpr", "startDateTimeZoneExpr", "startDayHour", "tabIndex", "textExpr", "timeCellTemplate", "timeZone", "toolbar", "useDropDownViewSwitcher", "views", "visible", "width"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const viewFunction = _ref => {
  let {
    appointmentEditFormVisible,
    appointmentFormData,
    appointmentPopupSize,
    appointmentsContextValue,
    changeAppointmentEditFormVisible,
    changeTooltipVisible,
    classes,
    currentViewConfig,
    dataAccessors,
    formContextValue,
    loadedResources,
    needCreateAppointmentEditForm,
    onViewRendered,
    props: {
      accessKey,
      activeStateEnabled,
      className,
      currentView,
      customizeDateNavigatorText,
      disabled,
      editing: {
        allowTimeZoneEditing,
        allowUpdating
      },
      focusStateEnabled,
      height,
      hint,
      hoverStateEnabled,
      max,
      min,
      rtlEnabled,
      tabIndex,
      toolbar: toolbarItems,
      useDropDownViewSwitcher,
      views,
      visible,
      width
    },
    reducedIconEndDate,
    reducedIconTarget,
    reducedIconTooltipVisible,
    restAttributes,
    setCurrentDate,
    setCurrentView,
    startViewDate,
    tooltipData,
    tooltipTarget,
    tooltipVisible,
    workSpaceKey
  } = _ref;
  const {
    allDayPanelExpanded,
    allowMultipleCellSelection,
    cellDuration,
    crossScrollingEnabled,
    currentDate,
    dataCellTemplate,
    dateCellTemplate,
    endDayHour,
    firstDayOfWeek,
    groupByDate,
    groupOrientation,
    hoursInterval,
    indicatorUpdateInterval,
    intervalCount,
    resourceCellTemplate,
    scrolling,
    shadeUntilCurrentTime,
    showAllDayPanel,
    showCurrentTimeIndicator,
    startDate,
    startDayHour,
    timeCellTemplate,
    type
  } = currentViewConfig;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
    "classes": classes,
    "accessKey": accessKey,
    "activeStateEnabled": activeStateEnabled,
    "disabled": disabled,
    "focusStateEnabled": focusStateEnabled,
    "height": height,
    "hint": hint,
    "hoverStateEnabled": hoverStateEnabled,
    "rtlEnabled": rtlEnabled,
    "tabIndex": tabIndex,
    "visible": visible,
    "width": width,
    "className": className
  }, restAttributes, {
    children: (0, _inferno.createVNode)(1, "div", "dx-scheduler-container", [toolbarItems.length !== 0 && (0, _inferno.createComponentVNode)(2, _header.SchedulerToolbar, {
      "items": toolbarItems,
      "views": views,
      "currentView": currentView,
      "onCurrentViewUpdate": setCurrentView,
      "currentDate": currentDate,
      "onCurrentDateUpdate": setCurrentDate,
      "startViewDate": startViewDate,
      "min": min,
      "max": max,
      "intervalCount": intervalCount,
      "firstDayOfWeek": firstDayOfWeek,
      "useDropDownViewSwitcher": useDropDownViewSwitcher,
      "customizationFunction": customizeDateNavigatorText,
      "viewType": type
    }), (0, _inferno.createComponentVNode)(2, _appointments_context_provider.AppointmentsContextProvider, {
      "appointmentsContextValue": appointmentsContextValue,
      children: (0, _inferno.createComponentVNode)(2, _work_space.WorkSpace, {
        "firstDayOfWeek": firstDayOfWeek,
        "startDayHour": startDayHour,
        "endDayHour": endDayHour,
        "cellDuration": cellDuration,
        "groupByDate": groupByDate,
        "scrolling": scrolling,
        "currentDate": currentDate,
        "intervalCount": intervalCount,
        "groupOrientation": groupOrientation,
        "startDate": startDate,
        "startViewDate": startViewDate,
        "showAllDayPanel": showAllDayPanel,
        "showCurrentTimeIndicator": showCurrentTimeIndicator,
        "indicatorUpdateInterval": indicatorUpdateInterval,
        "shadeUntilCurrentTime": shadeUntilCurrentTime,
        "crossScrollingEnabled": crossScrollingEnabled,
        "hoursInterval": hoursInterval,
        "groups": loadedResources,
        "type": type,
        "schedulerHeight": height,
        "schedulerWidth": width,
        "allowMultipleCellSelection": allowMultipleCellSelection,
        "allDayPanelExpanded": allDayPanelExpanded,
        "onViewRendered": onViewRendered,
        "dataCellTemplate": dataCellTemplate,
        "timeCellTemplate": timeCellTemplate,
        "dateCellTemplate": dateCellTemplate,
        "resourceCellTemplate": resourceCellTemplate
      }, workSpaceKey)
    }), (0, _inferno.createComponentVNode)(2, _appointment_tooltip.AppointmentTooltip, {
      "visible": tooltipVisible,
      "onVisibleChange": changeTooltipVisible,
      "target": tooltipTarget,
      "dataList": tooltipData
    }), (0, _inferno.createComponentVNode)(2, _layout.ReducedIconTooltip, {
      "visible": reducedIconTooltipVisible,
      "endDate": reducedIconEndDate,
      "target": reducedIconTarget
    }), needCreateAppointmentEditForm && (0, _inferno.createComponentVNode)(2, _form_context_provider.FormContextProvider, {
      "formContextValue": formContextValue,
      children: (0, _inferno.createComponentVNode)(2, _layout2.AppointmentEditForm, {
        "visible": appointmentEditFormVisible,
        "fullScreen": appointmentPopupSize.fullScreen,
        "maxWidth": appointmentPopupSize.maxWidth,
        "dataAccessors": dataAccessors,
        "appointmentData": appointmentFormData,
        "allowUpdating": allowUpdating,
        "firstDayOfWeek": firstDayOfWeek,
        "onVisibleChange": changeAppointmentEditFormVisible,
        "allowTimeZoneEditing": allowTimeZoneEditing
      })
    })], 0)
  })));
};
exports.viewFunction = viewFunction;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let Scheduler = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(Scheduler, _InfernoWrapperCompon);
  function Scheduler(props) {
    var _this;
    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.__getterCache = {};
    _this.state = {
      workSpaceViewModel: undefined,
      resourcePromisesMap: new Map(),
      loadedResources: undefined,
      dataItems: [],
      tooltipTarget: undefined,
      tooltipVisible: false,
      appointmentEditFormVisible: false,
      appointmentPopupSize: undefined,
      appointmentFocus: {
        type: 'regular',
        index: -1
      },
      needCreateAppointmentEditForm: false,
      tooltipData: [],
      appointmentFormData: undefined,
      lastViewDateByEndDayHour: undefined,
      reducedIconTooltipVisible: false,
      reducedIconEndDate: undefined,
      reducedIconTarget: undefined,
      formContextValue: undefined,
      currentDate: _this.props.currentDate !== undefined ? _this.props.currentDate : _this.props.defaultCurrentDate,
      currentView: _this.props.currentView !== undefined ? _this.props.currentView : _this.props.defaultCurrentView
    };
    _this.addAppointment = _this.addAppointment.bind(_assertThisInitialized(_this));
    _this.deleteAppointment = _this.deleteAppointment.bind(_assertThisInitialized(_this));
    _this.updateAppointment = _this.updateAppointment.bind(_assertThisInitialized(_this));
    _this.getDataSource = _this.getDataSource.bind(_assertThisInitialized(_this));
    _this.getEndViewDate = _this.getEndViewDate.bind(_assertThisInitialized(_this));
    _this.getStartViewDate = _this.getStartViewDate.bind(_assertThisInitialized(_this));
    _this.hideAppointmentPopup = _this.hideAppointmentPopup.bind(_assertThisInitialized(_this));
    _this.hideAppointmentTooltip = _this.hideAppointmentTooltip.bind(_assertThisInitialized(_this));
    _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
    _this.scrollToTime = _this.scrollToTime.bind(_assertThisInitialized(_this));
    _this.showAppointmentPopup = _this.showAppointmentPopup.bind(_assertThisInitialized(_this));
    _this.showAppointmentTooltip = _this.showAppointmentTooltip.bind(_assertThisInitialized(_this));
    _this.loadGroupResources = _this.loadGroupResources.bind(_assertThisInitialized(_this));
    _this.loadDataSource = _this.loadDataSource.bind(_assertThisInitialized(_this));
    _this.onViewRendered = _this.onViewRendered.bind(_assertThisInitialized(_this));
    _this.setCurrentView = _this.setCurrentView.bind(_assertThisInitialized(_this));
    _this.setCurrentDate = _this.setCurrentDate.bind(_assertThisInitialized(_this));
    _this.showTooltip = _this.showTooltip.bind(_assertThisInitialized(_this));
    _this.showAppointmentPopupForm = _this.showAppointmentPopupForm.bind(_assertThisInitialized(_this));
    _this.hideTooltip = _this.hideTooltip.bind(_assertThisInitialized(_this));
    _this.changeTooltipVisible = _this.changeTooltipVisible.bind(_assertThisInitialized(_this));
    _this.changeAppointmentEditFormVisible = _this.changeAppointmentEditFormVisible.bind(_assertThisInitialized(_this));
    _this.showReducedIconTooltip = _this.showReducedIconTooltip.bind(_assertThisInitialized(_this));
    _this.hideReducedIconTooltip = _this.hideReducedIconTooltip.bind(_assertThisInitialized(_this));
    _this.updateAppointmentFocus = _this.updateAppointmentFocus.bind(_assertThisInitialized(_this));
    _this.updateFocusedAppointment = _this.updateFocusedAppointment.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = Scheduler.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.loadGroupResources, [this.props.groups, this.state.currentView, this.props.currentView, this.props.views, this.props.resources, this.state.resourcePromisesMap]), new _inferno2.InfernoEffect(this.loadDataSource, [this.props.dataSource, this.props.remoteFiltering, this.state.lastViewDateByEndDayHour, this.props.startDateExpr, this.props.endDateExpr, this.props.startDateTimeZoneExpr, this.props.endDateTimeZoneExpr, this.props.allDayExpr, this.props.textExpr, this.props.descriptionExpr, this.props.recurrenceRuleExpr, this.props.recurrenceExceptionExpr, this.props.resources, this.props.allDayPanelMode, this.props.appointmentCollectorTemplate, this.props.appointmentTemplate, this.props.appointmentTooltipTemplate, this.props.cellDuration, this.props.crossScrollingEnabled, this.state.currentDate, this.props.currentDate, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.height, this.props.indicatorUpdateInterval, this.props.maxAppointmentsPerCell, this.props.resourceCellTemplate, this.props.scrolling, this.props.shadeUntilCurrentTime, this.props.showAllDayPanel, this.props.showCurrentTimeIndicator, this.props.startDayHour, this.props.timeCellTemplate, this.props.width, this.state.currentView, this.props.currentView, this.props.views, this.props.dateSerializationFormat]), (0, _inferno2.createReRenderEffect)()];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.groups, this.state.currentView, this.props.currentView, this.props.views, this.props.resources, this.state.resourcePromisesMap]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.dataSource, this.props.remoteFiltering, this.state.lastViewDateByEndDayHour, this.props.startDateExpr, this.props.endDateExpr, this.props.startDateTimeZoneExpr, this.props.endDateTimeZoneExpr, this.props.allDayExpr, this.props.textExpr, this.props.descriptionExpr, this.props.recurrenceRuleExpr, this.props.recurrenceExceptionExpr, this.props.resources, this.props.allDayPanelMode, this.props.appointmentCollectorTemplate, this.props.appointmentTemplate, this.props.appointmentTooltipTemplate, this.props.cellDuration, this.props.crossScrollingEnabled, this.state.currentDate, this.props.currentDate, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.height, this.props.indicatorUpdateInterval, this.props.maxAppointmentsPerCell, this.props.resourceCellTemplate, this.props.scrolling, this.props.shadeUntilCurrentTime, this.props.showAllDayPanel, this.props.showCurrentTimeIndicator, this.props.startDayHour, this.props.timeCellTemplate, this.props.width, this.state.currentView, this.props.currentView, this.props.views, this.props.dateSerializationFormat]);
  };
  _proto.loadGroupResources = function loadGroupResources() {
    (0, _m_utils2.loadResources)(this.mergedGroups, this.props.resources, this.state.resourcePromisesMap).then(loadedResources => {
      this.setState(__state_argument => ({
        loadedResources: loadedResources
      }));
    });
  };
  _proto.loadDataSource = function loadDataSource() {
    if (!this.internalDataSource.isLoaded() && !this.internalDataSource.isLoading()) {
      if (this.props.remoteFiltering && this.state.lastViewDateByEndDayHour) {
        const combinedFilter = (0, _remote.default)({
          dataAccessors: this.dataAccessors,
          dataSourceFilter: this.internalDataSource.filter(),
          min: this.startViewDate,
          max: this.state.lastViewDateByEndDayHour,
          dateSerializationFormat: this.props.dateSerializationFormat
        });
        this.internalDataSource.filter(combinedFilter);
      }
      this.internalDataSource.load().done(loadOptions => {
        this.setState(__state_argument => ({
          dataItems: (0, _data.resolveDataItems)(loadOptions)
        }));
      });
    }
  };
  _proto.onViewRendered = function onViewRendered(viewMetaData) {
    var _this$state$lastViewD;
    this.setState(__state_argument => ({
      workSpaceViewModel: viewMetaData
    }));
    const {
      viewDataProvider
    } = viewMetaData;
    const lastViewDate = viewDataProvider.getLastViewDateByEndDayHour(this.currentViewConfig.endDayHour);
    if (lastViewDate.getTime() !== ((_this$state$lastViewD = this.state.lastViewDateByEndDayHour) === null || _this$state$lastViewD === void 0 ? void 0 : _this$state$lastViewD.getTime())) {
      this.setState(__state_argument => ({
        lastViewDateByEndDayHour: lastViewDate
      }));
    }
  };
  _proto.setCurrentView = function setCurrentView(view) {
    {
      let __newValue;
      this.setState(__state_argument => {
        __newValue = view;
        return {
          currentView: __newValue
        };
      });
      this.props.currentViewChange(__newValue);
    }
  };
  _proto.setCurrentDate = function setCurrentDate(date) {
    {
      let __newValue;
      this.setState(__state_argument => {
        __newValue = date;
        return {
          currentDate: __newValue
        };
      });
      this.props.currentDateChange(__newValue);
    }
  };
  _proto.showTooltip = function showTooltip(e) {
    this.setState(__state_argument => ({
      tooltipData: e.data
    }));
    this.setState(__state_argument => ({
      tooltipTarget: e.target
    }));
    this.changeTooltipVisible(true);
  };
  _proto.showAppointmentPopupForm = function showAppointmentPopupForm(_ref2) {
    let {
      data
    } = _ref2;
    const appointmentData = data[0];
    this.setState(__state_argument => ({
      appointmentFormData: appointmentData.appointment
    }));
    this.setState(__state_argument => ({
      formContextValue: {
        formData: (0, _formData.createFormData)(appointmentData.appointment)
      }
    }));
    const {
      isRecurrent
    } = appointmentData.info;
    this.setState(__state_argument => ({
      appointmentPopupSize: (0, _popup_config.getPopupSize)(isRecurrent)
    }));
    this.setState(__state_argument => ({
      needCreateAppointmentEditForm: true
    }));
    this.hideTooltip();
    this.changeAppointmentEditFormVisible(true);
  };
  _proto.hideTooltip = function hideTooltip() {
    this.changeTooltipVisible(false);
  };
  _proto.changeTooltipVisible = function changeTooltipVisible(value) {
    this.setState(__state_argument => ({
      tooltipVisible: value
    }));
  };
  _proto.changeAppointmentEditFormVisible = function changeAppointmentEditFormVisible(value) {
    this.setState(__state_argument => ({
      appointmentEditFormVisible: value
    }));
  };
  _proto.showReducedIconTooltip = function showReducedIconTooltip(data) {
    this.setState(__state_argument => ({
      reducedIconTarget: data.target
    }));
    this.setState(__state_argument => ({
      reducedIconEndDate: data.endDate
    }));
    this.setState(__state_argument => ({
      reducedIconTooltipVisible: true
    }));
  };
  _proto.hideReducedIconTooltip = function hideReducedIconTooltip() {
    this.setState(__state_argument => ({
      reducedIconTooltipVisible: false
    }));
  };
  _proto.updateAppointmentFocus = function updateAppointmentFocus(type, index) {
    this.state.appointmentFocus.type = type;
    this.state.appointmentFocus.index = index;
  };
  _proto.updateFocusedAppointment = function updateFocusedAppointment(type, index) {
    const {
      index: prevFocusedIndex,
      type: prevFocusedType
    } = this.state.appointmentFocus;
    if (prevFocusedIndex >= 0) {
      const prevViewModels = this.appointmentsViewModel[prevFocusedType];
      const prevViewModel = prevViewModels[prevFocusedIndex];
      prevViewModels[prevFocusedIndex] = _extends({}, prevViewModel, {
        focused: false
      });
    }
    this.updateAppointmentFocus(type, index);
    const viewModels = this.appointmentsViewModel[type];
    viewModels[index] = _extends({}, viewModels[index], {
      focused: true
    });
  };
  _proto.addAppointment = function addAppointment(_appointment) {};
  _proto.deleteAppointment = function deleteAppointment(_appointment) {};
  _proto.updateAppointment = function updateAppointment(_target, _appointment) {};
  _proto.getDataSource = function getDataSource() {
    return this.internalDataSource;
  };
  _proto.getEndViewDate = function getEndViewDate() {
    return this.state.workSpaceViewModel.viewDataProvider.getLastCellEndDate();
  };
  _proto.getStartViewDate = function getStartViewDate() {
    return this.startViewDate;
  };
  _proto.hideAppointmentPopup = function hideAppointmentPopup(_saveChanges) {};
  _proto.hideAppointmentTooltip = function hideAppointmentTooltip() {
    this.hideTooltip();
  };
  _proto.scrollTo = function scrollTo(_date, _group, _allDay) {};
  _proto.scrollToTime = function scrollToTime(_hours, _minutes, _date) {};
  _proto.showAppointmentPopup = function showAppointmentPopup(_appointmentData, _createNewAppointment, _currentAppointmentData) {};
  _proto.showAppointmentTooltip = function showAppointmentTooltip(_appointmentData, _target, _currentAppointmentData) {};
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView']) {
      this.__getterCache['currentViewConfig'] = undefined;
    }
    if (this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.props['resources'] !== nextProps['resources']) {
      this.__getterCache['dataAccessors'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView']) {
      this.__getterCache['startViewDate'] = undefined;
    }
    if (this.props['timeZone'] !== nextProps['timeZone']) {
      this.__getterCache['timeZoneCalculator'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.state['workSpaceViewModel'] !== nextState['workSpaceViewModel'] || this.state['loadedResources'] !== nextState['loadedResources'] || this.props['adaptivityEnabled'] !== nextProps['adaptivityEnabled'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.props['resources'] !== nextProps['resources'] || this.props['timeZone'] !== nextProps['timeZone'] || this.props['groups'] !== nextProps['groups']) {
      this.__getterCache['appointmentsConfig'] = undefined;
    }
    if (this.state['dataItems'] !== nextState['dataItems'] || this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.props['resources'] !== nextProps['resources'] || this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.props['timeZone'] !== nextProps['timeZone']) {
      this.__getterCache['preparedDataItems'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.state['workSpaceViewModel'] !== nextState['workSpaceViewModel'] || this.state['loadedResources'] !== nextState['loadedResources'] || this.props['adaptivityEnabled'] !== nextProps['adaptivityEnabled'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.props['resources'] !== nextProps['resources'] || this.props['timeZone'] !== nextProps['timeZone'] || this.props['groups'] !== nextProps['groups'] || this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.state['dataItems'] !== nextState['dataItems']) {
      this.__getterCache['filteredItems'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.state['workSpaceViewModel'] !== nextState['workSpaceViewModel'] || this.state['loadedResources'] !== nextState['loadedResources'] || this.props['adaptivityEnabled'] !== nextProps['adaptivityEnabled'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.props['resources'] !== nextProps['resources'] || this.props['timeZone'] !== nextProps['timeZone'] || this.props['groups'] !== nextProps['groups'] || this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.state['dataItems'] !== nextState['dataItems']) {
      this.__getterCache['appointmentsViewModel'] = undefined;
    }
    if (this.props['groups'] !== nextProps['groups'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView']) {
      this.__getterCache['mergedGroups'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.state['workSpaceViewModel'] !== nextState['workSpaceViewModel'] || this.state['loadedResources'] !== nextState['loadedResources'] || this.props['adaptivityEnabled'] !== nextProps['adaptivityEnabled'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.props['resources'] !== nextProps['resources'] || this.props['timeZone'] !== nextProps['timeZone'] || this.props['groups'] !== nextProps['groups'] || this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.state['dataItems'] !== nextState['dataItems'] || this.state['resourcePromisesMap'] !== nextState['resourcePromisesMap'] || this.state['appointmentFocus'] !== nextState['appointmentFocus']) {
      this.__getterCache['appointmentsContextValue'] = undefined;
    }
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView,
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        appointmentCollectorTemplate: getTemplate(props.appointmentCollectorTemplate),
        appointmentTemplate: getTemplate(props.appointmentTemplate),
        appointmentTooltipTemplate: getTemplate(props.appointmentTooltipTemplate)
      }),
      workSpaceViewModel: this.state.workSpaceViewModel,
      resourcePromisesMap: this.state.resourcePromisesMap,
      loadedResources: this.state.loadedResources,
      dataItems: this.state.dataItems,
      tooltipTarget: this.state.tooltipTarget,
      tooltipVisible: this.state.tooltipVisible,
      appointmentEditFormVisible: this.state.appointmentEditFormVisible,
      appointmentPopupSize: this.state.appointmentPopupSize,
      appointmentFocus: this.state.appointmentFocus,
      needCreateAppointmentEditForm: this.state.needCreateAppointmentEditForm,
      tooltipData: this.state.tooltipData,
      appointmentFormData: this.state.appointmentFormData,
      lastViewDateByEndDayHour: this.state.lastViewDateByEndDayHour,
      reducedIconTooltipVisible: this.state.reducedIconTooltipVisible,
      reducedIconEndDate: this.state.reducedIconEndDate,
      reducedIconTarget: this.state.reducedIconTarget,
      formContextValue: this.state.formContextValue,
      currentViewProps: this.currentViewProps,
      currentViewConfig: this.currentViewConfig,
      isValidViewDataProvider: this.isValidViewDataProvider,
      dataAccessors: this.dataAccessors,
      startViewDate: this.startViewDate,
      isVirtualScrolling: this.isVirtualScrolling,
      timeZoneCalculator: this.timeZoneCalculator,
      internalDataSource: this.internalDataSource,
      appointmentsConfig: this.appointmentsConfig,
      preparedDataItems: this.preparedDataItems,
      filteredItems: this.filteredItems,
      appointmentsViewModel: this.appointmentsViewModel,
      workSpaceKey: this.workSpaceKey,
      mergedGroups: this.mergedGroups,
      appointmentsContextValue: this.appointmentsContextValue,
      classes: this.classes,
      onViewRendered: this.onViewRendered,
      setCurrentView: this.setCurrentView,
      setCurrentDate: this.setCurrentDate,
      showTooltip: this.showTooltip,
      showAppointmentPopupForm: this.showAppointmentPopupForm,
      hideTooltip: this.hideTooltip,
      changeTooltipVisible: this.changeTooltipVisible,
      changeAppointmentEditFormVisible: this.changeAppointmentEditFormVisible,
      showReducedIconTooltip: this.showReducedIconTooltip,
      hideReducedIconTooltip: this.hideReducedIconTooltip,
      updateAppointmentFocus: this.updateAppointmentFocus,
      updateFocusedAppointment: this.updateFocusedAppointment,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Scheduler, [{
    key: "currentViewProps",
    get: function () {
      const {
        views
      } = this.props;
      return (0, _views.getCurrentViewProps)(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView, views);
    }
  }, {
    key: "currentViewConfig",
    get: function () {
      if (this.__getterCache['currentViewConfig'] !== undefined) {
        return this.__getterCache['currentViewConfig'];
      }
      return this.__getterCache['currentViewConfig'] = (() => {
        const {
          allDayPanelMode,
          appointmentCollectorTemplate,
          appointmentTemplate,
          appointmentTooltipTemplate,
          cellDuration,
          crossScrollingEnabled,
          dataCellTemplate,
          dateCellTemplate,
          endDayHour,
          firstDayOfWeek,
          groupByDate,
          height,
          indicatorUpdateInterval,
          maxAppointmentsPerCell,
          resourceCellTemplate,
          scrolling,
          shadeUntilCurrentTime,
          showAllDayPanel,
          showCurrentTimeIndicator,
          startDayHour,
          timeCellTemplate,
          width
        } = this.props;
        return (0, _views.getCurrentViewConfig)(this.currentViewProps, {
          firstDayOfWeek,
          startDayHour,
          endDayHour,
          cellDuration,
          groupByDate,
          scrolling,
          dataCellTemplate,
          timeCellTemplate,
          resourceCellTemplate,
          dateCellTemplate,
          appointmentTemplate,
          appointmentCollectorTemplate,
          appointmentTooltipTemplate,
          maxAppointmentsPerCell,
          showAllDayPanel,
          showCurrentTimeIndicator,
          indicatorUpdateInterval,
          shadeUntilCurrentTime,
          crossScrollingEnabled,
          height,
          width,
          allDayPanelMode
        }, this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate);
      })();
    }
  }, {
    key: "isValidViewDataProvider",
    get: function () {
      var _this$state$workSpace;
      const {
        allDayPanelExpanded,
        cellDuration,
        crossScrollingEnabled,
        currentDate,
        endDayHour,
        firstDayOfWeek,
        groupByDate,
        groupOrientation,
        hoursInterval,
        intervalCount,
        scrolling,
        showAllDayPanel,
        startDate,
        startDayHour,
        type
      } = this.currentViewConfig;
      return (0, _common.isViewDataProviderConfigValid)((_this$state$workSpace = this.state.workSpaceViewModel) === null || _this$state$workSpace === void 0 ? void 0 : _this$state$workSpace.viewDataProviderValidationOptions, {
        intervalCount: intervalCount !== null && intervalCount !== void 0 ? intervalCount : 1,
        currentDate,
        type,
        hoursInterval,
        startDayHour,
        endDayHour,
        groupOrientation,
        groupByDate,
        crossScrollingEnabled,
        firstDayOfWeek,
        startDate,
        showAllDayPanel,
        allDayPanelExpanded,
        scrolling,
        cellDuration,
        groups: this.state.loadedResources
      });
    }
  }, {
    key: "dataAccessors",
    get: function () {
      if (this.__getterCache['dataAccessors'] !== undefined) {
        return this.__getterCache['dataAccessors'];
      }
      return this.__getterCache['dataAccessors'] = (() => {
        return (0, _common.createDataAccessors)({
          startDateExpr: this.props.startDateExpr,
          endDateExpr: this.props.endDateExpr,
          startDateTimeZoneExpr: this.props.startDateTimeZoneExpr,
          endDateTimeZoneExpr: this.props.endDateTimeZoneExpr,
          allDayExpr: this.props.allDayExpr,
          textExpr: this.props.textExpr,
          descriptionExpr: this.props.descriptionExpr,
          recurrenceRuleExpr: this.props.recurrenceRuleExpr,
          recurrenceExceptionExpr: this.props.recurrenceExceptionExpr,
          resources: this.props.resources
        });
      })();
    }
  }, {
    key: "startViewDate",
    get: function () {
      if (this.__getterCache['startViewDate'] !== undefined) {
        return this.__getterCache['startViewDate'];
      }
      return this.__getterCache['startViewDate'] = (() => {
        const {
          currentDate,
          firstDayOfWeek,
          intervalCount,
          startDate,
          startDayHour,
          type
        } = this.currentViewConfig;
        const options = {
          currentDate,
          startDayHour,
          startDate,
          intervalCount,
          firstDayOfWeek
        };
        const viewDataGenerator = (0, _m_utils.getViewDataGeneratorByViewType)(type);
        const startViewDate = viewDataGenerator.getStartViewDate(options);
        return startViewDate;
      })();
    }
  }, {
    key: "isVirtualScrolling",
    get: function () {
      var _this$currentViewProp;
      return this.props.scrolling.mode === 'virtual' || ((_this$currentViewProp = this.currentViewProps.scrolling) === null || _this$currentViewProp === void 0 ? void 0 : _this$currentViewProp.mode) === 'virtual';
    }
  }, {
    key: "timeZoneCalculator",
    get: function () {
      if (this.__getterCache['timeZoneCalculator'] !== undefined) {
        return this.__getterCache['timeZoneCalculator'];
      }
      return this.__getterCache['timeZoneCalculator'] = (() => {
        return (0, _createTimeZoneCalculator.createTimeZoneCalculator)(this.props.timeZone);
      })();
    }
  }, {
    key: "internalDataSource",
    get: function () {
      if (this.props.dataSource instanceof _data_source.default) {
        return this.props.dataSource;
      }
      if (this.props.dataSource instanceof Array) {
        return new _data_source.default({
          store: {
            type: 'array',
            data: this.props.dataSource
          },
          paginate: false
        });
      }
      return new _data_source.default(this.props.dataSource);
    }
  }, {
    key: "appointmentsConfig",
    get: function () {
      if (this.__getterCache['appointmentsConfig'] !== undefined) {
        return this.__getterCache['appointmentsConfig'];
      }
      return this.__getterCache['appointmentsConfig'] = (() => {
        if (!this.isValidViewDataProvider || !this.state.loadedResources) {
          return undefined;
        }
        const renderConfig = (0, _work_space_config.getViewRenderConfigByType)(this.currentViewConfig.type, this.currentViewConfig.crossScrollingEnabled, this.currentViewConfig.intervalCount, this.state.loadedResources, this.currentViewConfig.groupOrientation);
        return (0, _appointments2.getAppointmentsConfig)({
          adaptivityEnabled: this.props.adaptivityEnabled,
          rtlEnabled: this.props.rtlEnabled,
          resources: this.props.resources,
          timeZone: this.props.timeZone,
          groups: this.mergedGroups
        }, {
          startDayHour: this.currentViewConfig.startDayHour,
          endDayHour: this.currentViewConfig.endDayHour,
          currentDate: this.currentViewConfig.currentDate,
          scrolling: this.currentViewConfig.scrolling,
          intervalCount: this.currentViewConfig.intervalCount,
          hoursInterval: this.currentViewConfig.hoursInterval,
          showAllDayPanel: this.currentViewConfig.showAllDayPanel,
          firstDayOfWeek: this.currentViewConfig.firstDayOfWeek,
          type: this.currentViewConfig.type,
          cellDuration: this.currentViewConfig.cellDuration,
          maxAppointmentsPerCell: this.currentViewConfig.maxAppointmentsPerCell,
          allDayPanelMode: this.currentViewConfig.allDayPanelMode
        }, this.state.loadedResources, this.state.workSpaceViewModel.viewDataProvider, renderConfig.isAllDayPanelSupported);
      })();
    }
  }, {
    key: "preparedDataItems",
    get: function () {
      if (this.__getterCache['preparedDataItems'] !== undefined) {
        return this.__getterCache['preparedDataItems'];
      }
      return this.__getterCache['preparedDataItems'] = (() => {
        return (0, _data.getPreparedDataItems)(this.state.dataItems, this.dataAccessors, this.currentViewConfig.cellDuration, this.timeZoneCalculator);
      })();
    }
  }, {
    key: "filteredItems",
    get: function () {
      if (this.__getterCache['filteredItems'] !== undefined) {
        return this.__getterCache['filteredItems'];
      }
      return this.__getterCache['filteredItems'] = (() => {
        if (!this.appointmentsConfig) {
          return [];
        }
        const filterStrategy = (0, _local.getFilterStrategy)(this.appointmentsConfig.resources, this.appointmentsConfig.startDayHour, this.appointmentsConfig.endDayHour, this.appointmentsConfig.cellDurationInMinutes, this.appointmentsConfig.showAllDayPanel, this.appointmentsConfig.supportAllDayRow, this.appointmentsConfig.firstDayOfWeek, this.appointmentsConfig.viewType, this.appointmentsConfig.dateRange, this.appointmentsConfig.groupCount, this.appointmentsConfig.loadedResources, this.appointmentsConfig.isVirtualScrolling, this.timeZoneCalculator, this.dataAccessors, this.state.workSpaceViewModel.viewDataProvider);
        return filterStrategy.filter(this.preparedDataItems);
      })();
    }
  }, {
    key: "appointmentsViewModel",
    get: function () {
      if (this.__getterCache['appointmentsViewModel'] !== undefined) {
        return this.__getterCache['appointmentsViewModel'];
      }
      return this.__getterCache['appointmentsViewModel'] = (() => {
        if (!this.appointmentsConfig || this.filteredItems.length === 0) {
          return {
            allDay: [],
            allDayCompact: [],
            regular: [],
            regularCompact: []
          };
        }
        const model = (0, _appointments2.getAppointmentsModel)(this.appointmentsConfig, this.state.workSpaceViewModel.viewDataProvider, this.timeZoneCalculator, this.dataAccessors, this.state.workSpaceViewModel.cellsMetaData);
        return (0, _appointments.getAppointmentsViewModel)(model, this.filteredItems);
      })();
    }
  }, {
    key: "workSpaceKey",
    get: function () {
      var _this$state$loadedRes;
      const {
        crossScrollingEnabled,
        groupOrientation,
        intervalCount
      } = this.currentViewConfig;
      if (!crossScrollingEnabled) {
        return '';
      }
      const groupCount = (0, _m_utils2.getGroupCount)((_this$state$loadedRes = this.state.loadedResources) !== null && _this$state$loadedRes !== void 0 ? _this$state$loadedRes : []);
      return "".concat(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView, "_").concat(groupOrientation, "_").concat(intervalCount, "_").concat(groupCount);
    }
  }, {
    key: "mergedGroups",
    get: function () {
      if (this.__getterCache['mergedGroups'] !== undefined) {
        return this.__getterCache['mergedGroups'];
      }
      return this.__getterCache['mergedGroups'] = (() => {
        return (0, _views.getValidGroups)(this.props.groups, this.currentViewProps.groups);
      })();
    }
  }, {
    key: "appointmentsContextValue",
    get: function () {
      if (this.__getterCache['appointmentsContextValue'] !== undefined) {
        return this.__getterCache['appointmentsContextValue'];
      }
      return this.__getterCache['appointmentsContextValue'] = (() => {
        return {
          viewModel: this.appointmentsViewModel,
          groups: this.mergedGroups,
          resources: this.props.resources,
          resourceLoaderMap: this.state.resourcePromisesMap,
          loadedResources: this.state.loadedResources,
          dataAccessors: this.dataAccessors,
          appointmentTemplate: this.currentViewConfig.appointmentTemplate,
          overflowIndicatorTemplate: this.currentViewConfig.appointmentCollectorTemplate,
          onAppointmentClick: data => this.showTooltip(data),
          onAppointmentDoubleClick: data => this.showAppointmentPopupForm(data),
          showReducedIconTooltip: data => this.showReducedIconTooltip(data),
          hideReducedIconTooltip: () => this.hideReducedIconTooltip(),
          updateFocusedAppointment: this.updateFocusedAppointment
        };
      })();
    }
  }, {
    key: "classes",
    get: function () {
      return (0, _combine_classes.combineClasses)({
        'dx-scheduler': true,
        'dx-scheduler-native': true,
        'dx-scheduler-adaptive': this.props.adaptivityEnabled
      });
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props$currentDa = _extends({}, this.props, {
          currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
          currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
        }),
        restProps = _objectWithoutPropertiesLoose(_this$props$currentDa, _excluded);
      return restProps;
    }
  }]);
  return Scheduler;
}(_inferno2.InfernoWrapperComponent);
exports.Scheduler = Scheduler;
Scheduler.defaultProps = _props.SchedulerProps;
