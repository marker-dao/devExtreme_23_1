"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date2 = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _window = require("../../../core/utils/window");
var _box = _interopRequireDefault(require("../../ui/box"));
var _m_time_view = _interopRequireDefault(require("../../ui/date_box/m_time_view"));
var _m_date_boxStrategy = _interopRequireDefault(require("./m_date_box.strategy.calendar"));
var _m_date_utils = _interopRequireDefault(require("./m_date_utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const window = (0, _window.getWindow)();
const SHRINK_VIEW_SCREEN_WIDTH = 573;
const DATEBOX_ADAPTIVITY_MODE_CLASS = 'dx-datebox-adaptivity-mode';
const DATEBOX_TIMEVIEW_SIDE_CLASS = 'dx-datebox-datetime-time-side';
class CalendarWithTimeStrategy extends _m_date_boxStrategy.default {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = 'CalendarWithTime';
  }
  getDefaultOptions() {
    return _extends({}, super.getDefaultOptions(), {
      applyValueMode: 'useButtons',
      buttonsLocation: 'bottom after',
      'dropDownOptions.showTitle': false
    });
  }
  _closeDropDownByEnter() {
    return _date2.default.sameDate(this._getContouredValue(), this.widgetOption('value'));
  }
  getDisplayFormat(displayFormat) {
    return displayFormat || 'shortdateshorttime';
  }
  _is24HourFormat() {
    // @ts-expect-error
    return _date.default.is24HourFormat(this.getDisplayFormat(this.dateBox.option('displayFormat')));
  }
  _getContouredValue() {
    const viewDate = super._getContouredValue();
    return this._updateDateTime(viewDate);
  }
  _renderWidget() {
    super._renderWidget();
    this._timeView = this.dateBox._createComponent((0, _renderer.default)('<div>'), _m_time_view.default, {
      value: this.dateBoxValue(),
      _showClock: !this._isShrinkView(),
      use24HourFormat: this._is24HourFormat(),
      onValueChanged: this._valueChangedHandler.bind(this),
      stylingMode: this.dateBox.option('stylingMode')
    });
  }
  renderOpenedState() {
    super.renderOpenedState();
    const popup = this._getPopup();
    if (popup) {
      popup.$wrapper().toggleClass(DATEBOX_ADAPTIVITY_MODE_CLASS, this._isSmallScreen());
    }
    clearTimeout(this._repaintTimer);
    this._repaintTimer = setTimeout(() => {
      var _this$_getPopup;
      (_this$_getPopup = this._getPopup()) === null || _this$_getPopup === void 0 || _this$_getPopup.repaint();
    }, 0);
  }
  isAdaptivityChanged() {
    const isAdaptiveMode = this._isShrinkView();
    const currentAdaptiveMode = this._currentAdaptiveMode;
    if (isAdaptiveMode !== currentAdaptiveMode) {
      this._currentAdaptiveMode = isAdaptiveMode;
      return currentAdaptiveMode !== undefined;
    }
    return super.isAdaptivityChanged();
  }
  _updateValue(preventDefaultValue) {
    let date = this.dateBoxValue();
    if (!date && !preventDefaultValue) {
      date = new Date();
      _m_date_utils.default.normalizeTime(date);
    }
    super._updateValue();
    if (this._timeView) {
      date && this._timeView.option('value', date);
      this._timeView.option('use24HourFormat', this._is24HourFormat());
    }
  }
  _isSmallScreen() {
    return (0, _size.getWidth)(window) <= SHRINK_VIEW_SCREEN_WIDTH;
  }
  _isShrinkView() {
    return !this.dateBox.option('showAnalogClock') || this.dateBox.option('adaptivityEnabled') && this._isSmallScreen();
  }
  _getBoxItems() {
    const items = [{
      ratio: 0,
      shrink: 0,
      baseSize: 'auto',
      name: 'calendar'
    }];
    if (!this._isShrinkView()) {
      items.push({
        ratio: 0,
        shrink: 0,
        baseSize: 'auto',
        name: 'time'
      });
    }
    return items;
  }
  renderPopupContent() {
    super.renderPopupContent();
    this._currentAdaptiveMode = this._isShrinkView();
    const $popupContent = this._getPopup().$content();
    this._box = this.dateBox._createComponent((0, _renderer.default)('<div>').appendTo($popupContent), _box.default, {
      direction: 'row',
      crossAlign: 'stretch',
      items: this._getBoxItems(),
      itemTemplate: function (data, i, element) {
        const $container = (0, _renderer.default)('<div>');
        // eslint-disable-next-line default-case
        switch (data.name) {
          case 'calendar':
            $container.append(this._widget.$element());
            if (this._isShrinkView()) {
              this._timeView.$element().addClass(DATEBOX_TIMEVIEW_SIDE_CLASS);
              $container.append(this._timeView.$element());
            }
            break;
          case 'time':
            $container.append(this._timeView.$element());
            (0, _renderer.default)(element).addClass(DATEBOX_TIMEVIEW_SIDE_CLASS);
            break;
        }
        return $container;
      }.bind(this)
    });
  }
  popupConfig(popupConfig) {
    const calendarPopupConfig = super.popupConfig(popupConfig);
    return (0, _extend.extend)(calendarPopupConfig, {
      width: 'auto'
    });
  }
  _preventFocusOnPopup(e) {
    if (!(0, _renderer.default)(e.target).hasClass('dx-texteditor-input')) {
      // @ts-expect-error ts-error
      super._preventFocusOnPopup.apply(this, arguments);
      if (!this.dateBox._hasFocusClass()) {
        this.dateBox.focus();
      }
    }
  }
  _updateDateTime(date) {
    const {
      value: time
    } = this._timeView.option();
    date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
    return date;
  }
  getValue() {
    let date = this._widget.option('value') ?? this._widget.getContouredDate();
    date = date ? new Date(date) : new Date();
    return this._updateDateTime(date);
  }
  dispose() {
    clearTimeout(this._removeMinWidthTimer);
    clearTimeout(this._repaintTimer);
    super.dispose();
  }
}
var _default = exports.default = CalendarWithTimeStrategy;