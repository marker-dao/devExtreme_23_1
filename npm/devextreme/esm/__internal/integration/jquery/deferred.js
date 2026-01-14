/**
* DevExtreme (esm/__internal/integration/jquery/deferred.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { setStrategy } from '../../core/utils/m_deferred';
import { compare as compareVersion } from '../../core/utils/m_version';
// eslint-disable-next-line import/no-extraneous-dependencies
import jQuery from 'jquery';
import useJQueryFn from './use_jquery';
const useJQuery = useJQueryFn();
if (useJQuery) {
  const {
    Deferred
  } = jQuery;
  const strategy = {
    Deferred
  };
  // @ts-expect-error
  strategy.when = compareVersion(jQuery.fn.jquery, [3]) < 0 ? jQuery.when
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
    return jQuery.when.apply(jQuery, arguments);
  };
  setStrategy(strategy);
}
