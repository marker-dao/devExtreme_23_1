import { move } from '../../../../common/core/animation/translator';
import eventsEngine from '../../../../common/core/events/core/events_engine';
import pointerEvents from '../../../../common/core/events/pointer';
import { addNamespace } from '../../../../common/core/events/utils/index';
import registerComponent from '../../../../core/component_registrator';
import DOMComponent from '../../../../core/dom_component';
import Guid from '../../../../core/guid';
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import Resizable from '../../../../ui/resizable';
import { hide, show } from '../../../ui/tooltip/m_tooltip';
import { ALL_DAY_APPOINTMENT_CLASS, APPOINTMENT_CONTENT_CLASSES, APPOINTMENT_DRAG_SOURCE_CLASS, APPOINTMENT_HAS_RESOURCE_COLOR_CLASS, DIRECTION_APPOINTMENT_CLASSES, EMPTY_APPOINTMENT_CLASS, RECURRENCE_APPOINTMENT_CLASS, REDUCED_APPOINTMENT_CLASS, REDUCED_APPOINTMENT_ICON, REDUCED_APPOINTMENT_PARTS_CLASSES } from '../../m_classes';
import { getRecurrenceProcessor } from '../../m_recurrence';
import { getAriaDescription, getAriaLabel, getReducedIconTooltip } from './text_utils';
const DEFAULT_HORIZONTAL_HANDLES = 'left right';
const DEFAULT_VERTICAL_HANDLES = 'top bottom';
const REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME = addNamespace(pointerEvents.enter, 'dxSchedulerAppointment');
const REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME = addNamespace(pointerEvents.leave, 'dxSchedulerAppointment');
export class Appointment extends DOMComponent {
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
    return extend(super._getDefaultOptions(), {
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
        this.coloredElement.addClass(APPOINTMENT_HAS_RESOURCE_COLOR_CLASS);
      }
    });
  }
  _renderAriaLabel() {
    const $element = this.$element();
    $element.attr('aria-label', getAriaLabel(this.option()));
    // eslint-disable-next-line no-void
    void getAriaDescription(this.option()).then(text => {
      if (text) {
        const id = `dx-${new Guid()}`;
        const $description = $element.find(`.${APPOINTMENT_CONTENT_CLASSES.ARIA_DESCRIPTION}`);
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
    move($element, {
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
      this.$element().addClass(EMPTY_APPOINTMENT_CLASS);
    }
  }
  _renderReducedAppointment() {
    const reducedPart = this.option('reduced');
    if (!reducedPart) {
      return;
    }
    this.$element().toggleClass(REDUCED_APPOINTMENT_CLASS, true).toggleClass(REDUCED_APPOINTMENT_PARTS_CLASSES[reducedPart], true);
    this._renderAppointmentReducedIcon();
  }
  _renderAppointmentReducedIcon() {
    const $icon = $('<div>').addClass(REDUCED_APPOINTMENT_ICON).appendTo(this.$element());
    eventsEngine.off($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME);
    eventsEngine.on($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME, () => {
      show({
        target: $icon,
        content: getReducedIconTooltip(this.option())
      });
    });
    eventsEngine.off($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME);
    eventsEngine.on($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME, () => {
      hide();
    });
  }
  _renderAllDayClass() {
    this.$element().toggleClass(ALL_DAY_APPOINTMENT_CLASS, !!this.option('allDay'));
  }
  _renderDragSourceClass() {
    this.$element().toggleClass(APPOINTMENT_DRAG_SOURCE_CLASS, !!this.option('isDragSource'));
  }
  _renderRecurrenceClass() {
    const rule = this.dataAccessors.get('recurrenceRule', this.rawAppointment);
    if (getRecurrenceProcessor().isValidRecurrenceRule(rule)) {
      this.$element().addClass(RECURRENCE_APPOINTMENT_CLASS);
    }
  }
  _renderDirection() {
    this.$element().addClass(DIRECTION_APPOINTMENT_CLASSES[this.option('direction')]);
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
      this._createComponent(this.$element(), Resizable, extend(this._createResizingConfig(), this.option('resizableConfig')));
    }
  }
  _useTemplates() {
    return false;
  }
}
registerComponent('dxSchedulerAppointment', Appointment);