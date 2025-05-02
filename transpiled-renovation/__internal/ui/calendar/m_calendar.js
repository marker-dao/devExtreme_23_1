"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _animation = require("../../../common/core/animation");
var _translator = require("../../../common/core/animation/translator");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _swipeable = _interopRequireDefault(require("../../../common/core/events/gesture/swipeable"));
var _hover = require("../../../common/core/events/hover");
var _index = require("../../../common/core/events/utils/index");
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _function_template = require("../../../core/templates/function_template");
var _date2 = _interopRequireDefault(require("../../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));
var _extend = require("../../../core/utils/extend");
var _math = require("../../../core/utils/math");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _button = _interopRequireDefault(require("../../../ui/button"));
var _themes = require("../../../ui/themes");
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _m_calendarMultipleSelection = _interopRequireDefault(require("./m_calendar.multiple.selection.strategy"));
var _m_calendar = _interopRequireDefault(require("./m_calendar.navigator"));
var _m_calendarRangeSelection = _interopRequireDefault(require("./m_calendar.range.selection.strategy"));
var _m_calendarSingleSelection = _interopRequireDefault(require("./m_calendar.single.selection.strategy"));
var _m_calendar2 = _interopRequireDefault(require("./m_calendar.views"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CALENDAR_CLASS = 'dx-calendar';
const CALENDAR_BODY_CLASS = 'dx-calendar-body';
const CALENDAR_CELL_CLASS = 'dx-calendar-cell';
const CALENDAR_FOOTER_CLASS = 'dx-calendar-footer';
const CALENDAR_TODAY_BUTTON_CLASS = 'dx-calendar-today-button';
const CALENDAR_HAS_FOOTER_CLASS = 'dx-calendar-with-footer';
const CALENDAR_VIEWS_WRAPPER_CLASS = 'dx-calendar-views-wrapper';
const CALENDAR_VIEW_CLASS = 'dx-calendar-view';
const CALENDAR_MULTIVIEW_CLASS = 'dx-calendar-multiview';
const CALENDAR_RANGE_CLASS = 'dx-calendar-range';
const GESTURE_COVER_CLASS = 'dx-gesture-cover';
const ANIMATION_DURATION_SHOW_VIEW = 250;
const POP_ANIMATION_FROM = 0.6;
const POP_ANIMATION_TO = 1;
const CALENDAR_INPUT_STANDARD_PATTERN = 'yyyy-MM-dd';
const CALENDAR_DATE_VALUE_KEY = 'dxDateValueKey';
const CALENDAR_DXHOVEREND_EVENT_NAME = (0, _index.addNamespace)(_hover.end, 'dxCalendar');
const LEVEL_COMPARE_MAP = {
  month: 3,
  year: 2,
  decade: 1,
  century: 0
};
const ZOOM_LEVEL = {
  MONTH: 'month',
  YEAR: 'year',
  DECADE: 'decade',
  CENTURY: 'century'
};
const SELECTION_STRATEGIES = {
  SingleSelection: _m_calendarSingleSelection.default,
  MultipleSelection: _m_calendarMultipleSelection.default,
  RangeSelection: _m_calendarRangeSelection.default
};
class Calendar extends _editor.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      currentDate: new Date(),
      value: null,
      min: new Date(1000, 0),
      max: new Date(3000, 0),
      viewsCount: 1,
      zoomLevel: ZOOM_LEVEL.MONTH,
      maxZoomLevel: ZOOM_LEVEL.MONTH,
      minZoomLevel: ZOOM_LEVEL.CENTURY,
      selectionMode: 'single',
      selectWeekOnClick: true,
      showTodayButton: false,
      showWeekNumbers: false,
      weekNumberRule: 'auto',
      cellTemplate: 'cell',
      disabledDates: null,
      onCellClick: null,
      onContouredChanged: null,
      skipFocusCheck: false,
      _todayDate: () => new Date()
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      // @ts-expect-error ts-error
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      rightArrow(e) {
        e.preventDefault();
        if ((0, _index.isCommandKeyPressed)(e)) {
          this._waitRenderView(1);
        } else {
          this._moveCurrentDateByOffset(1 * this._getRtlCorrection());
        }
      },
      leftArrow(e) {
        e.preventDefault();
        if ((0, _index.isCommandKeyPressed)(e)) {
          this._waitRenderView(-1);
        } else {
          this._moveCurrentDateByOffset(-1 * this._getRtlCorrection());
        }
      },
      upArrow(e) {
        e.preventDefault();
        if ((0, _index.isCommandKeyPressed)(e)) {
          this._navigateUp();
        } else {
          if (_animation.fx.isAnimating(this._view.$element())) {
            return;
          }
          this._moveCurrentDateByOffset(-1 * this._view.option('colCount'));
        }
      },
      downArrow(e) {
        e.preventDefault();
        if ((0, _index.isCommandKeyPressed)(e)) {
          this._navigateDown();
        } else {
          if (_animation.fx.isAnimating(this._view.$element())) {
            return;
          }
          this._moveCurrentDateByOffset(1 * this._view.option('colCount'));
        }
      },
      home(e) {
        e.preventDefault();
        const zoomLevel = this.option('zoomLevel');
        const currentDate = this.option('currentDate');
        const min = this._dateOption('min');
        if (this._view.isDateDisabled(currentDate)) {
          return;
        }
        const date = _date2.default.sameView(zoomLevel, currentDate, min) ? min : _date2.default.getViewFirstCellDate(zoomLevel, currentDate);
        this._moveToClosestAvailableDate(date);
      },
      end(e) {
        e.preventDefault();
        const zoomLevel = this.option('zoomLevel');
        const currentDate = this.option('currentDate');
        const max = this._dateOption('max');
        if (this._view.isDateDisabled(currentDate)) {
          return;
        }
        const date = _date2.default.sameView(zoomLevel, currentDate, max) ? max : _date2.default.getViewLastCellDate(zoomLevel, currentDate);
        this._moveToClosestAvailableDate(date);
      },
      pageUp(e) {
        e.preventDefault();
        this._waitRenderView(-1 * this._getRtlCorrection());
      },
      pageDown(e) {
        e.preventDefault();
        this._waitRenderView(1 * this._getRtlCorrection());
      },
      tab() {},
      enter: this._enterKeyHandler
    });
  }
  _enterKeyHandler(e) {
    if (!this._isMaxZoomLevel()) {
      this._navigateDown();
    } else if (!this._view.isDateDisabled(this.option('currentDate'))) {
      const value = this._updateTimeComponent(this.option('currentDate'));
      this._selectionStrategy.selectValue(value, e);
    }
  }
  _getSerializationFormat(optionName) {
    const value = this.option(optionName || 'value');
    if (this.option('dateSerializationFormat')) {
      return this.option('dateSerializationFormat');
    }
    if ((0, _type.isNumeric)(value)) {
      return 'number';
    }
    if (!(0, _type.isString)(value)) {
      return;
    }
    return _date_serialization.default.getDateSerializationFormat(value);
  }
  _convertToDate(value) {
    return _date_serialization.default.deserializeDate(value);
  }
  _dateValue(value, event) {
    if (event) {
      if (event.type === 'keydown') {
        const cellElement = this._view._getContouredCell().get(0);
        event.target = cellElement;
      }
      this._saveValueChangeEvent(event);
    }
    this._dateOption('value', value);
  }
  _dateOption(optionName, optionValue) {
    const isArray = optionName === 'value' && !this._isSingleMode();
    const value = this.option('value');
    if (arguments.length === 1) {
      return isArray
      // @ts-expect-error ts-error
      ? (value ?? []).map(value => this._convertToDate(value)) : this._convertToDate(this.option(optionName));
    }
    const serializationFormat = this._getSerializationFormat(optionName);
    const serializedValue = isArray ? (optionValue === null || optionValue === void 0 ? void 0 : optionValue.map(value => _date_serialization.default.serializeDate(value, serializationFormat))) || [] : _date_serialization.default.serializeDate(optionValue, serializationFormat);
    this.option(optionName, serializedValue);
  }
  _isSingleMode() {
    const {
      selectionMode
    } = this.option();
    return selectionMode === 'single';
  }
  _shiftDate(zoomLevel, date, offset, reverse) {
    // eslint-disable-next-line default-case
    switch (zoomLevel) {
      case ZOOM_LEVEL.MONTH:
        date.setDate(date.getDate() + offset * reverse);
        break;
      case ZOOM_LEVEL.YEAR:
        date.setMonth(date.getMonth() + offset * reverse);
        break;
      case ZOOM_LEVEL.DECADE:
        date.setFullYear(date.getFullYear() + offset * reverse);
        break;
      case ZOOM_LEVEL.CENTURY:
        date.setFullYear(date.getFullYear() + 10 * offset * reverse);
        break;
    }
  }
  _moveCurrentDateByOffset(offset) {
    const baseDate = this.option('currentDate');
    // @ts-expect-error ts-error
    let currentDate = new Date(baseDate);
    const zoomLevel = this.option('zoomLevel');
    this._shiftDate(zoomLevel, currentDate, offset, 1);
    const maxDate = this._getMaxDate();
    const minDate = this._getMinDate();
    let isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, currentDate, baseDate);
    let isDateForwardInRange = (0, _math.inRange)(currentDate, minDate, maxDate) && isDateForwardInNeighborView;
    const dateForward = new Date(currentDate);
    while (isDateForwardInRange) {
      if (!this._view.isDateDisabled(dateForward)) {
        currentDate = dateForward;
        break;
      }
      this._shiftDate(zoomLevel, dateForward, offset, 1);
      isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, dateForward, baseDate);
      isDateForwardInRange = (0, _math.inRange)(dateForward, minDate, maxDate) && isDateForwardInNeighborView;
    }
    if (this._view.isDateDisabled(baseDate) || this._view.isDateDisabled(currentDate)) {
      const direction = offset > 0 ? 1 : -1;
      const isViewDisabled = direction === 1 ? this._isNextViewDisabled() : this._isPrevViewDisabled();
      if (!isViewDisabled) {
        this._waitRenderView(direction);
      } else {
        // @ts-expect-error ts-error
        this._moveToClosestAvailableDate(currentDate);
      }
    } else {
      this._skipNavigate = true;
      this.option('currentDate', currentDate);
    }
  }
  _isNextViewDisabled() {
    return this._navigator._nextButton.option('disabled');
  }
  _isPrevViewDisabled() {
    return this._navigator._prevButton.option('disabled');
  }
  // @ts-expect-error
  _areDatesInSameView(zoomLevel, date1, date2) {
    // eslint-disable-next-line default-case
    switch (zoomLevel) {
      case ZOOM_LEVEL.MONTH:
        return date1.getMonth() === date2.getMonth();
      case ZOOM_LEVEL.YEAR:
        return date1.getYear() === date2.getYear();
      case ZOOM_LEVEL.DECADE:
        // @ts-expect-error
        // eslint-disable-next-line radix
        return parseInt(date1.getYear() / 10) === parseInt(date2.getYear() / 10);
      case ZOOM_LEVEL.CENTURY:
        // @ts-expect-error
        // eslint-disable-next-line radix
        return parseInt(date1.getYear() / 100) === parseInt(date2.getYear() / 100);
    }
  }
  // @ts-expect-error
  _areDatesInNeighborView(zoomLevel, date1, date2) {
    const monthMinDistance = (a, b) => {
      const abs = Math.abs(a - b);
      return Math.min(abs, 12 - abs);
    };
    // eslint-disable-next-line default-case
    switch (zoomLevel) {
      case ZOOM_LEVEL.MONTH:
        return monthMinDistance(date1.getMonth(), date2.getMonth()) <= 1;
      case ZOOM_LEVEL.YEAR:
        return Math.abs(date1.getYear() - date2.getYear()) <= 1;
      case ZOOM_LEVEL.DECADE:
        return Math.abs(date1.getYear() - date2.getYear()) <= 10;
      case ZOOM_LEVEL.CENTURY:
        return Math.abs(date1.getYear() - date2.getYear()) <= 100;
    }
  }
  _moveToClosestAvailableDate() {
    let baseDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.option('currentDate');
    // @ts-expect-error ts-error
    let currentDate = new Date(baseDate);
    const zoomLevel = this.option('zoomLevel');
    const isCurrentDateAvailable = !this._isDateNotAvailable(currentDate);
    let isDateForwardAvailable = isCurrentDateAvailable;
    let isDateBackwardAvailable = isCurrentDateAvailable;
    let isDateForwardInStartView;
    let isDateBackwardInStartView;
    const dateForward = new Date(currentDate);
    const dateBackward = new Date(currentDate);
    do {
      if (isDateForwardAvailable) {
        currentDate = dateForward;
        break;
      }
      if (isDateBackwardAvailable) {
        currentDate = dateBackward;
        break;
      }
      this._shiftDate(zoomLevel, dateForward, 1, 1);
      this._shiftDate(zoomLevel, dateBackward, 1, -1);
      isDateForwardInStartView = this._areDatesInSameView(zoomLevel, dateForward, baseDate);
      isDateBackwardInStartView = this._areDatesInSameView(zoomLevel, dateBackward, baseDate);
      isDateForwardAvailable = isDateForwardInStartView && !this._isDateNotAvailable(dateForward);
      isDateBackwardAvailable = isDateBackwardInStartView && !this._isDateNotAvailable(dateBackward);
    } while (isDateForwardInStartView || isDateBackwardInStartView);
    this.option('currentDate', currentDate);
  }
  _isDateNotAvailable(date) {
    const maxDate = this._getMaxDate();
    const minDate = this._getMinDate();
    return !(0, _math.inRange)(date, minDate, maxDate) || this._view.isDateDisabled(date);
  }
  _init() {
    super._init();
    this._activeStateUnit = `.${CALENDAR_CELL_CLASS}`;
    this._initSelectionStrategy();
    this._correctZoomLevel();
    this._initCurrentDate();
    this._initActions();
  }
  _initSelectionStrategy() {
    const strategyName = this._getSelectionStrategyName();
    const strategy = SELECTION_STRATEGIES[strategyName];
    if (!this._selectionStrategy || this._selectionStrategy.NAME !== strategyName) {
      // eslint-disable-next-line new-cap
      this._selectionStrategy = new strategy(this);
    }
  }
  _refreshSelectionStrategy() {
    this._initSelectionStrategy();
    this._selectionStrategy.restoreValue();
    this._refresh();
  }
  _getSelectionStrategyName() {
    const {
      selectionMode
    } = this.option();
    switch (selectionMode) {
      case 'multiple':
        return 'MultipleSelection';
      case 'range':
        return 'RangeSelection';
      default:
        return 'SingleSelection';
    }
  }
  _correctZoomLevel() {
    const {
      minZoomLevel,
      maxZoomLevel,
      zoomLevel
    } = this.option();
    // @ts-expect-error ts-error
    if (LEVEL_COMPARE_MAP[maxZoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
      return;
    }
    // @ts-expect-error ts-error
    if (LEVEL_COMPARE_MAP[zoomLevel] > LEVEL_COMPARE_MAP[maxZoomLevel]) {
      this.option('zoomLevel', maxZoomLevel);
      // @ts-expect-error ts-error
    } else if (LEVEL_COMPARE_MAP[zoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
      this.option('zoomLevel', minZoomLevel);
    }
  }
  _initCurrentDate() {
    const currentDate = this._getNormalizedDate(this._selectionStrategy.getDefaultCurrentDate()) ?? this._getNormalizedDate(this.option('currentDate'));
    this.option('currentDate', currentDate);
  }
  _getNormalizedDate(date) {
    date = _date2.default.normalizeDate(date, this._getMinDate(), this._getMaxDate());
    return (0, _type.isDefined)(date) ? this._getDate(date) : date;
  }
  _initActions() {
    this._cellClickAction = this._createActionByOption('onCellClick');
    this._onContouredChanged = this._createActionByOption('onContouredChanged');
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      // @ts-expect-error ts-error
      cell: new _function_template.FunctionTemplate(options => {
        const data = options.model;
        (0, _renderer.default)(options.container).append((0, _renderer.default)('<span>').text((data === null || data === void 0 ? void 0 : data.text) || String(data)));
      })
    });
    super._initTemplates();
  }
  _updateCurrentDate(date) {
    // @ts-expect-error ts-error
    if (_animation.fx.isAnimating(this._$viewsWrapper)) {
      // @ts-expect-error ts-error
      _animation.fx.stop(this._$viewsWrapper, true);
    }
    const min = this._getMinDate();
    const max = this._getMaxDate();
    // @ts-expect-error ts-error
    if (min > max) {
      this.option('currentDate', new Date());
      return;
    }
    const normalizedDate = this._getNormalizedDate(date);
    if (date.getTime() !== normalizedDate.getTime()) {
      this.option('currentDate', new Date(normalizedDate));
      return;
    }
    let offset = this._getViewsOffset(this._view.option('date'), normalizedDate);
    if (offset !== 0 && !this._isMaxZoomLevel() && this._isOtherViewCellClicked) {
      offset = 0;
    }
    if (this._view && offset !== 0 && !this._suppressNavigation) {
      if (this._additionalView) {
        if (offset > 2 || offset < -1) {
          this._refreshViews();
          this._setViewContoured(normalizedDate);
          this._updateAriaId(normalizedDate);
          this._renderNavigator();
        } else if (offset === 1 && this._skipNavigate) {
          this._setViewContoured(normalizedDate);
          this._updateAriaId(normalizedDate);
        } else {
          this._navigate(offset, normalizedDate);
        }
      } else {
        this._navigate(offset, normalizedDate);
      }
    } else {
      this._renderNavigator();
      this._setViewContoured(normalizedDate);
      this._updateAriaId(normalizedDate);
    }
    this._skipNavigate = false;
  }
  _isAdditionalViewDate(date) {
    if (!this._additionalView) {
      return false;
    }
    return date >= this._additionalView._getFirstAvailableDate();
  }
  _getActiveView(date) {
    return this._isAdditionalViewDate(date) ? this._additionalView : this._view;
  }
  _setViewContoured(date) {
    if (this.option('skipFocusCheck') || (0, _renderer.default)(this._$viewsWrapper).is(':focus')) {
      var _this$_additionalView;
      this._view.option('contouredDate', null);
      (_this$_additionalView = this._additionalView) === null || _this$_additionalView === void 0 || _this$_additionalView.option('contouredDate', null);
      const view = this._isAdditionalViewDate(date) ? this._additionalView : this._view;
      view.option('contouredDate', date);
    }
  }
  _getMinDate() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _rangeMin = this.option('_rangeMin');
    if (_rangeMin) {
      return _rangeMin;
    }
    if (this.min) {
      return this.min;
    }
    // @ts-expect-error ts-error
    this.min = this._dateOption('min') || new Date(1000, 0);
    return this.min;
  }
  _getMaxDate() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _rangeMax = this.option('_rangeMax');
    if (_rangeMax) {
      return _rangeMax;
    }
    if (this.max) {
      return this.max;
    }
    // @ts-expect-error ts-error
    this.max = this._dateOption('max') || new Date(3000, 0);
    return this.max;
  }
  _getViewsOffset(startDate, endDate) {
    const {
      zoomLevel
    } = this.option();
    if (zoomLevel === ZOOM_LEVEL.MONTH) {
      return this._getMonthsOffset(startDate, endDate);
    }
    let zoomCorrection;
    switch (zoomLevel) {
      case ZOOM_LEVEL.CENTURY:
        zoomCorrection = 100;
        break;
      case ZOOM_LEVEL.DECADE:
        zoomCorrection = 10;
        break;
      default:
        zoomCorrection = 1;
        break;
    }
    // @ts-expect-error
    // eslint-disable-next-line @stylistic/space-infix-ops, radix
    return parseInt(endDate.getFullYear() / zoomCorrection) - parseInt(startDate.getFullYear() / zoomCorrection);
  }
  _getMonthsOffset(startDate, endDate) {
    const yearOffset = endDate.getFullYear() - startDate.getFullYear();
    const monthOffset = endDate.getMonth() - startDate.getMonth();
    return yearOffset * 12 + monthOffset;
  }
  _waitRenderView(offset) {
    if (this._alreadyViewRender) {
      return;
    }
    this._alreadyViewRender = true;
    const date = this._getDateByOffset(offset * this._getRtlCorrection());
    this._moveToClosestAvailableDate(date);
    this._waitRenderViewTimeout = setTimeout(() => {
      this._alreadyViewRender = false;
    });
  }
  _getRtlCorrection() {
    return this.option('rtlEnabled') ? -1 : 1;
  }
  _getDateByOffset(offset, date) {
    date = this._getDate(date ?? this.option('currentDate'));
    const currentDay = date.getDate();
    const difference = _date2.default.getDifferenceInMonth(this.option('zoomLevel')) * offset;
    date.setDate(1);
    date.setMonth(date.getMonth() + difference);
    // @ts-expect-error
    const lastDay = _date2.default.getLastMonthDate(date).getDate();
    date.setDate(currentDay > lastDay ? lastDay : currentDay);
    return date;
  }
  _focusTarget() {
    return this._$viewsWrapper;
  }
  _focusEventTarget() {
    return this.$element();
  }
  _initMarkup() {
    this._renderSubmitElement();
    const $element = this.$element();
    $element.addClass(CALENDAR_CLASS);
    const {
      selectionMode
    } = this.option();
    $element.toggleClass(CALENDAR_RANGE_CLASS, selectionMode === 'range');
    this._renderBody();
    // @ts-expect-error ts-error
    $element.append(this.$body);
    this._renderViews();
    this._renderNavigator();
    super._initMarkup();
    this._renderEvents();
    $element.prepend(this._navigator.$element());
    this._renderSwipeable();
    this._renderFooter();
    this._selectionStrategy.updateAriaSelected();
    this._updateAriaId();
    this._updateNavigatorLabels();
    this.setAria('role', 'application');
    this._updateAriaLabelAndRole();
    this._moveToClosestAvailableDate();
  }
  _render() {
    super._render();
    this._setViewContoured(this.option('currentDate'));
  }
  _renderBody() {
    if (!this._$viewsWrapper) {
      this.$body = (0, _renderer.default)('<div>').addClass(CALENDAR_BODY_CLASS);
      this._$viewsWrapper = (0, _renderer.default)('<div>').addClass(CALENDAR_VIEWS_WRAPPER_CLASS);
      this.$body.append(this._$viewsWrapper);
    }
  }
  _updateAriaLabelAndRole() {
    const readOnly = this.option('readOnly');
    const $element = this.$element();
    const aria = {
      role: readOnly ? 'group' : undefined,
      label: readOnly ? _message.default.format('dxCalendar-readOnlyLabel') : undefined
    };
    this.setAria(aria, $element);
  }
  _setAriaReadonly() {}
  _getKeyboardListeners() {
    return super._getKeyboardListeners().concat([this._view]);
  }
  _renderViews() {
    const {
      zoomLevel
    } = this.option();
    this.$element().addClass(`${CALENDAR_VIEW_CLASS}-${zoomLevel}`);
    const {
      currentDate,
      viewsCount
    } = this.option();
    this.$element().toggleClass(CALENDAR_MULTIVIEW_CLASS, viewsCount > 1);
    this._view = this._renderSpecificView(currentDate);
    if ((0, _window.hasWindow)()) {
      const beforeDate = this._getDateByOffset(-1, currentDate);
      // @ts-expect-error ts-error
      this._beforeView = this._isViewAvailable(beforeDate) ? this._renderSpecificView(beforeDate) : null;
      const afterDate = this._getDateByOffset(viewsCount, currentDate);
      afterDate.setDate(1);
      // @ts-expect-error ts-error
      this._afterView = this._isViewAvailable(afterDate) ? this._renderSpecificView(afterDate) : null;
    }
    if (viewsCount > 1) {
      this._additionalView = this._renderSpecificView(this._getDateByOffset(1, currentDate));
    }
    this._translateViews();
  }
  _renderSpecificView(date) {
    const {
      zoomLevel
    } = this.option();
    // @ts-expect-error ts-error
    const specificView = _m_calendar2.default[zoomLevel];
    const $view = (0, _renderer.default)('<div>').appendTo(this._$viewsWrapper);
    const config = this._viewConfig(date);
    const view = this._createComponent($view, specificView, config);
    // @ts-expect-error ts-error
    return view;
  }
  _viewConfig(date) {
    let disabledDates = this.option('disabledDates');
    // @ts-expect-error ts-error
    disabledDates = (0, _type.isFunction)(disabledDates) ? this._injectComponent(disabledDates.bind(this)) : disabledDates;
    return _extends({}, this._selectionStrategy.getViewOptions(), {
      date,
      min: this._getMinDate(),
      max: this._getMaxDate(),
      firstDayOfWeek: this.option('firstDayOfWeek') ?? _date.default.firstDayOfWeekIndex(),
      showWeekNumbers: this.option('showWeekNumbers'),
      selectWeekOnClick: this.option('selectWeekOnClick'),
      weekNumberRule: this.option('weekNumberRule'),
      zoomLevel: this.option('zoomLevel'),
      tabIndex: undefined,
      focusStateEnabled: this.option('focusStateEnabled'),
      hoverStateEnabled: this.option('hoverStateEnabled'),
      disabledDates,
      onCellClick: this._cellClickHandler.bind(this),
      cellTemplate: this._getTemplateByOption('cellTemplate'),
      allowValueSelection: this._isMaxZoomLevel(),
      _todayDate: this.option('_todayDate')
    });
  }
  _renderEvents() {
    _events_engine.default.off(this._$viewsWrapper, CALENDAR_DXHOVEREND_EVENT_NAME);
    const {
      selectionMode
    } = this.option();
    if (selectionMode === 'range') {
      _events_engine.default.on(this._$viewsWrapper, CALENDAR_DXHOVEREND_EVENT_NAME, null, () => {
        this._updateViewsOption('hoveredRange', []);
      });
    }
  }
  _injectComponent(func) {
    const that = this;
    return function (params) {
      (0, _extend.extend)(params, {
        component: that
      });
      return func(params);
    };
  }
  _isViewAvailable(date) {
    const zoomLevel = this.option('zoomLevel');
    const min = _date2.default.getViewMinBoundaryDate(zoomLevel, this._getMinDate());
    const max = _date2.default.getViewMaxBoundaryDate(zoomLevel, this._getMaxDate());
    return _date2.default.dateInRange(date, min, max);
  }
  _translateViews() {
    const {
      viewsCount
    } = this.option();
    (0, _translator.move)(this._view.$element(), {
      left: 0,
      top: 0
    });
    this._moveViewElement(this._beforeView, -1);
    this._moveViewElement(this._afterView, viewsCount);
    this._moveViewElement(this._additionalView, 1);
  }
  _moveViewElement(view, coefficient) {
    view && (0, _translator.move)(view.$element(), {
      left: this._getViewPosition(coefficient),
      top: 0
    });
  }
  _getViewPosition(coefficient) {
    const rtlCorrection = this.option('rtlEnabled') ? -1 : 1;
    return `${coefficient * 100 * rtlCorrection}%`;
  }
  _cellClickHandler(e) {
    const zoomLevel = this.option('zoomLevel');
    const nextView = _date2.default.getViewDown(zoomLevel);
    const isMaxZoomLevel = this._isMaxZoomLevel();
    if (nextView && !isMaxZoomLevel) {
      this._navigateDown(e.event.currentTarget);
    } else {
      var _this$_cellClickActio;
      const newValue = this._updateTimeComponent(e.value);
      this._selectionStrategy.selectValue(newValue, e.event);
      (_this$_cellClickActio = this._cellClickAction) === null || _this$_cellClickActio === void 0 || _this$_cellClickActio.call(this, e);
    }
  }
  _updateTimeComponent(date) {
    const result = new Date(date);
    // @ts-expect-error ts-error
    const currentValue = this._dateOption('value');
    if (currentValue && this._isSingleMode()) {
      result.setHours(currentValue.getHours());
      result.setMinutes(currentValue.getMinutes());
      result.setSeconds(currentValue.getSeconds());
      result.setMilliseconds(currentValue.getMilliseconds());
    }
    return result;
  }
  _isMaxZoomLevel() {
    return this.option('zoomLevel') === this.option('maxZoomLevel');
  }
  _navigateDown(cell) {
    const zoomLevel = this.option('zoomLevel');
    if (this._isMaxZoomLevel()) {
      return;
    }
    const nextView = _date2.default.getViewDown(zoomLevel);
    if (!nextView) {
      return;
    }
    let newCurrentDate = this._view.option('contouredDate') || this._view.option('date');
    if (cell) {
      // @ts-expect-error ts-error
      newCurrentDate = (0, _renderer.default)(cell).data(CALENDAR_DATE_VALUE_KEY);
    }
    this._isOtherViewCellClicked = true;
    this.option('currentDate', newCurrentDate);
    this.option('zoomLevel', nextView);
    this._isOtherViewCellClicked = false;
    this._renderNavigator();
    this._animateShowView();
    this._moveToClosestAvailableDate();
    this._setViewContoured(this._getNormalizedDate(this.option('currentDate')));
  }
  _renderNavigator() {
    if (!this._navigator) {
      // @ts-expect-error
      this._navigator = new _m_calendar.default((0, _renderer.default)('<div>'), this._navigatorConfig());
    }
    this._navigator.option('text', this._getViewsCaption(this._view, this._additionalView));
    this._updateButtonsVisibility();
  }
  _navigatorConfig() {
    const {
      focusStateEnabled,
      rtlEnabled
    } = this.option();
    return {
      text: this._getViewsCaption(this._view, this._additionalView),
      onClick: this._navigatorClickHandler.bind(this),
      onCaptionClick: this._navigateUp.bind(this),
      focusStateEnabled,
      rtlEnabled,
      tabIndex: undefined
    };
  }
  _navigatorClickHandler(e) {
    const {
      currentDate,
      viewsCount
    } = this.option();
    let offset = e.direction;
    if (viewsCount > 1) {
      const additionalViewActive = this._isAdditionalViewDate(currentDate);
      const shouldDoubleOffset = additionalViewActive && offset < 0 || !additionalViewActive && offset > 0;
      if (shouldDoubleOffset) {
        offset *= 2;
      }
    }
    const newCurrentDate = this._getDateByOffset(offset, currentDate);
    this._moveToClosestAvailableDate(newCurrentDate);
  }
  _navigateUp() {
    const zoomLevel = this.option('zoomLevel');
    const nextView = _date2.default.getViewUp(zoomLevel);
    if (!nextView || this._isMinZoomLevel(zoomLevel)) {
      return;
    }
    this.option('zoomLevel', nextView);
    this._renderNavigator();
    this._animateShowView();
    this._moveToClosestAvailableDate();
    this._setViewContoured(this._getNormalizedDate(this.option('currentDate')));
  }
  _isMinZoomLevel(zoomLevel) {
    const min = this._getMinDate();
    const max = this._getMaxDate();
    return _date2.default.sameView(zoomLevel, min, max) || this.option('minZoomLevel') === zoomLevel;
  }
  _updateButtonsVisibility() {
    this._navigator.toggleButton('next', !(0, _type.isDefined)(this._afterView));
    this._navigator.toggleButton('prev', !(0, _type.isDefined)(this._beforeView));
  }
  _renderSwipeable() {
    if (!this._swipeable) {
      this._swipeable = this._createComponent(this.$element(), _swipeable.default, {
        onStart: this._swipeStartHandler.bind(this),
        onUpdated: this._swipeUpdateHandler.bind(this),
        onEnd: this._swipeEndHandler.bind(this),
        itemSizeFunc: this._viewWidth.bind(this)
      });
    }
  }
  _swipeStartHandler(e) {
    // @ts-expect-error ts-error
    _animation.fx.stop(this._$viewsWrapper, true);
    const {
      viewsCount
    } = this.option();
    this._toggleGestureCoverCursor('grabbing');
    e.event.maxLeftOffset = this._getRequiredView('next') ? 1 / viewsCount : 0;
    e.event.maxRightOffset = this._getRequiredView('prev') ? 1 / viewsCount : 0;
  }
  _toggleGestureCoverCursor(cursor) {
    (0, _renderer.default)(`.${GESTURE_COVER_CLASS}`).css('cursor', cursor);
  }
  _getRequiredView(name) {
    let view;
    const isRtl = this.option('rtlEnabled');
    if (name === 'next') {
      view = isRtl ? this._beforeView : this._afterView;
    } else if (name === 'prev') {
      view = isRtl ? this._afterView : this._beforeView;
    }
    return view;
  }
  _swipeUpdateHandler(e) {
    const {
      offset
    } = e.event;
    (0, _translator.move)(this._$viewsWrapper, {
      left: offset * this._viewWidth(),
      top: 0
    });
    this._updateNavigatorCaption(offset);
  }
  _swipeEndHandler(e) {
    this._toggleGestureCoverCursor('auto');
    const {
      currentDate,
      rtlEnabled
    } = this.option();
    const {
      targetOffset
    } = e.event;
    const moveOffset = !targetOffset ? 0 : targetOffset / Math.abs(targetOffset);
    const isAdditionalViewActive = this._isAdditionalViewDate(currentDate);
    const shouldDoubleOffset = isAdditionalViewActive && (rtlEnabled ? moveOffset === -1 : moveOffset === 1);
    if (moveOffset === 0) {
      this._animateWrapper(0, ANIMATION_DURATION_SHOW_VIEW);
      return;
    }
    const offset = -moveOffset * this._getRtlCorrection() * (shouldDoubleOffset ? 2 : 1);
    let date = this._getDateByOffset(offset);
    if (this._isDateInInvalidRange(date)) {
      if (moveOffset >= 0) {
        // @ts-expect-error ts-error
        date = new Date(this._getMinDate());
      } else {
        // @ts-expect-error ts-error
        date = new Date(this._getMaxDate());
      }
    }
    this.option('currentDate', date);
  }
  _viewWidth() {
    if (!this._viewWidthValue) {
      const {
        viewsCount
      } = this.option();
      this._viewWidthValue = (0, _size.getWidth)(this.$element()) / viewsCount;
    }
    return this._viewWidthValue;
  }
  _updateNavigatorCaption(offset) {
    offset *= this._getRtlCorrection();
    const {
      viewsCount
    } = this.option();
    const isMultiView = viewsCount > 1;
    let view;
    let additionalView;
    if (offset > 0.5 && this._beforeView) {
      view = this._beforeView;
      additionalView = isMultiView && this._view;
    } else if (offset < -0.5 && this._afterView) {
      view = isMultiView ? this._additionalView : this._afterView;
      additionalView = isMultiView ? this._afterView : null;
    } else {
      view = this._view;
      additionalView = isMultiView ? this._additionalView : null;
    }
    this._navigator.option('text', this._getViewsCaption(view, additionalView));
  }
  _getViewsCaption(view, additionalView) {
    let caption = view.getNavigatorCaption();
    const {
      viewsCount
    } = this.option();
    if (viewsCount > 1 && additionalView) {
      const additionalViewCaption = additionalView.getNavigatorCaption();
      caption = `${caption} - ${additionalViewCaption}`;
    }
    return caption;
  }
  _isDateInInvalidRange(date) {
    if (this._view.isBoundary(date)) {
      return;
    }
    const min = this._getMinDate();
    const max = this._getMaxDate();
    const normalizedDate = _date2.default.normalizeDate(date, min, max);
    return normalizedDate === min || normalizedDate === max;
  }
  _renderFooter() {
    const showTodayButton = this.option('showTodayButton');
    if (showTodayButton) {
      const $todayButton = this._createComponent((0, _renderer.default)('<div>'), _button.default, {
        focusStateEnabled: this.option('focusStateEnabled'),
        text: _message.default.format('dxCalendar-todayButtonText'),
        onClick: args => {
          this._toTodayView(args);
        },
        // @ts-expect-error
        type: (0, _themes.isFluent)() ? 'normal' : 'default',
        // @ts-expect-error
        stylingMode: (0, _themes.isFluent)() ? 'outlined' : 'text',
        integrationOptions: {}
      }).$element().addClass(CALENDAR_TODAY_BUTTON_CLASS);
      this._$footer = (0, _renderer.default)('<div>').addClass(CALENDAR_FOOTER_CLASS).append($todayButton);
      this.$element().append(this._$footer);
    }
    // @ts-expect-error ts-error
    this.$element().toggleClass(CALENDAR_HAS_FOOTER_CLASS, showTodayButton);
  }
  _renderSubmitElement() {
    this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
    this._setSubmitValue(this.option('value'));
  }
  _setSubmitValue(value) {
    const dateValue = this._convertToDate(value);
    this._getSubmitElement().val(_date_serialization.default.serializeDate(dateValue, CALENDAR_INPUT_STANDARD_PATTERN));
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _animateShowView() {
    // @ts-expect-error ts-error
    _animation.fx.stop(this._view.$element(), true);
    this._popAnimationView(this._view, POP_ANIMATION_FROM, POP_ANIMATION_TO, ANIMATION_DURATION_SHOW_VIEW);
    const {
      viewsCount
    } = this.option();
    if (viewsCount > 1) {
      // @ts-expect-error ts-error
      _animation.fx.stop(this._additionalView.$element(), true);
      this._popAnimationView(this._additionalView, POP_ANIMATION_FROM, POP_ANIMATION_TO, ANIMATION_DURATION_SHOW_VIEW);
    }
  }
  _popAnimationView(view, from, to, duration) {
    return _animation.fx.animate(view.$element(), {
      type: 'pop',
      from: {
        scale: from,
        opacity: from
      },
      to: {
        scale: to,
        opacity: to
      },
      duration
    });
  }
  _navigate(offset, value) {
    if (offset !== 0 && Math.abs(offset) !== 1 && this._isViewAvailable(value)) {
      const newView = this._renderSpecificView(value);
      if (offset > 0) {
        var _this$_afterView;
        (_this$_afterView = this._afterView) === null || _this$_afterView === void 0 || _this$_afterView.$element().remove();
        this._afterView = newView;
      } else {
        var _this$_beforeView;
        (_this$_beforeView = this._beforeView) === null || _this$_beforeView === void 0 || _this$_beforeView.$element().remove();
        this._beforeView = newView;
      }
      this._translateViews();
    }
    const rtlCorrection = this._getRtlCorrection();
    const offsetSign = offset > 0 ? 1 : offset < 0 ? -1 : 0;
    const endPosition = -rtlCorrection * offsetSign * this._viewWidth();
    // @ts-expect-error ts-error
    const viewsWrapperPosition = this._$viewsWrapper.position().left;
    if (viewsWrapperPosition !== endPosition) {
      if (this._preventViewChangeAnimation) {
        this._wrapperAnimationEndHandler(offset, value);
      } else {
        this._animateWrapper(endPosition, ANIMATION_DURATION_SHOW_VIEW)
        // @ts-expect-error ts-error
        .done(this._wrapperAnimationEndHandler.bind(this, offset, value));
      }
    }
  }
  _animateWrapper(to, duration) {
    // @ts-expect-error ts-error
    return _animation.fx.animate(this._$viewsWrapper, {
      type: 'slide',
      // @ts-expect-error ts-error
      from: {
        left: this._$viewsWrapper.position().left
      },
      to: {
        left: to
      },
      duration
    });
  }
  _getDate(value) {
    return new Date(value);
  }
  _toTodayView(args) {
    const today = new Date();
    if (this._isMaxZoomLevel()) {
      this._selectionStrategy.selectValue(today, args.event);
      return;
    }
    this._preventViewChangeAnimation = true;
    this.option('zoomLevel', this.option('maxZoomLevel'));
    this._selectionStrategy.selectValue(today, args.event);
    this._animateShowView();
    this._preventViewChangeAnimation = false;
  }
  _wrapperAnimationEndHandler(offset, newDate) {
    this._rearrangeViews(offset);
    this._translateViews();
    this._resetLocation();
    this._renderNavigator();
    this._setViewContoured(newDate);
    this._updateAriaId(newDate);
    this._selectionStrategy.updateAriaSelected();
  }
  _rearrangeViews(offset) {
    var _this$viewToRemoveKey;
    if (offset === 0) {
      return;
    }
    const {
      viewsCount
    } = this.option();
    let viewOffset;
    let viewToCreateKey;
    let viewToRemoveKey;
    let viewBeforeCreateKey;
    let viewAfterRemoveKey;
    if (offset < 0) {
      viewOffset = 1;
      viewToCreateKey = '_beforeView';
      viewToRemoveKey = '_afterView';
      viewBeforeCreateKey = '_view';
      viewAfterRemoveKey = viewsCount === 1 ? '_view' : '_additionalView';
    } else {
      viewOffset = -1;
      viewToCreateKey = '_afterView';
      viewToRemoveKey = '_beforeView';
      viewBeforeCreateKey = viewsCount === 1 ? '_view' : '_additionalView';
      viewAfterRemoveKey = '_view';
    }
    if (!this[viewToCreateKey]) {
      return;
    }
    const destinationDate = this[viewToCreateKey].option('date');
    (_this$viewToRemoveKey = this[viewToRemoveKey]) === null || _this$viewToRemoveKey === void 0 || _this$viewToRemoveKey.$element().remove();
    this[viewToRemoveKey] = this._renderSpecificView(this._getDateByOffset(viewOffset * viewsCount, destinationDate));
    this[viewAfterRemoveKey].$element().remove();
    if (viewsCount === 1) {
      this[viewAfterRemoveKey] = this[viewToCreateKey];
    } else {
      this[viewAfterRemoveKey] = this[viewBeforeCreateKey];
      this[viewBeforeCreateKey] = this[viewToCreateKey];
    }
    const dateByOffset = this._getDateByOffset(-viewOffset, destinationDate);
    this[viewToCreateKey] = this._isViewAvailable(dateByOffset) ? this._renderSpecificView(dateByOffset) : null;
  }
  _resetLocation() {
    (0, _translator.move)(this._$viewsWrapper, {
      left: 0,
      top: 0
    });
  }
  _clean() {
    super._clean();
    this._clearViewWidthCache();
    // @ts-expect-error ts-error
    delete this._$viewsWrapper;
    // @ts-expect-error ts-error
    delete this._navigator;
    delete this._$footer;
  }
  _clearViewWidthCache() {
    delete this._viewWidthValue;
  }
  _disposeViews() {
    var _this$_beforeView2, _this$_additionalView2, _this$_afterView2;
    this._view.$element().remove();
    (_this$_beforeView2 = this._beforeView) === null || _this$_beforeView2 === void 0 || _this$_beforeView2.$element().remove();
    (_this$_additionalView2 = this._additionalView) === null || _this$_additionalView2 === void 0 || _this$_additionalView2.$element().remove();
    (_this$_afterView2 = this._afterView) === null || _this$_afterView2 === void 0 || _this$_afterView2.$element().remove();
    // @ts-expect-error ts-error
    delete this._view;
    // @ts-expect-error ts-error
    delete this._additionalView;
    delete this._beforeView;
    delete this._afterView;
    delete this._skipNavigate;
  }
  _dispose() {
    clearTimeout(this._waitRenderViewTimeout);
    super._dispose();
  }
  _refreshViews() {
    this._resetActiveState();
    this._disposeViews();
    this._renderViews();
  }
  _visibilityChanged() {
    this._translateViews();
  }
  _shouldSkipFocusEvent(event) {
    const {
      target,
      relatedTarget
    } = event;
    return (0, _renderer.default)(target).parents(`.${CALENDAR_CLASS}`).length && (0, _renderer.default)(relatedTarget).parents(`.${CALENDAR_CLASS}`).length;
  }
  _focusInHandler(event) {
    if ((0, _renderer.default)(event.target).is(this._$viewsWrapper)) {
      this._setViewContoured(this.option('currentDate'));
    }
    if (this._shouldSkipFocusEvent(event)) {
      return;
    }
    // @ts-expect-error ts-error
    super._focusInHandler.apply(this, arguments);
    this._toggleFocusClass(true, this.$element());
  }
  _focusOutHandler(event) {
    if ((0, _renderer.default)(event.target).is(this._$viewsWrapper)) {
      var _this$_additionalView3;
      this._view.option('contouredDate', null);
      (_this$_additionalView3 = this._additionalView) === null || _this$_additionalView3 === void 0 || _this$_additionalView3.option('contouredDate', null);
    }
    if (this._shouldSkipFocusEvent(event)) {
      return;
    }
    // @ts-expect-error ts-error
    super._focusOutHandler.apply(this, arguments);
    this._toggleFocusClass(false, this.$element());
  }
  _updateViewsOption(optionName, newValue) {
    var _this$_additionalView4, _this$_beforeView3, _this$_afterView3;
    this._view.option(optionName, newValue);
    (_this$_additionalView4 = this._additionalView) === null || _this$_additionalView4 === void 0 || _this$_additionalView4.option(optionName, newValue);
    (_this$_beforeView3 = this._beforeView) === null || _this$_beforeView3 === void 0 || _this$_beforeView3.option(optionName, newValue);
    (_this$_afterView3 = this._afterView) === null || _this$_afterView3 === void 0 || _this$_afterView3.option(optionName, newValue);
  }
  _setViewsMinOption(min) {
    this._restoreViewsMinMaxOptions();
    this.option('_rangeMin', this._convertToDate(min));
    this._updateViewsOption('min', this._getMinDate());
  }
  _setViewsMaxOption(max) {
    this._restoreViewsMinMaxOptions();
    this.option('_rangeMax', this._convertToDate(max));
    this._updateViewsOption('max', this._getMaxDate());
  }
  _restoreViewsMinMaxOptions() {
    this._resetActiveState();
    this.option({
      _rangeMin: null,
      _rangeMax: null
    });
    this._updateViewsOption('min', this._getMinDate());
    this._updateViewsOption('max', this._getMaxDate());
  }
  _updateNavigatorLabels() {
    let {
      zoomLevel
    } = this.option();
    // @ts-expect-error ts-error
    zoomLevel = zoomLevel.charAt(0).toUpperCase() + zoomLevel.slice(1);
    const captionButtonText = this._navigator._caption.option('text');
    const localizedPrevButtonLabel = _message.default.format(`dxCalendar-previous${zoomLevel}ButtonLabel`);
    const localizedCaptionLabel = _message.default.format(`dxCalendar-caption${zoomLevel}Label`);
    const localizedNextButtonLabel = _message.default.format(`dxCalendar-next${zoomLevel}ButtonLabel`);
    this.setAria('label', localizedPrevButtonLabel, this._navigator._prevButton.$element());
    this.setAria('label', `${captionButtonText}. ${localizedCaptionLabel}`, this._navigator._caption.$element());
    this.setAria('label', localizedNextButtonLabel, this._navigator._nextButton.$element());
  }
  _updateAriaSelected(value, previousValue) {
    previousValue.forEach(item => {
      this.setAria('selected', false, this._view._getCellByDate(item));
    });
    value.forEach(item => {
      this.setAria('selected', true, this._view._getCellByDate(item));
    });
    const {
      viewsCount
    } = this.option();
    if (viewsCount > 1) {
      previousValue.forEach(item => {
        this.setAria('selected', false, this._additionalView._getCellByDate(item));
      });
      value.forEach(item => {
        this.setAria('selected', true, this._additionalView._getCellByDate(item));
      });
    }
  }
  _updateAriaId(value) {
    var _this$_onContouredCha;
    value = value ?? this.option('currentDate');
    const ariaId = `dx-${new _guid.default()}`;
    const view = this._getActiveView(value);
    const $newCell = view._getCellByDate(value);
    this.setAria('id', ariaId, $newCell);
    this.setAria('activedescendant', ariaId);
    (_this$_onContouredCha = this._onContouredChanged) === null || _this$_onContouredCha === void 0 || _this$_onContouredCha.call(this, ariaId);
  }
  _suppressingNavigation(callback, args) {
    this._suppressNavigation = true;
    callback.apply(this, args);
    delete this._suppressNavigation;
  }
  _optionChanged(args) {
    const {
      value,
      previousValue
    } = args;
    switch (args.name) {
      case 'width':
        super._optionChanged(args);
        this._clearViewWidthCache();
        break;
      case 'min':
      case 'max':
        this.min = undefined;
        this.max = undefined;
        this._suppressingNavigation(this._updateCurrentDate, [this.option('currentDate')]);
        this._refreshViews();
        this._renderNavigator();
        break;
      case 'selectionMode':
        this._refreshSelectionStrategy();
        this._initCurrentDate();
        break;
      case 'selectWeekOnClick':
        this._refreshViews();
        break;
      case 'firstDayOfWeek':
        this._refreshViews();
        this._updateButtonsVisibility();
        break;
      case 'focusStateEnabled':
        this._invalidate();
        break;
      case 'currentDate':
        this.setAria('id', undefined, this._view._getCellByDate(previousValue));
        this._updateCurrentDate(value);
        break;
      case 'zoomLevel':
        this.$element().removeClass(`${CALENDAR_VIEW_CLASS}-${previousValue}`);
        this._correctZoomLevel();
        this._refreshViews();
        this._renderNavigator();
        this._updateAriaId();
        this._updateNavigatorLabels();
        break;
      case 'minZoomLevel':
      case 'maxZoomLevel':
        this._correctZoomLevel();
        this._updateButtonsVisibility();
        break;
      case 'value':
        {
          const isSameValue = _date2.default.sameDatesArrays(value, previousValue);
          if (!isSameValue) {
            this._selectionStrategy.processValueChanged(value, previousValue);
          }
          this._setSubmitValue(value);
          super._optionChanged(args);
          break;
        }
      case 'viewsCount':
        this._refreshViews();
        this._renderNavigator();
        break;
      case 'onCellClick':
        this._view.option('onCellClick', value);
        break;
      case 'onContouredChanged':
        this._onContouredChanged = this._createActionByOption('onContouredChanged');
        break;
      case 'disabledDates':
      case 'dateSerializationFormat':
      case 'cellTemplate':
      case 'showTodayButton':
        this._invalidate();
        break;
      case 'readOnly':
        super._optionChanged(args);
        this._updateAriaLabelAndRole();
        break;
      case 'skipFocusCheck':
        break;
      case '_todayDate':
      case 'showWeekNumbers':
      case 'weekNumberRule':
        this._refreshViews();
        break;
      default:
        super._optionChanged(args);
    }
  }
  getContouredDate() {
    const {
      contouredDate
    } = this._view.option();
    return contouredDate;
  }
}
(0, _component_registrator.default)('dxCalendar', Calendar);
var _default = exports.default = Calendar;