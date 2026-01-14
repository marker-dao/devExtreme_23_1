/**
* DevExtreme (esm/__internal/grids/new/grid_core/core/events/decorators.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function eventHandler(target, key, descriptor) {
  const originFn = descriptor.value;
  descriptor.value = function decoratedEventHandlerFn(event) {
    if (event.dxIgnore) {
      return;
    }
    originFn === null || originFn === void 0 || originFn.call(this, event);
  };
}
