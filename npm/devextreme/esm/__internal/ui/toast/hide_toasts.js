/**
* DevExtreme (esm/__internal/ui/toast/hide_toasts.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import Toast, { TOAST_CLASS } from '../../ui/toast/toast';
function hideToasts(container) {
  const toasts = $(`.${TOAST_CLASS}`).toArray();
  if (arguments.length === 0) {
    toasts.forEach(toast => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Toast.getInstance(toast).hide();
    });
    return;
  }
  if (!container) {
    return;
  }
  const containerElement = $(container).get(0);
  toasts.map(toast => {
    const instance = Toast.getInstance(toast);
    return instance;
  }).filter(instance => {
    const {
      container: toastContainer
    } = instance.option();
    const toastContainerElement = $(toastContainer).get(0);
    return containerElement === toastContainerElement && containerElement;
  }).forEach(instance => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    instance.hide();
  });
}
export default hideToasts;
