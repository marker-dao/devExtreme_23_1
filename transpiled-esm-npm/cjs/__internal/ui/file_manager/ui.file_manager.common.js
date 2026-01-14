"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenSome = exports.getMapFromObject = exports.getDisplayFileSize = exports.findItemsByKeys = exports.extendAttributes = void 0;
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const whenSome = (arg, onSuccess, onError) => {
  // eslint-disable-next-line no-param-reassign
  onSuccess = onSuccess || _common.noop;
  // eslint-disable-next-line no-param-reassign
  onError = onError || _common.noop;
  if (!Array.isArray(arg)) {
    // eslint-disable-next-line no-param-reassign
    arg = [arg];
  }
  const deferreds = arg.map((item, index) => (0, _deferred.when)(item).then(result => {
    if ((0, _type.isFunction)(onSuccess)) {
      onSuccess({
        item,
        index,
        result
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }, error => {
    if (!error) {
      // eslint-disable-next-line no-param-reassign
      error = {};
    }
    error.index = index;
    if ((0, _type.isFunction)(onError)) {
      onError(error);
    }
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new _deferred.Deferred().resolve().promise();
  }));
  // eslint-disable-next-line prefer-spread
  return _deferred.when.apply(null, deferreds);
};
exports.whenSome = whenSome;
const getDisplayFileSize = byteSize => {
  const sizesTitles = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let displaySize = byteSize;
  while (displaySize >= 1024 && index <= sizesTitles.length - 1) {
    displaySize /= 1024;
    index += 1;
  }
  displaySize = Math.round(displaySize * 10) / 10;
  return `${displaySize} ${sizesTitles[index]}`;
};
exports.getDisplayFileSize = getDisplayFileSize;
const extendAttributes = (targetObject, sourceObject, objectKeysArray) => {
  objectKeysArray.forEach(objectKey => {
    (0, _extend.extend)(true, targetObject, (0, _type.isDefined)(sourceObject[objectKey]) ? {
      [objectKey]: sourceObject[objectKey]
    } : {});
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return targetObject;
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.extendAttributes = extendAttributes;
const findItemsByKeys = (itemInfos, keys) => {
  const itemMap = {};
  keys.forEach(key => {
    itemMap[key] = null;
  });
  itemInfos.forEach(itemInfo => {
    const {
      key
    } = itemInfo.fileItem;
    if (Object.prototype.hasOwnProperty.call(itemMap, key)) {
      itemMap[key] = itemInfo;
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = [];
  keys.forEach(key => {
    const itemInfo = itemMap[key];
    if (itemInfo) {
      result.push(itemInfo);
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
exports.findItemsByKeys = findItemsByKeys;
const getMapFromObject = object => {
  const keys = Object.keys(object);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values = [];
  keys.forEach(key => values.push(object[key]));
  return {
    keys,
    values
  };
};
exports.getMapFromObject = getMapFromObject;