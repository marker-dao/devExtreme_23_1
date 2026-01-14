/**
* DevExtreme (esm/__internal/integration/jquery/hold_ready.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import readyCallbacks from '../../core/utils/m_ready_callbacks';
import { themeReadyCallback } from '../../ui/m_themes_callback';
// eslint-disable-next-line import/no-extraneous-dependencies
import jQuery from 'jquery';
if (jQuery && !themeReadyCallback.fired()) {
  // @ts-expect-error
  const holdReady = jQuery.holdReady || jQuery.fn.holdReady;
  holdReady(true);
  themeReadyCallback.add(() => {
    readyCallbacks.add(() => {
      holdReady(false);
    });
  });
}
