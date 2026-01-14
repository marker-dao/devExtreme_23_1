/**
* DevExtreme (cjs/__internal/scheduler/utils/options/constants.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SCHEDULER_OPTIONS_RULES = exports.DEFAULT_SCHEDULER_OPTIONS = exports.DEFAULT_SCHEDULER_INTERNAL_OPTIONS = exports.DEFAULT_SCHEDULER_INTEGRATION_OPTIONS = exports.DEFAULT_ICONS_SHOW_MODE = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _themes = require("../../../../ui/themes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_APPOINTMENT_TEMPLATE_NAME = 'item';
const DEFAULT_APPOINTMENT_COLLECTOR_TEMPLATE_NAME = 'appointmentCollector';
const DEFAULT_ICONS_SHOW_MODE = exports.DEFAULT_ICONS_SHOW_MODE = 'main';
const DEFAULT_SCHEDULER_OPTIONS = exports.DEFAULT_SCHEDULER_OPTIONS = {
  views: ['day', 'week'],
  currentView: 'day',
  currentDate: _date.default.trimTime(new Date()),
  min: undefined,
  max: undefined,
  dateSerializationFormat: undefined,
  firstDayOfWeek: undefined,
  groups: [],
  resources: [],
  dataSource: null,
  customizeDateNavigatorText: undefined,
  appointmentTemplate: DEFAULT_APPOINTMENT_TEMPLATE_NAME,
  appointmentCollectorTemplate: DEFAULT_APPOINTMENT_COLLECTOR_TEMPLATE_NAME,
  dataCellTemplate: undefined,
  timeCellTemplate: undefined,
  resourceCellTemplate: undefined,
  dateCellTemplate: undefined,
  startDayHour: 0,
  endDayHour: 24,
  offset: 0,
  editing: {
    allowAdding: true,
    allowDeleting: true,
    allowDragging: true,
    allowResizing: true,
    allowUpdating: true,
    allowTimeZoneEditing: false,
    form: {
      iconsShowMode: DEFAULT_ICONS_SHOW_MODE
    },
    popup: {}
  },
  showAllDayPanel: true,
  showCurrentTimeIndicator: true,
  shadeUntilCurrentTime: false,
  indicatorUpdateInterval: 300000,
  recurrenceEditMode: 'dialog',
  cellDuration: 30,
  maxAppointmentsPerCell: 'auto',
  selectedCellData: [],
  groupByDate: false,
  onAppointmentRendered: undefined,
  onAppointmentClick: undefined,
  onAppointmentDblClick: undefined,
  onAppointmentContextMenu: undefined,
  onCellClick: undefined,
  onCellContextMenu: undefined,
  onAppointmentAdding: undefined,
  onAppointmentAdded: undefined,
  onAppointmentUpdating: undefined,
  onAppointmentUpdated: undefined,
  onAppointmentDeleting: undefined,
  onAppointmentDeleted: undefined,
  onAppointmentFormOpening: undefined,
  onAppointmentTooltipShowing: undefined,
  appointmentTooltipTemplate: 'appointmentTooltip',
  crossScrollingEnabled: false,
  useDropDownViewSwitcher: false,
  startDateExpr: 'startDate',
  endDateExpr: 'endDate',
  textExpr: 'text',
  descriptionExpr: 'description',
  allDayExpr: 'allDay',
  recurrenceRuleExpr: 'recurrenceRule',
  recurrenceExceptionExpr: 'recurrenceException',
  remoteFiltering: false,
  timeZone: '',
  startDateTimeZoneExpr: 'startDateTimeZone',
  endDateTimeZoneExpr: 'endDateTimeZone',
  noDataText: '',
  adaptivityEnabled: false,
  scrolling: {
    mode: 'standard'
  },
  allDayPanelMode: 'all',
  toolbar: {
    disabled: false,
    multiline: false,
    items: [{
      location: 'before',
      name: 'dateNavigator'
    }, {
      location: 'after',
      name: 'viewSwitcher',
      locateInMenu: 'auto'
    }]
  }
};
const DEFAULT_SCHEDULER_INTERNAL_OPTIONS = exports.DEFAULT_SCHEDULER_INTERNAL_OPTIONS = {
  indicatorTime: undefined,
  renovateRender: true,
  editing: Object.assign({
    legacyForm: false
  }, DEFAULT_SCHEDULER_OPTIONS.editing, {
    popup: {}
  }),
  _draggingMode: 'outlook',
  _appointmentTooltipOffset: {
    x: 0,
    y: 0
  },
  appointmentPopupTemplate: 'appointmentPopup',
  disabledExpr: 'disabled',
  visibleExpr: 'visible',
  allowMultipleCellSelection: true
};
const DEFAULT_SCHEDULER_INTEGRATION_OPTIONS = exports.DEFAULT_SCHEDULER_INTEGRATION_OPTIONS = {
  integrationOptions: {
    useDeferUpdateForTemplates: false
  }
};
const DEFAULT_SCHEDULER_OPTIONS_RULES = exports.DEFAULT_SCHEDULER_OPTIONS_RULES = [{
  device() {
    return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
  },
  options: {
    focusStateEnabled: true
  }
}, {
  device() {
    return !_devices.default.current().generic;
  },
  options: {
    useDropDownViewSwitcher: true,
    editing: {
      allowDragging: false,
      allowResizing: false
    }
  }
}, {
  device() {
    // @ts-expect-error
    return (0, _themes.isMaterialBased)();
  },
  options: {
    useDropDownViewSwitcher: true,
    dateCellTemplate: (data, _, element) => {
      const {
        text = ''
      } = data;
      text.split(' ').forEach((word, wordIndex) => {
        const span = (0, _renderer.default)('<span>').text(word).addClass('dx-scheduler-header-panel-cell-date');
        (0, _renderer.default)(element).append(span);
        if (!wordIndex) (0, _renderer.default)(element).append(' ');
      });
    }
  }
}, {
  device() {
    // @ts-expect-error
    return (0, _themes.isMaterial)();
  },
  options: {
    _appointmentTooltipOffset: {
      x: 0,
      y: 11
    }
  }
}];
