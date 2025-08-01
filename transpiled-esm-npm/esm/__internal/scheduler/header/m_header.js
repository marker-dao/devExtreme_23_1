import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/button_group';
import '../../../ui/drop_down_button';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import errors from '../../../core/errors';
import $ from '../../../core/renderer';
import { getPathParts } from '../../../core/utils/data';
import dateUtils from '../../../core/utils/date';
import { extend } from '../../../core/utils/extend';
import Toolbar from '../../../ui/toolbar';
import Widget from '../../../ui/widget/ui.widget';
import SchedulerCalendar from './m_calendar';
import { getDateNavigator } from './m_date_navigator';
import { getCaption, getNextIntervalDate, getStep, nextWeek } from './m_utils';
import { getDropDownViewSwitcher, getTabViewSwitcher } from './m_view_switcher';
import { getTodayButtonOptions } from './today';
const CLASSES = {
  component: 'dx-scheduler-header',
  invisible: 'dx-state-invisible'
};
const ITEM_NAMES = {
  today: 'today',
  dateNavigator: 'dateNavigator',
  viewSwitcher: 'viewSwitcher'
};
export class SchedulerHeader extends Widget {
  get captionText() {
    return this._getCaption().text;
  }
  getIntervalOptions(date) {
    const currentView = this.option('currentView');
    const step = getStep(currentView.type);
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
    return extend(super._getDefaultOptions(), {
      _useShortDateFormat: !devices.real().generic || devices.isSimulator()
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
    const parts = getPathParts(fullName);
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
    const toolbarElement = $('<div>');
    toolbarElement.appendTo(this.$element());
    // @ts-expect-error
    this._toolbar = this._createComponent(toolbarElement, Toolbar, config);
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
          return getTodayButtonOptions(this, itemOptions);
        case ITEM_NAMES.viewSwitcher:
          return this.option('useDropDownViewSwitcher') ? getDropDownViewSwitcher(this, itemOptions) : getTabViewSwitcher(this, itemOptions);
        case ITEM_NAMES.dateNavigator:
          this._renderCalendar();
          return getDateNavigator(this, itemOptions);
        default:
          errors.log(`Unknown default element type: ${itemName}`);
      }
    }
    return extend(true, {}, item);
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
    this._calendar = this._createComponent('<div>', SchedulerCalendar, {
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
    return getNextIntervalDate(options, direction);
  }
  _getDisplayedDate() {
    var _this$option;
    const startViewDate = new Date(this.option('startViewDate'));
    const isMonth = ((_this$option = this.option('currentView')) === null || _this$option === void 0 ? void 0 : _this$option.type) === 'month';
    return isMonth ? nextWeek(startViewDate) : startViewDate;
  }
  _getCaptionOptions() {
    let date = this.option('currentDate');
    if (this.option('startViewDate')) {
      date = this._getDisplayedDate();
    }
    date = dateUtils.trimTime(date);
    return this.getIntervalOptions(date);
  }
  _getCaption() {
    const options = this._getCaptionOptions();
    const customizationFunction = this.option('customizeDateNavigatorText');
    const useShortDateFormat = this.option('_useShortDateFormat');
    return getCaption(options, Boolean(useShortDateFormat), customizationFunction);
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
registerComponent('dxSchedulerHeader', SchedulerHeader);