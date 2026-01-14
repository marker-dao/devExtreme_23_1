/**
* DevExtreme (esm/__internal/integration/jquery/use_jquery.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import config from '../../../core/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import jQuery from 'jquery';
// @ts-expect-error
const {
  useJQuery
} = config();
// @ts-expect-error
if (jQuery && useJQuery !== false) {
  // @ts-expect-error
  config({
    useJQuery: true
  });
}
// eslint-disable-next-line func-names
export default function () {
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return jQuery && config().useJQuery;
}
