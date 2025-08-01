/**
* DevExtreme (cjs/__internal/ui/date_box/m_date_box.strategy.native.js)
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
exports.default = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));
var _support = require("../../../core/utils/support");
var _m_date_box = _interopRequireDefault(require("./m_date_box.strategy"));
var _m_date_utils = _interopRequireDefault(require("./m_date_utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class NativeStrategy extends _m_date_box.default {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = 'Native';
  }
  // eslint-disable-next-line class-methods-use-this
  popupConfig(popupConfig) {
    return _extends({}, popupConfig, {
      width: 'auto'
    });
  }
  getParsedText(text) {
    if (!text) {
      return null;
    }
    // NOTE: Required for correct date parsing when native picker is used (T418155)
    if (this.dateBox.option('type') === 'datetime') {
      return new Date(text.replace(/-/g, '/').replace('T', ' ').split('.')[0]);
    }
    return _m_date_utils.default.fromStandardDateFormat(text);
  }
  renderPopupContent() {}
  _getWidgetName() {}
  _getWidgetOptions() {}
  _getDateBoxType() {
    let {
      type
    } = this.dateBox.option();
    if (!_m_date_utils.default.SUPPORTED_FORMATS.includes(type)) {
      type = 'date';
    } else if (type === 'datetime' && !(0, _support.inputType)(type)) {
      type = 'datetime-local';
    }
    return type;
  }
  customizeButtons() {
    const dropDownButton = this.dateBox.getButton('dropDown');
    if (_devices.default.real().android && dropDownButton) {
      dropDownButton.on('click', () => {
        this.dateBox._input().get(0).click();
      });
    }
  }
  getDefaultOptions() {
    return {
      mode: this._getDateBoxType()
    };
  }
  getDisplayFormat(displayFormat) {
    const type = this._getDateBoxType();
    return displayFormat || _m_date_utils.default.FORMATS_MAP[type];
  }
  renderInputMinMax($input) {
    const type = this.dateBox.option('type');
    const defaultFormat = 'yyyy-MM-dd';
    const format = {
      datetime: 'yyyy-MM-ddTHH:mm:ss',
      date: defaultFormat,
      time: 'HH:mm:ss'
    }[type] ?? defaultFormat;
    $input.attr({
      min: _date_serialization.default.serializeDate(this.dateBox.dateOption('min'), format),
      max: _date_serialization.default.serializeDate(this.dateBox.dateOption('max'), format)
    });
  }
}
var _default = exports.default = NativeStrategy;
