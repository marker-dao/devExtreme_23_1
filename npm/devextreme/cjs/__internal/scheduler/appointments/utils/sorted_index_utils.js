/**
* DevExtreme (cjs/__internal/scheduler/appointments/utils/sorted_index_utils.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElementCanBeFocused = exports.getPrevElement = exports.getNextElement = void 0;
const isElementCanBeFocused = $element => Boolean($element && $element.is(':visible') && !$element.hasClass('dx-state-disabled'));
exports.isElementCanBeFocused = isElementCanBeFocused;
const getPrevElement = function (sortedIndex) {
  let renderedElementsBySortedIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let index = sortedIndex - 1;
  while (index >= 0) {
    const $nextElement = renderedElementsBySortedIndex[index];
    if (isElementCanBeFocused($nextElement)) {
      return $nextElement;
    }
    index -= 1;
  }
  return undefined;
};
exports.getPrevElement = getPrevElement;
const getNextElement = function (sortedIndex) {
  let renderedElementsBySortedIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let index = sortedIndex + 1;
  while (index < renderedElementsBySortedIndex.length) {
    const $nextElement = renderedElementsBySortedIndex[index];
    if (isElementCanBeFocused($nextElement)) {
      return $nextElement;
    }
    index += 1;
  }
  return undefined;
};
exports.getNextElement = getNextElement;
