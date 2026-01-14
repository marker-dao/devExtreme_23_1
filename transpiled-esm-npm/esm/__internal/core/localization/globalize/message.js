import '../../../core/localization/globalize/core';
import 'globalize/message';
import coreLocalization from '../../../core/localization/core';
import messageLocalization from '../../../core/localization/message';
// eslint-disable-next-line import/no-extraneous-dependencies
import Globalize from 'globalize';
if (Globalize !== null && Globalize !== void 0 && Globalize.formatMessage) {
  const DEFAULT_LOCALE = 'en';
  const originalLoadMessages = Globalize.loadMessages;
  Globalize.loadMessages = messages => {
    messageLocalization.load(messages);
  };
  const globalizeMessageLocalization = {
    engine() {
      return 'globalize';
    },
    ctor() {
      this.load(this._dictionary);
    },
    load(messages) {
      this.callBase(messages);
      originalLoadMessages(messages);
    },
    getMessagesByLocales() {
      return Globalize.cldr.get('globalize-messages');
    },
    getFormatter(key, locale) {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const currentLocale = locale || coreLocalization.locale();
      let formatter = this._getFormatterBase(key, locale);
      if (!formatter) {
        formatter = this._formatterByGlobalize(key, locale);
      }
      if (!formatter && currentLocale !== DEFAULT_LOCALE) {
        formatter = this.getFormatter(key, DEFAULT_LOCALE);
      }
      return formatter;
    },
    _formatterByGlobalize(key, locale) {
      const currentGlobalize = !locale || locale === coreLocalization.locale() ? Globalize : new Globalize(locale);
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let result;
      if (this._messageLoaded(key, locale)) {
        result = currentGlobalize.messageFormatter(key);
      }
      return result;
    },
    _messageLoaded(key, locale) {
      const currentCldr = locale ? new Globalize(locale).cldr : Globalize.locale();
      const value = currentCldr.get(['globalize-messages/{bundle}', key]);
      return !!value;
    },
    _loadSingle(key, value, locale) {
      const data = {};
      data[locale] = {};
      data[locale][key] = value;
      this.load(data);
    }
  };
  messageLocalization.inject(globalizeMessageLocalization);
}