/**
* DevExtreme (cjs/ui/date_box/ui.date_box.strategy.date_view.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _window = require("../../core/utils/window");
var _ui = _interopRequireDefault(require("./ui.date_view"));
var _uiDate_box = _interopRequireDefault(require("./ui.date_box.strategy"));
var _support = require("../../core/utils/support");
var _extend = require("../../core/utils/extend");
var _ui2 = _interopRequireDefault(require("./ui.date_utils"));
var _message = _interopRequireDefault(require("../../localization/message"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const window = (0, _window.getWindow)();
const DateViewStrategy = _uiDate_box.default.inherit({
  NAME: 'DateView',
  getDefaultOptions: function () {
    return (0, _extend.extend)(this.callBase(), {
      openOnFieldClick: true,
      applyButtonText: _message.default.format('OK'),
      'dropDownOptions.showTitle': true
    });
  },
  getDisplayFormat: function (displayFormat) {
    return displayFormat || _ui2.default.FORMATS_MAP[this.dateBox.option('type')];
  },
  popupConfig: function (config) {
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
        device: function (device) {
          const platform = device.platform;
          return platform === 'generic' || platform === 'ios';
        },
        options: {
          width: 'auto',
          height: 'auto'
        }
      }, {
        device: function (device) {
          const platform = device.platform;
          const phone = device.phone;
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
  },
  _renderWidget: function () {
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
  },
  _getWidgetName: function () {
    return _ui.default;
  },
  renderOpenedState: function () {
    this.callBase();
    if (this._widget) {
      this._widget.option('value', this._widget._getCurrentDate());
    }
  },
  _getWidgetOptions: function () {
    return {
      value: this.dateBoxValue() || new Date(),
      type: this.dateBox.option('type'),
      minDate: this.dateBox.dateOption('min') || new Date(1900, 0, 1),
      maxDate: this.dateBox.dateOption('max') || new Date(Date.now() + 50 * _ui2.default.ONE_YEAR),
      onDisposing: function () {
        this._widget = null;
      }.bind(this)
    };
  }
});
var _default = DateViewStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;