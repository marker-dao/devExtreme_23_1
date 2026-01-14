/**
* DevExtreme (cjs/__internal/core/localization/globalize/core.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _en = require("../../../core/localization/cldr-data/en");
var _supplemental = require("../../../core/localization/cldr-data/supplemental");
var _core = _interopRequireDefault(require("../../../core/localization/core"));
var _globalize = _interopRequireDefault(require("globalize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

if (_globalize.default !== null && _globalize.default !== void 0 && _globalize.default.load) {
  if (!_globalize.default.locale()) {
    _globalize.default.load(_en.enCldr, _supplemental.supplementalCldr);
    _globalize.default.locale('en');
  }
  _core.default.inject({
    // eslint-disable-next-line consistent-return,@typescript-eslint/no-invalid-void-type
    locale(locale) {
      if (!locale) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _globalize.default.locale().locale;
      }
      _globalize.default.locale(locale);
    }
  });
}
