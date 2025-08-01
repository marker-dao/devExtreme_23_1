/**
* DevExtreme (cjs/common/core/localization/core.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _dependency_injector = _interopRequireDefault(require("../../../core/utils/dependency_injector"));
var _parent_locales = _interopRequireDefault(require("./cldr-data/parent_locales"));
var _parentLocale = _interopRequireDefault(require("./parentLocale"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_LOCALE = 'en';
var _default = exports.default = (0, _dependency_injector.default)({
  locale: (() => {
    let currentLocale = DEFAULT_LOCALE;
    return locale => {
      if (!locale) {
        return currentLocale;
      }
      currentLocale = locale;
    };
  })(),
  getValueByClosestLocale: function (getter) {
    let locale = this.locale();
    let value = getter(locale);
    let isRootLocale;
    while (!value && !isRootLocale) {
      locale = (0, _parentLocale.default)(_parent_locales.default, locale);
      if (locale) {
        value = getter(locale);
      } else {
        isRootLocale = true;
      }
    }
    if (value === undefined && locale !== DEFAULT_LOCALE) {
      return getter(DEFAULT_LOCALE);
    }
    return value;
  }
});
module.exports = exports.default;
module.exports.default = exports.default;
