/**
* DevExtreme (cjs/__internal/scheduler/appointments/appointment/m_appointment.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Appointment = void 0;
var _translator = require("../../../../common/core/animation/translator");
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../common/core/events/pointer"));
var _index = require("../../../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../../../core/component_registrator"));
var _dom_component = _interopRequireDefault(require("../../../../core/dom_component"));
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _resizable = _interopRequireDefault(require("../../../../ui/resizable"));
var _m_tooltip = require("../../../ui/tooltip/m_tooltip");
var _m_classes = require("../../m_classes");
var _m_recurrence = require("../../m_recurrence");
var _text_utils = require("./text_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_HORIZONTAL_HANDLES = 'left right';
const DEFAULT_VERTICAL_HANDLES = 'top bottom';
const REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.enter, 'dxSchedulerAppointment');
const REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.leave, 'dxSchedulerAppointment');
class Appointment extends _dom_component.default {
  get coloredElement() {
    return this.$element();
  }
  get rawAppointment() {
    return this.option('data');
  }
  get dataAccessors() {
    return this.option('dataAccessors');
  }
  _getDefaultOptions() {
    // @ts-expect-error
    return (0, _extend.extend)(super._getDefaultOptions(), {
      data: {},
      groupIndex: -1,
      groups: [],
      geometry: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      allowDrag: true,
      allowResize: true,
      reduced: null,
      isCompact: false,
      direction: 'vertical',
      resizableConfig: {
        keepAspectRatio: false
      },
      cellHeight: 0,
      cellWidth: 0,
      isDragSource: false
    });
  }
  notifyObserver(subject, args) {
    const observer = this.option('observer');
    if (observer) {
      observer.fire(subject, args);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  invoke(funcName) {
    const observer = this.option('observer');
    if (observer) {
      return observer.fire.apply(observer, arguments);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'data':
      case 'groupIndex':
      case 'groupTexts':
      case 'geometry':
      case 'allowDrag':
      case 'allowResize':
      case 'reduced':
      case 'sortedIndex':
      case 'isCompact':
      case 'direction':
      case 'resizableConfig':
      case 'cellHeight':
      case 'cellWidth':
        this._invalidate();
        break;
      case 'isDragSource':
        this._renderDragSourceClass();
        break;
      default:
        // @ts-expect-error
        super._optionChanged(args);
    }
  }
  _getHorizontalResizingRule() {
    const reducedHandles = {
      head: this.option('rtlEnabled') ? 'right' : 'left',
      body: '',
      tail: this.option('rtlEnabled') ? 'left' : 'right'
    };
    const getResizableStep = this.option('getResizableStep');
    const step = getResizableStep ? getResizableStep() : 0;
    return {
      handles: this.option('reduced') ? reducedHandles[this.option('reduced')] : DEFAULT_HORIZONTAL_HANDLES,
      minHeight: 0,
      minWidth: this.invoke('getCellWidth'),
      step,
      roundStepValue: false
    };
  }
  _getVerticalResizingRule() {
    const height = Math.round(this.invoke('getCellHeight'));
    return {
      handles: DEFAULT_VERTICAL_HANDLES,
      minWidth: 0,
      minHeight: height,
      step: height,
      roundStepValue: true
    };
  }
  _render() {
    // @ts-expect-error
    super._render();
    this._renderAppointmentGeometry();
    this._renderAriaLabel();
    this._renderEmptyClass();
    this._renderReducedAppointment();
    this._renderAllDayClass();
    this._renderDragSourceClass();
    this._renderDirection();
    this.$element().data('dxAppointmentStartDate', this.option('startDate'));
    this.$element().attr('role', 'button');
    this._renderRecurrenceClass();
    this._renderResizable();
    this._setResourceColor();
  }
  _setResourceColor() {
    const appointmentConfig = {
      itemData: this.rawAppointment,
      groupIndex: this.option('groupIndex') ?? 0
    };
    const resourceManager = this.option('getResourceManager')();
    resourceManager.getAppointmentColor(appointmentConfig).then(color => {
      if (color) {
        this.coloredElement.css('backgroundColor', color);
        this.coloredElement.addClass(_m_classes.APPOINTMENT_HAS_RESOURCE_COLOR_CLASS);
      }
    });
  }
  _renderAriaLabel() {
    const $element = this.$element();
    $element.attr('aria-label', (0, _text_utils.getAriaLabel)(this.option()));
    // eslint-disable-next-line no-void
    void (0, _text_utils.getAriaDescription)(this.option()).then(text => {
      if (text) {
        const id = `dx-${new _guid.default()}`;
        const $description = $element.find(`.${_m_classes.APPOINTMENT_CONTENT_CLASSES.ARIA_DESCRIPTION}`);
        if ($description) {
          $element.attr('aria-describedby', id);
          $description.text(text).attr('id', id);
        }
      }
    });
  }
  _renderAppointmentGeometry() {
    const geometry = this.option('geometry');
    const $element = this.$element();
    (0, _translator.move)($element, {
      top: geometry.top,
      left: geometry.left
    });
    $element.css({
      width: geometry.width < 0 ? 0 : geometry.width,
      height: geometry.height < 0 ? 0 : geometry.height
    });
  }
  _renderEmptyClass() {
    const geometry = this.option('geometry');
    if (geometry.empty || this.option('isCompact')) {
      this.$element().addClass(_m_classes.EMPTY_APPOINTMENT_CLASS);
    }
  }
  _renderReducedAppointment() {
    const reducedPart = this.option('reduced');
    if (!reducedPart) {
      return;
    }
    this.$element().toggleClass(_m_classes.REDUCED_APPOINTMENT_CLASS, true).toggleClass(_m_classes.REDUCED_APPOINTMENT_PARTS_CLASSES[reducedPart], true);
    this._renderAppointmentReducedIcon();
  }
  _renderAppointmentReducedIcon() {
    const $icon = (0, _renderer.default)('<div>').addClass(_m_classes.REDUCED_APPOINTMENT_ICON).appendTo(this.$element());
    _events_engine.default.off($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME);
    _events_engine.default.on($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME, () => {
      (0, _m_tooltip.show)({
        target: $icon,
        content: (0, _text_utils.getReducedIconTooltip)(this.option())
      });
    });
    _events_engine.default.off($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME);
    _events_engine.default.on($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME, () => {
      (0, _m_tooltip.hide)();
    });
  }
  _renderAllDayClass() {
    this.$element().toggleClass(_m_classes.ALL_DAY_APPOINTMENT_CLASS, !!this.option('allDay'));
  }
  _renderDragSourceClass() {
    this.$element().toggleClass(_m_classes.APPOINTMENT_DRAG_SOURCE_CLASS, !!this.option('isDragSource'));
  }
  _renderRecurrenceClass() {
    const rule = this.dataAccessors.get('recurrenceRule', this.rawAppointment);
    if ((0, _m_recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(rule)) {
      this.$element().addClass(_m_classes.RECURRENCE_APPOINTMENT_CLASS);
    }
  }
  _renderDirection() {
    this.$element().addClass(_m_classes.DIRECTION_APPOINTMENT_CLASSES[this.option('direction')]);
  }
  _createResizingConfig() {
    const config = this.option('direction') === 'vertical' ? this._getVerticalResizingRule() : this._getHorizontalResizingRule();
    if (!this.invoke('isGroupedByDate')) {
      config.stepPrecision = 'strict';
    }
    return config;
  }
  _renderResizable() {
    if (this.option('allowResize')) {
      // @ts-expect-error
      this._createComponent(this.$element(), _resizable.default, (0, _extend.extend)(this._createResizingConfig(), this.option('resizableConfig')));
    }
  }
  _useTemplates() {
    return false;
  }
}
exports.Appointment = Appointment;
(0, _component_registrator.default)('dxSchedulerAppointment', Appointment);
