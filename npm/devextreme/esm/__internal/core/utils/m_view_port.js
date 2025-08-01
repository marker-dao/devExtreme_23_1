/**
* DevExtreme (esm/__internal/core/utils/m_view_port.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import callbacks from '../../../core/utils/callbacks';
import readyCallbacks from '../../../core/utils/ready_callbacks';
const ready = readyCallbacks.add;
const changeCallback = callbacks();
let $originalViewPort = $();
const value = function () {
  let $current;
  return function (element) {
    if (!arguments.length) {
      return $current;
    }
    const $element = $(element);
    $originalViewPort = $element;
    const isNewViewportFound = !!$element.length;
    const prevViewPort = value();
    $current = isNewViewportFound ? $element : $('body');
    changeCallback.fire(isNewViewportFound ? value() : $(), prevViewPort);
  };
}();
ready(function () {
  value('.dx-viewport');
});
export { changeCallback, value };
export function originalViewPort() {
  return $originalViewPort;
}
