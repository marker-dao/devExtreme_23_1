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