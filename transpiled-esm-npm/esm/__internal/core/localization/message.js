import coreLocalization from '../../core/localization/core';
import { defaultMessages } from '../../core/localization/default_messages';
import { injector as dependencyInjector } from '../../core/utils/m_dependency_injector';
import { extend } from '../../core/utils/m_extend';
import { humanize } from '../../core/utils/m_inflector';
import { format as stringFormat } from '../../core/utils/m_string';
const baseDictionary = extend(true, {}, defaultMessages);
const getDataByLocale = (localeData, locale) => {
  var _Object$entries$find;
  return localeData[locale] || (locale === null || locale === void 0 ? void 0 : locale.toLowerCase) && ((_Object$entries$find = Object.entries(localeData).find(_ref => {
    let [key] = _ref;
    return key.toLowerCase() === locale.toLowerCase();
  })) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[1]) || {};
};
const newMessages = {};
const messageLocalization = dependencyInjector({
  engine() {
    return 'base';
  },
  _dictionary: baseDictionary,
  load(messages) {
    extend(true, this._dictionary, messages);
  },
  _localizablePrefix: '@',
  setup(localizablePrefix) {
    this._localizablePrefix = localizablePrefix;
  },
  localizeString(text) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const regex = new RegExp(`(^|[^a-zA-Z_0-9${that._localizablePrefix}-]+)(${that._localizablePrefix}{1,2})([a-zA-Z_0-9-]+)`, 'g');
    const escapeString = that._localizablePrefix + that._localizablePrefix;
    return text.replace(regex, (_, prefix, escape, localizationKey) => {
      const defaultResult = that._localizablePrefix + localizationKey;
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let result;
      if (escape !== escapeString) {
        result = that.format(localizationKey);
      }
      if (!result) {
        newMessages[localizationKey] = humanize(localizationKey);
      }
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      return prefix + (result || defaultResult);
    });
  },
  getMessagesByLocales() {
    return this._dictionary;
  },
  getDictionary(onlyNew) {
    if (onlyNew) {
      return newMessages;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend({}, newMessages, this.getMessagesByLocales()[coreLocalization.locale()]);
  },
  getFormatter(key) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getFormatterBase(key) || this._getFormatterBase(key, 'en');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getFormatterBase(key, _locale) {
    const message = coreLocalization.getValueByClosestLocale(locale => getDataByLocale(this._dictionary, locale)[key]);
    if (message) {
      // eslint-disable-next-line func-names
      return function () {
        // eslint-disable-next-line prefer-rest-params
        const args = arguments.length === 1 && Array.isArray(arguments[0])
        // eslint-disable-next-line prefer-rest-params
        ? arguments[0].slice(0)
        // eslint-disable-next-line prefer-rest-params
        : Array.prototype.slice.call(arguments, 0);
        args.unshift(message);
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return stringFormat.apply(this, args);
      };
    }
    return undefined;
  },
  format(key) {
    const formatter = this.getFormatter(key);
    // eslint-disable-next-line prefer-rest-params
    const values = Array.prototype.slice.call(arguments, 1);
    // @ts-expect-error
    return (formatter === null || formatter === void 0 ? void 0 : formatter.apply(this, values)) || '';
  }
});
export default messageLocalization;