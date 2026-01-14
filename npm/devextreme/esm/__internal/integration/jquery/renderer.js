/**
* DevExtreme (esm/__internal/integration/jquery/renderer.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import rendererBase from '../../core/m_renderer_base';
// eslint-disable-next-line import/no-extraneous-dependencies
import jQuery from 'jquery';
import useJQueryFn from './use_jquery';
const useJQuery = useJQueryFn();
if (useJQuery) {
  rendererBase.set(jQuery);
}
