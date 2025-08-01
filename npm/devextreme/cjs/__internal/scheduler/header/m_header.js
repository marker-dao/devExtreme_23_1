/**
* DevExtreme (cjs/__internal/scheduler/header/m_header.js)
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
exports.SchedulerHeader = void 0;
require("../../../ui/button_group");
require("../../../ui/drop_down_button");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _data = require("../../../core/utils/data");
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _toolbar = _interopRequireDefault(require("../../../ui/toolbar"));
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
var _m_calendar = _interopRequireDefault(require("./m_calendar"));
var _m_date_navigator = require("./m_date_navigator");
var _m_utils = require("./m_utils");
var _m_view_switcher = require("./m_view_switcher");
var _today = require("./today");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CLASSES = {
  component: 'dx-scheduler-header',
  invisible: 'dx-state-invisible'
};
const ITEM_NAMES = {
  today: 'today',
  dateNavigator: 'dateNavigator',
  viewSwitcher: 'viewSwitcher'
};
class SchedulerHeader extends _ui.default {
  get captionText() {
    return this._getCaption().text;
  }
  getIntervalOptions(date) {
    const currentView = this.option('currentView');
    const step = (0, _m_utils.getStep)(currentView.type);
    const firstDayOfWeek = this.option('firstDayOfWeek');
    return {
      date,
      step,
      firstDayOfWeek,
      intervalCount: currentView.intervalCount,
      agendaDuration: currentView.agendaDuration
    };
  }
  _getDefaultOptions() {
    // @ts-expect-error
    return (0, _extend.extend)(super._getDefaultOptions(), {
      _useShortDateFormat: !_devices.default.real().generic || _devices.default.isSimulator()
    });
  }
  _createEventMap() {
    this.eventMap = new Map([['currentView', []], ['views', []], ['currentDate', [this._getCalendarOptionUpdater('value')]], ['min', [this._getCalendarOptionUpdater('min')]], ['max', [this._getCalendarOptionUpdater('max')]], ['tabIndex', [this.repaint.bind(this)]], ['focusStateEnabled', [this.repaint.bind(this)]], ['useDropDownViewSwitcher', [this.repaint.bind(this)]], ['indicatorTime', []]]);
  }
  _addEvent(name, event) {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, []);
    }
    const events = this.eventMap.get(name);
    this.eventMap.set(name, [...events, event]);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    if (this.eventMap.has(name)) {
      const events = this.eventMap.get(name);
      events.forEach(event => {
        event(value);
      });
    }
  }
  onToolbarOptionChanged(fullName, value) {
    const parts = (0, _data.getPathParts)(fullName);
    const optionName = fullName.replace(/^toolbar\./, '');
    this.option(fullName, value);
    this._toggleVisibility();
    switch (true) {
      case fullName === 'toolbar':
        this.repaint();
        break;
      case fullName === 'toolbar.items':
        this._toolbar.option('items', value.map(item => this._parseItem(item)));
        break;
      case parts[1] === 'items' && parts.length === 3:
        // `toolbar.items[i]` case
        this._toolbar.option(optionName, this._parseItem(value));
        break;
      default:
        // `toolbar.prop` case
        // `toolbar.items[i].prop` case
        this._toolbar.option(optionName, value);
    }
  }
  _init() {
    // @ts-expect-error
    super._init();
    this._createEventMap();
    this.$element().addClass(CLASSES.component);
  }
  _render() {
    // @ts-expect-error
    super._render();
    this._createEventMap();
    this._renderToolbar();
    this._toggleVisibility();
  }
  _renderToolbar() {
    const config = this._createToolbarConfig();
    const toolbarElement = (0, _renderer.default)('<div>');
    toolbarElement.appendTo(this.$element());
    // @ts-expect-error
    this._toolbar = this._createComponent(toolbarElement, _toolbar.default, config);
  }
  _toggleVisibility() {
    const toolbarOptions = this.option('toolbar');
    const isHeaderShown = toolbarOptions.visible || toolbarOptions.visible === undefined && toolbarOptions.items.length;
    if (isHeaderShown) {
      this.$element().removeClass(CLASSES.invisible);
    } else {
      this.$element().addClass(CLASSES.invisible);
    }
  }
  _createToolbarConfig() {
    const options = this.option('toolbar');
    const parsedItems = options.items.map(element => this._parseItem(element));
    return _extends({}, options, {
      items: parsedItems
    });
  }
  _parseItem(item) {
    const itemName = typeof item === 'string' ? item : item.name;
    const itemOptions = typeof item === 'string' ? {} : item;
    if (itemName) {
      switch (itemName) {
        case ITEM_NAMES.today:
          return (0, _today.getTodayButtonOptions)(this, itemOptions);
        case ITEM_NAMES.viewSwitcher:
          return this.option('useDropDownViewSwitcher') ? (0, _m_view_switcher.getDropDownViewSwitcher)(this, itemOptions) : (0, _m_view_switcher.getTabViewSwitcher)(this, itemOptions);
        case ITEM_NAMES.dateNavigator:
          this._renderCalendar();
          return (0, _m_date_navigator.getDateNavigator)(this, itemOptions);
        default:
          _errors.default.log(`Unknown default element type: ${itemName}`);
      }
    }
    return (0, _extend.extend)(true, {}, item);
  }
  _callEvent(event, arg) {
    if (this.eventMap.has(event)) {
      const events = this.eventMap.get(event);
      events.forEach(event => event(arg));
    }
  }
  _updateCurrentView(view) {
    this.option('onCurrentViewChange')(view.name);
  }
  _updateCalendarValueAndCurrentDate(date) {
    this._updateCurrentDate(date);
    this._calendar.option('value', date);
  }
  _updateCurrentDate(date) {
    this.option('onCurrentDateChange')(date);
    this._callEvent('currentDate', date);
  }
  _renderCalendar() {
    // @ts-expect-error
    this._calendar = this._createComponent('<div>', _m_calendar.default, {
      value: this.option('currentDate'),
      min: this.option('min'),
      max: this.option('max'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      onValueChanged: e => {
        this._updateCurrentDate(e.value);
        this._calendar.hide();
      }
    });
    this._calendar.$element().appendTo(this.$element());
  }
  _getCalendarOptionUpdater(name) {
    return value => {
      if (this._calendar) {
        this._calendar.option(name, value);
      }
    };
  }
  _getNextDate(direction, initialDate) {
    const date = initialDate ?? this.option('currentDate');
    const options = this.getIntervalOptions(date);
    return (0, _m_utils.getNextIntervalDate)(options, direction);
  }
  _getDisplayedDate() {
    var _this$option;
    const startViewDate = new Date(this.option('startViewDate'));
    const isMonth = ((_this$option = this.option('currentView')) === null || _this$option === void 0 ? void 0 : _this$option.type) === 'month';
    return isMonth ? (0, _m_utils.nextWeek)(startViewDate) : startViewDate;
  }
  _getCaptionOptions() {
    let date = this.option('currentDate');
    if (this.option('startViewDate')) {
      date = this._getDisplayedDate();
    }
    date = _date.default.trimTime(date);
    return this.getIntervalOptions(date);
  }
  _getCaption() {
    const options = this._getCaptionOptions();
    const customizationFunction = this.option('customizeDateNavigatorText');
    const useShortDateFormat = this.option('_useShortDateFormat');
    return (0, _m_utils.getCaption)(options, Boolean(useShortDateFormat), customizationFunction);
  }
  _updateDateByDirection(direction) {
    const date = this._getNextDate(direction);
    this._updateCalendarValueAndCurrentDate(date);
  }
  _showCalendar(e) {
    this._calendar.show(e.element);
  }
  _hideCalendar() {
    this._calendar.hide();
  }
}
// @ts-expect-error
exports.SchedulerHeader = SchedulerHeader;
(0, _component_registrator.default)('dxSchedulerHeader', SchedulerHeader);
