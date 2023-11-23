/**
* DevExtreme (esm/common/data/custom-store.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
function isGroupItem(item) {
  if (item === undefined || item === null || typeof item !== 'object') {
    return false;
  }
  return 'key' in item && 'items' in item;
}
export function isLoadResultObject(res) {
  return !Array.isArray(res) && 'data' in res;
}
export function isGroupItemsArray(res) {
  return Array.isArray(res) && !!res.length && isGroupItem(res[0]);
}
export function isItemsArray(res) {
  return Array.isArray(res) && !isGroupItem(res[0]);
}
