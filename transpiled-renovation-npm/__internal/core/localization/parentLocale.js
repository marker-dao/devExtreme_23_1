"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const PARENT_LOCALE_SEPARATOR = '-';
var _default = (parentLocales, locale) => {
  const parentLocale = parentLocales[locale];
  if (parentLocale) {
    return parentLocale !== 'root' && parentLocale;
  }
  return locale.substr(0, locale.lastIndexOf(PARENT_LOCALE_SEPARATOR));
};
exports.default = _default;