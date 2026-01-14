/**
* DevExtreme (esm/__internal/integration/jquery/element.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { setPublicElementWrapper } from '../../core/m_element';
import useJQueryFn from './use_jquery';
const useJQuery = useJQueryFn();
// eslint-disable-next-line @stylistic/max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export function getPublicElementJQuery($element) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return $element;
}
if (useJQuery) {
  setPublicElementWrapper(getPublicElementJQuery);
}
