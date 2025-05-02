"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deferredCache = void 0;
var _common = require("../../../../../core/utils/common");
var _deferred = require("../../../../../core/utils/deferred");
// @ts-expect-error bad deferred ctor type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createDeferred = () => new _deferred.Deferred();
const deferredCache = actionFn => {
  let lastArgs = null;
  let cachedResult = null;
  return function () {
    const hasPreviousCall = lastArgs !== null && cachedResult !== null;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const isArgsSame = hasPreviousCall ? (0, _common.equalByValue)(lastArgs, args) : false;
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
exports.deferredCache = deferredCache;