/**
* DevExtreme (cjs/__internal/integration/jquery/deferred.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_deferred = require("../../core/utils/m_deferred");
var _m_version = require("../../core/utils/m_version");
var _jquery = _interopRequireDefault(require("jquery"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

const useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
  const {
    Deferred
  } = _jquery.default;
  const strategy = {
    Deferred
  };
  // @ts-expect-error
  strategy.when = (0, _m_version.compare)(_jquery.default.fn.jquery, [3]) < 0 ? _jquery.default.when
  // eslint-disable-next-line func-names
  : function (singleArg) {
    if (arguments.length === 0) {
      // @ts-expect-error
      return new Deferred().resolve();
    }
    if (arguments.length === 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return singleArg !== null && singleArg !== void 0 && singleArg.then ? singleArg
      // @ts-expect-error
      : new Deferred().resolve(singleArg);
    }
    // @ts-expect-error
    // eslint-disable-next-line prefer-spread, prefer-rest-params
    return _jquery.default.when.apply(_jquery.default, arguments);
  };
  (0, _m_deferred.setStrategy)(strategy);
}
