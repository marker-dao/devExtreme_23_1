import { isPromise } from '../../../core/utils/type';
function invokeConditionally(cancelResult, callback, cancelCallback) {
  const invokeCallback = cancel => {
    const callbackToInvoke = cancel ? cancelCallback : callback;
    callbackToInvoke === null || callbackToInvoke === void 0 || callbackToInvoke();
  };
  if (isPromise(cancelResult)) {
    cancelResult.then(invokeCallback).catch(callback);
  } else {
    invokeCallback(Boolean(cancelResult));
  }
}
export { invokeConditionally };