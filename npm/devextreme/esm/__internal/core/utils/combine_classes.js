/**
* DevExtreme (esm/__internal/core/utils/combine_classes.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function combineClasses(classesMap) {
  return Object.keys(classesMap).filter(p => classesMap[p]).join(' ');
}
