!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/scheduler/scheduler.js"], ["inferno","@devextreme/runtime/inferno","./props","../common/widget","../../../data/data_source","./model/views","./workspaces/base/work_space","./header/header","../../../ui/scheduler/workspaces/view_model/utils","./common","./timeZoneCalculator/createTimeZoneCalculator","../../../ui/scheduler/resources/utils","./view_model/appointments/appointments","./model/appointments","./appointment/tooltip/appointment_tooltip","./workspaces/base/work_space_config","./utils/data","./utils/filtering/local","./utils/filtering/remote","./appointment/reduced_icon_tooltip/layout","./appointments_context_provider","../../utils/combine_classes","./appointment_edit_form/layout","./appointment_edit_form/popup_config","./form_context_provider","./utils/editing/formData"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/scheduler/scheduler.js", ["inferno", "@devextreme/runtime/inferno", "./props", "../common/widget", "../../../data/data_source", "./model/views", "./workspaces/base/work_space", "./header/header", "../../../ui/scheduler/workspaces/view_model/utils", "./common", "./timeZoneCalculator/createTimeZoneCalculator", "../../../ui/scheduler/resources/utils", "./view_model/appointments/appointments", "./model/appointments", "./appointment/tooltip/appointment_tooltip", "./workspaces/base/work_space_config", "./utils/data", "./utils/filtering/local", "./utils/filtering/remote", "./appointment/reduced_icon_tooltip/layout", "./appointments_context_provider", "../../utils/combine_classes", "./appointment_edit_form/layout", "./appointment_edit_form/popup_config", "./form_context_provider", "./utils/editing/formData"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.viewFunction = exports.Scheduler = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _props = $__require("./props");
  var _widget = $__require("../common/widget");
  var _data_source = _interopRequireDefault($__require("../../../data/data_source"));
  var _views = $__require("./model/views");
  var _work_space = $__require("./workspaces/base/work_space");
  var _header = $__require("./header/header");
  var _utils = $__require("../../../ui/scheduler/workspaces/view_model/utils");
  var _common = $__require("./common");
  var _createTimeZoneCalculator = $__require("./timeZoneCalculator/createTimeZoneCalculator");
  var _utils2 = $__require("../../../ui/scheduler/resources/utils");
  var _appointments = $__require("./view_model/appointments/appointments");
  var _appointments2 = $__require("./model/appointments");
  var _appointment_tooltip = $__require("./appointment/tooltip/appointment_tooltip");
  var _work_space_config = $__require("./workspaces/base/work_space_config");
  var _data = $__require("./utils/data");
  var _local = $__require("./utils/filtering/local");
  var _remote = _interopRequireDefault($__require("./utils/filtering/remote"));
  var _layout = $__require("./appointment/reduced_icon_tooltip/layout");
  var _appointments_context_provider = $__require("./appointments_context_provider");
  var _combine_classes = $__require("../../utils/combine_classes");
  var _layout2 = $__require("./appointment_edit_form/layout");
  var _popup_config = $__require("./appointment_edit_form/popup_config");
  var _form_context_provider = $__require("./form_context_provider");
  var _formData = $__require("./utils/editing/formData");
  var _excluded = ["accessKey", "activeStateEnabled", "adaptivityEnabled", "allDayExpr", "allDayPanelMode", "appointmentCollectorTemplate", "appointmentDragging", "appointmentTemplate", "appointmentTooltipTemplate", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "currentDateChange", "currentView", "currentViewChange", "customizeDateNavigatorText", "dataCellTemplate", "dataSource", "dateCellTemplate", "dateSerializationFormat", "defaultCurrentDate", "defaultCurrentView", "descriptionExpr", "disabled", "editing", "endDateExpr", "endDateTimeZoneExpr", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groups", "height", "hint", "hoverStateEnabled", "indicatorUpdateInterval", "max", "maxAppointmentsPerCell", "min", "noDataText", "onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "onClick", "onKeyDown", "recurrenceEditMode", "recurrenceExceptionExpr", "recurrenceRuleExpr", "remoteFiltering", "resourceCellTemplate", "resources", "rtlEnabled", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDateExpr", "startDateTimeZoneExpr", "startDayHour", "tabIndex", "textExpr", "timeCellTemplate", "timeZone", "toolbar", "useDropDownViewSwitcher", "views", "visible", "width"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var viewFunction = function viewFunction(_ref) {
    var appointmentEditFormVisible = _ref.appointmentEditFormVisible,
        appointmentFormData = _ref.appointmentFormData,
        appointmentPopupSize = _ref.appointmentPopupSize,
        appointmentsContextValue = _ref.appointmentsContextValue,
        changeAppointmentEditFormVisible = _ref.changeAppointmentEditFormVisible,
        changeTooltipVisible = _ref.changeTooltipVisible,
        classes = _ref.classes,
        currentViewConfig = _ref.currentViewConfig,
        dataAccessors = _ref.dataAccessors,
        formContextValue = _ref.formContextValue,
        loadedResources = _ref.loadedResources,
        needCreateAppointmentEditForm = _ref.needCreateAppointmentEditForm,
        onViewRendered = _ref.onViewRendered,
        _ref$props = _ref.props,
        accessKey = _ref$props.accessKey,
        activeStateEnabled = _ref$props.activeStateEnabled,
        className = _ref$props.className,
        currentView = _ref$props.currentView,
        customizeDateNavigatorText = _ref$props.customizeDateNavigatorText,
        disabled = _ref$props.disabled,
        _ref$props$editing = _ref$props.editing,
        allowTimeZoneEditing = _ref$props$editing.allowTimeZoneEditing,
        allowUpdating = _ref$props$editing.allowUpdating,
        focusStateEnabled = _ref$props.focusStateEnabled,
        height = _ref$props.height,
        hint = _ref$props.hint,
        hoverStateEnabled = _ref$props.hoverStateEnabled,
        max = _ref$props.max,
        min = _ref$props.min,
        rtlEnabled = _ref$props.rtlEnabled,
        tabIndex = _ref$props.tabIndex,
        toolbarItems = _ref$props.toolbar,
        useDropDownViewSwitcher = _ref$props.useDropDownViewSwitcher,
        views = _ref$props.views,
        visible = _ref$props.visible,
        width = _ref$props.width,
        reducedIconEndDate = _ref.reducedIconEndDate,
        reducedIconTarget = _ref.reducedIconTarget,
        reducedIconTooltipVisible = _ref.reducedIconTooltipVisible,
        restAttributes = _ref.restAttributes,
        setCurrentDate = _ref.setCurrentDate,
        setCurrentView = _ref.setCurrentView,
        startViewDate = _ref.startViewDate,
        tooltipData = _ref.tooltipData,
        tooltipTarget = _ref.tooltipTarget,
        tooltipVisible = _ref.tooltipVisible,
        workSpaceKey = _ref.workSpaceKey;
    var allDayPanelExpanded = currentViewConfig.allDayPanelExpanded,
        allowMultipleCellSelection = currentViewConfig.allowMultipleCellSelection,
        cellDuration = currentViewConfig.cellDuration,
        crossScrollingEnabled = currentViewConfig.crossScrollingEnabled,
        currentDate = currentViewConfig.currentDate,
        dataCellTemplate = currentViewConfig.dataCellTemplate,
        dateCellTemplate = currentViewConfig.dateCellTemplate,
        endDayHour = currentViewConfig.endDayHour,
        firstDayOfWeek = currentViewConfig.firstDayOfWeek,
        groupByDate = currentViewConfig.groupByDate,
        groupOrientation = currentViewConfig.groupOrientation,
        hoursInterval = currentViewConfig.hoursInterval,
        indicatorUpdateInterval = currentViewConfig.indicatorUpdateInterval,
        intervalCount = currentViewConfig.intervalCount,
        resourceCellTemplate = currentViewConfig.resourceCellTemplate,
        scrolling = currentViewConfig.scrolling,
        shadeUntilCurrentTime = currentViewConfig.shadeUntilCurrentTime,
        showAllDayPanel = currentViewConfig.showAllDayPanel,
        showCurrentTimeIndicator = currentViewConfig.showCurrentTimeIndicator,
        startDate = currentViewConfig.startDate,
        startDayHour = currentViewConfig.startDayHour,
        timeCellTemplate = currentViewConfig.timeCellTemplate,
        type = currentViewConfig.type;
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
  var getTemplate = function getTemplate(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function (props) {
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
    } : TemplateProp);
  };
  var Scheduler = /*#__PURE__*/function (_InfernoWrapperCompon) {
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
      var _this2 = this;
      (0, _utils2.loadResources)(this.mergedGroups, this.props.resources, this.state.resourcePromisesMap).then(function (loadedResources) {
        _this2.setState(function (__state_argument) {
          return {
            loadedResources: loadedResources
          };
        });
      });
    };
    _proto.loadDataSource = function loadDataSource() {
      var _this3 = this;
      if (!this.internalDataSource.isLoaded() && !this.internalDataSource.isLoading()) {
        if (this.props.remoteFiltering && this.state.lastViewDateByEndDayHour) {
          var combinedFilter = (0, _remote.default)({
            dataAccessors: this.dataAccessors,
            dataSourceFilter: this.internalDataSource.filter(),
            min: this.startViewDate,
            max: this.state.lastViewDateByEndDayHour,
            dateSerializationFormat: this.props.dateSerializationFormat
          });
          this.internalDataSource.filter(combinedFilter);
        }
        this.internalDataSource.load().done(function (loadOptions) {
          _this3.setState(function (__state_argument) {
            return {
              dataItems: (0, _data.resolveDataItems)(loadOptions)
            };
          });
        });
      }
    };
    _proto.onViewRendered = function onViewRendered(viewMetaData) {
      var _this$state$lastViewD;
      this.setState(function (__state_argument) {
        return {
          workSpaceViewModel: viewMetaData
        };
      });
      var viewDataProvider = viewMetaData.viewDataProvider;
      var lastViewDate = viewDataProvider.getLastViewDateByEndDayHour(this.currentViewConfig.endDayHour);
      if (lastViewDate.getTime() !== ((_this$state$lastViewD = this.state.lastViewDateByEndDayHour) === null || _this$state$lastViewD === void 0 ? void 0 : _this$state$lastViewD.getTime())) {
        this.setState(function (__state_argument) {
          return {
            lastViewDateByEndDayHour: lastViewDate
          };
        });
      }
    };
    _proto.setCurrentView = function setCurrentView(view) {
      {
        var __newValue;
        this.setState(function (__state_argument) {
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
        var __newValue;
        this.setState(function (__state_argument) {
          __newValue = date;
          return {
            currentDate: __newValue
          };
        });
        this.props.currentDateChange(__newValue);
      }
    };
    _proto.showTooltip = function showTooltip(e) {
      this.setState(function (__state_argument) {
        return {
          tooltipData: e.data
        };
      });
      this.setState(function (__state_argument) {
        return {
          tooltipTarget: e.target
        };
      });
      this.changeTooltipVisible(true);
    };
    _proto.showAppointmentPopupForm = function showAppointmentPopupForm(_ref2) {
      var data = _ref2.data;
      var appointmentData = data[0];
      this.setState(function (__state_argument) {
        return {
          appointmentFormData: appointmentData.appointment
        };
      });
      this.setState(function (__state_argument) {
        return {
          formContextValue: {
            formData: (0, _formData.createFormData)(appointmentData.appointment)
          }
        };
      });
      var isRecurrent = appointmentData.info.isRecurrent;
      this.setState(function (__state_argument) {
        return {
          appointmentPopupSize: (0, _popup_config.getPopupSize)(isRecurrent)
        };
      });
      this.setState(function (__state_argument) {
        return {
          needCreateAppointmentEditForm: true
        };
      });
      this.hideTooltip();
      this.changeAppointmentEditFormVisible(true);
    };
    _proto.hideTooltip = function hideTooltip() {
      this.changeTooltipVisible(false);
    };
    _proto.changeTooltipVisible = function changeTooltipVisible(value) {
      this.setState(function (__state_argument) {
        return {
          tooltipVisible: value
        };
      });
    };
    _proto.changeAppointmentEditFormVisible = function changeAppointmentEditFormVisible(value) {
      this.setState(function (__state_argument) {
        return {
          appointmentEditFormVisible: value
        };
      });
    };
    _proto.showReducedIconTooltip = function showReducedIconTooltip(data) {
      this.setState(function (__state_argument) {
        return {
          reducedIconTarget: data.target
        };
      });
      this.setState(function (__state_argument) {
        return {
          reducedIconEndDate: data.endDate
        };
      });
      this.setState(function (__state_argument) {
        return {
          reducedIconTooltipVisible: true
        };
      });
    };
    _proto.hideReducedIconTooltip = function hideReducedIconTooltip() {
      this.setState(function (__state_argument) {
        return {
          reducedIconTooltipVisible: false
        };
      });
    };
    _proto.updateAppointmentFocus = function updateAppointmentFocus(type, index) {
      this.state.appointmentFocus.type = type;
      this.state.appointmentFocus.index = index;
    };
    _proto.updateFocusedAppointment = function updateFocusedAppointment(type, index) {
      var _this$state$appointme = this.state.appointmentFocus,
          prevFocusedIndex = _this$state$appointme.index,
          prevFocusedType = _this$state$appointme.type;
      if (prevFocusedIndex >= 0) {
        var prevViewModels = this.appointmentsViewModel[prevFocusedType];
        var prevViewModel = prevViewModels[prevFocusedIndex];
        prevViewModels[prevFocusedIndex] = _extends({}, prevViewModel, {
          focused: false
        });
      }
      this.updateAppointmentFocus(type, index);
      var viewModels = this.appointmentsViewModel[type];
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
      var props = this.props;
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
      get: function get() {
        var views = this.props.views;
        return (0, _views.getCurrentViewProps)(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView, views);
      }
    }, {
      key: "currentViewConfig",
      get: function get() {
        var _this4 = this;
        if (this.__getterCache['currentViewConfig'] !== undefined) {
          return this.__getterCache['currentViewConfig'];
        }
        return this.__getterCache['currentViewConfig'] = function () {
          var _this4$props = _this4.props,
              allDayPanelMode = _this4$props.allDayPanelMode,
              appointmentCollectorTemplate = _this4$props.appointmentCollectorTemplate,
              appointmentTemplate = _this4$props.appointmentTemplate,
              appointmentTooltipTemplate = _this4$props.appointmentTooltipTemplate,
              cellDuration = _this4$props.cellDuration,
              crossScrollingEnabled = _this4$props.crossScrollingEnabled,
              dataCellTemplate = _this4$props.dataCellTemplate,
              dateCellTemplate = _this4$props.dateCellTemplate,
              endDayHour = _this4$props.endDayHour,
              firstDayOfWeek = _this4$props.firstDayOfWeek,
              groupByDate = _this4$props.groupByDate,
              height = _this4$props.height,
              indicatorUpdateInterval = _this4$props.indicatorUpdateInterval,
              maxAppointmentsPerCell = _this4$props.maxAppointmentsPerCell,
              resourceCellTemplate = _this4$props.resourceCellTemplate,
              scrolling = _this4$props.scrolling,
              shadeUntilCurrentTime = _this4$props.shadeUntilCurrentTime,
              showAllDayPanel = _this4$props.showAllDayPanel,
              showCurrentTimeIndicator = _this4$props.showCurrentTimeIndicator,
              startDayHour = _this4$props.startDayHour,
              timeCellTemplate = _this4$props.timeCellTemplate,
              width = _this4$props.width;
          return (0, _views.getCurrentViewConfig)(_this4.currentViewProps, {
            firstDayOfWeek: firstDayOfWeek,
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            cellDuration: cellDuration,
            groupByDate: groupByDate,
            scrolling: scrolling,
            dataCellTemplate: dataCellTemplate,
            timeCellTemplate: timeCellTemplate,
            resourceCellTemplate: resourceCellTemplate,
            dateCellTemplate: dateCellTemplate,
            appointmentTemplate: appointmentTemplate,
            appointmentCollectorTemplate: appointmentCollectorTemplate,
            appointmentTooltipTemplate: appointmentTooltipTemplate,
            maxAppointmentsPerCell: maxAppointmentsPerCell,
            showAllDayPanel: showAllDayPanel,
            showCurrentTimeIndicator: showCurrentTimeIndicator,
            indicatorUpdateInterval: indicatorUpdateInterval,
            shadeUntilCurrentTime: shadeUntilCurrentTime,
            crossScrollingEnabled: crossScrollingEnabled,
            height: height,
            width: width,
            allDayPanelMode: allDayPanelMode
          }, _this4.props.currentDate !== undefined ? _this4.props.currentDate : _this4.state.currentDate);
        }();
      }
    }, {
      key: "isValidViewDataProvider",
      get: function get() {
        var _this$state$workSpace;
        var _this$currentViewConf = this.currentViewConfig,
            allDayPanelExpanded = _this$currentViewConf.allDayPanelExpanded,
            cellDuration = _this$currentViewConf.cellDuration,
            crossScrollingEnabled = _this$currentViewConf.crossScrollingEnabled,
            currentDate = _this$currentViewConf.currentDate,
            endDayHour = _this$currentViewConf.endDayHour,
            firstDayOfWeek = _this$currentViewConf.firstDayOfWeek,
            groupByDate = _this$currentViewConf.groupByDate,
            groupOrientation = _this$currentViewConf.groupOrientation,
            hoursInterval = _this$currentViewConf.hoursInterval,
            intervalCount = _this$currentViewConf.intervalCount,
            scrolling = _this$currentViewConf.scrolling,
            showAllDayPanel = _this$currentViewConf.showAllDayPanel,
            startDate = _this$currentViewConf.startDate,
            startDayHour = _this$currentViewConf.startDayHour,
            type = _this$currentViewConf.type;
        return (0, _common.isViewDataProviderConfigValid)((_this$state$workSpace = this.state.workSpaceViewModel) === null || _this$state$workSpace === void 0 ? void 0 : _this$state$workSpace.viewDataProviderValidationOptions, {
          intervalCount: intervalCount !== null && intervalCount !== void 0 ? intervalCount : 1,
          currentDate: currentDate,
          type: type,
          hoursInterval: hoursInterval,
          startDayHour: startDayHour,
          endDayHour: endDayHour,
          groupOrientation: groupOrientation,
          groupByDate: groupByDate,
          crossScrollingEnabled: crossScrollingEnabled,
          firstDayOfWeek: firstDayOfWeek,
          startDate: startDate,
          showAllDayPanel: showAllDayPanel,
          allDayPanelExpanded: allDayPanelExpanded,
          scrolling: scrolling,
          cellDuration: cellDuration,
          groups: this.state.loadedResources
        });
      }
    }, {
      key: "dataAccessors",
      get: function get() {
        var _this5 = this;
        if (this.__getterCache['dataAccessors'] !== undefined) {
          return this.__getterCache['dataAccessors'];
        }
        return this.__getterCache['dataAccessors'] = function () {
          return (0, _common.createDataAccessors)({
            startDateExpr: _this5.props.startDateExpr,
            endDateExpr: _this5.props.endDateExpr,
            startDateTimeZoneExpr: _this5.props.startDateTimeZoneExpr,
            endDateTimeZoneExpr: _this5.props.endDateTimeZoneExpr,
            allDayExpr: _this5.props.allDayExpr,
            textExpr: _this5.props.textExpr,
            descriptionExpr: _this5.props.descriptionExpr,
            recurrenceRuleExpr: _this5.props.recurrenceRuleExpr,
            recurrenceExceptionExpr: _this5.props.recurrenceExceptionExpr,
            resources: _this5.props.resources
          });
        }();
      }
    }, {
      key: "startViewDate",
      get: function get() {
        var _this6 = this;
        if (this.__getterCache['startViewDate'] !== undefined) {
          return this.__getterCache['startViewDate'];
        }
        return this.__getterCache['startViewDate'] = function () {
          var _this6$currentViewCon = _this6.currentViewConfig,
              currentDate = _this6$currentViewCon.currentDate,
              firstDayOfWeek = _this6$currentViewCon.firstDayOfWeek,
              intervalCount = _this6$currentViewCon.intervalCount,
              startDate = _this6$currentViewCon.startDate,
              startDayHour = _this6$currentViewCon.startDayHour,
              type = _this6$currentViewCon.type;
          var options = {
            currentDate: currentDate,
            startDayHour: startDayHour,
            startDate: startDate,
            intervalCount: intervalCount,
            firstDayOfWeek: firstDayOfWeek
          };
          var viewDataGenerator = (0, _utils.getViewDataGeneratorByViewType)(type);
          var startViewDate = viewDataGenerator.getStartViewDate(options);
          return startViewDate;
        }();
      }
    }, {
      key: "isVirtualScrolling",
      get: function get() {
        var _this$currentViewProp;
        return this.props.scrolling.mode === 'virtual' || ((_this$currentViewProp = this.currentViewProps.scrolling) === null || _this$currentViewProp === void 0 ? void 0 : _this$currentViewProp.mode) === 'virtual';
      }
    }, {
      key: "timeZoneCalculator",
      get: function get() {
        var _this7 = this;
        if (this.__getterCache['timeZoneCalculator'] !== undefined) {
          return this.__getterCache['timeZoneCalculator'];
        }
        return this.__getterCache['timeZoneCalculator'] = function () {
          return (0, _createTimeZoneCalculator.createTimeZoneCalculator)(_this7.props.timeZone);
        }();
      }
    }, {
      key: "internalDataSource",
      get: function get() {
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
      get: function get() {
        var _this8 = this;
        if (this.__getterCache['appointmentsConfig'] !== undefined) {
          return this.__getterCache['appointmentsConfig'];
        }
        return this.__getterCache['appointmentsConfig'] = function () {
          if (!_this8.isValidViewDataProvider || !_this8.state.loadedResources) {
            return undefined;
          }
          var renderConfig = (0, _work_space_config.getViewRenderConfigByType)(_this8.currentViewConfig.type, _this8.currentViewConfig.crossScrollingEnabled, _this8.currentViewConfig.intervalCount, _this8.state.loadedResources, _this8.currentViewConfig.groupOrientation);
          return (0, _appointments2.getAppointmentsConfig)({
            adaptivityEnabled: _this8.props.adaptivityEnabled,
            rtlEnabled: _this8.props.rtlEnabled,
            resources: _this8.props.resources,
            timeZone: _this8.props.timeZone,
            groups: _this8.mergedGroups
          }, {
            startDayHour: _this8.currentViewConfig.startDayHour,
            endDayHour: _this8.currentViewConfig.endDayHour,
            currentDate: _this8.currentViewConfig.currentDate,
            scrolling: _this8.currentViewConfig.scrolling,
            intervalCount: _this8.currentViewConfig.intervalCount,
            hoursInterval: _this8.currentViewConfig.hoursInterval,
            showAllDayPanel: _this8.currentViewConfig.showAllDayPanel,
            firstDayOfWeek: _this8.currentViewConfig.firstDayOfWeek,
            type: _this8.currentViewConfig.type,
            cellDuration: _this8.currentViewConfig.cellDuration,
            maxAppointmentsPerCell: _this8.currentViewConfig.maxAppointmentsPerCell,
            allDayPanelMode: _this8.currentViewConfig.allDayPanelMode
          }, _this8.state.loadedResources, _this8.state.workSpaceViewModel.viewDataProvider, renderConfig.isAllDayPanelSupported);
        }();
      }
    }, {
      key: "preparedDataItems",
      get: function get() {
        var _this9 = this;
        if (this.__getterCache['preparedDataItems'] !== undefined) {
          return this.__getterCache['preparedDataItems'];
        }
        return this.__getterCache['preparedDataItems'] = function () {
          return (0, _data.getPreparedDataItems)(_this9.state.dataItems, _this9.dataAccessors, _this9.currentViewConfig.cellDuration, _this9.timeZoneCalculator);
        }();
      }
    }, {
      key: "filteredItems",
      get: function get() {
        var _this10 = this;
        if (this.__getterCache['filteredItems'] !== undefined) {
          return this.__getterCache['filteredItems'];
        }
        return this.__getterCache['filteredItems'] = function () {
          if (!_this10.appointmentsConfig) {
            return [];
          }
          var filterStrategy = (0, _local.getFilterStrategy)(_this10.appointmentsConfig.resources, _this10.appointmentsConfig.startDayHour, _this10.appointmentsConfig.endDayHour, _this10.appointmentsConfig.cellDurationInMinutes, _this10.appointmentsConfig.showAllDayPanel, _this10.appointmentsConfig.supportAllDayRow, _this10.appointmentsConfig.firstDayOfWeek, _this10.appointmentsConfig.viewType, _this10.appointmentsConfig.dateRange, _this10.appointmentsConfig.groupCount, _this10.appointmentsConfig.loadedResources, _this10.appointmentsConfig.isVirtualScrolling, _this10.timeZoneCalculator, _this10.dataAccessors, _this10.state.workSpaceViewModel.viewDataProvider);
          return filterStrategy.filter(_this10.preparedDataItems);
        }();
      }
    }, {
      key: "appointmentsViewModel",
      get: function get() {
        var _this11 = this;
        if (this.__getterCache['appointmentsViewModel'] !== undefined) {
          return this.__getterCache['appointmentsViewModel'];
        }
        return this.__getterCache['appointmentsViewModel'] = function () {
          if (!_this11.appointmentsConfig || _this11.filteredItems.length === 0) {
            return {
              allDay: [],
              allDayCompact: [],
              regular: [],
              regularCompact: []
            };
          }
          var model = (0, _appointments2.getAppointmentsModel)(_this11.appointmentsConfig, _this11.state.workSpaceViewModel.viewDataProvider, _this11.timeZoneCalculator, _this11.dataAccessors, _this11.state.workSpaceViewModel.cellsMetaData);
          return (0, _appointments.getAppointmentsViewModel)(model, _this11.filteredItems);
        }();
      }
    }, {
      key: "workSpaceKey",
      get: function get() {
        var _this$state$loadedRes;
        var _this$currentViewConf2 = this.currentViewConfig,
            crossScrollingEnabled = _this$currentViewConf2.crossScrollingEnabled,
            groupOrientation = _this$currentViewConf2.groupOrientation,
            intervalCount = _this$currentViewConf2.intervalCount;
        if (!crossScrollingEnabled) {
          return '';
        }
        var groupCount = (0, _utils2.getGroupCount)((_this$state$loadedRes = this.state.loadedResources) !== null && _this$state$loadedRes !== void 0 ? _this$state$loadedRes : []);
        return "".concat(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView, "_").concat(groupOrientation, "_").concat(intervalCount, "_").concat(groupCount);
      }
    }, {
      key: "mergedGroups",
      get: function get() {
        var _this12 = this;
        if (this.__getterCache['mergedGroups'] !== undefined) {
          return this.__getterCache['mergedGroups'];
        }
        return this.__getterCache['mergedGroups'] = function () {
          return (0, _views.getValidGroups)(_this12.props.groups, _this12.currentViewProps.groups);
        }();
      }
    }, {
      key: "appointmentsContextValue",
      get: function get() {
        var _this13 = this;
        if (this.__getterCache['appointmentsContextValue'] !== undefined) {
          return this.__getterCache['appointmentsContextValue'];
        }
        return this.__getterCache['appointmentsContextValue'] = function () {
          return {
            viewModel: _this13.appointmentsViewModel,
            groups: _this13.mergedGroups,
            resources: _this13.props.resources,
            resourceLoaderMap: _this13.state.resourcePromisesMap,
            loadedResources: _this13.state.loadedResources,
            dataAccessors: _this13.dataAccessors,
            appointmentTemplate: _this13.currentViewConfig.appointmentTemplate,
            overflowIndicatorTemplate: _this13.currentViewConfig.appointmentCollectorTemplate,
            onAppointmentClick: function onAppointmentClick(data) {
              return _this13.showTooltip(data);
            },
            onAppointmentDoubleClick: function onAppointmentDoubleClick(data) {
              return _this13.showAppointmentPopupForm(data);
            },
            showReducedIconTooltip: function showReducedIconTooltip(data) {
              return _this13.showReducedIconTooltip(data);
            },
            hideReducedIconTooltip: function hideReducedIconTooltip() {
              return _this13.hideReducedIconTooltip();
            },
            updateFocusedAppointment: _this13.updateFocusedAppointment
          };
        }();
      }
    }, {
      key: "classes",
      get: function get() {
        return (0, _combine_classes.combineClasses)({
          'dx-scheduler': true,
          'dx-scheduler-native': true,
          'dx-scheduler-adaptive': this.props.adaptivityEnabled
        });
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props$currentDa = _extends({}, this.props, {
          currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
          currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
        }),
            accessKey = _this$props$currentDa.accessKey,
            activeStateEnabled = _this$props$currentDa.activeStateEnabled,
            adaptivityEnabled = _this$props$currentDa.adaptivityEnabled,
            allDayExpr = _this$props$currentDa.allDayExpr,
            allDayPanelMode = _this$props$currentDa.allDayPanelMode,
            appointmentCollectorTemplate = _this$props$currentDa.appointmentCollectorTemplate,
            appointmentDragging = _this$props$currentDa.appointmentDragging,
            appointmentTemplate = _this$props$currentDa.appointmentTemplate,
            appointmentTooltipTemplate = _this$props$currentDa.appointmentTooltipTemplate,
            cellDuration = _this$props$currentDa.cellDuration,
            className = _this$props$currentDa.className,
            crossScrollingEnabled = _this$props$currentDa.crossScrollingEnabled,
            currentDate = _this$props$currentDa.currentDate,
            currentDateChange = _this$props$currentDa.currentDateChange,
            currentView = _this$props$currentDa.currentView,
            currentViewChange = _this$props$currentDa.currentViewChange,
            customizeDateNavigatorText = _this$props$currentDa.customizeDateNavigatorText,
            dataCellTemplate = _this$props$currentDa.dataCellTemplate,
            dataSource = _this$props$currentDa.dataSource,
            dateCellTemplate = _this$props$currentDa.dateCellTemplate,
            dateSerializationFormat = _this$props$currentDa.dateSerializationFormat,
            defaultCurrentDate = _this$props$currentDa.defaultCurrentDate,
            defaultCurrentView = _this$props$currentDa.defaultCurrentView,
            descriptionExpr = _this$props$currentDa.descriptionExpr,
            disabled = _this$props$currentDa.disabled,
            editing = _this$props$currentDa.editing,
            endDateExpr = _this$props$currentDa.endDateExpr,
            endDateTimeZoneExpr = _this$props$currentDa.endDateTimeZoneExpr,
            endDayHour = _this$props$currentDa.endDayHour,
            firstDayOfWeek = _this$props$currentDa.firstDayOfWeek,
            focusStateEnabled = _this$props$currentDa.focusStateEnabled,
            groupByDate = _this$props$currentDa.groupByDate,
            groups = _this$props$currentDa.groups,
            height = _this$props$currentDa.height,
            hint = _this$props$currentDa.hint,
            hoverStateEnabled = _this$props$currentDa.hoverStateEnabled,
            indicatorUpdateInterval = _this$props$currentDa.indicatorUpdateInterval,
            max = _this$props$currentDa.max,
            maxAppointmentsPerCell = _this$props$currentDa.maxAppointmentsPerCell,
            min = _this$props$currentDa.min,
            noDataText = _this$props$currentDa.noDataText,
            onAppointmentAdded = _this$props$currentDa.onAppointmentAdded,
            onAppointmentAdding = _this$props$currentDa.onAppointmentAdding,
            onAppointmentClick = _this$props$currentDa.onAppointmentClick,
            onAppointmentContextMenu = _this$props$currentDa.onAppointmentContextMenu,
            onAppointmentDblClick = _this$props$currentDa.onAppointmentDblClick,
            onAppointmentDeleted = _this$props$currentDa.onAppointmentDeleted,
            onAppointmentDeleting = _this$props$currentDa.onAppointmentDeleting,
            onAppointmentFormOpening = _this$props$currentDa.onAppointmentFormOpening,
            onAppointmentRendered = _this$props$currentDa.onAppointmentRendered,
            onAppointmentUpdated = _this$props$currentDa.onAppointmentUpdated,
            onAppointmentUpdating = _this$props$currentDa.onAppointmentUpdating,
            onCellClick = _this$props$currentDa.onCellClick,
            onCellContextMenu = _this$props$currentDa.onCellContextMenu,
            onClick = _this$props$currentDa.onClick,
            onKeyDown = _this$props$currentDa.onKeyDown,
            recurrenceEditMode = _this$props$currentDa.recurrenceEditMode,
            recurrenceExceptionExpr = _this$props$currentDa.recurrenceExceptionExpr,
            recurrenceRuleExpr = _this$props$currentDa.recurrenceRuleExpr,
            remoteFiltering = _this$props$currentDa.remoteFiltering,
            resourceCellTemplate = _this$props$currentDa.resourceCellTemplate,
            resources = _this$props$currentDa.resources,
            rtlEnabled = _this$props$currentDa.rtlEnabled,
            scrolling = _this$props$currentDa.scrolling,
            selectedCellData = _this$props$currentDa.selectedCellData,
            shadeUntilCurrentTime = _this$props$currentDa.shadeUntilCurrentTime,
            showAllDayPanel = _this$props$currentDa.showAllDayPanel,
            showCurrentTimeIndicator = _this$props$currentDa.showCurrentTimeIndicator,
            startDateExpr = _this$props$currentDa.startDateExpr,
            startDateTimeZoneExpr = _this$props$currentDa.startDateTimeZoneExpr,
            startDayHour = _this$props$currentDa.startDayHour,
            tabIndex = _this$props$currentDa.tabIndex,
            textExpr = _this$props$currentDa.textExpr,
            timeCellTemplate = _this$props$currentDa.timeCellTemplate,
            timeZone = _this$props$currentDa.timeZone,
            toolbar = _this$props$currentDa.toolbar,
            useDropDownViewSwitcher = _this$props$currentDa.useDropDownViewSwitcher,
            views = _this$props$currentDa.views,
            visible = _this$props$currentDa.visible,
            width = _this$props$currentDa.width,
            restProps = _objectWithoutProperties(_this$props$currentDa, _excluded);
        return restProps;
      }
    }]);
    return Scheduler;
  }(_inferno2.InfernoWrapperComponent);
  exports.Scheduler = Scheduler;
  Scheduler.defaultProps = _props.SchedulerProps;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","./props","../common/widget","../../../data/data_source","./model/views","./workspaces/base/work_space","./header/header","../../../ui/scheduler/workspaces/view_model/utils","./common","./timeZoneCalculator/createTimeZoneCalculator","../../../ui/scheduler/resources/utils","./view_model/appointments/appointments","./model/appointments","./appointment/tooltip/appointment_tooltip","./workspaces/base/work_space_config","./utils/data","./utils/filtering/local","./utils/filtering/remote","./appointment/reduced_icon_tooltip/layout","./appointments_context_provider","../../utils/combine_classes","./appointment_edit_form/layout","./appointment_edit_form/popup_config","./form_context_provider","./utils/editing/formData"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("./props"), require("../common/widget"), require("../../../data/data_source"), require("./model/views"), require("./workspaces/base/work_space"), require("./header/header"), require("../../../ui/scheduler/workspaces/view_model/utils"), require("./common"), require("./timeZoneCalculator/createTimeZoneCalculator"), require("../../../ui/scheduler/resources/utils"), require("./view_model/appointments/appointments"), require("./model/appointments"), require("./appointment/tooltip/appointment_tooltip"), require("./workspaces/base/work_space_config"), require("./utils/data"), require("./utils/filtering/local"), require("./utils/filtering/remote"), require("./appointment/reduced_icon_tooltip/layout"), require("./appointments_context_provider"), require("../../utils/combine_classes"), require("./appointment_edit_form/layout"), require("./appointment_edit_form/popup_config"), require("./form_context_provider"), require("./utils/editing/formData"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scheduler.js.map