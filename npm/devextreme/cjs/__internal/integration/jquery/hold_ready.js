/**
* DevExtreme (cjs/__internal/integration/jquery/hold_ready.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_ready_callbacks = _interopRequireDefault(require("../../core/utils/m_ready_callbacks"));
var _m_themes_callback = require("../../ui/m_themes_callback");
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

if (_jquery.default && !_m_themes_callback.themeReadyCallback.fired()) {
  // @ts-expect-error
  const holdReady = _jquery.default.holdReady || _jquery.default.fn.holdReady;
  holdReady(true);
  _m_themes_callback.themeReadyCallback.add(() => {
    _m_ready_callbacks.default.add(() => {
      holdReady(false);
    });
  });
}
