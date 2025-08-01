/**
* DevExtreme (cjs/__internal/data/m_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessageFromXhr = exports.base64_encode = exports.aggregators = exports.XHR_ERROR_UNLOAD = void 0;
exports.isConjunctiveOperator = isConjunctiveOperator;
exports.isDisjunctiveOperator = isDisjunctiveOperator;
exports.rejectedPromise = exports.processRequestResultLock = exports.normalizeSortingInfo = exports.normalizeBinaryCriterion = exports.keysEqual = exports.isUniformEqualsByOr = exports.isUnaryOperation = exports.isGroupCriterion = void 0;
exports.throttleChanges = throttleChanges;
exports.trivialPromise = void 0;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _iterator = require("../../core/utils/iterator");
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

const ready = _ready_callbacks.default.add;
const XHR_ERROR_UNLOAD = exports.XHR_ERROR_UNLOAD = 'DEVEXTREME_XHR_ERROR_UNLOAD';
const normalizeBinaryCriterion = function (crit) {
  return [crit[0], crit.length < 3 ? '=' : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]];
};
exports.normalizeBinaryCriterion = normalizeBinaryCriterion;
const normalizeSortingInfo = function (info) {
  if (!Array.isArray(info)) {
    info = [info];
  }
  return (0, _iterator.map)(info, i => {
    const result = {
      selector: (0, _type.isFunction)(i) || typeof i === 'string' ? i : i.getter || i.field || i.selector,
      desc: !!(i.desc || String(i.dir).charAt(0).toLowerCase() === 'd')
    };
    if (i.compare) {
      // @ts-expect-error
      result.compare = i.compare;
    }
    return result;
  });
};
exports.normalizeSortingInfo = normalizeSortingInfo;
const errorMessageFromXhr = exports.errorMessageFromXhr = function () {
  const textStatusMessages = {
    timeout: 'Network connection timeout',
    error: 'Unspecified network error',
    parsererror: 'Unexpected server response'
  };
  const explainTextStatus = function (textStatus) {
    let result = textStatusMessages[textStatus];
    if (!result) {
      return textStatus;
    }
    return result;
  };
  // T542570, https://stackoverflow.com/a/18170879
  let unloading;
  ready(() => {
    const window = (0, _window.getWindow)();
    _dom_adapter.default.listen(window, 'beforeunload', () => {
      unloading = true;
    });
  });
  return function (xhr, textStatus) {
    if (unloading) {
      return XHR_ERROR_UNLOAD;
    }
    if (xhr.status < 400) {
      return explainTextStatus(textStatus);
    }
    return xhr.statusText;
  };
}();
const aggregators = exports.aggregators = {
  count: {
    seed: 0,
    step(count) {
      return 1 + count;
    }
  },
  sum: {
    seed: 0,
    step(sum, item) {
      return sum + item;
    }
  },
  min: {
    step(min, item) {
      return item < min ? item : min;
    }
  },
  max: {
    step(max, item) {
      return item > max ? item : max;
    }
  },
  avg: {
    seed: [0, 0],
    step(pair, value) {
      return [pair[0] + value, pair[1] + 1];
    },
    finalize(pair) {
      return pair[1] ? pair[0] / pair[1] : NaN;
    }
  }
};
const processRequestResultLock = exports.processRequestResultLock = function () {
  let lockCount = 0;
  let lockDeferred;
  const obtain = function () {
    if (lockCount === 0) {
      // @ts-expect-error
      lockDeferred = new _deferred.Deferred();
    }
    lockCount++;
  };
  const release = function () {
    lockCount--;
    if (lockCount < 1) {
      lockDeferred.resolve();
    }
  };
  const promise = function () {
    // @ts-expect-error
    const deferred = lockCount === 0 ? new _deferred.Deferred().resolve() : lockDeferred;
    return deferred.promise();
  };
  const reset = function () {
    lockCount = 0;
    if (lockDeferred) {
      lockDeferred.resolve();
    }
  };
  return {
    obtain,
    release,
    promise,
    reset
  };
}();
function isDisjunctiveOperator(condition) {
  return /^(or|\|\||\|)$/i.test(condition);
}
function isConjunctiveOperator(condition) {
  return /^(and|&&|&)$/i.test(condition);
}
const keysEqual = function (keyExpr, key1, key2) {
  if (Array.isArray(keyExpr)) {
    const names = (0, _iterator.map)(key1, (v, k) => k);
    let name;
    for (let i = 0; i < names.length; i++) {
      name = names[i];
      if (!(0, _common.equalByValue)(key1[name], key2[name], {
        strict: false
      })) {
        return false;
      }
    }
    return true;
  }
  return (0, _common.equalByValue)(key1, key2, {
    strict: false
  });
};
exports.keysEqual = keysEqual;
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
// eslint-disable-next-line @typescript-eslint/naming-convention
const base64_encode = function (input) {
  if (!Array.isArray(input)) {
    input = stringToByteArray(String(input));
  }
  let result = '';
  function getBase64Char(index) {
    return BASE64_CHARS.charAt(index);
  }
  for (let i = 0; i < input.length; i += 3) {
    const octet1 = input[i];
    const octet2 = input[i + 1];
    const octet3 = input[i + 2];
    result += (0, _iterator.map)([octet1 >> 2, (octet1 & 3) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (octet2 & 15) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : octet3 & 63], getBase64Char).join('');
  }
  return result;
};
exports.base64_encode = base64_encode;
function stringToByteArray(str) {
  const bytes = [];
  let code;
  let i;
  for (i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code < 128) {
      bytes.push(code);
    } else if (code < 2048) {
      bytes.push(192 + (code >> 6), 128 + (code & 63));
    } else if (code < 65536) {
      bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (code & 63));
    } else if (code < 2097152) {
      bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (code & 63));
    }
  }
  return bytes;
}
const isUnaryOperation = function (crit) {
  return crit[0] === '!' && Array.isArray(crit[1]);
};
exports.isUnaryOperation = isUnaryOperation;
const isGroupOperator = function (value) {
  return value === 'and' || value === 'or';
};
const isUniformEqualsByOr = function (crit) {
  if (crit.length > 2 && Array.isArray(crit[0]) && crit[1] === 'or' && typeof crit[0][0] === 'string' && crit[0][1] === '=') {
    const [prop] = crit[0];
    return !crit.find((el, i) => i % 2 !== 0 ? el !== 'or' : !Array.isArray(el) || el.length !== 3 || el[0] !== prop || el[1] !== '=');
  }
  return false;
};
exports.isUniformEqualsByOr = isUniformEqualsByOr;
const isGroupCriterion = function (crit) {
  const first = crit[0];
  const second = crit[1];
  if (Array.isArray(first)) {
    return true;
  }
  if ((0, _type.isFunction)(first)) {
    if (Array.isArray(second) || (0, _type.isFunction)(second) || isGroupOperator(second)) {
      return true;
    }
  }
  return false;
};
exports.isGroupCriterion = isGroupCriterion;
const trivialPromise = function () {
  // @ts-expect-error
  const d = new _deferred.Deferred();
  return d.resolve.apply(d, arguments).promise();
};
exports.trivialPromise = trivialPromise;
const rejectedPromise = function () {
  // @ts-expect-error
  const d = new _deferred.Deferred();
  return d.reject.apply(d, arguments).promise();
};
exports.rejectedPromise = rejectedPromise;
function throttle(func, timeout) {
  let timeoutId;
  return function () {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        func.call(this);
      }, (0, _type.isFunction)(timeout) ? timeout() : timeout);
    }
    return timeoutId;
  };
}
function throttleChanges(func, timeout) {
  let cache = [];
  const throttled = throttle(function () {
    func.call(this, cache);
    cache = [];
  }, timeout);
  return function (changes) {
    if (Array.isArray(changes)) {
      // @ts-expect-error
      cache.push(...changes);
    }
    // @ts-expect-error
    return throttled.call(this, cache);
  };
}
