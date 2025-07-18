"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getName = exports.addWidgetPrefix = void 0;
const getName = () => 'dxCardView';
exports.getName = getName;
const addWidgetPrefix = className => `dx-${getName().slice(2).toLowerCase()}${className ? `-${className}` : ''}`;
exports.addWidgetPrefix = addWidgetPrefix;