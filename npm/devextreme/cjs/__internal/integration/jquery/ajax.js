/**
* DevExtreme (cjs/__internal/integration/jquery/ajax.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_ajax = require("../../core/utils/m_ajax");
var _jquery = _interopRequireDefault(require("jquery"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
  _m_ajax.Ajax.inject({
    sendRequest(options) {
      if (!options.responseType && !options.upload) {
        return _jquery.default.ajax(options);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.callBase.apply(this, [options]);
    }
  });
}
