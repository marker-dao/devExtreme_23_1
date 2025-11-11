/**
* DevExtreme (esm/__internal/scheduler/utils/options/constants.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../../common/core/localization/message';
import devices from '../../../../core/devices';
import $ from '../../../../core/renderer';
import dateUtils from '../../../../core/utils/date';
import { isMaterial, isMaterialBased } from '../../../../ui/themes';
const DEFAULT_APPOINTMENT_TEMPLATE_NAME = 'item';
const DEFAULT_APPOINTMENT_COLLECTOR_TEMPLATE_NAME = 'appointmentCollector';
export const DEFAULT_ICONS_SHOW_MODE = 'main';
export const DEFAULT_SCHEDULER_OPTIONS = {
  views: ['day', 'week'],
  currentView: 'day',
  currentDate: dateUtils.trimTime(new Date()),
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
  noDataText: messageLocalization.format('dxCollectionWidget-noDataText'),
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
export const DEFAULT_SCHEDULER_INTERNAL_OPTIONS = {
  indicatorTime: undefined,
  renovateRender: true,
  editing: _extends({
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
export const DEFAULT_SCHEDULER_INTEGRATION_OPTIONS = {
  integrationOptions: {
    useDeferUpdateForTemplates: false
  }
};
export const DEFAULT_SCHEDULER_OPTIONS_RULES = [{
  device() {
    return devices.real().deviceType === 'desktop' && !devices.isSimulator();
  },
  options: {
    focusStateEnabled: true
  }
}, {
  device() {
    return !devices.current().generic;
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
    return isMaterialBased();
  },
  options: {
    useDropDownViewSwitcher: true,
    dateCellTemplate: (data, _, element) => {
      const {
        text = ''
      } = data;
      text.split(' ').forEach((word, wordIndex) => {
        const span = $('<span>').text(word).addClass('dx-scheduler-header-panel-cell-date');
        $(element).append(span);
        if (!wordIndex) $(element).append(' ');
      });
    }
  }
}, {
  device() {
    // @ts-expect-error
    return isMaterial();
  },
  options: {
    _appointmentTooltipOffset: {
      x: 0,
      y: 11
    }
  }
}];
