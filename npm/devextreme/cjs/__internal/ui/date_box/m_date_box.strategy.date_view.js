/**
* DevExtreme (cjs/__internal/ui/date_box/m_date_box.strategy.date_view.js)
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
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _support = require("../../../core/utils/support");
var _window = require("../../../core/utils/window");
var _m_date_box = _interopRequireDefault(require("./m_date_box.strategy"));
var _m_date_utils = _interopRequireDefault(require("./m_date_utils"));
var _m_date_view = _interopRequireDefault(require("./m_date_view"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const window = (0, _window.getWindow)();
class DateViewStrategy extends _m_date_box.default {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = 'DateView';
  }
  getDefaultOptions() {
    return _extends({}, super.getDefaultOptions(), {
      openOnFieldClick: true,
      applyButtonText: _message.default.format('OK'),
      'dropDownOptions.showTitle': true
    });
  }
  getDisplayFormat(displayFormat) {
    return displayFormat || _m_date_utils.default.FORMATS_MAP[this.dateBox.option('type')];
  }
  popupConfig(config) {
    return {
      toolbarItems: this.dateBox._popupToolbarItemsConfig(),
      onInitialized: config.onInitialized,
      defaultOptionsRules: [{
        device: {
          platform: 'android'
        },
        options: {
          width: 333,
          height: 331
        }
      }, {
        device(device) {
          const {
            platform
          } = device;
          return platform === 'generic' || platform === 'ios';
        },
        options: {
          width: 'auto',
          height: 'auto'
        }
      }, {
        device(device) {
          const {
            platform
          } = device;
          const {
            phone
          } = device;
          return platform === 'generic' && phone;
        },
        options: {
          width: 333,
          maxWidth: '100%',
          maxHeight: '100%',
          height: 'auto',
          position: {
            collision: 'flipfit flip'
          }
        }
      }, {
        device: {
          platform: 'ios',
          phone: true
        },
        options: {
          width: '100%',
          position: {
            my: 'bottom',
            at: 'bottom',
            of: window
          }
        }
      }]
    };
  }
  _renderWidget() {
    if ((0, _support.inputType)(this.dateBox.option('mode')) && this.dateBox._isNativeType() || this.dateBox.option('readOnly')) {
      if (this._widget) {
        this._widget.$element().remove();
        this._widget = null;
      }
      return;
    }
    const popup = this._getPopup();
    if (this._widget) {
      this._widget.option(this._getWidgetOptions());
    } else {
      const element = (0, _renderer.default)('<div>').appendTo(popup.$content());
      this._widget = this._createWidget(element);
    }
    this._widget.$element().appendTo(this._getWidgetContainer());
  }
  _getWidgetName() {
    return _m_date_view.default;
  }
  renderOpenedState() {
    super.renderOpenedState();
    if (this._widget) {
      this._widget.option('value', this._widget._getCurrentDate());
    }
  }
  _getWidgetOptions() {
    return {
      value: this.dateBoxValue() || new Date(),
      type: this.dateBox.option('type'),
      minDate: this.dateBox.dateOption('min') || new Date(1900, 0, 1),
      maxDate: this.dateBox.dateOption('max') || new Date(Date.now() + 50 * _m_date_utils.default.ONE_YEAR),
      onDisposing: function () {
        this._widget = null;
      }.bind(this)
    };
  }
}
var _default = exports.default = DateViewStrategy;
