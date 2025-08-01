/**
* DevExtreme (esm/__internal/scheduler/m_compact_appointments_helper.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { locate, move } from '../../common/core/animation/translator';
import dateLocalization from '../../common/core/localization/date';
import messageLocalization from '../../common/core/localization/message';
import $ from '../../core/renderer';
import { FunctionTemplate } from '../../core/templates/function_template';
import Button from '../../ui/button';
import { APPOINTMENT_SETTINGS_KEY, LIST_ITEM_CLASS, LIST_ITEM_DATA_KEY } from './constants';
import { AppointmentTooltipInfo } from './m_data_structures';
const APPOINTMENT_COLLECTOR_CLASS = 'dx-scheduler-appointment-collector';
const COMPACT_APPOINTMENT_COLLECTOR_CLASS = `${APPOINTMENT_COLLECTOR_CLASS}-compact`;
const APPOINTMENT_COLLECTOR_CONTENT_CLASS = `${APPOINTMENT_COLLECTOR_CLASS}-content`;
const WEEK_VIEW_COLLECTOR_OFFSET = 5;
const COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;
export class CompactAppointmentsHelper {
  constructor(instance) {
    this.instance = instance;
    this.elements = [];
  }
  render(options) {
    const {
      isCompact,
      items
    } = options;
    const template = this._createTemplate(items.data.length, isCompact);
    const button = this._createCompactButton(template, options);
    const $button = button.$element();
    this.elements.push($button);
    $button.data('items', this._createTooltipInfos(items));
    return $button;
  }
  clear() {
    this.elements.forEach(button => {
      button.detach();
      button.remove();
    });
    this.elements = [];
  }
  _createTooltipInfos(items) {
    return items.data.map((appointment, index) => {
      var _items$settings;
      const targeted = _extends({}, appointment);
      if (((_items$settings = items.settings) === null || _items$settings === void 0 ? void 0 : _items$settings.length) > 0) {
        const {
          info
        } = items.settings[index];
        this.instance._dataAccessors.set('startDate', targeted, info.sourceAppointment.startDate);
        this.instance._dataAccessors.set('endDate', targeted, info.sourceAppointment.endDate);
      }
      return new AppointmentTooltipInfo(appointment, targeted, items.colors[index], items.settings[index]);
    });
  }
  _onButtonClick(e, options) {
    const $button = $(e.element);
    this.instance.showAppointmentTooltipCore($button, $button.data('items'), this._getExtraOptionsForTooltip(options, $button));
  }
  _getExtraOptionsForTooltip(options, $appointmentCollector) {
    return {
      clickEvent: this._clickEvent(options.onAppointmentClick).bind(this),
      dragBehavior: options.allowDrag && this._createTooltipDragBehavior($appointmentCollector).bind(this),
      dropDownAppointmentTemplate: this.instance.option().dropDownAppointmentTemplate,
      isButtonClick: true,
      _loopFocus: true
    };
  }
  _clickEvent(onAppointmentClick) {
    return e => {
      const clickEventArgs = this.instance._createEventArgs(e);
      onAppointmentClick(clickEventArgs);
    };
  }
  _createTooltipDragBehavior($appointmentCollector) {
    return e => {
      const $element = $(e.element);
      const $schedulerElement = $(this.instance.element());
      const workSpace = this.instance.getWorkSpace();
      const getItemData = itemElement => {
        var _$$data;
        return (_$$data = $(itemElement).data(LIST_ITEM_DATA_KEY)) === null || _$$data === void 0 ? void 0 : _$$data.appointment;
      };
      const getItemSettings = (_, event) => event.itemSettings;
      const initialPosition = locate($appointmentCollector);
      const options = {
        filter: `.${LIST_ITEM_CLASS}`,
        isSetCursorOffset: true,
        initialPosition,
        getItemData,
        getItemSettings
      };
      workSpace._createDragBehaviorBase($element, $schedulerElement, options);
    };
  }
  _getCollectorOffset(width, cellWidth) {
    return cellWidth - width - this._getCollectorRightOffset();
  }
  _getCollectorRightOffset() {
    return this.instance.getRenderingStrategyInstance()._isCompactTheme() ? COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET : WEEK_VIEW_COLLECTOR_OFFSET;
  }
  _setPosition(element, position) {
    move(element, {
      top: position.top,
      left: position.left
    });
  }
  _createCompactButton(template, options) {
    const $button = this._createCompactButtonElement(options);
    return this.instance._createComponent($button, Button, {
      type: 'default',
      width: options.width,
      height: options.height,
      onClick: e => this._onButtonClick(e, options),
      template: this._renderTemplate(template, options.items, options.isCompact)
    });
  }
  _createCompactButtonElement(_ref) {
    let {
      isCompact,
      $container,
      coordinates,
      sortedIndex,
      items
    } = _ref;
    const appointmentDate = this._getDateText(items.data[0]);
    const result = $('<div>').addClass(APPOINTMENT_COLLECTOR_CLASS).attr('aria-roledescription', appointmentDate).toggleClass(COMPACT_APPOINTMENT_COLLECTOR_CLASS, isCompact).appendTo($container);
    result.data(APPOINTMENT_SETTINGS_KEY, {
      sortedIndex
    });
    this._setPosition(result, coordinates);
    return result;
  }
  _renderTemplate(template, items, isCompact) {
    return new FunctionTemplate(options => template.render({
      model: {
        appointmentCount: items.data.length,
        items: items.data,
        isCompact
      },
      container: options.container
    }));
  }
  _createTemplate(count, isCompact) {
    this._initButtonTemplate(count, isCompact);
    return this.instance._getAppointmentTemplate('appointmentCollectorTemplate');
  }
  _initButtonTemplate(count, isCompact) {
    this.instance._templateManager.addDefaultTemplates({
      appointmentCollector: new FunctionTemplate(options => this._createButtonTemplate(count, $(options.container), isCompact))
    });
  }
  _createButtonTemplate(appointmentCount, element, isCompact) {
    const text = isCompact ? appointmentCount : messageLocalization.getFormatter('dxScheduler-moreAppointments')(appointmentCount);
    return element.append($('<span>').text(text)).addClass(APPOINTMENT_COLLECTOR_CONTENT_CLASS);
  }
  _localizeDate(date) {
    return `${dateLocalization.format(date, 'monthAndDay')}, ${dateLocalization.format(date, 'year')}`;
  }
  _getStartDate(appointment) {
    const date = appointment.startDate;
    return date ? new Date(date) : null;
  }
  _getEndDate(appointment) {
    const date = appointment.endDate;
    return date ? new Date(date) : null;
  }
  _getDateText(appointment) {
    const startDate = this.instance._dataAccessors.get('startDate', appointment);
    const endDate = this.instance._dataAccessors.get('endDate', appointment);
    const startDateText = startDate ? this._localizeDate(startDate) : '';
    const endDateText = endDate ? this._localizeDate(endDate) : '';
    const dateText = startDateText === endDateText ? `${startDateText}` : `${startDateText} - ${endDateText}`;
    return `${dateText}`;
  }
}
