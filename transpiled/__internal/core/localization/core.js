"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _parent_locales = _interopRequireDefault(require("../../core/localization/cldr-data/parent_locales"));
var _parentLocale = _interopRequireDefault(require("../../core/localization/parentLocale"));
var _m_dependency_injector = require("../../core/utils/m_dependency_injector");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_LOCALE = 'en';
var _default = exports.default = (0, _m_dependency_injector.injector)({
  locale: (() => {
    let currentLocale = DEFAULT_LOCALE;
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type,consistent-return
    return locale => {
      if (!locale) {
        return currentLocale;
      }
      currentLocale = locale;
    };
  })(),
  getValueByClosestLocale(getter) {
    let locale = this.locale();
    let value = getter(locale);
    let isRootLocale = false;
    while (!value && !isRootLocale) {
      // @ts-expect-error
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