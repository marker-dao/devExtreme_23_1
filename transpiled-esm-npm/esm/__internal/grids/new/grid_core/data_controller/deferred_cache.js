import { equalByValue } from '../../../../../core/utils/common';
import { Deferred } from '../../../../../core/utils/deferred';
// @ts-expect-error bad deferred ctor type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createDeferred = () => new Deferred();
export const deferredCache = actionFn => {
  let lastArgs = null;
  let cachedResult = null;
  return function () {
    const hasPreviousCall = lastArgs !== null && cachedResult !== null;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const isArgsSame = hasPreviousCall ? equalByValue(lastArgs, args) : false;
    if (hasPreviousCall && isArgsSame) {
      return createDeferred().resolve(cachedResult);
    }
    lastArgs = args;
    return actionFn(...args).then(result => {
      cachedResult = result;
      return result;
    });
  };
};