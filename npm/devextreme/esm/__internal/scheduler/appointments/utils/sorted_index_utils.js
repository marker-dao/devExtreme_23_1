/**
* DevExtreme (esm/__internal/scheduler/appointments/utils/sorted_index_utils.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const isElementCanBeFocused = $element => Boolean($element && $element.is(':visible') && !$element.hasClass('dx-state-disabled'));
export const getPrevElement = function (sortedIndex) {
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
export const getNextElement = function (sortedIndex) {
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
