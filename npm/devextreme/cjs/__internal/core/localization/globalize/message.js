/**
* DevExtreme (cjs/__internal/core/localization/globalize/message.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

require("../../../core/localization/globalize/core");
require("globalize/message");
var _core2 = _interopRequireDefault(require("../../../core/localization/core"));
var _message2 = _interopRequireDefault(require("../../../core/localization/message"));
var _globalize = _interopRequireDefault(require("globalize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

if (_globalize.default !== null && _globalize.default !== void 0 && _globalize.default.formatMessage) {
  const DEFAULT_LOCALE = 'en';
  const originalLoadMessages = _globalize.default.loadMessages;
  _globalize.default.loadMessages = messages => {
    _message2.default.load(messages);
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
      return _globalize.default.cldr.get('globalize-messages');
    },
    getFormatter(key, locale) {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const currentLocale = locale || _core2.default.locale();
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
      const currentGlobalize = !locale || locale === _core2.default.locale() ? _globalize.default : new _globalize.default(locale);
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let result;
      if (this._messageLoaded(key, locale)) {
        result = currentGlobalize.messageFormatter(key);
      }
      return result;
    },
    _messageLoaded(key, locale) {
      const currentCldr = locale ? new _globalize.default(locale).cldr : _globalize.default.locale();
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
  _message2.default.inject(globalizeMessageLocalization);
}
