export function eventHandler(target, key, descriptor) {
  const originFn = descriptor.value;
  descriptor.value = function decoratedEventHandlerFn(event) {
    if (event.dxIgnore) {
      return;
    }
    originFn === null || originFn === void 0 || originFn.call(this, event);
  };
}