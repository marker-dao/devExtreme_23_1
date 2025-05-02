/**
* DevExtreme (cjs/__internal/core/r1/utils/render_utils.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineClasses = void 0;
const combineClasses = classesMap => Object.keys(classesMap).filter(cssClass => !!cssClass && classesMap[cssClass]).join(' ');
exports.combineClasses = combineClasses;
