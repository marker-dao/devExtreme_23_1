/**
* DevExtreme (esm/__internal/integration/jquery/ajax.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Ajax } from '../../core/utils/m_ajax';
// eslint-disable-next-line import/no-extraneous-dependencies
import jQuery from 'jquery';
import useJQueryFn from './use_jquery';
const useJQuery = useJQueryFn();
if (useJQuery) {
  Ajax.inject({
    sendRequest(options) {
      if (!options.responseType && !options.upload) {
        return jQuery.ajax(options);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.callBase.apply(this, [options]);
    }
  });
}
