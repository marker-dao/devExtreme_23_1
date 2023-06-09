/**
* DevExtreme (cjs/localization/message.js)
* Version: 23.2.0
* Build date: Thu Jun 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _dependency_injector = _interopRequireDefault(require("../core/utils/dependency_injector"));
var _extend = require("../core/utils/extend");
var _string = require("../core/utils/string");
var _inflector = require("../core/utils/inflector");
var _core = _interopRequireDefault(require("./core"));
var _default_messages = require("./default_messages");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var baseDictionary = (0, _extend.extend)(true, {}, _default_messages.defaultMessages);
var getDataByLocale = function getDataByLocale(localeData, locale) {
  return localeData[locale] || {};
};
var newMessages = {};
var messageLocalization = (0, _dependency_injector.default)({
  engine: function engine() {
    return 'base';
  },
  _dictionary: baseDictionary,
  load: function load(messages) {
    (0, _extend.extend)(true, this._dictionary, messages);
  },
  _localizablePrefix: '@',
  setup: function setup(localizablePrefix) {
    this._localizablePrefix = localizablePrefix;
  },
  localizeString: function localizeString(text) {
    var that = this;
    var regex = new RegExp('(^|[^a-zA-Z_0-9' + that._localizablePrefix + '-]+)(' + that._localizablePrefix + '{1,2})([a-zA-Z_0-9-]+)', 'g');
    var escapeString = that._localizablePrefix + that._localizablePrefix;
    return text.replace(regex, function (str, prefix, escape, localizationKey) {
      var defaultResult = that._localizablePrefix + localizationKey;
      var result;
      if (escape !== escapeString) {
        result = that.format(localizationKey);
      }
      if (!result) {
        newMessages[localizationKey] = (0, _inflector.humanize)(localizationKey);
      }
      return prefix + (result || defaultResult);
    });
  },
  getMessagesByLocales: function getMessagesByLocales() {
    return this._dictionary;
  },
  getDictionary: function getDictionary(onlyNew) {
    if (onlyNew) {
      return newMessages;
    }
    return (0, _extend.extend)({}, newMessages, this.getMessagesByLocales()[_core.default.locale()]);
  },
  getFormatter: function getFormatter(key) {
    return this._getFormatterBase(key) || this._getFormatterBase(key, 'en');
  },
  _getFormatterBase: function _getFormatterBase(key, locale) {
    var _this = this;
    var message = _core.default.getValueByClosestLocale(function (locale) {
      return getDataByLocale(_this._dictionary, locale)[key];
    });
    if (message) {
      return function () {
        var args = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0].slice(0) : Array.prototype.slice.call(arguments, 0);
        args.unshift(message);
        return _string.format.apply(this, args);
      };
    }
  },
  format: function format(key) {
    var formatter = this.getFormatter(key);
    var values = Array.prototype.slice.call(arguments, 1);
    return formatter && formatter.apply(this, values) || '';
  }
});
var _default = messageLocalization;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
