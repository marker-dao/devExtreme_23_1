/**
* DevExtreme (cjs/__internal/scheduler/m_compact_appointments_helper.js)
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
exports.CompactAppointmentsHelper = void 0;
var _translator = require("../../common/core/animation/translator");
var _date = _interopRequireDefault(require("../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _function_template = require("../../core/templates/function_template");
var _button = _interopRequireDefault(require("../../ui/button"));
var _constants = require("./constants");
var _m_data_structures = require("./m_data_structures");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const APPOINTMENT_COLLECTOR_CLASS = 'dx-scheduler-appointment-collector';
const COMPACT_APPOINTMENT_COLLECTOR_CLASS = `${APPOINTMENT_COLLECTOR_CLASS}-compact`;
const APPOINTMENT_COLLECTOR_CONTENT_CLASS = `${APPOINTMENT_COLLECTOR_CLASS}-content`;
const WEEK_VIEW_COLLECTOR_OFFSET = 5;
const COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;
class CompactAppointmentsHelper {
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
      return new _m_data_structures.AppointmentTooltipInfo(appointment, targeted, items.colors[index], items.settings[index]);
    });
  }
  _onButtonClick(e, options) {
    const $button = (0, _renderer.default)(e.element);
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
      const $element = (0, _renderer.default)(e.element);
      const $schedulerElement = (0, _renderer.default)(this.instance.element());
      const workSpace = this.instance.getWorkSpace();
      const getItemData = itemElement => {
        var _$$data;
        return (_$$data = (0, _renderer.default)(itemElement).data(_constants.LIST_ITEM_DATA_KEY)) === null || _$$data === void 0 ? void 0 : _$$data.appointment;
      };
      const getItemSettings = (_, event) => event.itemSettings;
      const initialPosition = (0, _translator.locate)($appointmentCollector);
      const options = {
        filter: `.${_constants.LIST_ITEM_CLASS}`,
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
    (0, _translator.move)(element, {
      top: position.top,
      left: position.left
    });
  }
  _createCompactButton(template, options) {
    const $button = this._createCompactButtonElement(options);
    return this.instance._createComponent($button, _button.default, {
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
    const result = (0, _renderer.default)('<div>').addClass(APPOINTMENT_COLLECTOR_CLASS).attr('aria-roledescription', appointmentDate).toggleClass(COMPACT_APPOINTMENT_COLLECTOR_CLASS, isCompact).appendTo($container);
    result.data(_constants.APPOINTMENT_SETTINGS_KEY, {
      sortedIndex
    });
    this._setPosition(result, coordinates);
    return result;
  }
  _renderTemplate(template, items, isCompact) {
    return new _function_template.FunctionTemplate(options => template.render({
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
      appointmentCollector: new _function_template.FunctionTemplate(options => this._createButtonTemplate(count, (0, _renderer.default)(options.container), isCompact))
    });
  }
  _createButtonTemplate(appointmentCount, element, isCompact) {
    const text = isCompact ? appointmentCount : _message.default.getFormatter('dxScheduler-moreAppointments')(appointmentCount);
    return element.append((0, _renderer.default)('<span>').text(text)).addClass(APPOINTMENT_COLLECTOR_CONTENT_CLASS);
  }
  _localizeDate(date) {
    return `${_date.default.format(date, 'monthAndDay')}, ${_date.default.format(date, 'year')}`;
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
exports.CompactAppointmentsHelper = CompactAppointmentsHelper;
