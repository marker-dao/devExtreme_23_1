/**
* DevExtreme (esm/__internal/core/utils/m_ready_callbacks.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../../../core/dom_adapter';
import callOnce from '../../../core/utils/call_once';
import injector from '../../../core/utils/dependency_injector';
import { hasWindow } from '../../../core/utils/window';
let callbacks = [];
const subscribeReady = callOnce(() => {
  const removeListener = domAdapter.listen(domAdapter.getDocument(), 'DOMContentLoaded', () => {
    readyCallbacks.fire();
    removeListener();
  });
});
const readyCallbacks = {
  add: callback => {
    const windowExists = hasWindow();
    if (windowExists && domAdapter.getReadyState() !== 'loading') {
      callback();
    } else {
      callbacks.push(callback);
      windowExists && subscribeReady();
    }
  },
  fire: () => {
    callbacks.forEach(callback => callback());
    callbacks = [];
  }
};
const readyCallbacksModule = injector(readyCallbacks);
export { readyCallbacksModule };
export default readyCallbacksModule;
