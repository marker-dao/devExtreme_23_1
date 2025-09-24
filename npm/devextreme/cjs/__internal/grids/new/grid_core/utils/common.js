/**
* DevExtreme (cjs/__internal/grids/new/grid_core/utils/common.js)
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
exports.getName = exports.addWidgetPrefix = void 0;
const getName = () => 'dxCardView';
exports.getName = getName;
const addWidgetPrefix = className => `dx-${getName().slice(2).toLowerCase()}${className ? `-${className}` : ''}`;
exports.addWidgetPrefix = addWidgetPrefix;
