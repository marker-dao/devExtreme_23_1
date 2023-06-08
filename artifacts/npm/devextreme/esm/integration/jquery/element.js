/**
* DevExtreme (esm/integration/jquery/element.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { setPublicElementWrapper } from '../../core/element';
import useJQueryFn from './use_jquery';
var useJQuery = useJQueryFn();
var getPublicElement = function getPublicElement($element) {
  return $element;
};
if (useJQuery) {
  setPublicElementWrapper(getPublicElement);
}
